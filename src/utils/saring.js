import { SEMUA_KATEGORI } from "../data/kategori.js";

// Fungsi bantu murni: menyaring produk berdasarkan kata kunci pada nama dan kategori.
// Kata kunci tidak peka huruf besar-kecil dan mengabaikan spasi di awal/akhir.
export function saringProduk(daftar, kataKunci, kategori = SEMUA_KATEGORI) {
  const kunci = kataKunci.trim().toLowerCase();
  return daftar.filter((produk) => {
    const cocokKategori = kategori === SEMUA_KATEGORI || produk.kategori === kategori;
    const cocokNama = kunci === "" || produk.nama.toLowerCase().includes(kunci);
    return cocokKategori && cocokNama;
  });
}
