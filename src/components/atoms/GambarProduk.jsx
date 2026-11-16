import { useState } from "react";

const BINGKAI = "aspect-4/3 overflow-hidden rounded-lg border border-garis";

// Atom: gambar produk dengan gambar pengganti. `src` bersifat opsional; bila kosong atau gagal
// dimuat, ditampilkan ikon kotak sederhana (conditional rendering).
function GambarProduk({ src, alt }) {
  const [gagal, setGagal] = useState(false);

  if (!src || gagal) {
    return (
      <div className={`${BINGKAI} flex items-center justify-center bg-kuning-muda text-cokelat`} role="img" aria-label={`Tanpa gambar: ${alt}`}>
        <svg viewBox="0 0 48 48" aria-hidden="true" className="size-11 opacity-70">
          <path d="M8 16l16-8 16 8v18l-16 8-16-8z" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M8 16l16 8 16-8M24 24v18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
        </svg>
      </div>
    );
  }

  return (
    <div className={`${BINGKAI} bg-permukaan`}>
      <img src={src} alt={alt} loading="lazy" onError={() => setGagal(true)} className="size-full object-contain" />
    </div>
  );
}

export default GambarProduk;
