"use client"

import { useState, useRef } from "react"
import { PDFDocument } from "pdf-lib"

export default function Page() {
  const [file, setFile] = useState<File | null>(null)
  const [targetKB, setTargetKB] = useState<number | string>(190)
  const [original, setOriginal] = useState(0)
  const [compressed, setCompressed] = useState(0)
  const [blob, setBlob] = useState<Blob | null>(null)
  const [loading, setLoading] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [dark, setDark] = useState(true)
  const resultRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const t = {
    bg: dark ? "bg-[#0d1117]" : "bg-slate-100",
    card: dark ? "bg-[#161b22]" : "bg-white",
    border: dark ? "border-white/10" : "border-slate-200",
    text: dark ? "text-white" : "text-slate-900",
    subtext: dark ? "text-slate-400" : "text-slate-500",
    input: dark ? "bg-[#0d1117] text-white border-white/10" : "bg-slate-100 text-slate-900 border-slate-300",
    uploadBorder: dark ? "border-white/20 hover:border-indigo-400" : "border-slate-300 hover:border-indigo-400",
    uploadHover: dark ? "hover:bg-white/5" : "hover:bg-indigo-50",
    navBorder: dark ? "border-white/10" : "border-slate-200",
    navBg: dark ? "bg-[#0d1117]" : "bg-white",
  }

  const handleFile = (f: File) => {
    setFile(f)
    setOriginal(f.size)
    setBlob(null)
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

  const compressPDF = async () => {
    if (!file) return
    setLoading(true)
    try {
      const pdfjsLib = await import("pdfjs-dist")
      pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`

      const buffer = await file.arrayBuffer()
      const pdf = await pdfjsLib.getDocument({ data: buffer }).promise

      let quality = 0.85
      let scale = 1.5
      let resultBlob: Blob | null = null

      while (true) {
        const newPdf = await PDFDocument.create()
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i)
          const viewport = page.getViewport({ scale })
          const canvas = document.createElement("canvas")
          const ctx = canvas.getContext("2d")
          if (!ctx) continue
          canvas.width = viewport.width
          canvas.height = viewport.height
          ctx.imageSmoothingEnabled = true
          ctx.imageSmoothingQuality = "high"
          await (page as any).render({ canvasContext: ctx as any, viewport: viewport as any, intent: "display" }).promise
          const imgData = canvas.toDataURL("image/jpeg", quality)
          const jpg = await newPdf.embedJpg(imgData)
          const p = newPdf.addPage([viewport.width, viewport.height])
          p.drawImage(jpg, { x: 0, y: 0, width: viewport.width, height: viewport.height })
        }
        const bytes = await newPdf.save()
        const currentBlob = new window.Blob([bytes as any], { type: "application/pdf" })
        resultBlob = currentBlob
        if (currentBlob.size / 1024 <= Number(targetKB)) break
        if (quality <= 0.3 && scale <= 0.7) break
        if (quality > 0.4) quality -= 0.1
        else scale -= 0.2
      }

      if (resultBlob) {
        setBlob(resultBlob)
        setCompressed(resultBlob.size)
        setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 100)
      }
    } catch (error) {
      console.error("Compression Error:", error)
      alert("An error occurred. Check the console for details.")
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
    ? Math.round(((original - compressed) / original) * 100)
    : 0

  return (
    <div className={`min-h-screen ${t.bg} ${t.text} flex flex-col transition-colors duration-300`}>

      {/* Navbar */}
      <nav className={`flex items-center justify-between px-8 py-4 border-b ${t.navBorder} ${t.navBg} transition-colors duration-300`}>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-indigo-500 flex items-center justify-center text-xs font-black text-white">L</div>
          <span className={`font-black text-lg tracking-tight ${t.text}`}>LoCiFile</span>
        </div>
        <div className={`flex items-center gap-6 text-sm ${t.subtext}`}>
          {/* Home */}
          <a href="#" className={`flex items-center gap-1 hover:text-indigo-400 transition`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7m-9 5v6h4v-6m-4 0H5a2 2 0 01-2-2V10" />
            </svg>
            Home
          </a>
          {/* Image Tool */}
          <a href="#" className={`flex items-center gap-1 hover:text-indigo-400 transition`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Image Tool
          </a>
          {/* PDF Tool */}
          <a href="#" className={`flex items-center gap-1 text-indigo-400 font-semibold`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            PDF Tool
          </a>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={() => setDark(!dark)}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all border ${
            dark
              ? "bg-[#161b22] border-white/10 hover:bg-[#252b3b] text-yellow-400"
              : "bg-slate-200 border-slate-300 hover:bg-slate-300 text-slate-700"
          }`}
        >
          {dark ? (
            // Sun icon
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m8.66-9h-1M4.34 12h-1m15.07-6.07-.707.707M6.343 17.657l-.707.707m12.728 0-.707-.707M6.343 6.343l-.707-.707M12 5a7 7 0 100 14A7 7 0 0012 5z" />
            </svg>
          ) : (
            // Moon icon
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
            </svg>
          )}
        </button>
      </nav>

      {/* Main Content */}
      <div className="flex flex-1 gap-6 p-8 max-w-6xl mx-auto w-full">

        {/* Left: Upload Zone */}
        <div className="flex-1 flex flex-col gap-4">
          <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            className={`flex-1 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all min-h-64 ${
              dragging ? "border-indigo-400 bg-indigo-500/10" : `${t.uploadBorder} ${t.uploadHover}`
            }`}
          >
            <input ref={inputRef} type="file" accept="application/pdf" onChange={handleInputChange} className="hidden" />

            {/* Upload SVG Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-indigo-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>

            {file ? (
              <p className="text-indigo-400 font-bold text-lg">{file.name}</p>
            ) : (
              <>
                <p className={`font-bold text-lg mb-2 ${t.text}`}>Drag & drop a PDF here or click to upload</p>
                <p className={`text-sm mb-6 ${t.subtext}`}>Supports PDF files · Max 50MB</p>
                <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-lg font-bold transition">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                  Select PDF
                </button>
              </>
            )}
          </div>

          {/* Bottom Previews */}
          <div className="grid grid-cols-2 gap-4">
            <div className={`${t.card} rounded-xl p-4 border ${t.border} transition-colors duration-300`}>
              <div className="flex items-center justify-between mb-3">
                <span className={`text-xs font-black uppercase tracking-wider ${t.subtext}`}>Original</span>
                {original > 0 && (
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${dark ? "bg-slate-700 text-slate-300" : "bg-slate-200 text-slate-600"}`}>
                    {(original / 1024).toFixed(0)} KB
                  </span>
                )}
              </div>
              <div className={`h-24 flex items-center justify-center ${t.subtext}`}>
                {file ? (
                  <div className="text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto mb-1 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <p className={`text-xs truncate max-w-[120px] ${t.subtext}`}>{file.name}</p>
                  </div>
                ) : (
                  <span className="text-xs">No file selected</span>
                )}
              </div>
            </div>

            <div className={`${t.card} rounded-xl p-4 border ${t.border} transition-colors duration-300`}>
              <div className="flex items-center justify-between mb-3">
                <span className={`text-xs font-black uppercase tracking-wider ${t.subtext}`}>Compressed</span>
                {compressed > 0 && (
                  <span className="bg-emerald-900/60 text-emerald-400 text-xs font-bold px-2 py-0.5 rounded">
                    {(compressed / 1024).toFixed(0)} KB
                  </span>
                )}
              </div>
              <div className={`h-24 flex items-center justify-center ${t.subtext}`}>
                {blob ? (
                  <div className="text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto mb-1 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-xs text-emerald-400 font-bold">Saved {savings}%</p>
                  </div>
                ) : (
                  <span className="text-xs">Awaiting compression</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-72 flex flex-col gap-4">

          {/* Target Size Slider */}
          <div className={`${t.card} rounded-2xl p-5 border ${t.border} transition-colors duration-300`}>
            <div className="flex items-center justify-between mb-1">
              <span className={`text-xs font-black uppercase tracking-wider ${t.subtext}`}>Target Size</span>
              <span className="text-indigo-400 font-black text-sm">{targetKB} KB</span>
            </div>
            <div className={`flex items-center gap-3 ${dark ? "bg-[#0d1117]" : "bg-slate-100"} rounded-xl px-4 py-3 mb-4`}>
              <span className={`text-xs ${t.subtext}`}>50</span>
              <input
                type="range"
                min={50}
                max={2000}
                value={Number(targetKB)}
                onChange={(e) => setTargetKB(Number(e.target.value))}
                className="flex-1 accent-indigo-500 cursor-pointer"
              />
              <span className={`text-xs ${t.subtext}`}>2000</span>
            </div>
            <input
              type="number"
              value={targetKB}
              onChange={(e) => {
                const val = e.target.value
                setTargetKB(val === "" ? "" : Number(val))
              }}
              onBlur={(e) => { if (!e.target.value) setTargetKB(190) }}
              className={`w-full border rounded-xl px-4 py-2 text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300 ${t.input}`}
              placeholder="Enter KB manually"
            />
          </div>

          {/* Compress Button */}
          <button
            onClick={compressPDF}
            disabled={!file || loading}
            className={`w-full py-4 rounded-2xl font-black text-white text-sm transition-all flex items-center justify-center gap-2 ${
              loading || !file
                ? "bg-slate-700 cursor-not-allowed text-slate-400"
                : "bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-500/20"
            }`}
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                Optimizing...
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Compress Now
              </>
            )}
          </button>

          {/* Download Button */}
          <div ref={resultRef}>
            <button
              onClick={download}
              disabled={!blob}
              className={`w-full py-4 rounded-2xl font-black text-sm transition-all flex items-center justify-center gap-2 ${
                blob
                  ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                  : `${t.card} ${t.subtext} cursor-not-allowed border ${t.border}`
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              {blob ? `Download PDF · ${(compressed / 1024).toFixed(1)} KB` : "Download"}
            </button>
          </div>

          {/* Privacy Card */}
          <div className={`${t.card} rounded-2xl p-5 border ${t.border} mt-auto transition-colors duration-300`}>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <p className={`font-black text-sm mb-1 ${t.text}`}>Privacy Guarantee</p>
                <p className={`text-xs leading-relaxed ${t.subtext}`}>
                  Processing happens locally in your browser. Your data is never uploaded to any server.
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          {blob && (
            <div className={`${t.card} rounded-2xl p-5 border border-emerald-500/20 transition-colors duration-300`}>
              <p className={`text-xs font-black uppercase tracking-wider mb-3 ${t.subtext}`}>Result</p>
              <div className="flex justify-between items-center mb-2">
                <span className={`text-xs ${t.subtext}`}>Original</span>
                <span className={`text-xs font-bold ${t.text}`}>{(original / 1024).toFixed(1)} KB</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className={`text-xs ${t.subtext}`}>Compressed</span>
                <span className="text-xs font-bold text-emerald-400">{(compressed / 1024).toFixed(1)} KB</span>
              </div>
              <div className="flex justify-between items-center">
                <span className={`text-xs ${t.subtext}`}>Saved</span>
                <span className="text-xs font-black text-emerald-400">{savings}%</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}