import { describe, expect, it } from "vitest";
import { formatHarga } from "./format.js";

describe("formatHarga", () => {
  it("memberi pemisah ribuan titik dan awalan Rp tanpa spasi", () => {
    expect(formatHarga(5000)).toBe("Rp5.000");
    expect(formatHarga(50000)).toBe("Rp50.000");
    expect(formatHarga(1250000)).toBe("Rp1.250.000");
  });

  it("menangani nol", () => {
    expect(formatHarga(0)).toBe("Rp0");
  });

  it("tidak memuat spasi tak terputus (NBSP)", () => {
    expect(formatHarga(50000)).not.toMatch(/ /);
  });
});
