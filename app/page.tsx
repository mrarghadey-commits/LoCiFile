"use client";
import { Cpu, FileText, Images, Minimize, ShieldCheck, Zap } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className=' cursor-pointer'>
      <section className="relative md:pt-14 py-5 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1
            className="text-4xl sm:text-7xl font-bold tracking-tighter md:mb-8 mb-3 bg-linear-to-b dark:from-white dark:to-white/10 from-black to-black/10 bg-clip-text text-transparent">
            Fast &amp; Private <br /> <span className=" text-primary">Online File Tools</span>
          </h1>
          <p className="text-lg md:text-xl dark:text-slate-400 text-slate-800 mb-0 max-w-3xl mx-auto font-light leading-relaxed">
            Experience the power of a <span className="dark:text-slate-200 text-slate-500 font-semibold ">secure PDF
              compressor</span>, <span className="dark:text-slate-200 text-slate-500 font-semibold">image
                resizer</span>, and converter that runs entirely in your browser. <span
                  className="text-primary font-bold italic">No upload required</span>—your files never leave
            your device.
          </p>
        </div>
      </section>
      <section className="md:py-10 px-6 lg:px-20 max-w-7xl mx-auto" id="tools">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between md:mb-12 mb-5 gap-4">
          <div>
            <h2 className="md:text-3xl text-xl font-bold mb-2">Essential Browser-Based Tools</h2>
            <p className="text-slate-400">Optimized WebAssembly workflows for your most frequent document needs.
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/10 border  rounded-full border-slate-200  dark:border-primary/50">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-primary">Powered by</span>
            <div className="flex items-center gap-1 bg-primary px-2 py-0.5 rounded-md">
              <span className="text-[11px] font-bold text-white">WASM</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href='/image-compressor' className=" md:p-8 p-4 rounded-2xl group bg-white dark:bg-primary/5 border dark:border-primary/50 border-slate-200 shadow-sm">
            <div className="md:mb-6 mb-3 flex justify-between items-start">
              <div
                className="w-14 h-14 rounded-xl dark:bg-green-500/20 bg-emerald-50 flex items-center justify-center border border-emerald-100 dark:border-green-500/30">
                <Minimize size={30} className='text-emerald-600 ' />
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="flex gap-2">
                  <button
                    className="text-[10px] uppercase tracking-wider font-bold dark:bg-white/5 bg-slate-50 hover:bg-primary px-3 py-1 rounded-full border border-slate-200 dark:border-white/10 transition-colors">WEBP</button>
                  <button
                    className="text-[10px] uppercase tracking-wider font-bold dark:bg-white/5 bg-slate-50 hover:bg-primary px-3 py-1 rounded-full border border-slate-200 dark:border-white/10  transition-colors">JPG</button>
                  <button
                    className="text-[10px] uppercase tracking-wider font-bold dark:bg-white/5 bg-slate-50 hover:bg-primary px-3 py-1 rounded-full border border-slate-200 dark:border-white/10  transition-colors">PNG</button>
                </div>
                <span className="text-[9px] font-bold text-green-600 tracking-widest uppercase">Local
                  WASM Node</span>
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-slate-50">Image Compressor</h3>
            <p className="text-slate-400 text-sm leading-relaxed md:mb-6 mb-2">Shrink images by up to 90% instantly. Our
              local WASM engine maintains stunning visual clarity without any data upload.</p>
            <div className="h-1 hidden sm:block w-full dark:bg-white/5 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-green-500/50 w-0 group-hover:w-full group-active:w-full transition-all duration-700">
              </div>
            </div>
          </Link>
          <Link href='/pdf-compressor' className=" md:p-8 p-4 rounded-2xl group bg-white dark:bg-primary/5 border dark:border-primary/50 border-slate-200 shadow-sm">
            <div className="md:mb-6 mb-3 flex justify-between items-start">
              <div
                className="w-14 h-14 rounded-xl dark:bg-red-500/20 bg-rose-50 flex items-center justify-center border dark:border-red-500/30 border-rose-100">
                <FileText className='text-rose-600 dark:text-red-600' />
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="flex gap-2">
                  <button
                    className="text-[10px] uppercase tracking-wider font-bold bg-white/5 hover:bg-primary px-3 py-1 rounded-full border border-white/10 transition-colors">100KB</button>
                  <button
                    className="text-[10px] uppercase tracking-wider font-bold bg-white/5 hover:bg-primary px-3 py-1 rounded-full border border-white/10 transition-colors">200KB</button>
                </div>
                <span className="text-[9px] font-bold text-red-500/60 tracking-widest uppercase">Local WASM
                  Node</span>
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-slate-50">PDF Compressor</h3>
            <p className="text-slate-400 text-sm leading-relaxed md:mb-6 mb-2">Reduce PDF file size for web or email.
              100% private processing ensures your sensitive documents never reach a server.</p>
            <div className="hidden sm:block h-1 w-full dark:bg-white/5 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full dark:bg-red-500/50 bg-rose-500 w-0 group-hover:w-full group-active:w-full transition-all duration-700"></div>
            </div>
          </Link>
          <div className=" md:p-8 p-4 rounded-2xl group bg-white dark:bg-primary/5 border dark:border-primary/50 border-slate-200 shadow-sm ">
            <div className="md:mb-6 mb-3 flex justify-between items-start">
              <div
                className="w-14 h-14 rounded-xl dark:bg-blue-500/20 bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-500/30">
                <Images />
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="flex gap-2">
                  <button
                    className="text-[10px] uppercase tracking-wider font-bold bg-white/5 hover:bg-primary px-3 py-1 rounded-full border border-white/10 transition-colors">Passport</button>
                  <button
                    className="text-[10px] uppercase tracking-wider font-bold bg-white/5 hover:bg-primary px-3 py-1 rounded-full border border-white/10 transition-colors">PNG</button>
                </div>
                <span className="text-[9px] font-bold text-blue-500/60 tracking-widest uppercase">Local WASM
                  Node</span>
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-slate-50">Image Resizer</h3>
            <p className="text-slate-400 text-sm leading-relaxed md:mb-6 mb-2">Auto-resize images for Government forms,
              IDs, and passports with precise dimensions using high-speed browser compute.</p>
            <div className="hidden sm:block h-1 w-full dark:bg-white/5 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full dark:bg-blue-500/50 bg-blue-600 w-0 group-hover:w-full group-active:w-full transition-all duration-700"></div>
            </div>
          </div>
        </div>
      </section>
      <section className="md:py-24 py-4 px-6 lg:px-20 max-w-7xl mx-auto" id="how-it-works">
        <div className="grid lg:grid-cols-2 md:gap-16 gap-8 items-center">
          <div>
            <h2 className="md:text-4xl text-2xl font-bold md:mb-8 mb-4">How it Works: No-Upload Processing</h2>
            <div className="md:space-y-8 space-y-3">
              <div className="flex gap-6">
                <div
                  className="w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center font-bold text-primary shrink-0">
                  1</div>
                <div>
                  <h4 className="text-lg font-bold mb-1">Select Your Files</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">Choose your PDF, JPG, or PNG
                    files. They are loaded directly into your browser's memory, never sent to our
                    servers.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div
                  className="w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center font-bold text-primary shrink-0">
                  2</div>
                <div>
                  <h4 className="text-lg font-bold mb-1">WebAssembly (WASM) Magic</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">Our advanced WASM engine executes
                    near-native performance code right in your browser tab to process the file
                    instantly.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div
                  className="w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center font-bold text-primary shrink-0">
                  3</div>
                <div>
                  <h4 className="text-lg font-bold mb-1">Instant Download</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">Get your processed file
                    immediately. Since no upload or download from a server is required, it's
                    lightning fast.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="glass md:p-10 rounded-3xl border-primary/20">
            <h3 className="text-2xl font-bold md:mb-6 mb-3">Frequently Asked Questions</h3>
            <div className="md:space-y-6 space-y-3">
              <div>
                <h5 className="font-bold dark:text-slate-200 text-slate-600 mb-2">Is it really secure?</h5>
                <p className="text-slate-400 text-sm">Yes. Because we use WebAssembly (WASM), all processing
                  happens locally on your computer. Your data never leaves your browser.</p>
              </div>
              <div>
                <h5 className="font-bold dark:text-slate-200 text-slate-600 mb-2">Do I need to install anything?</h5>
                <p className="text-slate-400 text-sm">No installation required. It works in any modern web
                  browser that supports WASM (Chrome, Safari, Edge, Firefox).</p>
              </div>
              <div>
                <h5 className="font-bold dark:text-slate-200 text-slate-600 mb-2">Why is it faster than other tools?</h5>
                <p className="text-slate-400 text-sm">Traditional tools require you to upload your file,
                  wait for server processing, and then download. We skip the network delay entirely.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="md:py-24 py-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 -z-10"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <div className="grid lg:grid-cols-2 md:gap-16 gap-2 items-center">
            <div className="md:space-y-8 space-y-2">
              <h2 className="md:text-4xl text-2xl font-bold tracking-tight">Engineered for Performance</h2>
              <p className="text-slate-400 text-lg leading-relaxed">
                Our proprietary engine processes files at the edge of your browser, ensuring zero lag
                and maximum security for your sensitive documents.
              </p>
              <div className="md:space-y-6 space-y-2">
                <div className="flex gap-6">
                  <div
                    className="shrink-0 w-12 h-12 rounded-xl bg-white/20 dark:bg-primary/20 border border-slate-200 shadow-sm dark:border-primary/30 flex items-center justify-center">
                    <Zap className='text-primary' />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1 text-slate-900 dark:text-slate-50">WASM Lightning Speed</h4>
                    <p className="text-slate-400 text-sm">Sub-millisecond processing using near-native
                      WebAssembly performance code.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div
                    className="shrink-0 w-12 h-12 rounded-xl bg-white/20 dark:bg-primary/20 border dark:border-primary/30 shadow-sm border-slate-200 flex items-center justify-center">
                    <ShieldCheck className='text-primary' />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1">Privacy by Design</h4>
                    <p className="text-slate-400 text-sm">Zero data collection. Your files never touch a
                      server, providing ultimate peace of mind.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div
                className=" p-8 pb-24 rounded-3xl aspect-square flex flex-col items-center justify-center border-primary/20 glow-border overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10">
                  <div
                    className="w-full h-full bg-[linear-gradient(45deg,transparent_25%,rgba(109,19,236,0.2)_50%,transparent_75%)] bg-size-[20px_20px]">
                  </div>
                </div>
                <div className="relative z-10 text-center flex flex-col justify-center items-center">
                  <Cpu size={100} className='text-primary drop-shadow-sm mb-4' />
                  <div className="text-5xl font-black mb-2">WASM</div>
                  <div className="text-slate-400 font-medium tracking-widest uppercase text-sm">Native
                    Browser Execution</div>
                </div>
              </div>
              <div
                className="absolute -bottom-4 -right-6 p-6 rounded-2xl shadow-2xl border border-primary/40 ">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-xs md:text-lg font-bold dark:text-slate-300 text-slate-500">PRIVACY STATUS</span>
                </div>
                <div className="text-[12px] text-slate-500 leading-tight">100% Client-side. No network
                  requests for file processing.</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="md:py-20 py-5 px-6">
        <div
          className="max-w-5xl mx-auto glass p-8 md:p-20 rounded-[3rem] text-center border-primary/20 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full h-full bg-linear-to-br from-primary/10 to-transparent -z-10">
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to fix your files?</h2>
          <p className="text-slate-500 mb-10 max-w-xl mx-auto">Join 50,000+ users who process millions of
            documents every month with LociFile secure browser tools.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => {
                document.getElementById("tools")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-primary hover:bg-primary/90 text-white px-10 py-4 rounded-xl font-bold transition-all shadow-xl shadow-primary/30">
              Get Started for Free
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default page