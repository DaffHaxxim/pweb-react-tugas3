// Page untuk rute /settings: memilih tampilan daftar produk. Pilihannya dipegang App (state bersama)
// sehingga langsung berlaku di halaman Produk.
const PILIHAN = [
  { nilai: "grid", judul: "Tampilan Grid", keterangan: "Kartu responsif, 1 sampai 3 kolom." },
  { nilai: "list", judul: "Tampilan List", keterangan: "Daftar memanjang, satu produk per baris." },
];

const OPSI = "cursor-pointer rounded-xl border-[1.5px] p-4 text-left transition focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-kuning";
const OPSI_AKTIF = "border-oranye bg-kuning-muda";
const OPSI_BIASA = "border-garis bg-white hover:bg-permukaan";

function HalamanPengaturan({ modeTampilan, onUbahMode }) {
  return (
    <section className="mx-auto max-w-2xl rounded-xl border border-garis bg-permukaan p-6 shadow-kartu">
      <h1 className="text-2xl font-bold text-cokelat">Pengaturan</h1>
      <p className="mt-1 text-redup">Pilih tampilan daftar produk pada halaman Produk. Pilihan tersimpan di peramban.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2" role="group" aria-label="Tampilan daftar produk">
        {PILIHAN.map((p) => (
          <button
            key={p.nilai}
            type="button"
            aria-pressed={modeTampilan === p.nilai}
            className={`${OPSI} ${modeTampilan === p.nilai ? OPSI_AKTIF : OPSI_BIASA}`}
            onClick={() => onUbahMode(p.nilai)}
          >
            <span className="block font-bold text-hitam">{p.judul}</span>
            <span className="mt-1 block text-sm text-redup">{p.keterangan}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

export default HalamanPengaturan;
