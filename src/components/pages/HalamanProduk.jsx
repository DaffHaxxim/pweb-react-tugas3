import { useState } from "react";
import { produkAwal } from "../../data/produk.js";
import { saringProduk } from "../../utils/saring.js";
import TataLetak from "../templates/TataLetak.jsx";
import HeaderHalaman from "../organisms/HeaderHalaman.jsx";
import BarPencarian from "../molecules/BarPencarian.jsx";
import GridProduk from "../organisms/GridProduk.jsx";
import "./HalamanProduk.css";

// Page: template + konten nyata. State halaman dipegang di sini lalu dibagikan lewat props.
function HalamanProduk() {
  const [kataKunci, setKataKunci] = useState("");

  const tampil = saringProduk(produkAwal, kataKunci);

  return (
    <TataLetak>
      <HeaderHalaman onTambah={() => alert("Tambah produk")} />
      <BarPencarian
        kataKunci={kataKunci}
        onUbah={setKataKunci}
        total={produkAwal.length}
      />
      <GridProduk
        daftar={tampil}
        onEdit={(p) => alert(`Edit: ${p.nama}`)}
        onHapus={(p) => alert(`Hapus: ${p.nama}`)}
      />
      <p className="halaman-produk__ringkasan">
        Menampilkan {tampil.length} dari {produkAwal.length} produk
      </p>
    </TataLetak>
  );
}

export default HalamanProduk;
