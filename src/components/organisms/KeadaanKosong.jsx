import Tombol from "../atoms/Tombol.jsx";
import "./KeadaanKosong.css";

// Organism: tampilan saat tidak ada produk yang cocok (hasil saringan kosong) atau katalog kosong.
function KeadaanKosong({ adaSaringan, onHapusSaringan, onTambah }) {
  return (
    <div className="kosong" role="status">
      <p className="kosong__judul">
        {adaSaringan ? "Produk tidak ditemukan" : "Belum ada produk"}
      </p>
      <p className="kosong__teks">
        {adaSaringan
          ? "Coba kata kunci atau kategori lain."
          : "Tambahkan produk pertama Anda."}
      </p>
      {adaSaringan ? (
        <Tombol varian="garis" onClick={onHapusSaringan}>
          Hapus Pencarian dan Filter
        </Tombol>
      ) : (
        <Tombol onClick={onTambah}>+ Tambah Produk</Tombol>
      )}
    </div>
  );
}

export default KeadaanKosong;
