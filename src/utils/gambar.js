// Memperkecil gambar unggahan sebelum disimpan: sisi terpanjang maksimal `sisiMaks` piksel,
// dikodekan ulang sebagai JPEG. Foto kamera beberapa MB menjadi puluhan KB sehingga aman
// disimpan sebagai data URL di localStorage (kuota sekitar 5 MB untuk seluruh data).
export function perkecilGambar(berkas, sisiMaks = 600, kualitas = 0.82) {
  return new Promise((selesai, gagal) => {
    const url = URL.createObjectURL(berkas);
    const gambar = new Image();
    gambar.onload = () => {
      const skala = Math.min(1, sisiMaks / Math.max(gambar.width, gambar.height));
      const kanvas = document.createElement("canvas");
      kanvas.width = Math.round(gambar.width * skala);
      kanvas.height = Math.round(gambar.height * skala);
      const konteks = kanvas.getContext("2d");
      konteks.fillStyle = "#ffffff"; // JPEG tidak punya transparansi
      konteks.fillRect(0, 0, kanvas.width, kanvas.height);
      konteks.drawImage(gambar, 0, 0, kanvas.width, kanvas.height);
      URL.revokeObjectURL(url);
      selesai(kanvas.toDataURL("image/jpeg", kualitas));
    };
    gambar.onerror = () => {
      URL.revokeObjectURL(url);
      gagal(new Error("Gambar tidak dapat dibaca"));
    };
    gambar.src = url;
  });
}
