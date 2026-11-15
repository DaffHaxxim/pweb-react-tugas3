import { produkAwal } from "./data/produk.js";
import KartuProduk from "./components/organisms/KartuProduk.jsx";

function App() {
  return (
    <>
      <h1>Manajemen Produk</h1>
      <KartuProduk
        produk={produkAwal[0]}
        onEdit={(p) => alert(`Edit: ${p.nama}`)}
        onHapus={(p) => alert(`Hapus: ${p.nama}`)}
      />
    </>
  );
}

export default App;
