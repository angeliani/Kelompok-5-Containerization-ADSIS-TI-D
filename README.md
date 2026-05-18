**Kelompok 5 – Containerization ADSIS TI-D**

-- Deskripsi Project --

Project ini merupakan aplikasi web upload dokumen mahasiswa berbasis Node.js yang telah di-containerize menggunakan Docker Compose. 
Sistem terintegrasi dengan:
  1. Node.js (Web Application)
  2. MySQL (Database)
  3. MinIO (Object Storage)
  
- Cara Menjalankan Sistem -
1. Clone Repository
    git clone https://github.com/angeliani/Kelompok-5-Containerization-ADSIS-TI-D.git

  Masuk ke folder project:
    cd Kelompok-5-Containerization-ADSIS-TI-D/app

2. Konfigurasi Environment

  Copy file environment:
    cp .env.example .env

  Isi file .env:

  DB_HOST=db
  DB_USER=root
  DB_PASSWORD=isi_password_database_disini
  DB_NAME=nusantara_tech

  MYSQL_ROOT_PASSWORD=password
  MYSQL_DATABASE=nusantara_tech
  
  MINIO_ENDPOINT=minio
  MINIO_PORT=9000
  MINIO_ACCESS_KEY=admin
  MINIO_SECRET_KEY=password123
  MINIO_ROOT_USER=admin
  MINIO_ROOT_PASSWORD=password123
  MINIO_BUCKET=documents
  
3. Build dan Menjalankan Docker Compose

  Jalankan perintah berikut:
  docker compose up --build -d

  Untuk memastikan container berjalan:
  docker ps
  <img width="1494" height="125" alt="image" src="https://github.com/user-attachments/assets/ff4cab73-2e5f-496d-953f-e2595dd3f465" />


  **URL dan Port Akses Sistem**
  Web Application

  Akses aplikasi web melalui browser:
  http://localhost:3000

  atau menggunakan IP server:
  http://IP_SERVER:3000

  <img width="1919" height="1066" alt="Screenshot 2026-05-18 071913" src="https://github.com/user-attachments/assets/0bf817e3-0420-438d-a505-59be90ce3a81" />

  
  **Dashboard MinIO**

  Akses dashboard MinIO:
  http://localhost:9001

  atau:
  http://IP_SERVER:9001

  <img width="1919" height="1070" alt="Screenshot 2026-05-18 072024" src="https://github.com/user-attachments/assets/17d2112c-df1e-428b-8533-456c4bbbdb7b" />
  
  
  Login MinIO
  Username : admin
  Password : password123

  **Letak Bucket MinIO**
  Bucket yang digunakan untuk penyimpanan file:
  documents
  
  <img width="958" height="531" alt="Screenshot 2026-05-18 080242" src="https://github.com/user-attachments/assets/3ba64123-01c2-473b-a589-32fee8e7073c" />

  Seluruh file upload mahasiswa akan tersimpan di bucket tersebut.

Pembuatan Table Database

Masuk ke container MySQL:
docker exec -it app-db-1 mysql -u root -p
  <img width="982" height="655" alt="image" src="https://github.com/user-attachments/assets/6f543518-1a6a-4a36-a3f2-5beb45fa9344" />

Masukkan password: isi_password_database_disini

Pilih database:
USE nusantara_tech;

Buat tabel:
CREATE TABLE mahasiswa (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(255),
    nama_dokumen VARCHAR(255)
);

**Cara Pengujian Sistem**
1. Jalankan seluruh container menggunakan Docker Compose
2. Buka web application
3. Input nama mahasiswa
4. Upload file dokumen
5. File akan tersimpan ke MinIO
6. Data mahasiswa tersimpan ke database MySQL
   
**Verifikasi Sistem**
- Verifikasi Container
  docker ps
- Verifikasi Database
  docker exec -it app-db-1 mysql -u root -p


Lalu jalankan:

USE nusantara_tech;
SELECT * FROM mahasiswa;
