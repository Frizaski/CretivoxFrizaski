# Introduction Frizaski

Website portfolio interaktif milik **Frizaski Al Fath** untuk Endurance Test
Intern Front-End Developer di **Cretivox**. Project ini menampilkan perjalanan,
project, dan sisi kreatif melalui pengalaman scroll berbasis animasi.

## Fitur Utama

- **Hero interaktif** dengan liquid SVG cursor mask dan pergantian portrait saat
  cursor bergerak.
- **Section About** dengan reveal teks per kata dan transisi foto berbasis
  scroll.
- **Login gate** setelah About. Bagian portfolio lanjutan baru dirender setelah
  login berhasil menggunakan API DummyJSON.
- **Proof of Work** dengan panel project yang dipin dan dianimasikan memakai
  GSAP ScrollTrigger.
- **Sisi Lain** dengan pergantian karya visual dan video mengikuti scroll.
- **Perjalanan** dengan image trail mengikuti cursor menggunakan thumbnail WebP
  teroptimasi.
- **Cara Gue** dengan kalimat panjang putih dan efek typing yang bergerak
  mengikuti scroll.
- **Penutupan dan Contact** dengan sequence entrance scroll serta informasi
  kontak.
- Halaman **Info** dengan background shader interaktif berbasis OGL/WebGL.
- Smooth scrolling berbasis **Lenis** yang disinkronkan dengan GSAP.
- Musik latar opsional dengan toggle on/off; audio baru dimuat saat pengguna
  memilih untuk menyalakannya.

## Teknologi

- Next.js 16 App Router
- React 19 dan TypeScript
- GSAP, `@gsap/react`, dan ScrollTrigger
- Lenis
- OGL / WebGL shader
- CSS Modules
- Lucide React

## Autentikasi Demo

Section setelah About terkunci sampai pengguna berhasil login. Form login
memanggil endpoint berikut:

```text
POST https://dummyjson.com/user/login
```

Credential demo:

```text
Username: emilys
Password: emilyspass
```

Setelah login berhasil, `accessToken`, `refreshToken`, dan waktu kedaluwarsa
sesi disimpan di `localStorage` browser. Sesi berlaku selama **24 jam** dan
akses portfolio akan terkunci kembali secara otomatis setelah waktu tersebut
habis. Field password juga menyediakan tombol untuk melihat atau menyembunyikan
password. Fitur ini dibuat sebagai demonstrasi autentikasi untuk kebutuhan
test; proteksi data aplikasi produksi tetap perlu dilakukan di sisi server.

## Menjalankan Project

Persyaratan:

- Node.js versi modern yang mendukung Next.js 16
- npm

Jalankan perintah berikut:

```bash
npm install
npm run dev
```

Buka `http://localhost:3000` pada browser.

Pengecekan sebelum deployment:

```bash
npm run lint
npm run build
```

## Struktur Folder

```text
public/
  Audio/                    musik latar opsional
  Assets/                   foto profil dan logo
  Fierce Frizaski Al Fath/  visual hero
  Journey/                  dokumentasi perjalanan
    trail/                  thumbnail WebP ringan untuk ImageTrail
  Projects/                 preview project
  Sisi Lain/                media kemampuan kreatif
src/
  app/                      route, layout, dan style global
  components/               section UI, animasi, auth, dan utilitas interaksi
  data/                     data konten statis untuk section
```

## Alur Halaman

1. `Hero`
2. `About`
3. `Login`
4. `Proof` setelah login
5. `Sisi Lain`
6. `Perjalanan`
7. `Cara Gue`
8. `Penutupan`
9. `Contact`

## Deployment Vercel

Cara paling sederhana adalah mendorong repository ke GitHub, lalu mengimpor
repository tersebut melalui dashboard Vercel. Vercel akan otomatis mendeteksi
framework Next.js dan menjalankan production build.

Login demo tetap dapat digunakan saat website sudah dideploy karena request
autentikasi dikirim dari browser ke API publik DummyJSON melalui HTTPS.
