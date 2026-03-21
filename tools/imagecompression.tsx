import imageCompression from "browser-image-compression";

export async function compressToTarget(file: File, targetKB: number, onProgress:(p:number)=> void) {

  const targetSize = targetKB * 1000;

  let minQ = 0.01;
  let maxQ = 0.99;

  let best: File | Blob = file;
  let closestDiff = Infinity;

  for (let i = 0; i < 18; i++) {
    console.log(i)
    const quality = (minQ + maxQ) / 2;
    console.log(quality)

    const options = {
      initialQuality: quality,
      alwaysKeepResolution: true,
      maxWidthOrHeight: targetKB <= 50 ? 1024 : 4000,
      // maxSizeMB: targetKB / 1024,
      useWebWorker: true,
      fileType: "image/jpeg"
    };

    const compressed = await imageCompression(file, options);
    console.log(compressed.size)
    console.log(targetSize)
    const diff = Math.abs(compressed.size - targetSize);
    if (diff < closestDiff) {
      closestDiff = diff;
      best = compressed;
    }

    if (compressed.size > targetSize) {
      maxQ = quality;
    } else {
      minQ = quality;
    }
    onProgress(Math.round(((i+1)/18)*100 ))
    console.log( "complete",Math.round(((i+1)/18)*100 ))
    if (compressed.size <= targetSize && diff < 2000) {
      onProgress(100);
      break;
    }
  }

  console.log(best)
  return best;
}