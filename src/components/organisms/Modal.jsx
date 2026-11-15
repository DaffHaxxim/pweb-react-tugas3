import { useEffect } from "react";
import "./Modal.css";

// Organism: kerangka pop-up yang dipakai ulang oleh form tambah/edit dan konfirmasi hapus.
// Isi pop-up dikirim lewat `children`; menutup bisa lewat tombol x, klik latar, atau tombol Esc.
function Modal({ judul, deskripsi, onTutup, children }) {
  useEffect(() => {
    function saatTombolDitekan(e) {
      if (e.key === "Escape") onTutup();
    }
    document.addEventListener("keydown", saatTombolDitekan);
    return () => document.removeEventListener("keydown", saatTombolDitekan);
  }, [onTutup]);

  return (
    <div
      className="modal-latar"
      onClick={(e) => {
        // Hanya klik pada latar (bukan pada isi pop-up) yang menutup.
        if (e.target === e.currentTarget) onTutup();
      }}
    >
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-judul">
        <div className="modal__kepala">
          <div>
            <h2 id="modal-judul" className="modal__judul">
              {judul}
            </h2>
            {deskripsi && <p className="modal__deskripsi">{deskripsi}</p>}
          </div>
          <button type="button" className="modal__tutup" aria-label="Tutup" onClick={onTutup}>
            &times;
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default Modal;
