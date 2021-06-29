# Restolog

**Restolog** *(Restaurant Catalog)* - Aplikasi katalog restoran untuk submission kelas Menjadi Front-End Developer Expert.

## Daftar Isi

- [Restolog](#restolog)
  - [Daftar Isi](#daftar-isi)
  - [Sekilas](#sekilas)
  - [Scripts](#scripts)
  - [Dev vs Build Production](#dev-vs-build-production)
    - [Loader dan Plugin](#loader-dan-plugin)
    - [Feature](#feature)
  - [Testing](#testing)
    - [I. Components](#i-components)
      - [1. `app-bar`](#1-app-bar)
      - [2. `resto-list`](#2-resto-list)
      - [3. `resto-detail`](#3-resto-detail)
    - [II. Data-Source](#ii-data-source)
      - [1. Resto Detail](#1-resto-detail)
      - [2. Resto List](#2-resto-list-1)
      - [3. Resto Review](#3-resto-review)
      - [4. Favorite Resto Idb Contract](#4-favorite-resto-idb-contract)
    - [C. Favorite](#c-favorite)
      - [1. Menyukai suatu resto](#1-menyukai-suatu-resto)
      - [2. Berhenti menyukai suatu resto](#2-berhenti-menyukai-suatu-resto)
    - [D. Resto-List](#d-resto-list)
  - [E2E test](#e2e-test)
    - [A. Memfavoritkan suatu restaurant](#a-memfavoritkan-suatu-restaurant)
    - [B. Berhenti memfavoritkan suatu restaurant](#b-berhenti-memfavoritkan-suatu-restaurant)
    - [C. Me-review Suatu Restaurant](#c-me-review-suatu-restaurant)

## Sekilas

Web app ini dibuat dengan menggunakan JavaScript *bundler* **Webpack** dengan fitur-fitur;

1. PWA - *Progressive Web Application* dengan menggunakan `Workbox-InjectManifest` dan `WebpackPwaManifest`
2. Responsivitas dan optimasi gambar dengan menggunakan `responsive-loader`.
3. Minifikasi CSS dengan menggunakan `MiniCssExtractPlugin` dan `CssMinimizerPlugin`.
4. *Preload* assets untuk mempercepat pemuatan file-file krusial dengan menggunakan `HtmlWebpackInjectPreload`.
5. *Transpiling* dengan menggunakan `babal-loader`.

## Scripts

Beberapa *script* `npm` yang digunakan dalam *project* ini adalah;

1. Starting development server

   `npm run start-dev`

   > Pada mode development beberapa fitur seperti PWA, Split codes tidak tersedia.

2. Build untuk distribusi production

   `npm run build`

3. Starting production server

   `npm run start-prod`

   > Sebelum memulai server production sebaiknya dilakukan build dan testing terlebih dahulu.

4. Linting

   `npm run lint`

5. Integration test

   `npm run test`

6. End to End (E2E) test

   `npm run e2e`

   > Sebelum memulai e2e test, server development harus dijalankan terlebih dahulu .

## Dev vs Build Production

Karena webpack *config* untuk *development* dibuat agar cepat me-*reload* saat terjadi perubahan pada suatu file maka beberapa *plugin*, *loader* dan *feature* tidak semuanya ada di config *development*. Susunan *config* yang digunakan dapat dilihat pada tabel di bawah ini.

### Loader dan Plugin

| Loader/Plugin              | Development | Production |
| -------------------------- | :---------: | :--------: |
| `HtmlWebpackPlugin`        | ✔          | ✔          |
| `responsive-loader`        | ✔          | ✔          |
| `sass-loader`              | ✔          | ✔          |
| `css-loader`               | ✔          | ✔          |
| `style-loader`             | ✔          | ❌          |
| `MiniCssExtractPlugin`     | ❌          | ✔          |
| `babel-loader`             | ❌          | ✔          |
| `BundleAnalyzerPlugin`     | ❌          | ✔          |
| `HtmlWebpackInjectPreload` | ❌          | ✔          |
| `WebpackPwaManifest`       | ❌          | ✔          |
| `InjectManifest`           | ❌          | ✔          |
| `CssMinimizerPlugin`       | ❌          | ✔          |

### Feature

| Feature           | Development | Production |
| ----------------- | :---------: | :--------: |
| `Image Optimizer` | ✔           | ✔          |
| `Service Worker`  | ❌          | ✔          |
| `Web Manifest`    | ❌          | ✔          |
| `Split chunks`    | ❌          | ✔          |
| `PWA`             | ❌          | ✔          |

## Testing

Test Case yang digunakan untuk melakukan *integration test*.

### I. Components

Menguji beberapa *component* yang dibuat dari *custom element*.

#### 1. `app-bar`

1. Bila halaman yang ditampilkan memiliki elemen hero
   - App Bar harus transparan / tidak memiliki background.
2. Bila halaman tidak memiliki elemen hero
   - App Bar harus memiliki background.
3. Bila Menu Navigasi diset.
   - App Bar harus menampilkan menu secara tepat.
   - App Bar harus menampilkan indikator pada menu yang sedang aktif.
4. Tombol hamburger menu pada App Bar harus dapat men-toggle (menampilkan/menyembunyikan) daftar menu.

#### 2. `resto-list`

1. Bila daftar resto belum diset.
   - Tampilkan elemen skeleton
2. Bila daftar resto telah diset.
   - Hilangkan elemen skeleton.
   - Tampilkan daftar resto dengan jumlah yang sesuai.
   - Tampilkan konten daftar resto berdasarkan data yang telah diset.

#### 3. `resto-detail`

1. Bila data detail resto belum diset.
   - Tampilkan elemen skeleton
2. Bila detail resto telah diset.
   - Hilangkan elemen skeleton.
   - Tampilkan konten detail resto berdasarkan data yang telah diset.

### II. Data-Source

Menguji Model

#### 1. Resto Detail

1. Bila response ok (200)
   - dan JSON response valid
     - Kembalikan object detail resto.
   - dan JSON response kosong
     - Throw error ‘Detail restaurant tidak ditemukan.’
   - dan JSON response tidak valid
      - Throw error ‘Terjadi kesalahan saat memproses data.’
2. Bila response not ok (selain 200)
    - Throw error ‘Terjadi kesalahan saat memproses data.’

#### 2. Resto List

1. Bila response ok (200)
   - dan JSON response valid
     - Kembalikan object daftar resto.
   - dan JSON response kosong
     - Throw error ‘Daftar restaurant kosong.’
   - dan JSON response tidak valid
     - Throw error ‘Terjadi kesalahan saat memproses data.’
2. Bila response not ok (selain 200)
   - Throw error ‘Terjadi kesalahan saat memproses data.’

#### 3. Resto Review

1. Bila response ok (200)
   - dan JSON response valid
     - Kembalikan object daftar review yang telah ada sebelumnya dengan review yang baru dikirimkan.
   - dan JSON response kosong
     - Throw error ‘Terjadi kesalahan, silahkan ulangi kembali.’
   - dan JSON response tidak valid
     - Throw error ‘Terjadi kesalahan saat memproses data.’
2. Bila response not ok (selain 200)
   - Throw error ‘Terjadi kesalahan saat memproses data.’

#### 4. Favorite Resto Idb Contract

1. Bisa mengembalikan data resto yang telah ditambahkan.
2. Tidak menambahkan resto yang tidak memiliki properti id.
3. Bisa mengembalikan semua resto yang telah ditambahkan.
4. Bisa menghapus resto berdasarkan id.
5. Bisa menangani jika resto yang akan dihapus tidak ada.

### C. Favorite

Menguji fungsi Menyukai / Berhenti menyukai suatu resto

#### 1. Menyukai suatu resto

1. Bila resto belum difavoritkan.
    - Tampilkan tombol untuk memfavoritkan resto tersebut.
    - Hilangkan tombol untuk menghapus resto tersebut dari daftar favorit.
2. Bila tombol untuk memfavoritkan resto ditekan.
   - Ganti tombol untuk memfavoritkan resto tersebut dengan tombol untuk menghapus resto tersebut dari daftar favorit.
   - Tampilkan *snackbar* untuk memberitahu bahwa resto berhasil ditambahkan ke favorite.
   - Menyimpan informasi restaurant ke IdB.
   - Jika resto telah difavoritkan sebelumnya tidak perlu disimpan kembali.

#### 2. Berhenti menyukai suatu resto

1. Bila resto sudah difavoritkan sebelumnya.
   - Hilangkan tombol untuk memfavoritkan resto tersebut.
   - Tampilkan tombol untuk menghapus resto tersebut dari daftar favorit.
2. Bila tombol untuk menghapus resto tersebut dari daftar favorit ditekan.
   - Tampilkan tombol untuk memfavoritkan resto tersebut.
   - Tampilkan *snackbar* untuk memberitahu bahwa Restaurant berhasil dihapus dari favorite.
   - Menghapus informasi restaurant tersebut dari IdB.
   - Tidak akan menyebabkan error Jika informasi resto yang hendak dihapus tidak ada dalam daftar favorit.

### D. Resto-List

Menguji hubungan presenter dengan model dan view pada halaman daftar restaurant.

1. Presenter dapat memanggil model untuk mendapatkan data daftar resto.
2. Bila daftar resto tidak kosong;
   - Presenter dapat memanggil view untuk menampilkan daftar restaurant berdasarkan data yang diperoleh dari model tadi.
3. Bila daftar resto kosong;
   - Presenter dapat memanggil view untuk menampilkan pesan bahwa daftar restaurant kosong.

## E2E test

### A. Memfavoritkan suatu restaurant

1. *User* membuka halaman daftar favorite resto.
2. *User* melihat pesan bahwa daftar favorite kosong.
3. *User* membuka halaman home.
4. *User* melihat daftar restaurant.
5. *User* mengklik restaurant yang ada pada urutan pertama.
6. *User* melihat halaman detail restaurant pertama.
7. *User* melihat tombol favorit.
8. *User* menekan tombol favorit.
9. *User* melihat snackbar berisi pemberitahuan resto berhasil ditambahkan ke favorite.
10. *User* membuka halaman daftar favorite.
11. *User* melihat restaurant yang ditambahkan tadi ada di daftar favorit.

### B. Berhenti memfavoritkan suatu restaurant

1. *User* membuka halaman home.
2. *User* melihat daftar restaurant.
3. *User* mengklik restaurant yang ada pada urutan pertama.
4. *User* melihat tombol favorit.
5. *User* menekan tombol favorit.
6. *User* membuka halaman daftar favorite.
7. *User* melihat restaurant yang ditambahkan tadi di daftar favorit.
8. *User* mengklik restaurant yang difavoritkan tadi.
9. *User* melihat tombol unfavorited.
10. *User* mengklik tombol unfavorited.
11. *User* melihat snackbar berisi pemberitahuan resto berhasil dihapus dari favorite.
12. *User* membuka halaman daftar favorit.
13. *User* sekarang melihat bahwa daftar favorit restaurant kosong.

### C. Me-review Suatu Restaurant

1. *User* membuka halaman home.
2. *User* membuka halaman detail restaurant yang ada di urutan ke tiga.
3. *User* melihat form untuk mengisi review.
4. *User* memasukkan nama dan review pada form.
5. *User* mengklik tombol submit.
6. *User* melihat indikator loading di tombol submit (penanda bahwa data sedang dikirim).
7. Sesaat kemudian *user* tidak melihat lagi indikator loading di tombol submit (penanda bahwa data sudah selesai di kirim).
8. *User* sekarang melihat bahwa nama dan isi review-nya muncul pada urutan terakhir daftar review.
