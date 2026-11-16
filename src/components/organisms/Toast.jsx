
// Organism: pemberitahuan singkat di bawah layar. Pembaca layar membacanya lewat role="status".
function Toast({ pesan }) {
  return (
    <div className="fixed bottom-6 left-1/2 z-60 max-w-[calc(100vw-32px)] -translate-x-1/2 animate-toast-masuk rounded-lg border-l-[5px] border-kuning bg-hitam px-5 py-3 font-semibold text-white shadow-modal" role="status" aria-live="polite">
      {pesan}
    </div>
  );
}

export default Toast;
