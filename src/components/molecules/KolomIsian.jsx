import "./KolomIsian.css";

// Molecule: label + input + teks bantu/pesan galat. Dipakai untuk semua isian form.
function KolomIsian({ label, name, nilai, onUbah, placeholder, petunjuk, galat, ...sisa }) {
  const idPesan = `${name}-pesan`;
  return (
    <div className="kolom">
      <label className="kolom__label" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        className={galat ? "kolom__input kolom__input--galat" : "kolom__input"}
        value={nilai}
        onChange={(e) => onUbah(e.target.value)}
        placeholder={placeholder}
        aria-invalid={galat ? "true" : "false"}
        aria-describedby={idPesan}
        {...sisa}
      />
      <small id={idPesan} className={galat ? "kolom__pesan kolom__pesan--galat" : "kolom__pesan"}>
        {galat || petunjuk}
      </small>
    </div>
  );
}

export default KolomIsian;
