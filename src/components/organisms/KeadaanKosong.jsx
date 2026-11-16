import Tombol from "../atoms/Tombol.jsx";

// Organism: tampilan saat tidak ada produk yang cocok (hasil saringan kosong) atau katalog kosong.
function KeadaanKosong({ adaSaringan, onHapusSaringan, onTambah }) {
  return (
    <div className="my-4 flex flex-col items-center gap-2 rounded-xl border-[1.5px] border-dashed border-garis bg-permukaan px-4 py-10 text-center" role="status">
      <p className="text-[1.1rem] font-extrabold text-cokelat">
        {adaSaringan ? "Produk tidak ditemukan" : "Belum ada produk"}
      </p>
      <p className="mb-2 text-redup">
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
