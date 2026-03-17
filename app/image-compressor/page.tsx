"use client"
import { useRef, useState } from "react";
import { compressToTarget } from "@/tools/imagecompression";
import { CircleUserIcon, CloudUpload, Download, FileImage, Hd, Loader, ShieldCheck, SlidersHorizontal, SlidersHorizontalIcon, WandSparkles, Zap } from "lucide-react";
import Image from "next/image";

export default function Page() {
  const [target, setTarget] = useState(50);
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState('')
  const [url, setUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [oriSize, setOriSize] = useState(0);
  const [newSize, setNewSize] = useState(0);
  const [progress, setprogress] = useState(false)
  const inputRef = useRef(null)
  const [dragging, setDragging] = useState(false)
  const [completed, setCompleted] = useState(50)

  function uploadHandle(file: File | undefined){
    if (!file) return;
    setPreview('')
    setFileName('')
    setUrl('')
    setNewSize(0)
    setCompleted(0)
    setFile(file);
    setPreview(URL.createObjectURL(file));
    setOriSize(file.size / 1024)
  }
  async function compress(file: File) {
    if (!file || target < 0) {
      return
    }
    setprogress(true)
    const compressed = await compressToTarget(file, target, (p)=> setCompleted(p)) // compressed under 100 KB
    console.log(compressed)
    setNewSize(compressed.size / 1024)
    setUrl(URL.createObjectURL(compressed));
    setFileName(compressed.name);
    setprogress(false)
  }

  return (
    <div className=" w-full flex gap-3 flex-col px-20 p-10 ">
      <div className="mb-10 w-full">
        <div className="flex items-center gap-2 mb-2">
          <span className=" uppercase text-primary bg-primary/20 text-[10px] font-bold px-2 py-0.5 tracking-widest rounded">Secure WASM</span>
          <span className="bg-emerald-500/20 text-emerald-400 uppercase font-bold text-[10px] px-2 py-0.5 tracking-widest rounded ">Local Processing</span>
        </div>
        <h1 className="text-5xl font-bold mb-4">Professional Image Compressor</h1>
        <p className=" text-slate-400 max-w-2xl text-lg">Private, local-first processing. Your photos never leave your browser, ensuring 100% privacy and lightning-fast speed.</p>
      </div>
      <div className=" grid lg:grid-cols-12 gap-8 ">
        <div className="lg:col-span-8 space-y-6">
          <div
            className={` flex flex-col items-center gap-4 text-center justify-center rounded-xl border-2 border-dashed bg-primary/5 hover:bg-primary/10 hover:border-primary transition-all duration-200 cursor-pointer px-6 py-20  ${
              dragging ? "border-primary bg-primary/10" : "border-primary/30"
            }`}
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const file = e.dataTransfer.files?.[0];
              uploadHandle(file)
            }}
            onDragEnter={() => setDragging(true)}
            onDragLeave={() => setDragging(false)}
          >
            <CloudUpload className="" size={70}/>
            <p className="text-xl font-bold">Drag & drop an image here or click to upload</p>
            <p className="text-slate-400 text-sm mt-1">Supports PNG, JPG, WebP. Max 25MB.</p>
            <button className=" px-8 py-3 bg-primary text-white rounded-lg font-bold hover:brightness-110 transition-all shadow-lg shadow-primary/20 ">Select Image</button>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                uploadHandle(file)
              }}
            />
          </div>
          <div className=" grid md:grid-cols-2 gap-4">
            <div className=" dark:bg-primary/5 bg-slate-50 border dark:border-primary/20 border-slate-200 rounded-xl p-4 overflow-hidden ">
              <div className=" flex justify-between items-center mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Original Preview</span>
                <span className=" text-xs font-medium dark:bg-slate-800 bg-slate-200 rounded px-2 py-0.5 text-slate-600 dark:text-slate-300">{Math.ceil(oriSize)} KB</span>
              </div>
              <div className=" aspect-video w-full rounded-lg dark:bg-slate-900 bg-slate-200 relative group">
                <Image height={100} width={100} alt="hello" src={ preview || '/icon.png'} className={`w-full h-full object-center ${preview ?"" :"opacity-50 grayscale group-hover:grayscale-0"} transition-all`} ></Image>
                { !preview && <div className=" absolute inset-0 flex items-center justify-center">
                  <span className=" dark:text-slate-50 text-sm font-medium ">No Image Selected</span>
                </div>}
              </div>
            </div>
            <div className=" dark:bg-primary/5 bg-slate-50 border dark:border-primary/20 border-slate-200 rounded-xl p-4 overflow-hidden ">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Compresed Preview</span>
                <span className=" text-xs font-medium dark:bg-slate-800 bg-slate-200 rounded px-2 py-0.5 dark:text-slate-300 text-slate-600">{Math.ceil(newSize) || "--"} KB</span>
              </div>
              <div className="aspect-video w-full rounded-lg dark:bg-slate-900 bg-slate-200 relative group">
                {url ? <Image height={100} width={100} alt="hello" src={url} className="w-full h-full object-center"></Image>
                :<div className="absolute inset-0 flex items-center justify-center">
                  <FileImage size={50} className="text-slate-800" />
                </div>}
              </div>
            </div>
          </div>
        </div>

        {/* right side */}
        <div className="lg:col-span-4 space-y-6">
          <div className=" bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-primary/20 rounded-xl p-6 shadow-sm ">
            <h2 className=" text-lg font-bold mb-6 flex items-center gap-4"><SlidersHorizontalIcon className="text-primary"/> Compressed Presets </h2>
            <div className=" flex flex-col gap-2">
              <div className=" flex justify-between items-center group p-4 rounded-lg border border-slate-200 dark:border-primary/20 hover:border-primary/50 transition-all bg-primary/10">
                <label className=" w-full font-bold group-hover:text-primary" htmlFor="50">Target 50KB</label>
                <input className="scale-150 accent-primary peer" type="radio" name="target" id="50" value={50} checked = {target == 50} onChange={(e) => setTarget(Number(e.target.value))} />
              </div>
              <div className=" flex justify-between items-center group p-4 rounded-lg border border-slate-200 dark:border-primary/20 hover:border-primary/50 transition-all bg-primary/10">
                <label className=" w-full font-bold group-hover:text-primary" htmlFor="100">Target 100KB</label>
                <input className="scale-150 accent-primary peer" type="radio" name="target" id="100" value={100} checked = {target == 100} onChange={(e) => setTarget(Number(e.target.value))} />
              </div>
              <div className=" flex justify-between items-center group p-4 rounded-lg border border-primary/20 hover:border-primary/50 transition-all bg-primary/10">
                <label className=" w-full font-bold group-hover:text-primary" htmlFor="200">Target 200KB</label>
                <input className="scale-150 accent-primary peer" type="radio" name="target" id="200" value={200} checked = {target == 200} onChange={(e) => setTarget(Number(e.target.value))} />
              </div>
              <div className=" group p-4 rounded-lg border border-primary/20 hover:border-primary/50 transition-all bg-primary/10">
                <p className=" font-bold group-hover:text-primary ">Custom Size</p>
                <div className=" relative mt-1 w-full">
                  <span className=" absolute right-3 top-1/2 -translate-y-1/2 text-lg font-bold text-primary/70 ">KB</span>
                  <input type="number" name="targetKB" id="typeKB" min={0} value={target} placeholder="Enter Target KB" onChange={(e) => {setTarget(Number(e.target.value))}} className="w-full dark:bg-slate-900 bg-white border dark:border-primary/30 border-slate-200 rounded pl-5 pr-10 py-1.5 text-lg outline-none dark:text-slate-100 text-slate-900 focus:ring-1 focus:ring-primary transition-all" />
                </div>
              </div>
            </div>
            <div className="mt-6 flex flex-col gap-3">
              <button onClick={()=>{if (file) compress(file)}} disabled = {Boolean(url)}  className= {` cursor-pointer relative overflow-hidden w-full py-4 bg-primary text-white ${!url && "active:scale-95 active:bg-primary/50"} disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed font-bold rounded-lg hover:brightness-110 transition-all flex justify-center items-center gap-2 text-center`}> 
                {
                  progress ?
                  <>
                    <Loader className=" motion-safe:animate-spin z-10 " strokeWidth={2.75}/>
                    <div className=" absolute inset-0 rounded-lg bg-linear-to-r from-emerald-600 to-green-400 transition-[width] duration-300 ease-out" style={{width: `${completed}%`}}></div>
                  </>
                  : <div className="flex justify-center items-center gap-2"><WandSparkles/> Compress</div>
                }
              </button>
              <div className={` w-full py-4 ${ url? " bg-primary text-white cursor-pointer active:scale-95 active:bg-primary/50 " :'bg-slate-800 text-slate-600 cursor-not-allowed'} font-bold rounded-lg`} >
                <a href={url || undefined} download={ url ? `compressed-${fileName}` : undefined} className={`flex items-center justify-center gap-2 ${url? "cursor-pointer" : "cursor-not-allowed"}`}>
                  <Download /> Download
                </a>
              </div>
            </div>
          </div>
          <div className="flex gap-3 bg-primary/10 border border-primary/20 rounded-xl p-5 ">
            <ShieldCheck size={40} className="text-primary"/>
            <div className="">
              <h4 className="font-bold text-sm">Privacy Guarantee</h4>
              <p className=" text-xs text-slate-400 mt-1 leading-relaxed">Processing happens locally in your browser using WebAssembly. Your data is never uploaded to any server.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h3 className="text-2xl font-bold mb-8">Why use QuickFix Image Tools?</h3>
        <div className=" grid gap-8 md:grid-cols-3 ">
          <div className="p-6 rounded-xl dark:bg-primary/8 bg-primary/3 border dark:border-primary/30 border-slate-200">
            <div className="w-fit p-2 rounded-lg bg-primary/20 flex items-center justify-center text-primary mb-4">
              <Zap />
            </div>
            <h4 className="font-bold mb-2">Instant Speed</h4>
            <p className="text-sm text-slate-400">WASM-powered engine compresses images 10x faster than traditional web tools.</p>
          </div>
          <div className="p-6 rounded-xl dark:bg-primary/8 bg-primary/3 border dark:border-primary/30 border-slate-200">
            <div className="w-fit p-2 rounded-lg bg-primary/20 flex items-center justify-center text-primary mb-4">
              <Hd />
            </div>
            <h4 className="font-bold mb-2">Smart Reduction</h4>
            <p className="text-sm text-slate-400">Advanced algorithms maintain perceptual quality while drastically reducing file size.</p>
          </div>
          <div className="p-6 rounded-xl dark:bg-primary/8 bg-primary/3 border dark:border-primary/30 border-slate-200">
            <div className="w-fit p-2 rounded-lg bg-primary/20 flex items-center justify-center text-primary mb-4">
              <CircleUserIcon />
            </div>
            <h4 className="font-bold mb-2">No Account Needed</h4>
            <p className="text-sm text-slate-400">LoCiFile is free forever and requires no login or registration to use.</p>
          </div>
        </div>
      </div>
    </div>
  );
}