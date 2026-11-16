import Modal, { AksiModal } from "./Modal.jsx";
import Tombol from "../atoms/Tombol.jsx";
import { formatHarga } from "../../utils/format.js";

// Organism: konfirmasi sebelum menghapus. Menampilkan produk yang akan dihapus.
function DialogHapus({ produk, onKonfirmasi, onBatal }) {
  return (
    <Modal
      judul="Hapus Produk?"
      deskripsi="Produk yang dihapus tidak dapat dikembalikan."
      onTutup={onBatal}
    >
      <div className="rounded-xl border border-[#f4b8b2] bg-bahaya-muda px-3.5 py-3">
        <p className="text-xs font-bold text-redup">ID: {produk.id}</p>
        <p className="font-bold">{produk.nama}</p>
        <p className="font-extrabold text-bahaya">{formatHarga(produk.harga)}</p>
      </div>
      <AksiModal>
        <Tombol varian="garis" onClick={onBatal}>
          Batal
        </Tombol>
        <Tombol varian="bahaya" onClick={onKonfirmasi}>
          Hapus Produk
        </Tombol>
      </AksiModal>
    </Modal>
  );
}

export default DialogHapus;
