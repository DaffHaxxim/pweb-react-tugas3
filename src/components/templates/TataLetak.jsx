import "./TataLetak.css";

// Template: kerangka tata letak halaman (lebar maksimum, margin, padding).
// Isinya (children) ditentukan oleh halaman yang memakainya.
function TataLetak({ children }) {
  return <main className="tata-letak">{children}</main>;
}

export default TataLetak;
