import { Link, NavLink } from "react-router";

const TAUTAN = "rounded-lg px-3 py-1.5 text-sm transition focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-kuning";
const AKTIF = "bg-kuning-muda font-bold text-cokelat-tua";
const BIASA = "font-medium text-redup hover:bg-kuning-muda hover:text-hitam";

// Molecule: bilah navigasi. NavLink memberi tahu apakah tautannya sedang aktif (isActive).
// `end` pada "/" membuat Dashboard hanya aktif saat alamatnya persis "/", bukan di "/products".
const kelas = ({ isActive }) => `${TAUTAN} ${isActive ? AKTIF : BIASA}`;

function Navbar() {
  return (
    <header className="border-b border-garis bg-permukaan">
      <nav className="mx-auto flex max-w-[1120px] flex-wrap items-center justify-between gap-3 px-5 py-3 max-[560px]:px-3.5" aria-label="Navigasi utama">
        <Link to="/" className="text-lg font-extrabold text-cokelat">
          Manajemen Produk
        </Link>
        <div className="flex flex-wrap items-center gap-1.5">
          <NavLink to="/" end className={kelas}>
            Dashboard
          </NavLink>
          <NavLink to="/products" className={kelas}>
            Produk
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
