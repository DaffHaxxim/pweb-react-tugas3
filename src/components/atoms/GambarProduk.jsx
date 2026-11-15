import { useState } from "react";
import "./GambarProduk.css";

// Atom: gambar produk dengan gambar pengganti. `src` bersifat opsional; bila kosong atau gagal
// dimuat, ditampilkan ikon kotak sederhana (conditional rendering).
function GambarProduk({ src, alt }) {
  const [gagal, setGagal] = useState(false);

  if (!src || gagal) {
    return (
      <div className="gambar-produk gambar-produk--kosong" role="img" aria-label={`Tanpa gambar: ${alt}`}>
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <path d="M8 16l16-8 16 8v18l-16 8-16-8z" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M8 16l16 8 16-8M24 24v18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
        </svg>
      </div>
    );
  }

  return (
    <div className="gambar-produk">
      <img src={src} alt={alt} loading="lazy" onError={() => setGagal(true)} />
    </div>
  );
}

export default GambarProduk;
