import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router";
import { produkAwal } from "./data/produk.js";
import { muatProduk, simpanProduk } from "./utils/penyimpanan.js";
import AppLayout from "./layouts/AppLayout.jsx";
import HalamanProduk from "./pages/HalamanProduk.jsx";
import HalamanTidakDitemukan from "./pages/HalamanTidakDitemukan.jsx";
import Toast from "./components/organisms/Toast.jsx";

// State yang dipakai lebih dari satu halaman dipegang di sini, di atas <Routes>, supaya data tidak
// hilang saat pengguna berpindah halaman. Halaman menerimanya lewat props.
function App() {
  // Fungsi awal dijalankan sekali: data dibaca dari localStorage, atau memakai data awal.
  const [daftarProduk, setDaftarProduk] = useState(() => muatProduk(produkAwal));
  const [simpanGagal, setSimpanGagal] = useState(false);
  // Pemberitahuan singkat: null atau { pesan, id }. Objek baru setiap kali memulai timer baru.
  const [toast, setToast] = useState(null);

  const tampilkanToast = (pesan) => setToast({ pesan, id: Date.now() });

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
    setDaftarProduk((sebelumnya) => [...sebelumnya, { id: idBaru, ...data }]);
    tampilkanToast(`"${data.nama}" ditambahkan`);
  }

  function ubahProduk(id, data) {
    setDaftarProduk((sebelumnya) => sebelumnya.map((p) => (p.id === id ? { ...p, ...data } : p)));
    tampilkanToast(`"${data.nama}" diperbarui`);
  }

  function hapusProduk(id) {
    const produk = daftarProduk.find((p) => p.id === id);
    setDaftarProduk((sebelumnya) => sebelumnya.filter((p) => p.id !== id));
    if (produk) tampilkanToast(`"${produk.nama}" dihapus`);
  }

  function resetData() {
    setDaftarProduk(produkAwal);
    tampilkanToast("Data dikembalikan ke data awal");
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<AppLayout simpanGagal={simpanGagal} />}>
          <Route index element={<Navigate to="/products" replace />} />
          <Route
            path="products"
            element={
              <HalamanProduk
                daftarProduk={daftarProduk}
                onTambah={tambahProduk}
                onUbah={ubahProduk}
                onHapus={hapusProduk}
                onReset={resetData}
              />
            }
          />
          <Route path="*" element={<HalamanTidakDitemukan />} />
        </Route>
      </Routes>
      {toast && <Toast pesan={toast.pesan} />}
    </>
  );
}

export default App;
