import KartuProduk from "./KartuProduk.jsx";

function GridProduk({ daftar, onEdit, onHapus }) {
  return (
    <section className="my-4 grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4 max-[560px]:grid-cols-2 max-[560px]:gap-2.5">
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
