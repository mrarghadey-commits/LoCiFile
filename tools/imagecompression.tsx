import imageCompression from "browser-image-compression";

export async function compressToTarget(file: File, targetKB = 100) {

  const targetSize = targetKB * 1024;

  let minQ = 0.1;
  let maxQ = 0.95;

  let best: File | Blob = file;

  for (let i = 0; i < 10; i++) {
    console.log(i)
    const quality = (minQ + maxQ) / 2;
    console.log(quality)

    const options = {
      initialQuality: quality,
      alwaysKeepResolution: true,
      maxWidthOrHeight: 1024,
      maxSizeMB: 0.05,
      useWebWorker: true,
      fileType: "image/jpeg"
    };

    const compressed = await imageCompression(file, options);
    console.log(compressed.size)
    console.log(targetSize)

    if (compressed.size > targetSize) {
      maxQ = quality;
    } else {
      minQ = quality;
      best = compressed;
    }

  }
  console.log(best)
  return best;
}