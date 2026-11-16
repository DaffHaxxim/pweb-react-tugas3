// Molecule: kolom pencarian terkontrol (nilainya dipegang state di komponen induk).
function KotakCari({ nilai, onUbah }) {
  return (
    <label className="relative block max-w-[420px] flex-[1_1_280px] max-[560px]:max-w-none">
      <svg
        className="pointer-events-none absolute top-1/2 left-3 size-[18px] -translate-y-1/2 text-cokelat"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M15.5 15.5L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <input
        type="search"
        className="w-full rounded-lg border-[1.5px] border-garis bg-white py-2.5 pr-3.5 pl-9.5 text-teks placeholder:text-redup focus:border-kuning focus:ring-3 focus:ring-kuning-muda focus:outline-none [&::-webkit-search-cancel-button]:cursor-pointer [&::-webkit-search-cancel-button]:[filter:sepia(1)_saturate(6)_hue-rotate(-25deg)]"
        placeholder="Cari nama produk..."
        aria-label="Cari nama produk"
        value={nilai}
        onChange={(e) => onUbah(e.target.value)}
      />
    </label>
  );
}

export default KotakCari;
