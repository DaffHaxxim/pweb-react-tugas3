// Template: kerangka tata letak halaman (lebar maksimum, margin, padding).
// Isinya (children) ditentukan oleh halaman yang memakainya.
function TataLetak({ children }) {
  return (
    <main className="mx-auto max-w-[1120px] px-5 pt-7 pb-16 max-[560px]:px-3.5 max-[560px]:pt-5 max-[560px]:pb-14">
      {children}
    </main>
  );
}

export default TataLetak;
