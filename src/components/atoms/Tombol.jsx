import "./Tombol.css";

// Atom: tombol dasar. `varian` menentukan tampilan, sisa props (onClick, disabled, dst.)
// diteruskan apa adanya ke elemen <button>.
function Tombol({ varian = "isi", type = "button", children, ...sisa }) {
  return (
    <button type={type} className={`tombol tombol--${varian}`} {...sisa}>
      {children}
    </button>
  );
}

export default Tombol;
