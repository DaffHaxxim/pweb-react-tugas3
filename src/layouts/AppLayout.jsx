import { Outlet } from "react-router";
import Navbar from "../components/molecules/Navbar.jsx";

// Template: kerangka halaman yang dipakai semua rute. Navbar tetap terpasang saat berpindah halaman;
// hanya isi <Outlet /> yang diganti oleh halaman sesuai alamat URL.
function AppLayout() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-[1120px] px-5 pt-7 pb-16 max-[560px]:px-3.5 max-[560px]:pt-5 max-[560px]:pb-14">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
