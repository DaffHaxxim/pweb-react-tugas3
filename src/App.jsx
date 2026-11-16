import { Navigate, Route, Routes } from "react-router";
import AppLayout from "./layouts/AppLayout.jsx";
import HalamanProduk from "./pages/HalamanProduk.jsx";
import HalamanTidakDitemukan from "./pages/HalamanTidakDitemukan.jsx";

// Tabel rute. Rute anak memakai path relatif ("products" menjadi "/products") dan tampil di <Outlet /> milik AppLayout.
function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Navigate to="/products" replace />} />
        <Route path="products" element={<HalamanProduk />} />
        <Route path="*" element={<HalamanTidakDitemukan />} />
      </Route>
    </Routes>
  );
}

export default App;
