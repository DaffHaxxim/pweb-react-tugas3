import { describe, expect, it } from "vitest";
import { saringProduk } from "./saring.js";

const daftar = [
  { id: 1, nama: "Pulpen", harga: 5000, kategori: "Alat Tulis" },
  { id: 2, nama: "Buku Tulis", harga: 12000, kategori: "Perlengkapan Kelas" },
  { id: 3, nama: "Pensil 2B", harga: 3500, kategori: "Alat Tulis" },
];

describe("saringProduk", () => {
  it("kata kunci kosong dan kategori Semua mengembalikan semua produk", () => {
    expect(saringProduk(daftar, "")).toHaveLength(3);
    expect(saringProduk(daftar, "   ", "Semua")).toHaveLength(3);
  });

  it("mencari nama tanpa peka huruf besar-kecil dan mengabaikan spasi tepi", () => {
    expect(saringProduk(daftar, "  PEN ").map((p) => p.id)).toEqual([1, 3]);
  });

  it("menyaring berdasarkan kategori", () => {
    expect(saringProduk(daftar, "", "Alat Tulis").map((p) => p.id)).toEqual([1, 3]);
  });

  it("menggabungkan kata kunci dan kategori", () => {
    expect(saringProduk(daftar, "tulis", "Alat Tulis")).toEqual([]);
    expect(saringProduk(daftar, "tulis", "Perlengkapan Kelas").map((p) => p.id)).toEqual([2]);
  });
});
