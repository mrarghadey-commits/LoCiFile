import CompressTool from "@/tools/pdfcompressor";
import { Lock } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    size: string;
  }>;
};

export async function generateStaticParams() {
  const sizes = [
    "10kb", "20kb", "30kb", "40kb", "50kb",
    "60kb", "70kb", "80kb", "90kb", "100kb",
    "120kb", "150kb", "200kb", "250kb", "300kb",
    "400kb", "500kb", "600kb", "800kb", "1mb", "2mb", "3mb"
  ];
  return sizes.map((size) => ({ size }));
}

export async function generateMetadata({ params }: any) {
  let { size } = await params;
  size = (size ?? "").toLowerCase();

  return {
    title: `Compress pdf to ${size} Online Free (No Quality Loss)`,
    description: `Reduce pdf size to ${size}. Fast, free and secure pdf compressor.`,
    keywords: [
      `compress pdf to ${size}`,
      `reduce pdf size to ${size}`,
      `pdf compressor ${size}`,
      "compress pdf online free",
      "wasm pdf compressor",
      "compress pdf online",
      "client side pdf compression",
      "no upload pdf compressor",
      "browser pdf compression",
    ],
    alternates: {
      canonical: `https://locifile.in/compress-pdf-to-${size}`,
    },
    openGraph: {
      title: `Compress pdf to ${size} instantly online.`,
      description: `Compress pdf to ${size} instantly online.`,
      url: `https://locifile.in/compress-pdf-to-${size}`,
      siteName: "LoCiFile",
      type: "website",
      images: [
        {
          url: "https://locifile.in/logo.png",
          width: 1200,
          height: 630,
        },
      ],
    }
  };
}


