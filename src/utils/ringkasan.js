import { KATEGORI } from "../data/kategori.js";

// Fungsi bantu murni: menghitung angka ringkasan untuk Dashboard dari daftar produk.
// Produk dengan stok di bawah atau sama dengan batas ini dianggap menipis.
export const BATAS_STOK_MENIPIS = 10;

export function hitungRingkasan(daftar) {
  const totalStok = daftar.reduce((jumlah, p) => jumlah + p.stok, 0);
  const totalNilai = daftar.reduce((jumlah, p) => jumlah + p.harga * p.stok, 0);

  const perKategori = KATEGORI.map((kategori) => {
    const anggota = daftar.filter((p) => p.kategori === kategori);
    return { kategori, jumlah: anggota.length, stok: anggota.reduce((jumlah, p) => jumlah + p.stok, 0) };
  });

  // Urut dari stok paling sedikit; [...daftar] menjaga array asal tidak berubah.
  const stokMenipis = [...daftar].filter((p) => p.stok <= BATAS_STOK_MENIPIS).sort((a, b) => a.stok - b.stok);

  return { totalProduk: daftar.length, totalStok, totalNilai, perKategori, stokMenipis };
}
