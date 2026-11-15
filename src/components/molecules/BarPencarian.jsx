import KotakCari from "./KotakCari.jsx";
import PilihUrutan from "./PilihUrutan.jsx";
import "./BarPencarian.css";

// Molecule: kolom pencarian dan pilihan urutan di kiri, jumlah seluruh produk di kanan.
function BarPencarian({ kataKunci, onUbah, urutan, onUrut, total }) {
  return (
    <div className="bar-pencarian">
      <div className="bar-pencarian__kiri">
        <KotakCari nilai={kataKunci} onUbah={onUbah} />
        <PilihUrutan nilai={urutan} onUbah={onUrut} />
      </div>
      <span className="bar-pencarian__jumlah">{total} produk</span>
    </div>
  );
}

export default BarPencarian;
