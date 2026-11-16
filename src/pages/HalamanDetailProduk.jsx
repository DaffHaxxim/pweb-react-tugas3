import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { formatHarga } from "../utils/format.js";
import Tombol, { gayaTombol } from "../components/atoms/Tombol.jsx";
import Lencana from "../components/atoms/Lencana.jsx";
import GambarProduk from "../components/atoms/GambarProduk.jsx";
import Modal from "../components/organisms/Modal.jsx";
import FormProduk from "../components/organisms/FormProduk.jsx";
import DialogHapus from "../components/organisms/DialogHapus.jsx";

// Page untuk rute /products/:id. Parameter dari URL selalu berupa teks ("2"), sedangkan id produk
// berupa angka (2), maka dibandingkan sebagai teks: String(p.id) === id.
function HalamanDetailProduk({ daftarProduk, onUbah, onHapus }) {
  const { id } = useParams();
  const navigate = useNavigate();
  // Pop-up yang terbuka: null, "edit", atau "hapus". Hook dipanggil sebelum return dini di bawah.
  const [modal, setModal] = useState(null);
  const produk = daftarProduk.find((p) => String(p.id) === id);

  // Rute valid tetapi produknya tidak ada (mis. /products/999, atau produk sudah dihapus).
  if (!produk) {
    return (
      <section className="mx-auto max-w-xl rounded-xl border border-garis bg-permukaan p-6 text-center shadow-kartu">
        <h1 className="text-xl font-bold text-hitam">Produk tidak ditemukan</h1>
        <p className="mt-2 text-redup">Produk dengan ID &quot;{id}&quot; tidak tersedia atau telah dihapus.</p>
        <Link to="/products" className={gayaTombol("isi", "mt-5")}>
          Kembali ke daftar produk
        </Link>
      </section>
    );
  }

  const nilaiPersediaan = produk.harga * produk.stok;
  const tutupModal = () => setModal(null);

  function ubahProduk(data) {
    onUbah(produk.id, data);
    tutupModal();
  }

  // Setelah dihapus, halaman ini tidak punya produk lagi, jadi pengguna dikembalikan ke daftar.
  function hapusProduk() {
    onHapus(produk.id);
    navigate("/products");
  }

  return (
    <>
      <section>
        <Link to="/products" className="text-sm font-semibold text-cokelat hover:underline">
          &larr; Kembali ke daftar produk
        </Link>

        <div className="mt-4 grid gap-6 rounded-xl border border-garis bg-permukaan p-5 shadow-kartu md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          <GambarProduk src={produk.gambar} alt={produk.nama} />

          <div className="flex flex-col gap-3">
            <div className="flex items-start justify-between gap-3">
              <Lencana>{produk.kategori}</Lencana>
              <span className="text-sm font-bold text-redup">ID: {produk.id}</span>
            </div>
            <h1 className="text-[clamp(1.5rem,3vw,2rem)] leading-tight font-bold text-cokelat">{produk.nama}</h1>

            <dl className="grid grid-cols-2 gap-4 border-t border-garis pt-4">
              <div>
                <dt className="text-xs tracking-wide text-redup uppercase">Harga</dt>
                <dd className="mt-1 text-xl font-extrabold text-oranye">{formatHarga(produk.harga)}</dd>
              </div>
              <div>
                <dt className="text-xs tracking-wide text-redup uppercase">Stok tersedia</dt>
                <dd className={`mt-1 text-xl font-bold ${produk.stok > 0 ? "text-hitam" : "text-bahaya"}`}>
                  {produk.stok > 0 ? `${produk.stok} unit` : "Habis"}
                </dd>
              </div>
              <div className="col-span-2">
                <dt className="text-xs tracking-wide text-redup uppercase">Nilai persediaan</dt>
                <dd className="mt-1 text-lg font-bold text-hitam">{formatHarga(nilaiPersediaan)}</dd>
              </div>
            </dl>

            <div className="mt-2 flex flex-wrap gap-2 border-t border-garis pt-4">
              <Tombol varian="garis" onClick={() => setModal("edit")}>
                Edit
              </Tombol>
              <Tombol varian="bahaya-garis" onClick={() => setModal("hapus")}>
                Hapus
              </Tombol>
            </div>
          </div>
        </div>
      </section>

      {modal === "edit" && (
        <Modal judul="Edit Produk" deskripsi="Perbarui informasi produk yang dipilih." onTutup={tutupModal}>
          <FormProduk awal={produk} labelSimpan="Simpan Perubahan" onSimpan={ubahProduk} onBatal={tutupModal} />
        </Modal>
      )}

      {modal === "hapus" && <DialogHapus produk={produk} onKonfirmasi={hapusProduk} onBatal={tutupModal} />}
    </>
  );
}

export default HalamanDetailProduk;
