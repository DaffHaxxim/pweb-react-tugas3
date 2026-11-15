import { describe, expect, it } from "vitest";
import { urutkanProduk } from "./urut.js";

const daftar = [
  { id: 2, nama: "Spidol", harga: 8000 },
  { id: 1, nama: "Pulpen", harga: 5000 },
  { id: 3, nama: "Buku", harga: 12000 },
];

describe("urutkanProduk", () => {
  it("mengurutkan menurut nama, harga, dan ID", () => {
    expect(urutkanProduk(daftar, "nama-naik").map((p) => p.nama)).toEqual(["Buku", "Pulpen", "Spidol"]);
    expect(urutkanProduk(daftar, "nama-turun").map((p) => p.nama)).toEqual(["Spidol", "Pulpen", "Buku"]);
    expect(urutkanProduk(daftar, "harga-naik").map((p) => p.harga)).toEqual([5000, 8000, 12000]);
    expect(urutkanProduk(daftar, "harga-turun").map((p) => p.harga)).toEqual([12000, 8000, 5000]);
    expect(urutkanProduk(daftar, "id").map((p) => p.id)).toEqual([1, 2, 3]);
  });

  it("tidak mengubah array asal (state tidak boleh dimutasi)", () => {
    const sebelum = daftar.map((p) => p.id);
    urutkanProduk(daftar, "harga-turun");
    expect(daftar.map((p) => p.id)).toEqual(sebelum);
  });
});
