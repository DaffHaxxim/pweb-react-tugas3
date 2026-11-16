import { Link } from "react-router";
import Tombol, { gayaTombol } from "../atoms/Tombol.jsx";
import Lencana from "../atoms/Lencana.jsx";
import GambarProduk from "../atoms/GambarProduk.jsx";
import { formatHarga } from "../../utils/format.js";

// Dua susunan kartu: "grid" (vertikal, gambar di atas) dan "list" (satu baris: gambar, data, tombol).
// Kelas ditulis utuh per susunan supaya terbaca oleh Tailwind.
const KARTU = {
  grid: "flex flex-col gap-1.5 p-4 max-[560px]:gap-1 max-[560px]:p-2.5",
  list: "flex items-center gap-4 p-3 max-[640px]:flex-col max-[640px]:items-stretch max-[640px]:gap-2",
};
const GAMBAR = { grid: "", list: "w-32 flex-none max-[640px]:w-full max-[640px]:max-w-[220px]" };
const ISI = { grid: "contents", list: "flex min-w-0 flex-1 flex-col gap-1" };
const AKSI = {
  grid: "mt-auto flex gap-2 max-[560px]:flex-col",
  list: "flex flex-none gap-2 max-[640px]:flex-col",
};

function KartuProduk({ produk, mode = "grid", onEdit, onHapus }) {
  const tautan = `/products/${produk.id}`;
  return (
    <article className={`rounded-xl border border-garis bg-permukaan shadow-kartu ${KARTU[mode]}`}>
      <div className={GAMBAR[mode]}>
        <GambarProduk src={produk.gambar} alt={produk.nama} />
      </div>
      <div className={ISI[mode]}>
        <p className="text-xs font-bold tracking-wide text-redup">ID: {produk.id}</p>
        <Lencana>{produk.kategori}</Lencana>
        <h3 className="text-[1.1rem] leading-tight font-bold text-hitam max-[560px]:text-[0.95rem]">
          <Link to={tautan} className="hover:underline">
            {produk.nama}
          </Link>
        </h3>
        <p className="text-[1.05rem] font-extrabold text-oranye max-[560px]:text-[0.95rem]">{formatHarga(produk.harga)}</p>
        <p className={`mb-2 text-xs max-[560px]:mb-1.5 ${produk.stok > 0 ? "text-redup" : "font-semibold text-bahaya"}`}>
          {produk.stok > 0 ? `Stok: ${produk.stok} unit` : "Stok habis"}
        </p>
      </div>
      <div className={AKSI[mode]}>
        <Link to={tautan} className={gayaTombol("garis", "flex-1")}>
          Detail
        </Link>
        <Tombol varian="garis" className="flex-1" onClick={() => onEdit(produk)}>
          Edit
        </Tombol>
        <Tombol varian="bahaya-garis" className="flex-1" onClick={() => onHapus(produk)}>
          Hapus
        </Tombol>
      </div>
    </article>
  );
}

export default KartuProduk;
