import Tombol from "../atoms/Tombol.jsx";

function HeaderHalaman({ onTambah }) {
  return (
    <header className="mb-5 flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-[clamp(1.6rem,3vw,2.1rem)] leading-tight font-bold text-cokelat">Daftar Produk</h1>
        <p className="mt-1.5 text-redup">
          Kelola daftar produk dan harga dalam satu tempat.
        </p>
      </div>
      <Tombol className="max-[560px]:w-full" onClick={onTambah}>+ Tambah Produk</Tombol>
    </header>
  );
}

export default HeaderHalaman;
