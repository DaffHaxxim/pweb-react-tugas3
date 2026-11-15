import KotakCari from "./KotakCari.jsx";
import "./BarPencarian.css";

// Molecule: kolom pencarian di kiri, jumlah seluruh produk di kanan.
function BarPencarian({ kataKunci, onUbah, total }) {
  return (
    <div className="bar-pencarian">
      <KotakCari nilai={kataKunci} onUbah={onUbah} />
      <span className="bar-pencarian__jumlah">{total} produk</span>
    </div>
  );
}

export default BarPencarian;
