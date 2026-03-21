import CompressTool from "../../tools/pdfcompressor"

export default function Page() {
  return (
    <div className="min-h-screen dark:bg-[#0a0a0f] bg-slate-100 dark:text-white text-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6 w-full">
        <div className="text-center mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">LoCiFiLe PDF Compressor</h1>
          <p className="dark:text-slate-400 text-slate-500 text-sm mt-1">
            Reduce file size without losing quality. Fast, secure, and completely free.
          </p>
        </div>
        <CompressTool />
      </div>
    </div>
  )
}