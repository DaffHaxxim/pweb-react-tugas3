import KartuProduk from "./KartuProduk.jsx";
import "./GridProduk.css";

function GridProduk({ daftar, onEdit, onHapus }) {
  return (
    <section className="grid-produk">
      {daftar.map((produk) => (
        <KartuProduk
          key={produk.id}
          produk={produk}
          onEdit={onEdit}
          onHapus={onHapus}
        />
      ))}
    </section>
  );
}

export default GridProduk;
