import { useEffect, useState } from "react";
import { produkAwal } from "../data/produk.js";
import { muatProduk, simpanProduk } from "../utils/penyimpanan.js";
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
import Toast from "../components/organisms/Toast.jsx";
import Tombol from "../components/atoms/Tombol.jsx";

// Page: template + konten nyata. State halaman dipegang di sini lalu dibagikan lewat props.
function HalamanProduk() {
  // Fungsi awal dijalankan sekali: data dibaca dari localStorage, atau memakai data awal.
  const [daftarProduk, setDaftarProduk] = useState(() => muatProduk(produkAwal));
  const [kataKunci, setKataKunci] = useState("");
  const [kategoriAktif, setKategoriAktif] = useState(SEMUA_KATEGORI);
  const [urutan, setUrutan] = useState("id");
  const [simpanGagal, setSimpanGagal] = useState(false);
  // Pemberitahuan singkat: null atau { pesan, id }. `id` baru memicu timer baru walau pesannya sama.
  const [toast, setToast] = useState(null);
  // Pop-up yang terbuka: null, atau { jenis: "tambah" | "edit" | "hapus", produk? }.
  const [modal, setModal] = useState(null);

  const tampil = urutkanProduk(
    saringProduk(daftarProduk, kataKunci, kategoriAktif),
    urutan
  );
  const tutupModal = () => setModal(null);
  const tampilkanToast = (pesan) => setToast({ pesan, id: Date.now() });
  const adaSaringan = kataKunci.trim() !== "" || kategoriAktif !== SEMUA_KATEGORI;

  // Setiap daftar berubah, simpan ke localStorage.
  useEffect(() => {
    setSimpanGagal(!simpanProduk(daftarProduk));
  }, [daftarProduk]);

  // Pemberitahuan hilang sendiri setelah 3 detik; timer lama dibersihkan bila ada pesan baru.
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  function tambahProduk(data) {
    const idBaru = daftarProduk.reduce((maks, p) => Math.max(maks, p.id), 0) + 1;
    setDaftarProduk([...daftarProduk, { id: idBaru, ...data }]);
    tutupModal();
    tampilkanToast(`"${data.nama}" ditambahkan`);
  }

  function ubahProduk(data) {
    setDaftarProduk(
      daftarProduk.map((p) => (p.id === modal.produk.id ? { ...p, ...data } : p))
    );
    tutupModal();
    tampilkanToast(`"${data.nama}" diperbarui`);
  }

  function hapusProduk() {
    setDaftarProduk(daftarProduk.filter((p) => p.id !== modal.produk.id));
    tutupModal();
    tampilkanToast(`"${modal.produk.nama}" dihapus`);
  }

  function hapusSaringan() {
    setKataKunci("");
    setKategoriAktif(SEMUA_KATEGORI);
  }

  function resetData() {
    setDaftarProduk(produkAwal);
    hapusSaringan();
    setUrutan("id");
    tutupModal();
    tampilkanToast("Data dikembalikan ke data awal");
  }

  return (
    <>
      <section>
        {simpanGagal && (
          <p role="alert" className="mb-4 rounded-lg border border-[#f4b8b2] bg-bahaya-muda px-3.5 py-2.5 text-[0.9rem] font-semibold text-bahaya">
            Perubahan belum tersimpan permanen karena penyimpanan browser penuh atau tidak tersedia.
          </p>
        )}
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

      {/* Pop-up dan toast adalah lapisan melayang (position: fixed), jadi diletakkan di luar
          <main>. Fragment <>...</> memungkinkan beberapa elemen sejajar tanpa elemen pembungkus. */}
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

      {toast && <Toast pesan={toast.pesan} />}
    </>
  );
}

export default HalamanProduk;
