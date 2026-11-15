// Fungsi bantu murni: menyaring daftar produk berdasarkan kata kunci pada nama.
// Pencarian tidak peka huruf besar-kecil dan mengabaikan spasi di awal/akhir.
export function saringProduk(daftar, kataKunci) {
  const kunci = kataKunci.trim().toLowerCase();
  if (kunci === "") return daftar;
  return daftar.filter((produk) => produk.nama.toLowerCase().includes(kunci));
}
