import { useEffect } from "react";

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
      className="fixed inset-0 z-50 flex items-center justify-center bg-hitam/55 p-4"
      onClick={(e) => {
        // Hanya klik pada latar (bukan pada isi pop-up) yang menutup.
        if (e.target === e.currentTarget) onTutup();
      }}
    >
      <div className="max-h-[calc(100vh-32px)] w-[min(480px,100%)] overflow-y-auto rounded-[18px] border-t-[5px] border-kuning bg-white p-6 shadow-modal max-[560px]:p-4.5" role="dialog" aria-modal="true" aria-labelledby="modal-judul">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <h2 id="modal-judul" className="text-xl leading-tight font-bold text-hitam">
              {judul}
            </h2>
            {deskripsi && <p className="mt-1 text-[0.9rem] text-redup">{deskripsi}</p>}
          </div>
          <button type="button" className="h-8 w-8 flex-none cursor-pointer rounded-lg bg-transparent text-[1.6rem] leading-none text-redup hover:bg-kuning-muda hover:text-hitam" aria-label="Tutup" onClick={onTutup}>
            &times;
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

// Baris tombol di bagian bawah pop-up (rata kanan). Dipakai form, dialog hapus, dan konfirmasi reset.
export function AksiModal({ children }) {
  return <div className="mt-5 flex justify-end gap-2 max-[560px]:flex-wrap">{children}</div>;
}

export default Modal;
