import { describe, expect, it } from "vitest";
import { validasiProduk, BATAS_NAMA } from "./validasi.js";

const ok = { nama: "Pulpen", harga: "5000", kategori: "Alat Tulis" };

describe("validasiProduk", () => {
  it("menerima isian yang benar dan menormalkan datanya", () => {
    const hasil = validasiProduk({ ...ok, nama: "  Pulpen  " });
    expect(hasil.valid).toBe(true);
    expect(hasil.data).toEqual({ nama: "Pulpen", harga: 5000, kategori: "Alat Tulis", gambar: "" });
  });

  it("menolak nama kosong atau hanya spasi", () => {
    expect(validasiProduk({ ...ok, nama: "" }).galat.nama).toBeTruthy();
    expect(validasiProduk({ ...ok, nama: "   " }).galat.nama).toBeTruthy();
  });

  it("menolak nama lebih dari batas", () => {
    expect(validasiProduk({ ...ok, nama: "x".repeat(BATAS_NAMA + 1) }).valid).toBe(false);
    expect(validasiProduk({ ...ok, nama: "x".repeat(BATAS_NAMA) }).valid).toBe(true);
  });

  it("menolak harga 0 dengan pesan 'Harga harus lebih dari 0'", () => {
    const hasil = validasiProduk({ ...ok, harga: "0" });
    expect(hasil.valid).toBe(false);
    expect(hasil.galat.harga).toBe("Harga harus lebih dari 0");
  });

  it.each(["abc", "12.5", "-5", "1e3", "5 000"])("menolak harga bukan angka bulat: %s", (harga) => {
    expect(validasiProduk({ ...ok, harga }).galat.harga).toBeTruthy();
  });

  it("menolak harga kosong dan harga terlalu besar", () => {
    expect(validasiProduk({ ...ok, harga: "" }).galat.harga).toBe("Harga wajib diisi");
    expect(validasiProduk({ ...ok, harga: "2000000000" }).galat.harga).toBe("Harga terlalu besar");
  });

  it("menolak kategori di luar daftar", () => {
    expect(validasiProduk({ ...ok, kategori: "Mainan" }).galat.kategori).toBeTruthy();
  });

  it("gambar opsional: kosong boleh, data URL gambar boleh, teks lain ditolak", () => {
    expect(validasiProduk({ ...ok, gambar: "" }).valid).toBe(true);
    expect(validasiProduk({ ...ok, gambar: "data:image/jpeg;base64,AAAA" }).valid).toBe(true);
    expect(validasiProduk({ ...ok, gambar: "/images/produk/01-pulpen.webp" }).valid).toBe(true);
    expect(validasiProduk({ ...ok, gambar: "http://contoh.com/x.png" }).galat.gambar).toBeTruthy();
  });
});
