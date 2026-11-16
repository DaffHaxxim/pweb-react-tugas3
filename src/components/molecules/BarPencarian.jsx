import KotakCari from "./KotakCari.jsx";
import PilihUrutan from "./PilihUrutan.jsx";

// Molecule: kolom pencarian dan pilihan urutan di kiri, jumlah seluruh produk di kanan.
function BarPencarian({ kataKunci, onUbah, urutan, onUrut, total }) {
  return (
    <div className="mb-1 flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-auto flex-wrap items-center gap-3.5 max-[560px]:w-full">
        <KotakCari nilai={kataKunci} onUbah={onUbah} />
        <PilihUrutan nilai={urutan} onUbah={onUrut} />
      </div>
      <span className="text-sm text-redup">{total} produk</span>
    </div>
  );
}

export default BarPencarian;
