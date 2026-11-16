import { Outlet } from "react-router";
import Navbar from "../components/molecules/Navbar.jsx";

// Template: kerangka halaman yang dipakai semua rute. Navbar tetap terpasang saat berpindah halaman;
// hanya isi <Outlet /> yang diganti oleh halaman sesuai alamat URL.
function AppLayout({ simpanGagal }) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-[1120px] px-5 pt-7 pb-16 max-[560px]:px-3.5 max-[560px]:pt-5 max-[560px]:pb-14">
        {simpanGagal && (
          <p role="alert" className="mb-4 rounded-lg border border-[#f4b8b2] bg-bahaya-muda px-3.5 py-2.5 text-[0.9rem] font-semibold text-bahaya">
            Perubahan belum tersimpan permanen karena penyimpanan browser penuh atau tidak tersedia.
          </p>
        )}
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
