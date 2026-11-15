import { produkAwal } from "./data/produk.js";
import GridProduk from "./components/organisms/GridProduk.jsx";

function App() {
  return (
    <>
      <h1>Manajemen Produk</h1>
      <GridProduk
        daftar={produkAwal}
        onEdit={(p) => alert(`Edit: ${p.nama}`)}
        onHapus={(p) => alert(`Hapus: ${p.nama}`)}
      />
    </>
  );
}

export default App;
