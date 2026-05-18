# Kelompok 5 – Containerization ADSIS TI-D

## Deskripsi Project

Project ini merupakan aplikasi web upload dokumen mahasiswa berbasis **Node.js** yang telah di-containerize menggunakan **Docker Compose**. Sistem terintegrasi dengan beberapa layanan, yaitu:

- Node.js sebagai Web Application
- MySQL sebagai Database
- MinIO sebagai Object Storage

---

# Cara Menjalankan Sistem

## 1. Clone Repository

Clone repository GitHub berikut:

```bash
git clone https://github.com/angeliani/Kelompok-5-Containerization-ADSIS-TI-D.git
```

Masuk ke folder project:

```bash
cd Kelompok-5-Containerization-ADSIS-TI-D/app
```

---

## 2. Konfigurasi Environment

Copy file environment:

```bash
cp .env.example .env
```

Isi file `.env`:

```env
# Database Configuration
DB_HOST=db
DB_USER=root
DB_PASSWORD=isi_password_database_disini
DB_NAME=nusantara_tech

MYSQL_ROOT_PASSWORD=password
MYSQL_DATABASE=nusantara_tech

# MinIO Configuration
MINIO_ENDPOINT=minio
MINIO_PORT=9000
MINIO_ACCESS_KEY=admin
MINIO_SECRET_KEY=password123
MINIO_ROOT_USER=admin
MINIO_ROOT_PASSWORD=password123
MINIO_BUCKET=documents
```

---

## 3. Build dan Menjalankan Docker Compose

Jalankan perintah berikut untuk build dan menjalankan seluruh container:

```bash
docker compose up --build -d
```

Untuk memastikan seluruh container berjalan dengan baik:

```bash
docker ps
```

Tambahkan screenshot hasil `docker ps` di bawah bagian ini.
<img width="1494" height="125" alt="Screenshot 2026-05-18 090529" src="https://github.com/user-attachments/assets/deda3be8-52a9-4054-91c5-480e91c5c567" />

---

# URL dan Port Akses Sistem

## Web Application

Akses aplikasi web melalui browser:

```txt
http://localhost:3000
```

atau menggunakan IP server:

```txt
http://IP_SERVER:3000
```

Tambahkan screenshot tampilan web application di bawah bagian ini.
<img width="1919" height="1066" alt="Screenshot 2026-05-18 071913" src="https://github.com/user-attachments/assets/ab31faa2-fc3b-4f2d-99bb-676f61de2652" />

---

# Dashboard MinIO

Akses dashboard MinIO melalui browser:

```txt
http://localhost:9001
```

atau menggunakan IP server:

```txt
http://IP_SERVER:9001
```

## Login MinIO

Gunakan credential berikut:

```txt
Username : admin
Password : password123
```

Tambahkan screenshot dashboard login MinIO di bawah bagian ini.
<img width="1919" height="1070" alt="Screenshot 2026-05-18 072024" src="https://github.com/user-attachments/assets/938c9513-c389-4600-9e26-adcededd80bf" />

---

# Letak Bucket MinIO

Bucket yang digunakan untuk penyimpanan file upload adalah:

```txt
documents
```

Seluruh file upload mahasiswa akan tersimpan di bucket tersebut.

Tambahkan screenshot bucket `documents` di bawah bagian ini.
<img width="958" height="531" alt="Screenshot 2026-05-18 080242" src="https://github.com/user-attachments/assets/5fee5a71-6ff1-4d8b-811f-5db6cb011743" />

---

# Pembuatan Table Database

Masuk ke container MySQL:

```bash
docker exec -it app-db-1 mysql -u root -p
```

Masukkan password database.

Pilih database:

```sql
USE nusantara_tech;
```

Buat tabel mahasiswa:

```sql
CREATE TABLE mahasiswa (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(255),
    nama_dokumen VARCHAR(255)
);
```

Tambahkan screenshot pembuatan tabel database di bawah bagian ini.
<img width="532" height="452" alt="Screenshot 2026-05-18 083218" src="https://github.com/user-attachments/assets/ce9519b4-dc45-44b5-8490-0adf93f25098" />

---

# Cara Pengujian Sistem

1. Jalankan seluruh container menggunakan Docker Compose
2. Buka web application
3. Input nama mahasiswa
4. Upload file dokumen
5. File akan tersimpan ke MinIO
6. Data mahasiswa akan tersimpan ke database MySQL

---

# Verifikasi Sistem

## Verifikasi Container

```bash
docker ps
```

## Verifikasi Database

Masuk ke MySQL container:

```bash
docker exec -it app-db-1 mysql -u root -p
```

Kemudian jalankan query berikut:

```sql
USE nusantara_tech;
SELECT * FROM mahasiswa;
```

---

# Hasil Pengujian

| Pengujian | Status |
|---|---|
| Web Application berjalan | Berhasil |
| Docker Container berjalan | Berhasil |
| Koneksi MySQL berhasil | Berhasil |
| Dashboard MinIO dapat diakses | Berhasil |
| Upload file ke MinIO | Berhasil |
| Penyimpanan data ke MySQL | Berhasil |

---

# Kesimpulan

Project berhasil diimplementasikan menggunakan Docker Compose dengan integrasi antara:

- Web Application Node.js
- Database MySQL
- Object Storage MinIO

Seluruh layanan berjalan pada container yang berbeda namun tetap saling terhubung melalui Docker Network. Sistem berhasil melakukan upload file ke MinIO dan menyimpan metadata file ke database MySQL.
