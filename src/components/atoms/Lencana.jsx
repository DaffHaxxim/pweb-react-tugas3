// Atom: label kecil berbentuk pil (dipakai untuk kategori produk).
function Lencana({ children }) {
  return (
    <span className="inline-block self-start rounded-full bg-kuning-muda px-2.5 py-0.5 text-[0.72rem] font-bold text-cokelat-tua">
      {children}
    </span>
  );
}

export default Lencana;
