import { useRef } from "react";
import GambarProduk from "../atoms/GambarProduk.jsx";
import Tombol from "../atoms/Tombol.jsx";
import "./KolomGambar.css";

// Molecule: pilihan gambar opsional dengan pratinjau dan tombol hapus.
// Pembacaan berkas dilakukan komponen induk; molecule ini hanya menampilkan dan meneruskan pilihan.
function KolomGambar({ nilai, nama, onPilihBerkas, onHapus, galat }) {
  const inputBerkas = useRef(null);
  return (
    <div className="kolom">
      <span className="kolom__label">Gambar (opsional)</span>
      <div className="kolom-gambar">
        <div className="kolom-gambar__pratinjau">
          <GambarProduk src={nilai} alt={nama || "Pratinjau gambar"} />
        </div>
        <div className="kolom-gambar__aksi">
          <input
            ref={inputBerkas}
            type="file"
            name="gambar"
            accept="image/*"
            className="kolom-gambar__input"
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
      <small className={galat ? "kolom__pesan kolom__pesan--galat" : "kolom__pesan"}>
        {galat || "JPG, PNG, atau WebP, maksimal 5 MB"}
      </small>
    </div>
  );
}

export default KolomGambar;
