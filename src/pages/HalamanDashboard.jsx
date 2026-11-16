import { Link } from "react-router";
import { hitungRingkasan, BATAS_STOK_MENIPIS } from "../utils/ringkasan.js";
import { formatHarga } from "../utils/format.js";
import { gayaTombol } from "../components/atoms/Tombol.jsx";

const KARTU = "rounded-xl border border-garis bg-permukaan p-5 shadow-kartu";

// Page untuk rute /: ringkasan yang dihitung dari state produk bersama (daftarProduk dari App),
// sehingga angkanya langsung ikut berubah saat produk ditambah, diubah, atau dihapus di halaman Produk.
function HalamanDashboard({ daftarProduk }) {
  const { totalProduk, totalStok, totalNilai, perKategori, stokMenipis } = hitungRingkasan(daftarProduk);

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-[clamp(1.6rem,3vw,2.1rem)] leading-tight font-bold text-cokelat">Dashboard</h1>
          <p className="mt-1.5 text-redup">Ringkasan persediaan dari seluruh produk.</p>
        </div>
        <Link to="/products" className={gayaTombol("isi")}>
          Kelola Produk
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className={KARTU}>
          <p className="text-sm text-redup">Total jenis produk</p>
          <p className="mt-2 text-3xl font-extrabold text-oranye">{totalProduk}</p>
        </div>
        <div className={KARTU}>
          <p className="text-sm text-redup">Total unit stok</p>
          <p className="mt-2 text-3xl font-extrabold text-hitam">{totalStok.toLocaleString("id-ID")}</p>
        </div>
        <div className={KARTU}>
          <p className="text-sm text-redup">Total nilai inventaris</p>
          <p className="mt-2 text-2xl font-extrabold text-berhasil">{formatHarga(totalNilai)}</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className={KARTU}>
          <h2 className="text-lg font-bold text-hitam">Produk per kategori</h2>
          <ul className="mt-3 divide-y divide-garis">
            {perKategori.map((k) => (
              <li key={k.kategori} className="flex items-center justify-between gap-3 py-2 text-sm">
                <span className="font-semibold text-cokelat">{k.kategori}</span>
                <span className="text-redup">
                  {k.jumlah} produk, {k.stok.toLocaleString("id-ID")} unit
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className={KARTU}>
          <h2 className="text-lg font-bold text-hitam">Stok menipis</h2>
          <p className="text-sm text-redup">Produk dengan stok {BATAS_STOK_MENIPIS} unit atau kurang.</p>
          {stokMenipis.length === 0 ? (
            <p className="mt-3 text-sm text-redup">Tidak ada produk dengan stok menipis.</p>
          ) : (
            <ul className="mt-3 divide-y divide-garis">
              {stokMenipis.map((p) => (
                <li key={p.id} className="flex items-center justify-between gap-3 py-2 text-sm">
                  <Link to={`/products/${p.id}`} className="font-semibold text-cokelat hover:underline">
                    {p.nama}
                  </Link>
                  <span className={p.stok === 0 ? "font-bold text-bahaya" : "text-redup"}>
                    {p.stok === 0 ? "Habis" : `${p.stok} unit`}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

export default HalamanDashboard;
