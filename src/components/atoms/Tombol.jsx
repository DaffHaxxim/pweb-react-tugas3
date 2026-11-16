// Atom: tombol dasar. `varian` menentukan tampilan, sisa props (onClick, disabled, dst.)
// diteruskan apa adanya ke elemen <button>.
// Seluruh kelas ditulis utuh (bukan disusun dari potongan) agar Tailwind dapat menemukannya.
const DASAR =
  "inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-lg border-[1.5px] px-3.5 py-2 text-sm font-semibold transition " +
  "active:translate-y-px focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-kuning " +
  "disabled:cursor-not-allowed disabled:opacity-55 pointer-coarse:min-h-11";

const VARIAN = {
  isi: "border-transparent bg-oranye text-white enabled:hover:bg-oranye-tua",
  garis: "border-cokelat bg-white text-cokelat enabled:hover:bg-kuning-muda",
  bahaya: "border-transparent bg-bahaya text-white enabled:hover:bg-bahaya-tua",
  "bahaya-garis": "border-bahaya bg-white text-bahaya enabled:hover:bg-bahaya-muda",
  hantu: "border-transparent bg-transparent text-redup enabled:hover:bg-kuning-muda enabled:hover:text-hitam",
};

// Gaya tombol dapat dipakai ulang oleh <Link> agar tautan berpenampilan tombol.
export const gayaTombol = (varian = "isi", tambahan = "") => `${DASAR} ${VARIAN[varian]} ${tambahan}`;

function Tombol({ varian = "isi", type = "button", className = "", children, ...sisa }) {
  return (
    <button type={type} className={gayaTombol(varian, className)} {...sisa}>
      {children}
    </button>
  );
}

export default Tombol;
