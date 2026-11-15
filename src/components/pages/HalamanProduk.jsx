import { useState } from "react";
import { produkAwal } from "../../data/produk.js";
import { saringProduk } from "../../utils/saring.js";
import { urutkanProduk } from "../../utils/urut.js";
import { SEMUA_KATEGORI } from "../../data/kategori.js";
import TataLetak from "../templates/TataLetak.jsx";
import HeaderHalaman from "../organisms/HeaderHalaman.jsx";
import BarPencarian from "../molecules/BarPencarian.jsx";
import FilterKategori from "../molecules/FilterKategori.jsx";
import GridProduk from "../organisms/GridProduk.jsx";
import Modal from "../organisms/Modal.jsx";
import FormProduk from "../organisms/FormProduk.jsx";
import DialogHapus from "../organisms/DialogHapus.jsx";
import "./HalamanProduk.css";

// Page: template + konten nyata. State halaman dipegang di sini lalu dibagikan lewat props.
function HalamanProduk() {
  const [daftarProduk, setDaftarProduk] = useState(produkAwal);
  const [kataKunci, setKataKunci] = useState("");
  const [kategoriAktif, setKategoriAktif] = useState(SEMUA_KATEGORI);
  const [urutan, setUrutan] = useState("id");
  // Pop-up yang terbuka: null, atau { jenis: "tambah" | "edit" | "hapus", produk? }.
  const [modal, setModal] = useState(null);

  const tampil = urutkanProduk(
    saringProduk(daftarProduk, kataKunci, kategoriAktif),
    urutan
  );
  const tutupModal = () => setModal(null);

  function tambahProduk(data) {
    const idBaru = daftarProduk.reduce((maks, p) => Math.max(maks, p.id), 0) + 1;
    setDaftarProduk([...daftarProduk, { id: idBaru, ...data }]);
    tutupModal();
  }

  function ubahProduk(data) {
    setDaftarProduk(
      daftarProduk.map((p) => (p.id === modal.produk.id ? { ...p, ...data } : p))
    );
    tutupModal();
  }

  function hapusProduk() {
    setDaftarProduk(daftarProduk.filter((p) => p.id !== modal.produk.id));
    tutupModal();
  }

  return (
    <TataLetak>
      <HeaderHalaman onTambah={() => setModal({ jenis: "tambah" })} />
      <BarPencarian
        kataKunci={kataKunci}
        onUbah={setKataKunci}
        urutan={urutan}
        onUrut={setUrutan}
        total={daftarProduk.length}
      />
      <FilterKategori aktif={kategoriAktif} onPilih={setKategoriAktif} />
      <GridProduk
        daftar={tampil}
        onEdit={(produk) => setModal({ jenis: "edit", produk })}
        onHapus={(produk) => setModal({ jenis: "hapus", produk })}
      />
      <p className="halaman-produk__ringkasan">
        Menampilkan {tampil.length} dari {daftarProduk.length} produk
      </p>

      {modal?.jenis === "tambah" && (
        <Modal
          judul="Tambah Produk"
          deskripsi="Masukkan informasi produk baru."
          onTutup={tutupModal}
        >
          <FormProduk
            labelSimpan="Simpan Produk"
            onSimpan={tambahProduk}
            onBatal={tutupModal}
          />
        </Modal>
      )}

      {modal?.jenis === "edit" && (
        <Modal
          judul="Edit Produk"
          deskripsi="Perbarui informasi produk yang dipilih."
          onTutup={tutupModal}
        >
          <FormProduk
            awal={modal.produk}
            labelSimpan="Simpan Perubahan"
            onSimpan={ubahProduk}
            onBatal={tutupModal}
          />
        </Modal>
      )}

      {modal?.jenis === "hapus" && (
        <DialogHapus
          produk={modal.produk}
          onKonfirmasi={hapusProduk}
          onBatal={tutupModal}
        />
      )}
    </TataLetak>
  );
}

export default HalamanProduk;
