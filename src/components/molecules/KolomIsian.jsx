import { KOLOM, LABEL, kontrol, pesan } from "./gayaKolom.js";

// Molecule: label + input + teks bantu/pesan galat. Dipakai untuk semua isian form.
function KolomIsian({ label, name, nilai, onUbah, placeholder, petunjuk, galat, ...sisa }) {
  const idPesan = `${name}-pesan`;
  return (
    <div className={KOLOM}>
      <label className={LABEL} htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        className={kontrol(galat)}
        value={nilai}
        onChange={(e) => onUbah(e.target.value)}
        placeholder={placeholder}
        aria-invalid={galat ? "true" : "false"}
        aria-describedby={idPesan}
        {...sisa}
      />
      <small id={idPesan} className={pesan(galat)}>
        {galat || petunjuk}
      </small>
    </div>
  );
}

export default KolomIsian;
