import { KOLOM, LABEL, kontrol, pesan } from "./gayaKolom.js";

// Molecule: label + <select> + pesan galat. Memakai gaya yang sama dengan KolomIsian.
function KolomPilihan({ label, name, nilai, onUbah, pilihan, galat }) {
  const idPesan = `${name}-pesan`;
  return (
    <div className={KOLOM}>
      <label className={LABEL} htmlFor={name}>
        {label}
      </label>
      <select
        id={name}
        name={name}
        className={kontrol(galat)}
        value={nilai}
        onChange={(e) => onUbah(e.target.value)}
        aria-invalid={galat ? "true" : "false"}
        aria-describedby={idPesan}
      >
        {pilihan.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      <small id={idPesan} className={pesan(galat)}>
        {galat}
      </small>
    </div>
  );
}

export default KolomPilihan;
