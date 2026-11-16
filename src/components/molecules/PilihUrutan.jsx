import { PILIHAN_URUTAN } from "../../utils/urut.js";

// Molecule: pilihan urutan daftar produk.
function PilihUrutan({ nilai, onUbah }) {
  return (
    <label className="inline-flex items-center gap-2 max-[560px]:w-full">
      <span className="text-[0.85rem] font-semibold text-redup">Urutkan</span>
      <select
        name="urutan"
        className="cursor-pointer rounded-lg border-[1.5px] border-garis bg-white px-3 py-2 text-teks focus:border-kuning focus:ring-3 focus:ring-kuning-muda focus:outline-none max-[560px]:flex-1"
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
