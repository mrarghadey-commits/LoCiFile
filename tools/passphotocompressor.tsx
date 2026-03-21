"use client"

import { useState, useRef } from "react"

// All Indian government exam photo specs (researched from official sources)
const EXAM_PRESETS = {
  upsc: {
    label: "UPSC Civil Services",
    category: "Central",
    w: 350, h: 450,
    minKB: 20, maxKB: 50,
    bg: "white",
    desc: "350×450px · 20–50KB · White bg"
  },
  ssc_cgl: {
    label: "SSC CGL / CHSL",
    category: "Central",
    w: 413, h: 531,
    minKB: 20, maxKB: 50,
    bg: "white",
    desc: "413×531px · 20–50KB · White bg"
  },
  ssc_gd: {
    label: "SSC GD Constable",
    category: "Central",
    w: 413, h: 531,
    minKB: 20, maxKB: 50,
    bg: "white",
    desc: "413×531px · 20–50KB · White bg"
  },
  rrb_ntpc: {
    label: "Railway RRB NTPC",
    category: "Railway",
    w: 320, h: 240,
    minKB: 30, maxKB: 70,
    bg: "white",
    desc: "320×240px · 30–70KB · White bg"
  },
  rrb_group_d: {
    label: "Railway RRB Group D",
    category: "Railway",
    w: 320, h: 240,
    minKB: 20, maxKB: 50,
    bg: "white",
    desc: "320×240px · 20–50KB · White bg"
  },
  ibps_po: {
    label: "IBPS PO / Clerk",
    category: "Banking",
    w: 200, h: 230,
    minKB: 20, maxKB: 50,
    bg: "white",
    desc: "200×230px · 20–50KB · White bg"
  },
  sbi_po: {
    label: "SBI PO / Clerk",
    category: "Banking",
    w: 200, h: 230,
    minKB: 20, maxKB: 50,
    bg: "white",
    desc: "200×230px · 20–50KB · White bg"
  },
  neet: {
    label: "NEET UG (NTA)",
    category: "Medical",
    w: 413, h: 531,
    minKB: 10, maxKB: 200,
    bg: "white",
    desc: "413×531px · 10–200KB · White bg"
  },
  jee_main: {
    label: "JEE Main (NTA)",
    category: "Engineering",
    w: 413, h: 531,
    minKB: 10, maxKB: 300,
    bg: "white",
    desc: "413×531px · 10–300KB · White bg"
  },
  gate: {
    label: "GATE",
    category: "Engineering",
    w: 530, h: 690,
    minKB: 5, maxKB: 600,
    bg: "white",
    desc: "530×690px · 5–600KB · White bg"
  },
  passport: {
    label: "Indian Passport",
    category: "Government ID",
    w: 413, h: 531,
    minKB: 20, maxKB: 50,
    bg: "white",
    desc: "413×531px · 20–50KB · White bg"
  },
  custom: {
    label: "Custom",
    category: "Custom",
    w: 413, h: 531,
    minKB: 10, maxKB: 40,
    bg: "white",
    desc: "Custom dimensions"
  },
}

type ExamKey = keyof typeof EXAM_PRESETS

const CATEGORIES = ["Central", "Railway", "Banking", "Medical", "Engineering", "Government ID", "Custom"]

const BG_OPTIONS = [
  { key: "white", label: "White", hex: "#ffffff", border: "border border-slate-300" },
  { key: "offwhite", label: "Off White", hex: "#f5f5f0", border: "border border-slate-200" },
  { key: "blue", label: "Blue", hex: "#4a90d9", border: "" },
  { key: "lightblue", label: "Sky Blue", hex: "#87CEEB", border: "" },
  { key: "grey", label: "Grey", hex: "#cccccc", border: "" },
]

type Props = { defaultExam?: string }

