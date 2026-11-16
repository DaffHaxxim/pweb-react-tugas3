// Data awal produk (harga hanya contoh; foto dan lisensinya ada di KREDIT-GAMBAR.md).
// ID 1 sampai 5 adalah produk inti tugas; ID 6 dan seterusnya adalah katalog
// tambahan bertema kehidupan sekolah. `stok` adalah jumlah unit tersedia. `gambar` bersifat opsional: produk tanpa gambar
// tampil dengan gambar pengganti.
export const produkAwal = [
  // --- Inti Tugas ---
  { id: 1, nama: "Pulpen", harga: 5000, stok: 120, kategori: "Alat Tulis", gambar: "/images/produk/01-pulpen.webp" },
  { id: 2, nama: "Buku Tulis", harga: 12000, stok: 80, kategori: "Perlengkapan Kelas", gambar: "/images/produk/02-buku-tulis.webp" },
  { id: 3, nama: "Spidol", harga: 8000, stok: 45, kategori: "Alat Tulis", gambar: "/images/produk/03-spidol.webp" },
  { id: 4, nama: "Penggaris", harga: 6000, stok: 60, kategori: "Perlengkapan Kelas", gambar: "/images/produk/04-penggaris.webp" },
  { id: 5, nama: "Penghapus", harga: 3000, stok: 90, kategori: "Alat Tulis", gambar: "/images/produk/05-penghapus.webp" },

  // --- Alat Tulis ---
  { id: 6, nama: "Pensil 2B", harga: 3500, stok: 100, kategori: "Alat Tulis", gambar: "/images/produk/06-pensil-2b.webp" },
  { id: 7, nama: "Penanda Teks (Highlighter)", harga: 9000, stok: 35, kategori: "Alat Tulis", gambar: "/images/produk/07-penanda-teks.webp" },
  { id: 8, nama: "Spidol Whiteboard", harga: 12000, stok: 28, kategori: "Alat Tulis", gambar: "/images/produk/08-spidol-whiteboard.webp" },

  // --- Perlengkapan Kelas ---
  { id: 9, nama: "Gunting Kertas", harga: 7500, stok: 40, kategori: "Perlengkapan Kelas", gambar: "/images/produk/09-gunting.webp" },
  { id: 10, nama: "Lem Stick", harga: 8500, stok: 55, kategori: "Perlengkapan Kelas", gambar: "/images/produk/10-lem-stick.webp" },
  { id: 11, nama: "Buku Gambar A4", harga: 15000, stok: 30, kategori: "Perlengkapan Kelas", gambar: "/images/produk/11-buku-gambar.webp" },
  { id: 12, nama: "Kotak Pensil", harga: 18000, stok: 25, kategori: "Perlengkapan Kelas", gambar: "/images/produk/12-kotak-pensil.webp" },

  // --- Tas ---
  { id: 13, nama: "Ransel Sekolah", harga: 185000, stok: 12, kategori: "Tas", gambar: "/images/produk/13-ransel.webp" },
  { id: 14, nama: "Tas Laptop", harga: 225000, stok: 4, kategori: "Tas", gambar: "/images/produk/14-tas-laptop.webp" },
  { id: 15, nama: "Tas Serut", harga: 35000, stok: 20, kategori: "Tas", gambar: "/images/produk/15-tas-serut.webp" },
  { id: 16, nama: "Tote Bag Kanvas", harga: 45000, stok: 18, kategori: "Tas", gambar: "/images/produk/16-tote-bag.webp" },

  // --- Elektronik ---
  { id: 17, nama: "Earphone Kabel", harga: 45000, stok: 25, kategori: "Elektronik", gambar: "/images/produk/17-earphone.webp" },
  { id: 18, nama: "Kalkulator Ilmiah", harga: 165000, stok: 10, kategori: "Elektronik", gambar: "/images/produk/18-kalkulator-ilmiah.webp" },
  { id: 19, nama: "Powerbank 10.000 mAh", harga: 150000, stok: 14, kategori: "Elektronik", gambar: "/images/produk/19-powerbank.webp" },
  { id: 20, nama: "Flash Drive 32 GB", harga: 60000, stok: 30, kategori: "Elektronik", gambar: "/images/produk/20-flash-drive.webp" },
  { id: 21, nama: "Mouse Nirkabel", harga: 85000, stok: 16, kategori: "Elektronik", gambar: "/images/produk/21-mouse-nirkabel.webp" },

  // --- Peralatan Harian ---
  { id: 22, nama: "Botol Minum Vakum", harga: 120000, stok: 15, kategori: "Peralatan Harian", gambar: "/images/produk/22-botol-vakum.webp" },
  { id: 23, nama: "Kotak Bekal", harga: 45000, stok: 22, kategori: "Peralatan Harian", gambar: "/images/produk/23-kotak-bekal.webp" },
  { id: 24, nama: "Payung Lipat", harga: 55000, stok: 9, kategori: "Peralatan Harian", gambar: "/images/produk/24-payung-lipat.webp" },
];
