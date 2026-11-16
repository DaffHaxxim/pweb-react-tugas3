import { Link, useLocation } from "react-router";
import { gayaTombol } from "../components/atoms/Tombol.jsx";

// Page: dipakai oleh rute "*" untuk alamat yang tidak cocok dengan rute mana pun.
// Berbeda dari /products/999 (rute valid, produk tidak ada), yang ditangani HalamanDetailProduk.
function HalamanTidakDitemukan() {
  const { pathname } = useLocation();
  return (
    <section className="mx-auto max-w-xl py-14 text-center">
      <p className="text-6xl font-extrabold text-kuning" aria-hidden="true">
        404
      </p>
      <h1 className="mt-2 text-2xl font-bold text-hitam">404: Halaman tidak ditemukan</h1>
      <p className="mt-2 text-redup">
        Alamat <code className="rounded bg-kuning-muda px-1.5 py-0.5 text-cokelat-tua">{pathname}</code> tidak tersedia di aplikasi ini.
      </p>
      <Link to="/products" className={gayaTombol("isi", "mt-6")}>
        Kembali ke produk
      </Link>
    </section>
  );
}

export default HalamanTidakDitemukan;
