// Kelas Tailwind yang dipakai bersama oleh seluruh kolom form (KolomIsian, KolomPilihan, KolomGambar).
// Kelas ditulis utuh supaya terbaca oleh Tailwind.
export const KOLOM = "mb-3.5 flex flex-col gap-1.5";
export const LABEL = "text-sm font-bold";

const KONTROL = "rounded-lg border-[1.5px] bg-white px-3 py-2.5 text-teks placeholder:text-[#a8978a] focus:outline-none focus:ring-3";
const KONTROL_NORMAL = "border-garis focus:border-kuning focus:ring-kuning-muda";
const KONTROL_GALAT = "border-bahaya bg-[#fffafa] focus:ring-bahaya-muda";

export const kontrol = (galat) => `${KONTROL} ${galat ? KONTROL_GALAT : KONTROL_NORMAL}`;
export const pesan = (galat) => `min-h-[1.1em] text-xs ${galat ? "font-semibold text-bahaya" : "text-redup"}`;
