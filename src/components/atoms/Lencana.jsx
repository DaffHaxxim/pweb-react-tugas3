import "./Lencana.css";

// Atom: label kecil berbentuk pil (dipakai untuk kategori produk).
function Lencana({ children }) {
  return <span className="lencana">{children}</span>;
}

export default Lencana;
