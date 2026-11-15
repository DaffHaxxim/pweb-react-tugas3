import { useState } from "react";
import { produkAwal } from "../../data/produk.js";
import { saringProduk } from "../../utils/saring.js";
import TataLetak from "../templates/TataLetak.jsx";
import HeaderHalaman from "../organisms/HeaderHalaman.jsx";
import BarPencarian from "../molecules/BarPencarian.jsx";
import GridProduk from "../organisms/GridProduk.jsx";
import Modal from "../organisms/Modal.jsx";
import Tombol from "../atoms/Tombol.jsx";
import "./HalamanProduk.css";

// Page: template + konten nyata. State halaman dipegang di sini lalu dibagikan lewat props.
function HalamanProduk() {
  const [kataKunci, setKataKunci] = useState("");
  // Pop-up yang sedang terbuka: null (tidak ada) atau "tambah".
  const [modal, setModal] = useState(null);

  const tampil = saringProduk(produkAwal, kataKunci);

  return (
    <TataLetak>
      <HeaderHalaman onTambah={() => setModal("tambah")} />
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

      {modal === "tambah" && (
        <Modal
          judul="Tambah Produk"
          deskripsi="Masukkan informasi produk baru."
          onTutup={() => setModal(null)}
        >
          <div className="modal__aksi">
            <Tombol varian="garis" onClick={() => setModal(null)}>
              Batal
            </Tombol>
          </div>
        </Modal>
      )}
    </TataLetak>
  );
}

export default HalamanProduk;
