// Fungsi bantu murni (tanpa efek samping): mengubah angka menjadi teks rupiah.
// Contoh: formatHarga(50000) -> "Rp50.000"
export function formatHarga(nilai) {
  return "Rp" + new Intl.NumberFormat("id-ID").format(nilai);
}
