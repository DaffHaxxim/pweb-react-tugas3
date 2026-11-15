import { beforeEach, describe, expect, it } from "vitest";
import { muatProduk, simpanProduk } from "./penyimpanan.js";

const awal = [{ id: 1, nama: "Awal", harga: 1000, kategori: "Alat Tulis" }];
const KUNCI = "manajemen-produk:v1";

// localStorage palsu berbasis Map supaya pengujian berjalan di Node.
function pasangStorage({ penuh = false } = {}) {
  const data = new Map();
  globalThis.localStorage = {
    getItem: (k) => (data.has(k) ? data.get(k) : null),
    setItem: (k, v) => {
      if (penuh) throw new DOMException("kuota", "QuotaExceededError");
      data.set(k, String(v));
    },
  };
  return data;
}

describe("penyimpanan", () => {
  beforeEach(() => pasangStorage());

  it("memakai data awal bila belum ada yang tersimpan", () => {
    expect(muatProduk(awal)).toBe(awal);
  });

  it("menyimpan lalu memuat kembali data yang sama", () => {
    const data = [{ id: 7, nama: "Baru", harga: 2500, kategori: "Tas" }];
    expect(simpanProduk(data)).toBe(true);
    expect(muatProduk(awal)).toEqual(data);
  });

  it("kembali ke data awal bila JSON rusak", () => {
    localStorage.setItem(KUNCI, '{"rusak":');
    expect(muatProduk(awal)).toBe(awal);
  });

  it("kembali ke data awal bila JSON valid tetapi bentuknya salah", () => {
    for (const salah of ["[1,2,3]", '{"a":1}', "null", '[{"id":"x"}]']) {
      localStorage.setItem(KUNCI, salah);
      expect(muatProduk(awal)).toBe(awal);
    }
  });

  it("simpanProduk mengembalikan false (tidak melempar) saat kuota penuh", () => {
    pasangStorage({ penuh: true });
    expect(simpanProduk(awal)).toBe(false);
  });
});
