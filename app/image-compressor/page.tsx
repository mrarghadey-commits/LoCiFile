"use client"

import { useState } from "react";
import { compressToTarget } from "@/tools/imagecompression";
import { Loader } from "lucide-react";

export default function Page() {
  const [file, setFile] = useState<File | null>(null)
  const [url, setUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [oriSize, setOriSize] = useState(0);
  const [newSize, setNewSize] = useState(0);
  const [progress, setprogress] = useState(false)
  async function compress(file: File) {
    setprogress(true)
    const compressed = await compressToTarget(file, 100) // compressed under 100 KB
    console.log(compressed)
    setOriSize(file.size / 1024)
    setNewSize(compressed.size / 1024)
    setUrl(URL.createObjectURL(compressed));
    setFileName(compressed.name);
    setprogress(false)
  }

  return (
    <div className="h-[50%] w-100 absolute top-[50%] left-[40%] flex gap-3 flex-col">

      <input
        className="h-10 border-2 border-amber-500 p-2 "
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) setFile(file);
        }}
      />
      <button onClick={()=>{if (file) compress(file)}} className="p-2 flex justify-center bg-blue-500 text-center active:scale-95 active:bg-blue-400 "> 
        {
          progress ?
            <Loader className=" animate-spin " strokeWidth={2.75}/>
          : "Compress"
        }
      </button>
      {url && (
        <div className=" w-full p-4 flex flex-col">
          <a href={url} download={`compressed-${fileName}`} className="p-2 bg-blue-600 rounded-2xl mt-2 text-center w-full">
            Download Image
          </a>
          <div className="">
            <h4 className=" font-medium text-2xl text-gray-600">Details</h4>
            <ul className=" di">
              <li>Original size = {oriSize} KB</li>
              <li>New size = {newSize} KB</li>
            </ul>
          </div>
        </div>
      )}

    </div>
  );
}