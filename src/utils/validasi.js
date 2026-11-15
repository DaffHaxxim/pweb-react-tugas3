import { KATEGORI } from "../data/kategori.js";

// Validasi isian form produk (fungsi murni, mudah diuji).
// Masukan berupa teks dari input; hasilnya { valid, galat, data } dengan data sudah dinormalisasi
// (nama dirapikan, harga berupa angka). `galat` berisi pesan per kolom yang bermasalah.
export const BATAS_NAMA = 60;
export const BATAS_HARGA = 1_000_000_000;

export function validasiProduk({ nama, harga, kategori }) {
  const galat = {};

  const namaBersih = String(nama).trim();
  if (namaBersih === "") {
    galat.nama = "Nama produk wajib diisi";
  } else if (namaBersih.length > BATAS_NAMA) {
    galat.nama = `Nama produk maksimal ${BATAS_NAMA} karakter`;
  }

  const hargaBersih = String(harga).trim();
  let angka = NaN;
  if (hargaBersih === "") {
    galat.harga = "Harga wajib diisi";
  } else if (!/^\d+$/.test(hargaBersih)) {
    galat.harga = "Harga harus berupa angka bulat tanpa titik atau huruf";
  } else {
    angka = Number(hargaBersih);
    if (angka <= 0) galat.harga = "Harga harus lebih dari 0";
    else if (angka > BATAS_HARGA) galat.harga = "Harga terlalu besar";
  }

  if (!KATEGORI.includes(kategori)) {
    galat.kategori = "Pilih kategori produk";
  }

  return {
    valid: Object.keys(galat).length === 0,
    galat,
    data: { nama: namaBersih, harga: angka, kategori },
  };
}
