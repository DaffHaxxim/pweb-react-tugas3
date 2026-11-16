// Penyimpanan daftar produk di localStorage browser.
// Versi data ada pada nama kunci: v2 menambahkan field `stok`, v1 (tanpa stok) dimigrasikan saat dimuat.
const KUNCI = "manajemen-produk:v2";
const KUNCI_LAMA = "manajemen-produk:v1";

// Pemeriksaan bentuk minimal: data dari localStorage tidak boleh dipercaya begitu saja karena
// bisa rusak, berasal dari versi lama, atau diubah manual lewat DevTools.
function bentukDasar(p) {
  return (
    p !== null &&
    typeof p === "object" &&
    Number.isInteger(p.id) &&
    typeof p.nama === "string" &&
    Number.isFinite(p.harga) &&
    typeof p.kategori === "string"
  );
}

function adalahProduk(p) {
  return bentukDasar(p) && Number.isInteger(p.stok) && p.stok >= 0;
}

// Data v1 tidak punya stok. Produk bawaan (id dan nama sama) mendapat stok awalnya; produk tambahan sendiri mendapat 0.
function migrasiDariV1(daftar, awal) {
  return daftar.map((p) => ({
    ...p,
    stok: awal.find((a) => a.id === p.id && a.nama === p.nama)?.stok ?? 0,
  }));
}

function bacaJson(kunci) {
  const mentah = localStorage.getItem(kunci);
  return mentah === null ? null : JSON.parse(mentah);
}

// Mengembalikan data tersimpan bila utuh; bila kosong, rusak, atau bentuknya salah, kembali ke `awal`.
export function muatProduk(awal) {
  try {
    const data = bacaJson(KUNCI);
    if (data !== null) return Array.isArray(data) && data.every(adalahProduk) ? data : awal;

    const lama = bacaJson(KUNCI_LAMA);
    if (Array.isArray(lama) && lama.every(bentukDasar)) return migrasiDariV1(lama, awal);
    return awal;
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

// Pilihan tampilan daftar produk ("grid" atau "list") disimpan terpisah dari data produk.
const KUNCI_TAMPILAN = "manajemen-produk:tampilan";

export function muatTampilan() {
  try {
    return localStorage.getItem(KUNCI_TAMPILAN) === "list" ? "list" : "grid";
  } catch {
    return "grid";
  }
}

export function simpanTampilan(mode) {
  try {
    localStorage.setItem(KUNCI_TAMPILAN, mode);
  } catch {
    // Gagal menyimpan pilihan tampilan tidak mengganggu aplikasi; pilihan tetap berlaku selama halaman terbuka.
  }
}
