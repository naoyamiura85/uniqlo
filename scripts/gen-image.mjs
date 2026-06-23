// Nano Banana (Gemini 2.5 Flash Image) で画像を生成して保存する簡易スクリプト
// 使い方: node scripts/gen-image.mjs "<prompt>" <outPath> [aspectRatio]
// 例:      node scripts/gen-image.mjs "a white t-shirt ..." public/images/foo.png 3:4
import { writeFileSync } from "node:fs"

const [, , prompt, outPath, aspect = "3:4"] = process.argv
if (!prompt || !outPath) {
  console.error("usage: node scripts/gen-image.mjs <prompt> <outPath> [aspectRatio]")
  process.exit(2)
}

const KEY = process.env.GEMINI_API_KEY
if (!KEY) {
  console.error("GEMINI_API_KEY is not set")
  process.exit(2)
}

const MODEL = process.env.GEMINI_IMAGE_MODEL || "gemini-2.5-flash-image"
const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`

const body = {
  contents: [{ parts: [{ text: prompt }] }],
  generationConfig: {
    responseModalities: ["IMAGE"],
    imageConfig: { aspectRatio: aspect },
  },
}

const res = await fetch(url, {
  method: "POST",
  headers: { "x-goog-api-key": KEY, "Content-Type": "application/json" },
  body: JSON.stringify(body),
})

if (!res.ok) {
  const txt = await res.text()
  console.error(`HTTP ${res.status}: ${txt.slice(0, 600)}`)
  process.exit(1)
}

const data = await res.json()
const parts = data?.candidates?.[0]?.content?.parts ?? []
const imgPart = parts.find((p) => p.inlineData?.data || p.inline_data?.data)
const b64 = imgPart?.inlineData?.data || imgPart?.inline_data?.data

if (!b64) {
  console.error("No image in response: " + JSON.stringify(data).slice(0, 600))
  process.exit(1)
}

writeFileSync(outPath, Buffer.from(b64, "base64"))
console.log(`OK -> ${outPath} (${Math.round(Buffer.from(b64, "base64").length / 1024)} KB)`)
