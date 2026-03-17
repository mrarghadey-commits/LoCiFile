import CompressTool from "../../tools/pdfcompressor"

export default function Page() {
  return (
    <div className="h-screen dark:bg-[#0a0a0f] bg-slate-100 dark:text-white text-slate-900 flex flex-col overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 py-4 w-full flex flex-col h-full">
        <div className="text-center mb-4">
          <h1 className="text-3xl font-black tracking-tight">LoCiFiLe PDF Compressor</h1>
          <p className="dark:text-slate-400 text-slate-500 text-sm mt-1">
            Reduce file size without losing quality. Fast, secure, and completely free.
          </p>
        </div>
        <div className="flex-1 min-h-0">
          <CompressTool />
        </div>
      </div>
    </div>
  )
}