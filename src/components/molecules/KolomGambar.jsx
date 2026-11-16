import { useRef } from "react";
import GambarProduk from "../atoms/GambarProduk.jsx";
import Tombol from "../atoms/Tombol.jsx";
import { KOLOM, LABEL, pesan } from "./gayaKolom.js";

// Molecule: pilihan gambar opsional dengan pratinjau dan tombol hapus.
// Pembacaan berkas dilakukan komponen induk; molecule ini hanya menampilkan dan meneruskan pilihan.
function KolomGambar({ nilai, nama, onPilihBerkas, onHapus, galat }) {
  const inputBerkas = useRef(null);
  return (
    <div className={KOLOM}>
      <span className={LABEL}>Gambar (opsional)</span>
      <div className="flex items-center gap-3.5">
        <div className="w-30 flex-none">
          <GambarProduk src={nilai} alt={nama || "Pratinjau gambar"} />
        </div>
        <div className="flex flex-col items-start gap-1.5">
          <input
            ref={inputBerkas}
            type="file"
            name="gambar"
            accept="image/*"
            className="sr-only"
            aria-label="Pilih berkas gambar"
            onChange={(e) => onPilihBerkas(e.target.files[0])}
          />
          <Tombol varian="garis" onClick={() => inputBerkas.current.click()}>
            {nilai ? "Ganti Gambar" : "Pilih Gambar"}
          </Tombol>
          {nilai && (
            <Tombol varian="hantu" onClick={onHapus}>
              Hapus Gambar
            </Tombol>
          )}
        </div>
      </div>
      <small className={pesan(galat)}>
        {galat || "JPG, PNG, atau WebP, maksimal 5 MB"}
      </small>
    </div>
  );
}

export default KolomGambar;
