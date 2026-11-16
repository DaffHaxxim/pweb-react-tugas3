import { KATEGORI, SEMUA_KATEGORI } from "../../data/kategori.js";
const CHIP =
  "cursor-pointer rounded-full border-[1.5px] px-3.5 py-1.5 text-[0.85rem] font-semibold transition focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-kuning max-[640px]:flex-none max-[640px]:whitespace-nowrap";
const CHIP_BIASA = "border-garis bg-white text-cokelat hover:border-kuning hover:bg-kuning-muda";
const CHIP_AKTIF = "border-hitam bg-hitam text-white hover:border-cokelat-tua hover:bg-cokelat-tua";

// Molecule: deretan tombol filter kategori. Tombol aktif ditandai aria-pressed dan gaya khusus.
function FilterKategori({ aktif, onPilih }) {
  const pilihan = [SEMUA_KATEGORI, ...KATEGORI];
  return (
    <div className="mt-3 mb-1 flex flex-wrap gap-2 max-[640px]:flex-nowrap max-[640px]:overflow-x-auto max-[640px]:pb-1.5" role="group" aria-label="Filter kategori">
      {pilihan.map((nama) => (
        <button
          key={nama}
          type="button"
          className={`${CHIP} ${nama === aktif ? CHIP_AKTIF : CHIP_BIASA}`}
          aria-pressed={nama === aktif}
          onClick={() => onPilih(nama)}
        >
          {nama}
        </button>
      ))}
    </div>
  );
}

export default FilterKategori;
