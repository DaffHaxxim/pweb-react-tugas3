import { useState } from "react";
import KolomIsian from "../molecules/KolomIsian.jsx";
import KolomPilihan from "../molecules/KolomPilihan.jsx";
import KolomGambar from "../molecules/KolomGambar.jsx";
import Tombol from "../atoms/Tombol.jsx";
import { validasiProduk } from "../../utils/validasi.js";
import { KATEGORI } from "../../data/kategori.js";

const BATAS_BERKAS = 5 * 1024 * 1024; // 5 MB

// Organism: form nama + harga. Dipakai untuk tambah (awal kosong) dan edit (awal berisi produk).
// Nilai isian disimpan sebagai teks; angka baru dibentuk setelah lolos validasi.
function FormProduk({ awal = { nama: "", harga: "", kategori: KATEGORI[0], gambar: "" }, labelSimpan, onSimpan, onBatal }) {
  const [nama, setNama] = useState(awal.nama);
  const [harga, setHarga] = useState(String(awal.harga));
  const [kategori, setKategori] = useState(awal.kategori);
  const [gambar, setGambar] = useState(awal.gambar ?? "");
  const [galat, setGalat] = useState({});

  // Membaca berkas gambar menjadi data URL (teks) agar bisa disimpan bersama data produk.
  function pilihBerkas(berkas) {
    if (!berkas) return;
    if (!berkas.type.startsWith("image/")) {
      setGalat((g) => ({ ...g, gambar: "Berkas harus berupa gambar" }));
      return;
    }
    if (berkas.size > BATAS_BERKAS) {
      setGalat((g) => ({ ...g, gambar: "Ukuran gambar maksimal 5 MB" }));
      return;
    }
    const pembaca = new FileReader();
    pembaca.onload = () => {
      setGambar(pembaca.result);
      setGalat((g) => ({ ...g, gambar: undefined }));
    };
    pembaca.readAsDataURL(berkas);
  }

  function kirim(e) {
    e.preventDefault();
    const hasil = validasiProduk({ nama, harga, kategori, gambar });
    setGalat(hasil.galat);
    if (!hasil.valid) return;
    onSimpan(hasil.data);
  }

  return (
    <form onSubmit={kirim} noValidate>
      <KolomIsian
        label="Nama Produk"
        name="nama"
        nilai={nama}
        onUbah={setNama}
        placeholder="Contoh: Pulpen"
        galat={galat.nama}
        autoFocus
      />
      <KolomIsian
        label="Harga (Rp)"
        name="harga"
        nilai={harga}
        onUbah={setHarga}
        placeholder="Contoh: 5000"
        petunjuk="Harga harus lebih dari 0"
        galat={galat.harga}
        inputMode="numeric"
      />
      <KolomPilihan
        label="Kategori"
        name="kategori"
        nilai={kategori}
        onUbah={setKategori}
        pilihan={KATEGORI}
        galat={galat.kategori}
      />
      <KolomGambar
        nilai={gambar}
        nama={nama}
        onPilihBerkas={pilihBerkas}
        onHapus={() => setGambar("")}
        galat={galat.gambar}
      />
      <div className="modal__aksi">
        <Tombol varian="garis" onClick={onBatal}>
          Batal
        </Tombol>
        <Tombol type="submit">{labelSimpan}</Tombol>
      </div>
    </form>
  );
}

export default FormProduk;
