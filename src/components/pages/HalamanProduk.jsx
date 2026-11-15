import { useState } from "react";
import { produkAwal } from "../../data/produk.js";
import { saringProduk } from "../../utils/saring.js";
import TataLetak from "../templates/TataLetak.jsx";
import HeaderHalaman from "../organisms/HeaderHalaman.jsx";
import BarPencarian from "../molecules/BarPencarian.jsx";
import GridProduk from "../organisms/GridProduk.jsx";
import Modal from "../organisms/Modal.jsx";
import FormProduk from "../organisms/FormProduk.jsx";
import "./HalamanProduk.css";

// Page: template + konten nyata. State halaman dipegang di sini lalu dibagikan lewat props.
function HalamanProduk() {
  const [daftarProduk, setDaftarProduk] = useState(produkAwal);
  const [kataKunci, setKataKunci] = useState("");
  // Pop-up yang sedang terbuka: null (tidak ada) atau "tambah".
  const [modal, setModal] = useState(null);

  const tampil = saringProduk(daftarProduk, kataKunci);

  function tambahProduk(data) {
    const idBaru = daftarProduk.reduce((maks, p) => Math.max(maks, p.id), 0) + 1;
    const baru = { id: idBaru, ...data };
    setDaftarProduk([...daftarProduk, baru]);
    setModal(null);
  }

  return (
    <TataLetak>
      <HeaderHalaman onTambah={() => setModal("tambah")} />
      <BarPencarian
        kataKunci={kataKunci}
        onUbah={setKataKunci}
        total={daftarProduk.length}
      />
      <GridProduk
        daftar={tampil}
        onEdit={(p) => alert(`Edit: ${p.nama}`)}
        onHapus={(p) => alert(`Hapus: ${p.nama}`)}
      />
      <p className="halaman-produk__ringkasan">
        Menampilkan {tampil.length} dari {daftarProduk.length} produk
      </p>

      {modal === "tambah" && (
        <Modal
          judul="Tambah Produk"
          deskripsi="Masukkan informasi produk baru."
          onTutup={() => setModal(null)}
        >
          <FormProduk
            labelSimpan="Simpan Produk"
            onSimpan={tambahProduk}
            onBatal={() => setModal(null)}
          />
        </Modal>
      )}
    </TataLetak>
  );
}

export default HalamanProduk;
