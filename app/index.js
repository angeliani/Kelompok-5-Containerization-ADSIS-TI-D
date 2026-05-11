const express = require('express');
const multer = require('multer');
const mysql = require('mysql2');
const Minio = require('minio');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Konfigurasi upload file ke memori sementara sebelum dikirim ke MinIO
const upload = multer({ storage: multer.memoryStorage() });

// Koneksi ke Database MySQL
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'db',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'nusantara_tech'
});

db.connect(err => {
    if (err) console.log('Menunggu database siap...');
    else console.log('Terkoneksi ke MySQL!');
});

// Koneksi ke MinIO
const minioClient = new Minio.Client({
    endPoint: process.env.MINIO_ENDPOINT || 'minio',
    port: parseInt(process.env.MINIO_PORT) || 9000,
    useSSL: false,
    accessKey: process.env.MINIO_ACCESS_KEY || 'minioadmin',
    secretKey: process.env.MINIO_SECRET_KEY || 'minioadmin'
});

const bucketName = process.env.MINIO_BUCKET || 'documents';

// Halaman Form Upload
app.get('/', (req, res) => {
    res.send(`
        <div style="font-family: sans-serif; padding: 20px;">
            <h2>Nusantara Tech: Upload Dokumen Mahasiswa</h2>
            <form action="/upload" method="POST" enctype="multipart/form-data">
                <input type="text" name="nama" placeholder="Nama Lengkap Mahasiswa" required style="padding: 5px; width: 300px;"/><br><br>
                <input type="file" name="dokumen" required /><br><br>
                <button type="submit" style="padding: 8px 15px; background: blue; color: white; border: none; cursor: pointer;">Upload File</button>
            </form>
        </div>
    `);
});

// Proses Upload Data
app.post('/upload', upload.single('dokumen'), (req, res) => {
    const { nama } = req.body;
    const file = req.file;

    if (!file) return res.status(400).send('File dokumen tidak ditemukan!');

    // Bikin nama file jadi unik
    const fileName = Date.now() + '-' + file.originalname;

    // 1. Upload ke MinIO
    minioClient.putObject(bucketName, fileName, file.buffer, function(err, etag) {
        if (err) return res.status(500).send('Gagal upload file ke MinIO: ' + err);

        // 2. Simpan Data Teks ke MySQL
        const query = 'INSERT INTO mahasiswa (nama, nama_dokumen) VALUES (?, ?)';
        db.query(query, [nama, fileName], (err, result) => {
            if (err) {
                // Biar aman kalau tabel belum dibuat sama Didi
                return res.status(500).send('File masuk ke MinIO, tapi gagal simpan ke Database: ' + err.message);
            }
            res.send(`
                <div style="font-family: sans-serif; padding: 20px;">
                    <h3 style="color: green;">Berhasil!</h3>
                    <p>File dokumen tersimpan di Object Storage (MinIO).</p>
                    <p>Data nama <b>${nama}</b> tersimpan di Database (MySQL).</p>
                    <a href="/">Kembali ke Form</a>
                </div>
            `);
        });
    });
});

app.listen(port, () => {
    console.log(`Web App Nusantara Tech berjalan di port ${port}`);
});
