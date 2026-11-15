import "./KotakCari.css";

// Molecule: kolom pencarian terkontrol (nilainya dipegang state di komponen induk).
function KotakCari({ nilai, onUbah }) {
  return (
    <label className="kotak-cari">
      <svg className="kotak-cari__ikon" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M15.5 15.5L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <input
        type="search"
        className="kotak-cari__input"
        placeholder="Cari nama produk..."
        aria-label="Cari nama produk"
        value={nilai}
        onChange={(e) => onUbah(e.target.value)}
      />
    </label>
  );
}

export default KotakCari;