export default function PassportPhotoMaker({ defaultExam }: Props) {
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const validDefault = (defaultExam && defaultExam in EXAM_PRESETS ? defaultExam : "upsc") as ExamKey
  const [examKey, setExamKey] = useState<ExamKey>(validDefault)
  const [dragging, setDragging] = useState(false)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [progressLabel, setProgressLabel] = useState("")
  const [blob, setBlob] = useState<Blob | null>(null)
  const [originalSize, setOriginalSize] = useState(0)
  const [finalSize, setFinalSize] = useState(0)
  const [bgColor, setBgColor] = useState("white")
  const [cropMode, setCropMode] = useState<"face" | "full">("face")
  const [outputPreviewUrl, setOutputPreviewUrl] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState(
    EXAM_PRESETS[validDefault]?.category ?? "Central"
  )
  const [customW, setCustomW] = useState(413)
  const [customH, setCustomH] = useState(531)
  const [customMin, setCustomMin] = useState(10)
  const [customMax, setCustomMax] = useState(40)

  const inputRef = useRef<HTMLInputElement>(null)
  const resultRef = useRef<HTMLDivElement>(null)

  const handleFile = (f: File) => {
    if (!f.type.startsWith("image/")) return
    setFile(f)
    setOriginalSize(f.size)
    setBlob(null)
    setOutputPreviewUrl(null)
    setProgress(0)
    setProgressLabel("")
    const url = URL.createObjectURL(f)
    setPreviewUrl(url)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (f) handleFile(f)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const f = e.dataTransfer.files?.[0]
    if (f) handleFile(f)
  }

  const getBgHex = () => BG_OPTIONS.find(b => b.key === bgColor)?.hex ?? "#ffffff"

  const getPreset = () => {
    const p = EXAM_PRESETS[examKey]
    if (examKey === "custom") return { ...p, w: customW, h: customH, minKB: customMin, maxKB: customMax }
    return p
  }

  const processPhoto = async () => {
    if (!file) return
    setLoading(true)
    setBlob(null)
    setOutputPreviewUrl(null)
    setProgress(0)

    try {
      const preset = getPreset()
      const { w: targetW, h: targetH, minKB, maxKB } = preset

      setProgressLabel("Loading image...")
      setProgress(10)

      const img = await new Promise<HTMLImageElement>((resolve, reject) => {
        const image = new Image()
        image.onload = () => resolve(image)
        image.onerror = reject
        image.src = URL.createObjectURL(file)
      })

      // Compute crop coords
      const srcAspect = img.width / img.height
      const dstAspect = targetW / targetH
      let sx = 0, sy = 0, sw = img.width, sh = img.height
      if (cropMode === "face") {
        sh = Math.min(img.height, img.width / dstAspect)
        sw = sh * dstAspect
        sx = (img.width - sw) / 2
        sy = img.height * 0.05
        if (sy + sh > img.height) sy = img.height - sh
      } else {
        if (srcAspect > dstAspect) { sw = img.height * dstAspect; sx = (img.width - sw) / 2 }
        else { sh = img.width / dstAspect; sy = (img.height - sh) / 2 }
      }

      // AI background removal
      setProgressLabel("Removing background (AI)...")
      setProgress(15)

      const { removeBackground } = await import("@imgly/background-removal")
      const removedBlob = await removeBackground(file, {
        publicPath: "https://unpkg.com/@imgly/background-removal@1.4.5/dist/",
        output: { format: "image/png", quality: 1 },
        progress: (_key: string, current: number, total: number) => {
          if (total > 0) {
            setProgress(15 + Math.round((current / total) * 35))
            setProgressLabel(`AI removing background — ${Math.round((current / total) * 100)}%`)
          }
        },
      })

      setProgressLabel("Composing with new background...")
      setProgress(52)

      // Load transparent PNG result
      const transparentUrl = URL.createObjectURL(removedBlob)
      const transparentImg = await new Promise<HTMLImageElement>((resolve, reject) => {
        const i = new Image()
        i.onload = () => resolve(i)
        i.onerror = reject
        i.src = transparentUrl
      })

      // Draw: solid bg color + cropped subject on top
      const canvas = document.createElement("canvas")
      canvas.width = targetW
      canvas.height = targetH
      const ctx = canvas.getContext("2d")!
      ctx.fillStyle = getBgHex()
      ctx.fillRect(0, 0, targetW, targetH)
      ctx.drawImage(transparentImg, sx, sy, sw, sh, 0, 0, targetW, targetH)
      URL.revokeObjectURL(transparentUrl)

      setOutputPreviewUrl(canvas.toDataURL("image/jpeg", 0.92))

      setProgressLabel("Optimizing file size...")
      setProgress(55)

      let lo = 0.01, hi = 1.0, bestBlob: Blob | null = null
      let iteration = 0

      while (iteration < 20) {
        iteration++
        const mid = (lo + hi) / 2
        const dataUrl = canvas.toDataURL("image/jpeg", mid)
        const byteStr = atob(dataUrl.split(",")[1])
        const arr = new Uint8Array(byteStr.length)
        for (let i = 0; i < byteStr.length; i++) arr[i] = byteStr.charCodeAt(i)
        const currentBlob = new Blob([arr], { type: "image/jpeg" })
        const sizeKB = currentBlob.size / 1024

        setProgress(55 + Math.round((iteration / 20) * 35))
        setProgressLabel(`Optimizing — ${sizeKB.toFixed(1)} KB`)

        if (sizeKB >= minKB && sizeKB <= maxKB) { bestBlob = currentBlob; break }
        if (sizeKB < minKB) lo = mid
        else hi = mid
        bestBlob = currentBlob
      }

      setProgress(100)
      setProgressLabel("Done!")

      if (bestBlob) {
        setBlob(bestBlob)
        setFinalSize(bestBlob.size)
        setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 100)
      }
    } catch (err) {
      console.error(err)
      alert("Something went wrong processing the image.")
    } finally {
      setLoading(false)
    }
  }

  const download = () => {
    if (!blob) return
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${examKey}_photo.jpg`
    a.click()
    URL.revokeObjectURL(url)
  }

  const finalKB = (finalSize / 1024).toFixed(1)
  const originalKB = (originalSize / 1024).toFixed(1)
  const preset = getPreset()
  const filteredExams = (Object.entries(EXAM_PRESETS) as [ExamKey, typeof EXAM_PRESETS[ExamKey]][])
    .filter(([, v]) => v.category === activeCategory)

  return (
    <div className="flex flex-col lg:flex-row gap-4">

      {/* Left: Upload + Preview */}
      <div className="flex-1 flex flex-col gap-3">

        {/* Drop Zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => !previewUrl && inputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl flex flex-col items-center justify-center transition-all dark:bg-[#12121a] bg-white overflow-hidden relative
            ${previewUrl ? "cursor-default h-64 sm:h-72 lg:h-80" : "cursor-pointer h-52 sm:h-60 lg:h-64"}
            ${dragging ? "border-violet-500 bg-violet-500/10" : "border-slate-200 dark:border-white/10 hover:border-violet-500/50"}`}
        >
          <input ref={inputRef} type="file" accept="image/*" onChange={handleInputChange} className="hidden" />
          {previewUrl ? (
            <>
              <img src={previewUrl} alt="Preview" className="w-full h-full object-contain" />
              <div onClick={() => inputRef.current?.click()} className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-white text-sm font-bold">Change Photo</span>
              </div>
            </>
          ) : (
            <>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-violet-600/20 flex items-center justify-center mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-sm sm:text-base font-black mb-1 dark:text-white text-slate-900">Drag & Drop Photo</p>
              <p className="text-slate-500 text-xs mb-3">or click to browse from your computer</p>
              <button className="bg-violet-600 hover:bg-violet-500 text-white px-4 sm:px-5 py-2 rounded-xl font-bold transition text-xs">Select Photo</button>
              <p className="text-slate-500 text-xs mt-2">JPG, PNG, WEBP supported</p>
            </>
          )}
        </div>

        {/* File Info */}
        {file && (
          <div className="dark:bg-[#12121a] bg-white border dark:border-white/10 border-slate-200 rounded-xl px-3 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-violet-600/20 flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-xs dark:text-slate-300 text-slate-700 font-medium truncate max-w-[140px] sm:max-w-[200px]">{file.name}</span>
            </div>
            <span className="text-xs flex-shrink-0">
              {blob ? <span className="text-emerald-400 font-bold">Ready ✓</span> : <span className="text-slate-500">{originalKB} KB</span>}
            </span>
          </div>
        )}

        {/* Progress */}
        {loading && (
          <div className="dark:bg-[#12121a] bg-white border dark:border-white/10 border-slate-200 rounded-xl px-3 py-3">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs dark:text-slate-400 text-slate-500 truncate mr-2">{progressLabel}</span>
              <span className="text-xs font-black text-violet-400 flex-shrink-0">{progress}%</span>
            </div>
            <div className="w-full dark:bg-white/5 bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div className="h-1.5 rounded-full bg-gradient-to-r from-violet-600 to-violet-400 transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}

        {/* Result Stats */}
        {blob && !loading && (
          <div className="dark:bg-[#12121a] bg-white border border-emerald-500/30 rounded-xl px-3 py-3">
            <p className="text-xs font-black dark:text-slate-400 text-slate-500 uppercase tracking-wider mb-2">Result</p>
            <div className="grid grid-cols-4 gap-2 text-center">
              <div><p className="text-xs text-slate-500">Original</p><p className="font-black dark:text-white text-slate-900 text-xs">{originalKB} KB</p></div>
              <div><p className="text-xs text-slate-500">Output</p><p className="font-black text-emerald-400 text-xs">{finalKB} KB</p></div>
              <div><p className="text-xs text-slate-500">Target</p><p className="font-black text-emerald-400 text-xs">{preset.minKB}–{preset.maxKB} KB</p></div>
              <div><p className="text-xs text-slate-500">Size</p><p className="font-black text-violet-400 text-xs">{preset.w}×{preset.h}</p></div>
            </div>
          </div>
        )}

        {/* Output Photo Preview */}
        {outputPreviewUrl && !loading && (
          <div className="dark:bg-[#12121a] bg-white border dark:border-white/10 border-slate-200 rounded-xl p-4">
            <p className="text-xs font-black dark:text-slate-400 text-slate-500 uppercase tracking-wider mb-3">Passport Photo Preview</p>
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center gap-1.5">
                <div className="rounded-sm overflow-hidden shadow-lg border-2 border-white/20" style={{ width: 96, height: preset.w === preset.h ? 96 : 120 }}>
                  <img src={outputPreviewUrl} alt="Passport preview" className="w-full h-full object-cover" />
                </div>
                <span className="text-xs text-slate-500">1×</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <div className="flex gap-0.5">
                  {[0, 1].map(i => (
                    <div key={i} className="rounded-sm overflow-hidden border border-white/10" style={{ width: 56, height: preset.w === preset.h ? 56 : 70 }}>
                      <img src={outputPreviewUrl} alt="" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <div className="flex gap-0.5">
                  {[0, 1].map(i => (
                    <div key={i} className="rounded-sm overflow-hidden border border-white/10" style={{ width: 56, height: preset.w === preset.h ? 56 : 70 }}>
                      <img src={outputPreviewUrl} alt="" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <span className="text-xs text-slate-500 mt-1">Print sheet (4×)</span>
              </div>
              <div className="flex flex-col gap-1 ml-auto text-right">
                <span className="text-xs font-black text-emerald-400">{finalKB} KB</span>
                <span className="text-xs text-slate-500">{preset.w}×{preset.h}px</span>
                <span className="text-xs text-slate-500">{EXAM_PRESETS[examKey].label}</span>
                <span className="text-xs font-bold text-slate-400">{BG_OPTIONS.find(b => b.key === bgColor)?.label} bg</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Right: Controls */}
      <div className="w-full lg:w-72 flex flex-col gap-3">

        {/* Exam Preset Selector */}
        <div className="dark:bg-[#12121a] bg-white border dark:border-white/10 border-slate-200 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="font-black text-sm dark:text-white text-slate-900">Exam Preset</span>
          </div>

          {/* Category tabs */}
          <div className="flex flex-wrap gap-1 mb-3">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-2 py-1 rounded-lg text-xs font-bold transition-all ${
                  activeCategory === cat
                    ? "bg-violet-600 text-white"
                    : "dark:bg-white/5 bg-slate-100 dark:text-slate-400 text-slate-600 hover:bg-violet-500/20 hover:text-violet-400"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Exam list */}
          <div className="flex flex-col gap-1.5 max-h-48 overflow-y-auto pr-1">
            {filteredExams.map(([key, val]) => (
              <div
                key={key}
                onClick={() => setExamKey(key)}
                className={`flex items-center gap-3 p-2.5 rounded-xl cursor-pointer border transition-all ${
                  examKey === key
                    ? "border-violet-500 bg-violet-500/10"
                    : "dark:border-white/5 border-slate-200 dark:bg-white/5 bg-slate-50 hover:border-violet-500/40"
                }`}
              >
                <div className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${examKey === key ? "border-violet-500" : "border-slate-500"}`}>
                  {examKey === key && <div className="w-1.5 h-1.5 rounded-full bg-violet-500" />}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold dark:text-white text-slate-900 truncate">{val.label}</p>
                  <p className="text-xs text-slate-500">{val.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Custom fields */}
          {examKey === "custom" && (
            <div className="mt-3 grid grid-cols-2 gap-2">
              {([
                { label: "Width (px)", val: customW, set: setCustomW },
                { label: "Height (px)", val: customH, set: setCustomH },
                { label: "Min KB", val: customMin, set: setCustomMin },
                { label: "Max KB", val: customMax, set: setCustomMax },
              ] as { label: string; val: number; set: (v: number) => void }[]).map(({ label, val, set }) => (
                <div key={label}>
                  <p className="text-xs text-slate-500 mb-1">{label}</p>
                  <input
                    type="number"
                    value={val}
                    onChange={e => set(Number(e.target.value))}
                    className="w-full dark:bg-[#0a0a0f] bg-slate-100 border dark:border-white/10 border-slate-200 rounded-lg px-2 py-1.5 dark:text-white text-slate-900 text-xs font-bold outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Background Color */}
        <div className="dark:bg-[#12121a] bg-white border dark:border-white/10 border-slate-200 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
            <span className="font-black text-sm dark:text-white text-slate-900">Background Color</span>
          </div>
          <div className="flex gap-2 flex-wrap">
            {BG_OPTIONS.map(({ key, label, hex, border }) => (
              <button
                key={key}
                onClick={() => setBgColor(key)}
                className={`flex flex-col items-center gap-1 py-2 px-3 rounded-xl border transition-all text-xs font-bold flex-1 min-w-[52px]
                  ${bgColor === key ? "border-violet-500 dark:bg-violet-500/10 bg-violet-50 text-violet-400" : "dark:border-white/10 border-slate-200 dark:text-slate-400 text-slate-600 hover:border-violet-500/40"}`}
              >
                <span className={`w-5 h-5 rounded-full block ${border}`} style={{ backgroundColor: hex }} />
                {label}
              </button>
            ))}
          </div>
          <p className="text-xs text-slate-500 mt-2 leading-relaxed">Background is auto-detected from image edges and replaced.</p>
        </div>

        {/* Crop Mode */}
        <div className="dark:bg-[#12121a] bg-white border dark:border-white/10 border-slate-200 rounded-xl p-3">
          <p className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2">Crop Mode</p>
          <div className="flex gap-2">
            {([
              { key: "face" as const, label: "Face Focus", desc: "Top crop" },
              { key: "full" as const, label: "Full Frame", desc: "Center crop" },
            ]).map(({ key, label, desc }) => (
              <button
                key={key}
                onClick={() => setCropMode(key)}
                className={`flex-1 py-2 px-2 rounded-xl border transition-all text-left ${cropMode === key ? "border-violet-500 bg-violet-500/10" : "dark:border-white/5 border-slate-200 dark:bg-white/5 bg-slate-50 hover:border-violet-500/40"}`}
              >
                <p className={`text-xs font-bold ${cropMode === key ? "text-violet-400" : "dark:text-white text-slate-900"}`}>{label}</p>
                <p className="text-xs text-slate-500">{desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Process + Download */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
          <button
            onClick={processPhoto}
            disabled={!file || loading}
            className={`w-full py-3 rounded-2xl font-black text-white text-sm transition-all flex items-center justify-center gap-2 ${
              loading || !file ? "bg-slate-700 cursor-not-allowed text-slate-400" : "bg-violet-600 hover:bg-violet-500 shadow-lg shadow-violet-500/25"
            }`}
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                {progress}% — Processing...
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                Make Passport Photo
              </>
            )}
          </button>

          <div ref={resultRef}>
            <button
              onClick={download}
              disabled={!blob}
              className={`w-full py-3 rounded-2xl font-black text-sm transition-all flex items-center justify-center gap-2 border ${
                blob
                  ? "dark:bg-transparent bg-white border-slate-300 dark:border-white/20 hover:border-violet-400 dark:hover:bg-violet-500/10 hover:bg-violet-50 dark:text-white text-slate-900"
                  : "bg-transparent dark:border-white/10 border-slate-200 dark:text-slate-600 text-slate-400 cursor-not-allowed"
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              {blob ? `Download · ${finalKB} KB` : "Download Photo"}
            </button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto pb-1 lg:overflow-visible">
          {[
            { icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", color: "violet", title: "11 Exam Presets", desc: "UPSC, SSC, IBPS, NEET & more." },
            { icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01", color: "violet", title: "BG Replacement", desc: "Auto-detects & swaps background." },
            { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", color: "emerald", title: "100% Private", desc: "Processed entirely in browser." },
          ].map(({ icon, color, title, desc }) => (
            <div key={title} className="dark:bg-[#12121a] bg-white border dark:border-white/5 border-slate-200 rounded-xl p-3 flex items-center gap-3 min-w-[170px] lg:min-w-0 flex-shrink-0 lg:flex-shrink">
              <div className={`w-8 h-8 rounded-full bg-${color}-600/20 flex items-center justify-center flex-shrink-0`}>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 text-${color}-400`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
                </svg>
              </div>
              <div>
                <p className="font-black text-xs dark:text-white text-slate-900">{title}</p>
                <p className="text-slate-500 text-xs">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}