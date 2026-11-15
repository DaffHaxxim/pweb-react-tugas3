// Uji end-to-end: membuka aplikasi di Chrome sungguhan dan menjalankan skenario pengguna.
// Pemakaian:
//   npm run test:e2e
//   node tests/e2e.mjs --md hasil-uji.md --shots bukti      (tabel Markdown dan tangkapan layar)
// Peramban diambil dari CHROME_PATH (bawaan /usr/bin/google-chrome). Server Vite dijalankan sendiri
// pada port 5199 lalu dimatikan. Setiap skenario memakai konteks peramban baru (localStorage bersih).
import { chromium } from "playwright-core";
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const akar = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PORT = 5199;
const BASE = `http://localhost:${PORT}/`;
const CHROME = process.env.CHROME_PATH || "/usr/bin/google-chrome";
const argumen = process.argv.slice(2);
const ambil = (nama) => (argumen.includes(nama) ? argumen[argumen.indexOf(nama) + 1] : null);
const berkasMd = ambil("--md");
const folderGambar = ambil("--shots");
if (folderGambar) mkdirSync(folderGambar, { recursive: true });

const { produkAwal } = await import(path.join(akar, "src/data/produk.js"));
const TOTAL = produkAwal.length;
const FOTO_UJI = path.join(akar, "public/images/produk/09-gunting.webp");

