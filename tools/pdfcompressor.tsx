"use client"

import { useState, useRef } from "react"
import { PDFDocument } from "pdf-lib"

export default function CompressTool() {
  const [file, setFile] = useState<File | null>(null)
  const [targetKB, setTargetKB] = useState<number | string>(150)
  const [preset, setPreset] = useState<"100" | "200" | "custom">("custom")
  const [original, setOriginal] = useState(0)
  const [compressed, setCompressed] = useState(0)
  const [blob, setBlob] = useState<Blob | null>(null)
  const [loading, setLoading] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [progress, setProgress] = useState(0)
  const [progressLabel, setProgressLabel] = useState("")
  const resultRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = (f: File) => {
    setFile(f)
    setOriginal(f.size)
    setBlob(null)
    setProgress(0)
    setProgressLabel("")
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (f) handleFile(f)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const f = e.dataTransfer.files?.[0]
    if (f && f.type === "application/pdf") handleFile(f)
  }

  const handlePreset = (p: "100" | "200" | "custom") => {
    setPreset(p)
    if (p === "100") setTargetKB(100)
    else if (p === "200") setTargetKB(200)
  }

  const compressPDF = async () => {
    if (!file) return
    setLoading(true)
    setProgress(0)
    setBlob(null)

    try {
      setProgressLabel("Loading PDF...")
      setProgress(5)
      const pdfjsLib = await import("pdfjs-dist")
      pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`
      const buffer = await file.arrayBuffer()
      const pdf = await pdfjsLib.getDocument({ data: buffer }).promise

      setProgressLabel("Analyzing pages...")
      setProgress(10)

      const targetNum = Number(targetKB)
      let bestBlob: Blob | null = null
      let resultBlob: Blob | null = null
      let iteration = 0
      const maxIterations = 30

      // Start at high quality, step down aggressively toward target
      let quality = 0.92
      let scale = 1.2

      while (iteration < maxIterations) {
        iteration++
        const newPdf = await PDFDocument.create()

        for (let i = 1; i <= pdf.numPages; i++) {
          const pageProgress = 10 + Math.round((iteration / maxIterations) * 72)
          setProgress(Math.min(pageProgress, 84))
          setProgressLabel(`Pass ${iteration} — page ${i}/${pdf.numPages}`)

          const page = await pdf.getPage(i)
          const viewport = page.getViewport({ scale })
          const canvas = document.createElement("canvas")
          const ctx = canvas.getContext("2d")
          if (!ctx) continue
          canvas.width = viewport.width
          canvas.height = viewport.height
          ctx.imageSmoothingEnabled = true
          ctx.imageSmoothingQuality = "high"
          await (page as any).render({
            canvasContext: ctx as any,
            viewport: viewport as any,
            intent: "display",
          }).promise
          const imgData = canvas.toDataURL("image/jpeg", quality)
          const jpg = await newPdf.embedJpg(imgData)
          const p = newPdf.addPage([viewport.width, viewport.height])
          p.drawImage(jpg, { x: 0, y: 0, width: viewport.width, height: viewport.height })
        }

        setProgressLabel("Saving...")
        setProgress(85)
        const bytes = await newPdf.save()
        const currentBlob = new window.Blob([bytes as any], { type: "application/pdf" })
        const sizeKB = currentBlob.size / 1024
        const savings = Math.round(((file.size - currentBlob.size) / file.size) * 100)

        if (!bestBlob || currentBlob.size < bestBlob.size) bestBlob = currentBlob
        resultBlob = currentBlob

        setProgressLabel(`${sizeKB.toFixed(1)} KB — Saved ${savings > 0 ? savings : 0}%`)

        // Hit target — stop
        if (sizeKB <= targetNum) break

        // Can't compress further
        if (quality <= 0.05 && scale <= 0.3) break

        // Aggressively reduce quality first, then scale
        if (quality > 0.5) {
          quality = Math.max(quality - 0.12, 0.05)
        } else if (quality > 0.2) {
          quality = Math.max(quality - 0.08, 0.05)
          scale = Math.max(scale - 0.1, 0.3)
        } else {
          scale = Math.max(scale - 0.15, 0.3)
          quality = Math.max(quality - 0.03, 0.05)
        }
      }

      setProgress(100)
      setProgressLabel("Done!")
      const finalBlob = bestBlob || resultBlob
      if (finalBlob) {
        setBlob(finalBlob)
        setCompressed(finalBlob.size)
        setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 100)
      }
    } catch (error) {
      console.error("Compression Error:", error)
      alert("An error occurred.")
    } finally {
      setLoading(false)
    }
  }

  const download = () => {
    if (!blob) return
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `compressed_${file?.name || "file.pdf"}`
    a.click()
    URL.revokeObjectURL(url)
  }

  const savings = original > 0 && compressed > 0
    ? Math.round(((original - compressed) / original) * 100) : 0

  const featureCards = [
    { icon: "M13 10V3L4 14h7v7l9-11h-7z", color: "violet", title: "Instant Speed", desc: "Milliseconds, not minutes." },
    { icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z", color: "violet", title: "Smart Reduction", desc: "Optimizes text and images separately." },
    { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", color: "emerald", title: "Privacy Guarantee", desc: "Never uploaded to any server." },
  ]

  return (
    <div className="flex gap-4">

      {/* Left: Upload + Results + Feature Cards */}
      <div className="flex-1 flex flex-col gap-3">

        {/* Drop Zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all dark:bg-[#12121a] bg-white h-64 ${
            dragging ? "border-violet-500 bg-violet-500/10" : "border-slate-200 dark:border-white/10 hover:border-violet-500/50"
          }`}
        >
          <input ref={inputRef} type="file" accept="application/pdf" onChange={handleInputChange} className="hidden" />
          <div className="w-12 h-12 rounded-xl bg-violet-600/20 flex items-center justify-center mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-base font-black mb-1 dark:text-white text-slate-900">Drag & Drop PDF</p>
          <p className="text-slate-500 text-xs mb-3">or click to browse from your computer</p>
          <button className="bg-violet-600 hover:bg-violet-500 text-white px-5 py-2 rounded-xl font-bold transition text-xs">
            Select Files
          </button>
          <p className="text-slate-500 text-xs mt-2">Maximum file size: 50MB</p>
        </div>

        {/* File Info */}
        {file && (
          <div className="dark:bg-[#12121a] bg-white border dark:border-white/10 border-slate-200 rounded-xl px-3 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-violet-600/20 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-xs dark:text-slate-300 text-slate-700 font-medium truncate max-w-[180px]">{file.name}</span>
            </div>
            <span className="text-xs">
              {blob ? <span className="text-emerald-400 font-bold">Compressed ✓</span> : <span className="text-slate-500">Ready</span>}
            </span>
          </div>
        )}

        {/* Progress */}
        {loading && (
          <div className="dark:bg-[#12121a] bg-white border dark:border-white/10 border-slate-200 rounded-xl px-3 py-3">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs dark:text-slate-400 text-slate-500">{progressLabel}</span>
              <span className="text-xs font-black text-violet-400">{progress}%</span>
            </div>
            <div className="w-full dark:bg-white/5 bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div
                className="h-1.5 rounded-full bg-gradient-to-r from-violet-600 to-violet-400 transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Result Stats */}
        {blob && !loading && (
          <div className="dark:bg-[#12121a] bg-white border border-emerald-500/30 rounded-xl px-3 py-3">
            <p className="text-xs font-black dark:text-slate-400 text-slate-500 uppercase tracking-wider mb-2">Result</p>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <p className="text-xs text-slate-500">Original</p>
                <p className="font-black dark:text-white text-slate-900 text-xs">{(original / 1024).toFixed(1)} KB</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Compressed</p>
                <p className="font-black text-emerald-400 text-xs">{(compressed / 1024).toFixed(1)} KB</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Saved</p>
                <p className="font-black text-emerald-400 text-xs">{savings}%</p>
              </div>
            </div>
          </div>
        )}

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {featureCards.map(({ icon, color, title, desc }) => (
            <div key={title} className="dark:bg-[#12121a] bg-white border dark:border-white/5 border-slate-200 rounded-xl p-3 flex items-center gap-3">
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

      {/* Right: Controls */}
      <div className="w-72 flex flex-col gap-3">

        {/* Presets */}
        <div className="dark:bg-[#12121a] bg-white border dark:border-white/10 border-slate-200 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            <span className="font-black text-sm dark:text-white text-slate-900">Optimization Presets</span>
          </div>

          {[
            { key: "100" as const, label: "Target 100KB", desc: "Aggressive compression, for email attachments" },
            { key: "200" as const, label: "Target 200KB", desc: "High quality balance for web uploads" },
          ].map(({ key, label, desc }) => (
            <div
              key={key}
              onClick={() => handlePreset(key)}
              className={`flex items-center gap-3 p-2.5 rounded-xl mb-2 cursor-pointer border transition-all ${
                preset === key
                  ? "border-violet-500 bg-violet-500/10"
                  : "dark:border-white/5 border-slate-200 dark:bg-white/5 bg-slate-50 hover:border-violet-500/40"
              }`}
            >
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${preset === key ? "border-violet-500" : "border-slate-500"}`}>
                {preset === key && <div className="w-2 h-2 rounded-full bg-violet-500" />}
              </div>
              <div>
                <p className="text-xs font-bold dark:text-white text-slate-900">{label}</p>
                <p className="text-xs text-slate-500">{desc}</p>
              </div>
            </div>
          ))}

          <p className="text-xs font-black text-slate-400 uppercase tracking-wider mb-1.5">Custom Size</p>
          <div className="relative">
            <input
              type="number"
              value={targetKB}
              onChange={(e) => {
                const val = e.target.value
                setTargetKB(val === "" ? "" : Number(val))
                setPreset("custom")
              }}
              onBlur={(e) => { if (!e.target.value) setTargetKB(150) }}
              onClick={() => setPreset("custom")}
              className="w-full dark:bg-[#0a0a0f] bg-slate-100 border dark:border-white/10 border-slate-200 rounded-xl px-3 py-2.5 dark:text-white text-slate-900 text-sm font-bold outline-none focus:ring-2 focus:ring-violet-500 pr-12"
              placeholder="150"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs font-bold">KB</span>
          </div>
        </div>

        {/* Compress Button */}
        <button
          onClick={compressPDF}
          disabled={!file || loading}
          className={`w-full py-3 rounded-2xl font-black text-white text-sm transition-all flex items-center justify-center gap-2 ${
            loading || !file
              ? "bg-slate-700 cursor-not-allowed text-slate-400"
              : "bg-violet-600 hover:bg-violet-500 shadow-lg shadow-violet-500/25"
          }`}
        >
          {loading ? (
            <>
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              {progress}% — Optimizing...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Compress PDF
            </>
          )}
        </button>

        {/* Download Button */}
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
            {blob ? `Download PDF · ${(compressed / 1024).toFixed(1)} KB` : "Download Processed PDF"}
          </button>
        </div>

      </div>
    </div>
  )
}