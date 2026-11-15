import { PILIHAN_URUTAN } from "../../utils/urut.js";
import "./PilihUrutan.css";

// Molecule: pilihan urutan daftar produk.
function PilihUrutan({ nilai, onUbah }) {
  return (
    <label className="pilih-urutan">
      <span className="pilih-urutan__label">Urutkan</span>
      <select
        name="urutan"
        className="pilih-urutan__select"
        value={nilai}
        onChange={(e) => onUbah(e.target.value)}
      >
        {PILIHAN_URUTAN.map((p) => (
          <option key={p.nilai} value={p.nilai}>
            {p.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export default PilihUrutan;
