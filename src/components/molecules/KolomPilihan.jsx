import "./KolomIsian.css";

// Molecule: label + <select> + pesan galat. Memakai gaya yang sama dengan KolomIsian.
function KolomPilihan({ label, name, nilai, onUbah, pilihan, galat }) {
  const idPesan = `${name}-pesan`;
  return (
    <div className="kolom">
      <label className="kolom__label" htmlFor={name}>
        {label}
      </label>
      <select
        id={name}
        name={name}
        className={galat ? "kolom__input kolom__input--galat" : "kolom__input"}
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
      <small id={idPesan} className={galat ? "kolom__pesan kolom__pesan--galat" : "kolom__pesan"}>
        {galat}
      </small>
    </div>
  );
}

export default KolomPilihan;
