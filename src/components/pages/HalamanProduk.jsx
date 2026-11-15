import { produkAwal } from "../../data/produk.js";
import TataLetak from "../templates/TataLetak.jsx";
import HeaderHalaman from "../organisms/HeaderHalaman.jsx";
import GridProduk from "../organisms/GridProduk.jsx";

// Page: template + konten nyata. Langkah-langkah berikutnya menaruh state di sini.
function HalamanProduk() {
  return (
    <TataLetak>
      <HeaderHalaman onTambah={() => alert("Tambah produk")} />
      <GridProduk
        daftar={produkAwal}
        onEdit={(p) => alert(`Edit: ${p.nama}`)}
        onHapus={(p) => alert(`Hapus: ${p.nama}`)}
      />
    </TataLetak>
  );
}

export default HalamanProduk;
