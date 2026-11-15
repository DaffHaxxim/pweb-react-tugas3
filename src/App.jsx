import { produkAwal } from "./data/produk.js";
import { formatHarga } from "./utils/format.js";

function App() {
  const contoh = produkAwal[0];

  return (
    <>
      <h1>Manajemen Produk</h1>
      <p>
        {contoh.nama}: {formatHarga(contoh.harga)}
      </p>
    </>
  );
}

export default App;
