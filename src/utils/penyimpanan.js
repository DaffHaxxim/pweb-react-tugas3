// Penyimpanan daftar produk di localStorage browser.
const KUNCI = "manajemen-produk:v1";

// Pemeriksaan bentuk minimal: data dari localStorage tidak boleh dipercaya begitu saja karena
// bisa rusak, berasal dari versi lama, atau diubah manual lewat DevTools.
function adalahProduk(p) {
  return (
    p !== null &&
    typeof p === "object" &&
    Number.isInteger(p.id) &&
    typeof p.nama === "string" &&
    Number.isFinite(p.harga) &&
    typeof p.kategori === "string"
  );
}

// Mengembalikan data tersimpan bila utuh; bila kosong, rusak, atau bentuknya salah, kembali ke `awal`.
export function muatProduk(awal) {
  try {
    const mentah = localStorage.getItem(KUNCI);
    if (mentah === null) return awal;
    const data = JSON.parse(mentah);
    return Array.isArray(data) && data.every(adalahProduk) ? data : awal;
  } catch {
    return awal;
  }
}

// Mengembalikan true bila berhasil. localStorage bisa menolak (kuota penuh, mode privat),
// jadi kegagalan ditangkap dan dilaporkan ke pemanggil, bukan dibiarkan merusak halaman.
export function simpanProduk(daftar) {
  try {
    localStorage.setItem(KUNCI, JSON.stringify(daftar));
    return true;
  } catch {
    return false;
  }
}
