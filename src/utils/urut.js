// Fungsi bantu murni: mengurutkan produk. Selalu bekerja pada SALINAN (`[...daftar]`) karena
// Array.prototype.sort mengubah array asalnya, dan state React tidak boleh diubah langsung.
export const PILIHAN_URUTAN = [
  { nilai: "id", label: "Urutan bawaan" },
  { nilai: "nama-naik", label: "Nama A-Z" },
  { nilai: "nama-turun", label: "Nama Z-A" },
  { nilai: "harga-naik", label: "Harga termurah" },
  { nilai: "harga-turun", label: "Harga termahal" },
];

export function urutkanProduk(daftar, urutan) {
  const salinan = [...daftar];
  switch (urutan) {
    case "nama-naik":
      return salinan.sort((a, b) => a.nama.localeCompare(b.nama, "id"));
    case "nama-turun":
      return salinan.sort((a, b) => b.nama.localeCompare(a.nama, "id"));
    case "harga-naik":
      return salinan.sort((a, b) => a.harga - b.harga);
    case "harga-turun":
      return salinan.sort((a, b) => b.harga - a.harga);
    default:
      return salinan.sort((a, b) => a.id - b.id);
  }
}
