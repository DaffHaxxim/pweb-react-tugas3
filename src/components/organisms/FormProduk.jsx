import { useState } from "react";
import KolomIsian from "../molecules/KolomIsian.jsx";
import Tombol from "../atoms/Tombol.jsx";
import { validasiProduk } from "../../utils/validasi.js";

// Organism: form nama + harga. Dipakai untuk tambah (awal kosong) dan edit (awal berisi produk).
// Nilai isian disimpan sebagai teks; angka baru dibentuk setelah lolos validasi.
function FormProduk({ awal = { nama: "", harga: "" }, labelSimpan, onSimpan, onBatal }) {
  const [nama, setNama] = useState(awal.nama);
  const [harga, setHarga] = useState(String(awal.harga));
  const [galat, setGalat] = useState({});

  function kirim(e) {
    e.preventDefault();
    const hasil = validasiProduk({ nama, harga });
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
