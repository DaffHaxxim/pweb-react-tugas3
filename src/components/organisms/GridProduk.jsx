import KartuProduk from "./KartuProduk.jsx";

// `mode` memilih susunan: "grid" (kolom responsif) atau "list" (satu kolom memanjang).
const SUSUNAN = {
  grid: "my-4 grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4 max-[560px]:grid-cols-2 max-[560px]:gap-2.5",
  list: "my-4 flex flex-col gap-3",
};

function GridProduk({ daftar, mode = "grid", onEdit, onHapus }) {
  return (
    <section className={SUSUNAN[mode]}>
      {daftar.map((produk) => (
        <KartuProduk
          key={produk.id}
          produk={produk}
          mode={mode}
          onEdit={onEdit}
          onHapus={onHapus}
        />
      ))}
    </section>
  );
}

export default GridProduk;
