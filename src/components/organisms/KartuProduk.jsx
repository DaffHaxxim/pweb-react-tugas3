import Tombol from "../atoms/Tombol.jsx";
import { formatHarga } from "../../utils/format.js";
import "./KartuProduk.css";

function KartuProduk({ produk, onEdit, onHapus }) {
  return (
    <article className="kartu">
      <p className="kartu__id">ID: {produk.id}</p>
      <h3 className="kartu__nama">{produk.nama}</h3>
      <p className="kartu__harga">{formatHarga(produk.harga)}</p>
      <div className="kartu__aksi">
        <Tombol varian="garis" onClick={() => onEdit(produk)}>
          Edit
        </Tombol>
        <Tombol varian="bahaya-garis" onClick={() => onHapus(produk)}>
          Hapus
        </Tombol>
      </div>
    </article>
  );
}

export default KartuProduk;
