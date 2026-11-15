import Tombol from "../atoms/Tombol.jsx";
import "./HeaderHalaman.css";

function HeaderHalaman({ onTambah }) {
  return (
    <header className="header-halaman">
      <div>
        <h1>Manajemen Produk</h1>
        <p className="header-halaman__deskripsi">
          Kelola daftar produk dan harga dalam satu tempat.
        </p>
      </div>
      <Tombol onClick={onTambah}>+ Tambah Produk</Tombol>
    </header>
  );
}

export default HeaderHalaman;