// --- server pengembangan ---
const server = spawn(process.execPath, [path.join(akar, "node_modules/vite/bin/vite.js"), "--port", String(PORT), "--strictPort"], {
  cwd: akar,
  stdio: "ignore",
});
async function tungguServer() {
  for (let i = 0; i < 60; i++) {
    try {
      if ((await fetch(BASE)).ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error("Server Vite tidak siap");
}

const browser = await chromium.launch({ executablePath: CHROME, headless: true, args: ["--no-sandbox"] });
const hasil = [];

async function skenario(nama, diharapkan, fn, opsi = {}) {
  const konteks = await browser.newContext({ viewport: opsi.viewport ?? { width: 1200, height: 800 } });
  const page = await konteks.newPage();
  const galat = [];
  page.on("pageerror", (e) => galat.push(e.message));
  page.on("console", (m) => m.type() === "error" && galat.push(m.text()));
  for (const [k, v] of Object.entries(opsi.storage ?? {})) {
    await page.addInitScript(([kk, vv]) => localStorage.setItem(kk, vv), [k, v]);
  }
  await page.goto(BASE, { waitUntil: "networkidle" });
  let aktual;
  let lolos;
  try {
    const r = await fn(page);
    aktual = r.aktual;
    lolos = r.lolos;
    if (galat.length) {
      lolos = false;
      aktual += ` | galat konsol: ${galat[0].slice(0, 80)}`;
    }
  } catch (e) {
    lolos = false;
    aktual = "Galat uji: " + e.message.split("\n")[0].slice(0, 120);
  }
  const n = hasil.length + 1;
  if (folderGambar) {
    const slug = nama.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40);
    await page.screenshot({ path: path.join(folderGambar, `${String(n).padStart(2, "0")}-${slug}.png`) });
  }
  hasil.push({ n, nama, diharapkan, aktual, lolos });
  await konteks.close();
}

// --- pembantu ---
const kartu = (page, nama) =>
  page.locator(".kartu").filter({ has: page.locator(".kartu__nama", { hasText: new RegExp(`^${nama}$`) }) });
const jumlahKartu = (page) => page.locator(".kartu").count();
const penghitung = (page) => page.locator(".bar-pencarian__jumlah").textContent();
async function tambah(page, { nama, harga, kategori, foto }) {
  await page.click("text=+ Tambah Produk");
  await page.fill("input[name=nama]", nama);
  await page.fill("input[name=harga]", String(harga));
  if (kategori) await page.selectOption("select[name=kategori]", kategori);
  if (foto) {
    await page.setInputFiles("input[name=gambar]", foto);
    await page.waitForSelector(".kolom-gambar__pratinjau img");
  }
  await page.click('button:has-text("Simpan Produk")');
}

try {
  await tungguServer();

  await skenario("Membuka halaman utama", `${TOTAL} kartu produk, penghitung "${TOTAL} produk", konsol bersih`, async (p) => {
    const n = await jumlahKartu(p);
    const t = await penghitung(p);
    return { aktual: `${n} kartu, penghitung "${t}"`, lolos: n === TOTAL && t === `${TOTAL} produk` };
  });

  await skenario('Mencari "pen"', "Hanya produk yang namanya memuat \"pen\"", async (p) => {
    const harus = produkAwal.filter((x) => x.nama.toLowerCase().includes("pen")).length;
    await p.fill("input[type=search]", "pen");
    const n = await jumlahKartu(p);
    const ringkas = await p.locator(".halaman-produk__ringkasan").textContent();
    return { aktual: `${n} kartu; "${ringkas}"`, lolos: n === harus && ringkas.includes(`${harus} dari ${TOTAL}`) };
  });

  await skenario("Filter kategori Elektronik", "Semua kartu berlencana Elektronik", async (p) => {
    await p.click('button:has-text("Elektronik")');
    const harus = produkAwal.filter((x) => x.kategori === "Elektronik").length;
    const lencana = await p.locator(".kartu .lencana").allTextContents();
    return { aktual: `${lencana.length} kartu, lencana: ${[...new Set(lencana)].join(", ")}`, lolos: lencana.length === harus && lencana.every((l) => l === "Elektronik") };
  });

  await skenario("Urutkan harga termurah", "Penghapus (termurah) paling awal, Tas Laptop (termahal) paling akhir", async (p) => {
    await p.selectOption("select[name=urutan]", "harga-naik");
    const nama = await p.locator(".kartu__nama").allTextContents();
    return { aktual: `awal: ${nama[0]}; akhir: ${nama.at(-1)}`, lolos: nama[0] === "Penghapus" && nama.at(-1) === "Tas Laptop" };
  });

  await skenario("Tambah produk yang valid", `Jumlah menjadi ${TOTAL + 1}, toast "ditambahkan", kartu baru Rp7.500`, async (p) => {
    await tambah(p, { nama: "Penghapus Besar", harga: 7500, kategori: "Perlengkapan Kelas" });
    await p.waitForSelector(".toast");
    const n = await jumlahKartu(p);
    const toast = await p.locator(".toast").textContent();
    const k = await kartu(p, "Penghapus Besar").locator(".kartu__harga").textContent();
    return { aktual: `${n} kartu; toast: ${toast}; harga kartu: ${k}`, lolos: n === TOTAL + 1 && toast.includes("ditambahkan") && k === "Rp7.500" };
  });

  await skenario("Tambah dengan harga 0 ditolak", 'Pesan "Harga harus lebih dari 0", pop-up tetap terbuka, data tidak bertambah', async (p) => {
    await tambah(p, { nama: "Uji Nol", harga: 0 });
    const pesan = await p.locator("#harga-pesan").textContent();
    const terbuka = await p.locator(".modal").count();
    const n = await jumlahKartu(p);
    return { aktual: `pesan: "${pesan}"; pop-up terbuka: ${terbuka === 1}; kartu: ${n}`, lolos: pesan === "Harga harus lebih dari 0" && terbuka === 1 && n === TOTAL };
  });

  await skenario("Tambah dengan harga huruf ditolak", "Pesan galat harga angka; tidak ada produk dengan RpNaN", async (p) => {
    await tambah(p, { nama: "Uji Huruf", harga: "abc" });
    const pesan = await p.locator("#harga-pesan").textContent();
    const n = await jumlahKartu(p);
    return { aktual: `pesan: "${pesan}"; kartu: ${n}`, lolos: /angka/.test(pesan) && n === TOTAL };
  });

  await skenario("Tambah dengan nama kosong ditolak", 'Pesan "Nama produk wajib diisi"', async (p) => {
    await tambah(p, { nama: "   ", harga: 1000 });
    const pesan = await p.locator("#nama-pesan").textContent();
    return { aktual: `pesan: "${pesan}"`, lolos: pesan === "Nama produk wajib diisi" };
  });

  await skenario("Tambah produk dengan gambar unggahan", "Kartu baru menampilkan gambar hasil unggahan", async (p) => {
    await tambah(p, { nama: "Uji Foto", harga: 4500, foto: FOTO_UJI });
    const src = await kartu(p, "Uji Foto").locator("img").getAttribute("src");
    return { aktual: `src diawali "${src.slice(0, 22)}..." (${src.length} karakter)`, lolos: src.startsWith("data:image/jpeg") };
  });

  await skenario("Tambah produk tanpa gambar", "Kartu memakai gambar pengganti (bukan gambar rusak)", async (p) => {
    await tambah(p, { nama: "Uji Tanpa Foto", harga: 4500 });
    const pengganti = await kartu(p, "Uji Tanpa Foto").locator('[aria-label^="Tanpa gambar"]').count();
    const img = await kartu(p, "Uji Tanpa Foto").locator("img").count();
    return { aktual: `gambar pengganti: ${pengganti}; elemen img: ${img}`, lolos: pengganti === 1 && img === 0 };
  });

  await skenario("Berkas bukan gambar ditolak", 'Pesan "Berkas harus berupa gambar"', async (p) => {
    await p.click("text=+ Tambah Produk");
    await p.setInputFiles("input[name=gambar]", { name: "catatan.txt", mimeType: "text/plain", buffer: Buffer.from("bukan gambar") });
    const pesan = await p.locator(".kolom-gambar").locator("xpath=following-sibling::small").textContent();
    return { aktual: `pesan: "${pesan}"`, lolos: pesan === "Berkas harus berupa gambar" };
  });

  await skenario("Edit produk", "Form terisi data lama; kartu berubah menjadi Rp13.500; kategori tetap", async (p) => {
    await kartu(p, "Buku Tulis").locator('button:has-text("Edit")').click();
    const nama = await p.inputValue("input[name=nama]");
    const harga = await p.inputValue("input[name=harga]");
    const kat = await p.inputValue("select[name=kategori]");
    await p.fill("input[name=harga]", "13500");
    await p.click('button:has-text("Simpan Perubahan")');
    const baru = await kartu(p, "Buku Tulis").locator(".kartu__harga").textContent();
    const lencana = await kartu(p, "Buku Tulis").locator(".lencana").textContent();
    const n = await jumlahKartu(p);
    return {
      aktual: `terisi: ${nama}/${harga}/${kat}; sesudah: ${baru}, ${lencana}; kartu: ${n}`,
      lolos: nama === "Buku Tulis" && harga === "12000" && kat === "Perlengkapan Kelas" && baru === "Rp13.500" && lencana === "Perlengkapan Kelas" && n === TOTAL,
    };
  });

  await skenario("Hapus produk dengan konfirmasi", `Pop-up menampilkan produk; setelah konfirmasi jumlah ${TOTAL - 1}`, async (p) => {
    await kartu(p, "Spidol").locator('button:has-text("Hapus")').click();
    const tampil = await p.locator(".dialog-hapus__nama").textContent();
    await p.click('.modal button:has-text("Hapus Produk")');
    const n = await jumlahKartu(p);
    const ada = await kartu(p, "Spidol").count();
    return { aktual: `dialog: ${tampil}; kartu: ${n}; Spidol masih ada: ${ada === 1}`, lolos: tampil === "Spidol" && n === TOTAL - 1 && ada === 0 };
  });

  await skenario("Batal menghapus", "Data tidak berubah", async (p) => {
    await kartu(p, "Spidol").locator('button:has-text("Hapus")').click();
    await p.click('.modal button:has-text("Batal")');
    const n = await jumlahKartu(p);
    return { aktual: `kartu: ${n}`, lolos: n === TOTAL };
  });

  await skenario("Esc menutup pop-up", "Pop-up hilang", async (p) => {
    await p.click("text=+ Tambah Produk");
    const sebelum = await p.locator(".modal").count();
    await p.keyboard.press("Escape");
    const sesudah = await p.locator(".modal").count();
    return { aktual: `sebelum Esc: ${sebelum}; sesudah: ${sesudah}`, lolos: sebelum === 1 && sesudah === 0 };
  });

  await skenario("Perubahan bertahan setelah muat ulang", "Produk tambahan masih ada dan Pulpen yang dihapus tetap hilang", async (p) => {
    await tambah(p, { nama: "Uji Persisten", harga: 7777 });
    await kartu(p, "Pulpen").locator('button:has-text("Hapus")').click();
    await p.click('.modal button:has-text("Hapus Produk")');
    await p.reload({ waitUntil: "networkidle" });
    const nama = await p.locator(".kartu__nama").allTextContents();
    return { aktual: `Uji Persisten: ${nama.includes("Uji Persisten")}; Pulpen: ${nama.includes("Pulpen")}`, lolos: nama.includes("Uji Persisten") && !nama.includes("Pulpen") };
  });

  await skenario("Data localStorage rusak", `Halaman tetap tampil dengan ${TOTAL} produk awal`, async (p) => {
    const n = await jumlahKartu(p);
    return { aktual: `${n} kartu tampil`, lolos: n === TOTAL };
  }, { storage: { "manajemen-produk:v1": '{"rusak":' } });

  await skenario("Reset ke data awal", `Kembali ke ${TOTAL} produk awal`, async (p) => {
    await tambah(p, { nama: "Uji Reset", harga: 1000 });
    await p.click("text=Reset ke data awal");
    await p.click('.modal button:has-text("Reset Data")');
    const n = await jumlahKartu(p);
    const ada = await kartu(p, "Uji Reset").count();
    return { aktual: `kartu: ${n}; Uji Reset ada: ${ada === 1}`, lolos: n === TOTAL && ada === 0 };
  });

  await skenario("Tidak ada hasil pencarian", 'Pesan "Produk tidak ditemukan"; tombol hapus saringan memulihkan daftar', async (p) => {
    await p.fill("input[type=search]", "zzzz");
    const pesan = await p.locator(".kosong__judul").textContent();
    await p.click("text=Hapus Pencarian dan Filter");
    const n = await jumlahKartu(p);
    return { aktual: `pesan: "${pesan}"; setelah hapus saringan: ${n} kartu`, lolos: pesan === "Produk tidak ditemukan" && n === TOTAL };
  });

  await skenario("Tampilan ponsel 375 px", "Tanpa gulir horizontal; kartu dua kolom", async (p) => {
    const lebar = await p.evaluate(() => ({ dok: document.documentElement.scrollWidth, jendela: window.innerWidth }));
    const kiri = await p.$$eval(".kartu", (k) => k.slice(0, 2).map((x) => Math.round(x.getBoundingClientRect().top)));
    return { aktual: `scrollWidth ${lebar.dok} dari ${lebar.jendela}; posisi atas dua kartu pertama: ${kiri.join(" dan ")}`, lolos: lebar.dok <= lebar.jendela && kiri[0] === kiri[1] };
  }, { viewport: { width: 375, height: 800 } });
} finally {
  await browser.close();
  server.kill();
}

// --- laporan ---
const lulus = hasil.filter((h) => h.lolos).length;
const tabel = [
  "| No | Skenario | Hasil yang Diharapkan | Hasil Aktual | Status |",
  "|---|---|---|---|---|",
  ...hasil.map((h) => `| ${h.n} | ${h.nama} | ${h.diharapkan} | ${h.aktual.replace(/\|/g, "/")} | ${h.lolos ? "Lulus" : "GAGAL"} |`),
].join("\n");
console.log(tabel);
console.log(`\nRingkasan: ${lulus} dari ${hasil.length} skenario lulus`);
if (berkasMd) writeFileSync(berkasMd, tabel + `\n\nRingkasan: ${lulus} dari ${hasil.length} skenario lulus\n`);
process.exit(lulus === hasil.length ? 0 : 1);