export default async function Page({ params }: Props) {
  const { size } = await params;
  // normalize input
  const raw = (size ?? "").toLowerCase().trim();

  // extract number safely
  let sizeInKB = NaN;

  if (raw.endsWith("kb")) {
    sizeInKB = parseInt(raw.replace("kb", ""), 10);
  } else if (raw.endsWith("mb")) {
    sizeInKB = parseInt(raw.replace("mb", ""), 10) * 1024;
  }
  if (Number.isNaN(sizeInKB)) {
    notFound();
  }
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Is this pdf compressor private?</`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes. pdfs are processed in your browser and never uploaded.`,
        },
      },
      {
        "@type": "Question",
        name: `Can I compress pdf to {size} exactly?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes, our tool tries to compress pdf as close as possible to {size}.`,
        },
      },
      {
        "@type": "Question",
        name: `Does compressing pdf to ${size} reduce quality?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `No, we use smart compression to maintain quality when compressing pdf to ${size}.`,
        },
      },
    ],
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://locifile.in",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "pdf Compressor",
        item: "https://locifile.in/pdf-compressor",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `Compress pdf to ${size} KB`,
        item: `https://locifile.in/compress-pdf-to-${size}`,
      },
    ],
  };
  const howTo = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to compress pdf to ${size}`,
    description: `Step by step guide to compress pdf to ${size}`,
    step: [
      {
        "@type": "HowToStep",
        name: "Upload your pdf file",
        text: "Upload your pdf file from your device.",
      },
      {
        "@type": "HowToStep",
        name: `Start Compression to ${size}KB`,
        text: `Click compress to reduce pdf size to ${size}.`,
      },
      {
        "@type": "HowToStep",
        name: "Download pdf",
        text: "Download the compressed pdf instantly.",
      },
    ],
  };
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "pdf Compressor Tool",
    url: `https://locifile.in/compress-pdf-to-${size}`,
    applicationCategory: "Utility",
    operatingSystem: "All",
  };
  const structuredData = [
    jsonLd,
    faq,
    breadcrumb,
    howTo
  ];
  function random(arr: string[]) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  const titles = [
    `Compress pdf to ${size} Online Free`,
    `Reduce pdf Size to ${size} Instantly`,
    `Free pdf Compressor to ${size}`,
  ];
  const intros = [
    `Need to compress an pdf to ${size}? This free online tool helps you do it quickly without losing quality.`,
    `Easily reduce pdf size to ${size} using our fast and secure pdf compressor.`,
    `Looking for a way to convert your pdf to ${size}? Use our free browser-based tool instantly.`,
    `Looking to compress an pdf to ${size}? This free online tool helps you reduce pdf size to exactly ${size} without noticeable quality loss.
                        Works with JPG, PNG, and WebP formats. No signup required and processing happens directly in your browser.`
  ];
  const endings = [
    "Try it now for fast and secure compression.",
    "No installation needed, works instantly.",
    "Completely free and easy to use.",
  ];
  const intro = random(intros);
  const title = random(titles);
  const ending = random(endings);
  return (
    <div className="min-h-screen dark:bg-[#0a0a0f] bg-slate-100 dark:text-white text-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6 w-full">
        <div className="text-center mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">LoCiFiLe PDF Compressor</h1>
          <p className="dark:text-slate-400 text-slate-500 text-sm mt-1">
            Reduce file size without losing quality. Fast, secure, and completely free.
          </p>
        </div>
        <CompressTool targetSize={sizeInKB} />
      </div>
      <div className="lg:px-20 px-5 md:py-5 mb-3 mx-1  pb-4 pt-2 rounded-3xl border border-primary/20">
        <h1 className=" text-2xl underline">{title}</h1>

        <p>{intro}</p>
        <h2 className=" text-xl underline">Key Features:</h2>

        <ul className=" list-disc pl-4 mb-1">
          <li>Compress pdf to {size} instantly</li>
          <li>No quality loss with smart optimization</li>
          <li>100% secure (no server upload)</li>
          <li>Fast processing using browser compression</li>
        </ul>
        <h2 className=" text-xl underline">How to Compress pdf to {size}</h2>

        <ol className=" list-decimal pl-4 mb-2">
          <li>Upload your pdf file</li>
          <li>Start Compression to {size}</li>
          <li>Download pdf</li>
        </ol>
        <h2 className=" text-xl mb-0.5 underline">Why Compress pdf to {size}?</h2>

        <p>
          Compressing pdf to {size} is useful for:
        </p>

        <ul className=" list-decimal pl-4 mb-1">
          <li>Uploading pdf to websites with size limits</li>
          <li>Submitting forms or exam portals</li>
          <li>Reducing storage space</li>
          <li>Improving website loading speed</li>
          <li>Sharing pdf on email or WhatsApp</li>
        </ul>
        <h2 className=" text-xl underline">Supported Formats</h2>

        <p>
          This tool supports JPG, JPEG, PNG, and WebP pdf.
          You can compress any of these formats to {size} easily.
        </p>
        <h2 className=" text-xl mb-2 underline">Try Other pdf Sizes</h2>

        <div className="flex flex-wrap gap-2 mb-2">
          {["20kb", "50kb", "100kb", "200kb", "400kb", "500kb"].map(s => (
            <Link key={s} href={`/compress-pdf-to-${s}`} className=" border p-2 border-primary/40 hover:bg-primary/40 rounded-xl">
              Compress to {s.toUpperCase()}
            </Link>
          ))}
          <Link href={`/compress-pdf-to-1000kb`} className=" border p-2 border-primary/40 hover:bg-primary/40 rounded-xl">
            Compress to 1MB
          </Link>
        </div>
        <h2 className=" text-xl mb-2 underline">Try our Other tools</h2>
        <div className="flex flex-wrap gap-2 mb-2">

          <Link href={`/image-compressor`} className=" border p-2 border-primary/40 hover:bg-primary/40 rounded-xl">
            Compress Image
          </Link>
          <Link href={`/image-resize`} className=" border p-2 border-primary/40 hover:bg-primary/40 rounded-xl">
            Resize Image
          </Link>
        </div>
        <h2 className="mt-2 text-xl font-semibold underline">
          Common Uses in India
        </h2>

        <ul className="list-disc pl-4">
          <li>UPSC / SSC / Railway exam forms</li>
          <li>NEET / Jee Main / wbjee form fill up</li>
          <li>Compitative examinations form fill up</li>
          <li>Passport & visa applications</li>
          <li>Aadhaar / PAN card upload</li>
          <li>Government job portals</li>
          <li>College admission forms</li>
        </ul>
        <h3 className="text-2xl font-bold md:mb-6 mb-3">Frequently Asked Questions</h3>
        <div className="md:space-y-6 space-y-3">
          <div>
            <h3 className="font-bold dark:text-slate-200 text-slate-600 mb-2">Is it really secure?</h3>
            <p className="text-slate-400 text-sm">Yes. Because we use WebAssembly (WASM), all processing
              happens locally on your computer. Your data never leaves your browser.</p>
          </div>
          <div>
            <h3 className="font-bold dark:text-slate-200 text-slate-600 mb-2">Can I compress pdf to {size} exactly?</h3>
            <p className="text-slate-400 text-sm">
              Yes, our tool tries to compress pdf as close as possible to {size}.
            </p>
          </div>
          <div>
            <h3 className="font-bold dark:text-slate-200 text-slate-600 mb-2">Is this pdf compressor private?</h3>
            <p className="text-slate-400 text-sm">Yes. pdf are processed in your browser and never uploaded.</p>
          </div>
          <div>
            <h3 className="font-bold dark:text-slate-200 text-slate-600 mb-2">Does compressing pdf to ${size} reduce quality?</h3>
            <p className="text-slate-400 text-sm">No, we use smart compression to maintain quality when compressing pdf to ${size}.</p>
          </div>
          <div>
            <h3 className="font-bold dark:text-slate-200 text-slate-600 mb-2">Why is it faster than other tools?</h3>
            <p className="text-slate-400 text-sm">Traditional tools require you to upload your file,
              wait for server processing, and then download. We skip the network delay entirely.
            </p>
          </div>
          <p className=" flex gap-2 p-2 bg-primary/10 rounded-2xl items-center border border-primary/50"><Lock size={18} /> Your pdf never leave your device</p>
        </div>
        <p className=" mt-1">{ending}</p>
        <p className=" mt-1">
          Use this free pdf compressor to reduce pdf size to {size} quickly and securely.
          Perfect for students, professionals, and developers who need optimized PDF instantly.
        </p>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </div>
  )
}