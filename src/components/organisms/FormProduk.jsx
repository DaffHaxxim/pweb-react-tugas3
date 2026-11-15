import { useState } from "react";
import KolomIsian from "../molecules/KolomIsian.jsx";
import KolomPilihan from "../molecules/KolomPilihan.jsx";
import Tombol from "../atoms/Tombol.jsx";
import { validasiProduk } from "../../utils/validasi.js";
import { KATEGORI } from "../../data/kategori.js";

// Organism: form nama + harga. Dipakai untuk tambah (awal kosong) dan edit (awal berisi produk).
// Nilai isian disimpan sebagai teks; angka baru dibentuk setelah lolos validasi.
function FormProduk({ awal = { nama: "", harga: "", kategori: KATEGORI[0] }, labelSimpan, onSimpan, onBatal }) {
  const [nama, setNama] = useState(awal.nama);
  const [harga, setHarga] = useState(String(awal.harga));
  const [kategori, setKategori] = useState(awal.kategori);
  const [galat, setGalat] = useState({});

  function kirim(e) {
    e.preventDefault();
    const hasil = validasiProduk({ nama, harga, kategori });
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
