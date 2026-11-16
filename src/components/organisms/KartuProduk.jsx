import Tombol from "../atoms/Tombol.jsx";
import Lencana from "../atoms/Lencana.jsx";
import GambarProduk from "../atoms/GambarProduk.jsx";
import { formatHarga } from "../../utils/format.js";

function KartuProduk({ produk, onEdit, onHapus }) {
  return (
    <article className="flex flex-col gap-1.5 rounded-xl border border-garis bg-permukaan p-4 shadow-kartu max-[560px]:gap-1 max-[560px]:p-2.5">
      <GambarProduk src={produk.gambar} alt={produk.nama} />
      <p className="text-xs font-bold tracking-wide text-redup">ID: {produk.id}</p>
      <Lencana>{produk.kategori}</Lencana>
      <h3 className="text-[1.1rem] leading-tight font-bold text-hitam max-[560px]:text-[0.95rem]">{produk.nama}</h3>
      <p className="mb-2 text-[1.05rem] font-extrabold text-oranye max-[560px]:mb-1.5 max-[560px]:text-[0.95rem]">{formatHarga(produk.harga)}</p>
      <div className="mt-auto flex gap-2 max-[560px]:flex-col">
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
