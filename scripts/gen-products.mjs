// 全商品の PDP 用画像を Nano Banana (Gemini 2.5 Flash Image) で生成し、
// sharp で WebP 圧縮して public/images/products/ に保存する。
// 既存ファイルはスキップ（再実行可能）。
import { existsSync, mkdirSync } from "node:fs"
import { createRequire } from "node:module"

const require = createRequire(import.meta.url)
// sharp は通常の依存解決を優先し、無ければ一時ディレクトリのものを使う
let sharp
try { sharp = require("sharp") } catch { sharp = require("/tmp/imgtools/node_modules/sharp") }

const KEY = process.env.GEMINI_API_KEY
if (!KEY) { console.error("GEMINI_API_KEY missing"); process.exit(2) }
const MODEL = "gemini-2.5-flash-image"
const OUT_DIR = "public/images/products"
mkdirSync(OUT_DIR, { recursive: true })

const BASE =
  "Professional e-commerce catalog photography for UNIQLO, a Japanese minimalist apparel brand. " +
  "Clean seamless very light gray studio background (#f1f1f1), soft even diffused lighting, " +
  "photorealistic, sharp focus, high detail, neutral color grading. " +
  "No text, no logo, no watermark, no graphic overlays."

// 商品ごとの素材文。worn=モデル着用カットを作るか
const products = [
  { id: "crew-neck-tshirt", item: "a crew-neck short-sleeve cotton t-shirt", color: "plain white", model: "a young East Asian woman", bottoms: "beige relaxed trousers", worn: true },
  { id: "airizm-dress", item: "a short-sleeve A-line knee-length summer dress", color: "soft light blue", model: "a young East Asian woman", bottoms: "", worn: true },
  { id: "linen-pants", item: "relaxed wide-leg linen-blend easy pants with an elastic waist", color: "sand beige", model: "a young man", bottoms: "a plain white t-shirt", worn: true },
  { id: "denim-jeans", item: "high-rise baggy barrel-leg jeans", color: "medium-wash blue denim", model: "a young woman", bottoms: "a plain white tucked-in shirt", worn: true },
  { id: "bra-top", item: "a sleeveless padded bra-top camisole innerwear, modest and tasteful", color: "light pink", model: "a young woman", bottoms: "high-waist light blue jeans", worn: true },
  { id: "nylon-shorts", item: "lightweight nylon active shorts, above the knee", color: "khaki green", model: "a young man", bottoms: "a plain gray t-shirt", worn: true },
]

function cuts(p) {
  const list = [
    { tag: "front", aspect: "3:4", prompt: `${BASE} A clean front flat-lay of ${p.item} in ${p.color}, neatly arranged and centered, product only, no model, no mannequin.` },
    { tag: "detail", aspect: "3:4", prompt: `${BASE} Extreme close-up macro shot showing the fabric texture, weave and stitching of ${p.item} in ${p.color}. Product only, no model.` },
  ]
  if (p.worn) {
    list.unshift({ tag: "model", aspect: "3:4", prompt: `${BASE} Catalog fashion photo: ${p.model} wearing ${p.item} in ${p.color}${p.bottoms ? `, with ${p.bottoms}` : ""}. Natural relaxed standing pose, facing the camera, full upper body in frame, minimalist studio.` })
    list.push({ tag: "styled", aspect: "3:4", prompt: `${BASE} Full-body catalog fashion photo: ${p.model} wearing ${p.item} in ${p.color}${p.bottoms ? `, with ${p.bottoms}` : ""}. Standing, looking slightly to the side, simple casual styling, minimalist studio.` })
  }
  return list
}

async function gen(prompt, aspect) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`
  const body = { contents: [{ parts: [{ text: prompt }] }], generationConfig: { responseModalities: ["IMAGE"], imageConfig: { aspectRatio: aspect } } }
  for (let attempt = 1; attempt <= 3; attempt++) {
    const res = await fetch(url, { method: "POST", headers: { "x-goog-api-key": KEY, "Content-Type": "application/json" }, body: JSON.stringify(body) })
    if (res.ok) {
      const data = await res.json()
      const parts = data?.candidates?.[0]?.content?.parts ?? []
      const b64 = parts.find((p) => p.inlineData?.data || p.inline_data?.data)?.inlineData?.data
      if (b64) return Buffer.from(b64, "base64")
      throw new Error("no image part: " + JSON.stringify(data).slice(0, 300))
    }
    const txt = await res.text()
    if (res.status === 429 || res.status >= 500) { await new Promise((r) => setTimeout(r, attempt * 4000)); continue }
    throw new Error(`HTTP ${res.status}: ${txt.slice(0, 300)}`)
  }
  throw new Error("retries exhausted")
}

let made = 0, skipped = 0, failed = 0
for (const p of products) {
  for (const c of cuts(p)) {
    const out = `${OUT_DIR}/${p.id}-${c.tag}.webp`
    if (existsSync(out)) { skipped++; console.log(`skip  ${out}`); continue }
    try {
      const png = await gen(c.prompt, c.aspect)
      await sharp(png).resize({ width: 900, withoutEnlargement: true }).webp({ quality: 80 }).toFile(out)
      made++; console.log(`OK    ${out}`)
    } catch (e) {
      failed++; console.error(`FAIL  ${out}: ${String(e).slice(0, 200)}`)
    }
  }
}
console.log(`\nDONE made=${made} skipped=${skipped} failed=${failed}`)
