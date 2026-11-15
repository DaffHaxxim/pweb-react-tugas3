import Modal from "./Modal.jsx";
import Tombol from "../atoms/Tombol.jsx";
import { formatHarga } from "../../utils/format.js";
import "./DialogHapus.css";

// Organism: konfirmasi sebelum menghapus. Menampilkan produk yang akan dihapus.
function DialogHapus({ produk, onKonfirmasi, onBatal }) {
  return (
    <Modal
      judul="Hapus Produk?"
      deskripsi="Produk yang dihapus tidak dapat dikembalikan."
      onTutup={onBatal}
    >
      <div className="dialog-hapus__produk">
        <p className="dialog-hapus__id">ID: {produk.id}</p>
        <p className="dialog-hapus__nama">{produk.nama}</p>
        <p className="dialog-hapus__harga">{formatHarga(produk.harga)}</p>
      </div>
      <div className="modal__aksi">
        <Tombol varian="garis" onClick={onBatal}>
          Batal
        </Tombol>
        <Tombol varian="bahaya" onClick={onKonfirmasi}>
          Hapus Produk
        </Tombol>
      </div>
    </Modal>
  );
}

export default DialogHapus;
