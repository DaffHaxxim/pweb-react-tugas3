import { KATEGORI, SEMUA_KATEGORI } from "../../data/kategori.js";
import "./FilterKategori.css";

// Molecule: deretan tombol filter kategori. Tombol aktif ditandai aria-pressed dan gaya khusus.
function FilterKategori({ aktif, onPilih }) {
  const pilihan = [SEMUA_KATEGORI, ...KATEGORI];
  return (
    <div className="filter-kategori" role="group" aria-label="Filter kategori">
      {pilihan.map((nama) => (
        <button
          key={nama}
          type="button"
          className={nama === aktif ? "filter-kategori__chip filter-kategori__chip--aktif" : "filter-kategori__chip"}
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
