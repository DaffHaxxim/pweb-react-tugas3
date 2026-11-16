import { useState } from "react";
import { saringProduk } from "../utils/saring.js";
import { urutkanProduk } from "../utils/urut.js";
import { SEMUA_KATEGORI } from "../data/kategori.js";
import HeaderHalaman from "../components/organisms/HeaderHalaman.jsx";
import BarPencarian from "../components/molecules/BarPencarian.jsx";
import FilterKategori from "../components/molecules/FilterKategori.jsx";
import GridProduk from "../components/organisms/GridProduk.jsx";
import Modal, { AksiModal } from "../components/organisms/Modal.jsx";
import FormProduk from "../components/organisms/FormProduk.jsx";
import DialogHapus from "../components/organisms/DialogHapus.jsx";
import KeadaanKosong from "../components/organisms/KeadaanKosong.jsx";
import Tombol from "../components/atoms/Tombol.jsx";

// Page untuk rute /products. Daftar produk dan fungsi ubah datanya datang dari App lewat props
// (state bersama); di sini hanya tersisa state tampilan sementara: pencarian, kategori, urutan, pop-up.
function HalamanProduk({ daftarProduk, modeTampilan = "grid", onTambah, onUbah, onHapus, onReset }) {
  const [kataKunci, setKataKunci] = useState("");
  const [kategoriAktif, setKategoriAktif] = useState(SEMUA_KATEGORI);
  const [urutan, setUrutan] = useState("id");
  // Pop-up yang terbuka: null, atau { jenis: "tambah" | "edit" | "hapus" | "reset", produk? }.
  const [modal, setModal] = useState(null);

  const tampil = urutkanProduk(
    saringProduk(daftarProduk, kataKunci, kategoriAktif),
    urutan
  );
  const tutupModal = () => setModal(null);
  const adaSaringan = kataKunci.trim() !== "" || kategoriAktif !== SEMUA_KATEGORI;

  function tambahProduk(data) {
    onTambah(data);
    tutupModal();
  }

  function ubahProduk(data) {
    onUbah(modal.produk.id, data);
    tutupModal();
  }

  function hapusProduk() {
    onHapus(modal.produk.id);
    tutupModal();
  }

  function hapusSaringan() {
    setKataKunci("");
    setKategoriAktif(SEMUA_KATEGORI);
  }

  function resetData() {
    onReset();
    hapusSaringan();
    setUrutan("id");
    tutupModal();
  }

  return (
    <>
      <section>
        <HeaderHalaman onTambah={() => setModal({ jenis: "tambah" })} />
        <BarPencarian
          kataKunci={kataKunci}
          onUbah={setKataKunci}
          urutan={urutan}
          onUrut={setUrutan}
          total={daftarProduk.length}
        />
        <FilterKategori aktif={kategoriAktif} onPilih={setKategoriAktif} />
        {tampil.length === 0 ? (
          <KeadaanKosong
            adaSaringan={adaSaringan}
            onHapusSaringan={hapusSaringan}
            onTambah={() => setModal({ jenis: "tambah" })}
          />
        ) : (
          <GridProduk
            daftar={tampil}
            mode={modeTampilan}
            onEdit={(produk) => setModal({ jenis: "edit", produk })}
            onHapus={(produk) => setModal({ jenis: "hapus", produk })}
          />
        )}
        <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
          <p className="text-[0.85rem] text-redup">
            Menampilkan {tampil.length} dari {daftarProduk.length} produk
          </p>
          <Tombol varian="hantu" onClick={() => setModal({ jenis: "reset" })}>
            Reset ke data awal
          </Tombol>
        </div>
      </section>

      {/* Pop-up adalah lapisan melayang (position: fixed), jadi diletakkan di luar <section>.
          Fragment <>...</> memungkinkan beberapa elemen sejajar tanpa elemen pembungkus. */}
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

      {modal?.jenis === "reset" && (
        <Modal
          judul="Kembalikan ke data awal?"
          deskripsi="Semua produk yang ditambah, diubah, atau dihapus akan hilang dan diganti katalog awal."
          onTutup={tutupModal}
        >
          <AksiModal>
            <Tombol varian="garis" onClick={tutupModal}>
              Batal
            </Tombol>
            <Tombol varian="bahaya" onClick={resetData}>
              Reset Data
            </Tombol>
          </AksiModal>
        </Modal>
      )}

      {modal?.jenis === "hapus" && (
        <DialogHapus
          produk={modal.produk}
          onKonfirmasi={hapusProduk}
          onBatal={tutupModal}
        />
      )}
    </>
  );
}

export default HalamanProduk;
