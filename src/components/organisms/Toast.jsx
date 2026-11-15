import "./Toast.css";

// Organism: pemberitahuan singkat di bawah layar. Pembaca layar membacanya lewat role="status".
function Toast({ pesan }) {
  return (
    <div className="toast" role="status" aria-live="polite">
      {pesan}
    </div>
  );
}

export default Toast;
