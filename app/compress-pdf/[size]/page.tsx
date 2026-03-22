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
    title: `Compress PDF to ${size} Online (Free, Fast & Secure)`,
    description: `Reduce pdf size to ${size}. Fast, free and secure pdf compressor.`,
    keywords: [
      `compress pdf to ${size}`,
      `reduce pdf size to ${size}`,
      `pdf compressor ${size}`,
      "compress pdf online free",
      "wasm pdf compressor",
      "compress pdf online",
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
        name: `How to compress PDF to ${size} online?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Upload your file and our tool will automatically compress PDF to ${size}.`,
        },
      },
      {
        "@type": "Question",
        name: `Is this pdf compressor private?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes. pdfs are processed in your browser and never uploaded.`,
        },
      },
      {
        "@type": "Question",
        name: `Can I compress pdf to ${size} exactly?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes, our tool tries to compress pdf as close as possible to ${size}.`,
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
  return (
    <div className="min-h-screen dark:bg-[#0a0a0f] bg-slate-100 dark:text-white text-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6 w-full">
        <div className="text-center mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Compress PDF to {size}</h1>
          <p className="dark:text-slate-400 text-slate-500 text-sm mt-1">
            Compress PDF to {size} online using our free tool.
            Reduce PDF size to {size} without losing quality.
          </p>
        </div>
        <CompressTool targetSize={sizeInKB} />
      </div>
      <div className="lg:px-20 px-5 md:py-5 mb-3 mx-1  pb-4 pt-2 rounded-3xl border border-primary/20">
        <h2 className=" text-2xl underline">Compress PDF to {size} Online (Free, Fast & Secure)</h2>

        <p>Compress PDF to {size} online using our free tool.
          Reduce PDF size to {size} without losing quality.
          Works instantly in your browser with no upload required.</p>
        <h2 className=" text-2xl underline">Reduce PDF size to {size} without losing quality</h2>
        <p>
          You can easily reduce PDF size to {size} for email, forms, and uploads
          while keeping readability intact.
        </p>
        <h2 className=" text-xl underline">Features of PDF Compressor to {size}</h2>

        <ul className=" list-disc pl-4 mb-1">
          <li>Compress pdf to {size} instantly</li>
          <li>No quality loss with smart optimization</li>
          <li>100% secure (no server upload)</li>
          <li>Fast processing using browser compression</li>
        </ul>
        <h2 className=" text-xl underline">How to Compress pdf to {size} online?</h2>

        <ol className=" list-decimal pl-4 mb-2">
          <li>Upload your pdf file</li>
          <li>Start Compression to {size}</li>
          <li>Download pdf</li>
        </ol>
        <h2 className=" text-xl mb-0.5 underline">Compress PDF to exact {size} online</h2>
        <p>
          Our tool tries to compress PDF to exact {size} as close as possible
          while maintaining readability and quality.
        </p>
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
        <h2 className=" text-xl mb-2 underline">Try other PDF compression sizes below:</h2>

        <div className="flex flex-wrap gap-2 mb-2 text-sm md:text-base">
          {["10kb", "20kb", "50kb", "100kb", "200kb", "400kb", "500kb", "1mb"].map(s => (
            <Link key={s} href={`/compress-pdf-to-${s}`} className=" border p-2 border-primary/40 hover:bg-primary/40 rounded-xl">
              Compress to {s.toUpperCase()}
            </Link>
          ))}
        </div>
        <h2 className=" text-xl mb-2 underline">Popular compression tools</h2>

        <div className="flex flex-wrap gap-2 mb-2 text-sm md:text-base">
          <Link href="/compress-pdf-to-100kb" className=" border p-2 border-primary/40 hover:bg-primary/40 rounded-xl">Compress PDF to 100KB</Link>
          <Link href="/compress-pdf-to-200kb" className=" border p-2 border-primary/40 hover:bg-primary/40 rounded-xl">Compress PDF to 200KB</Link>
          <Link href="/compress-image-to-50kb" className=" border p-2 border-primary/40 hover:bg-primary/40 rounded-xl">Compress Image to 50KB</Link>
        </div>
        <h2 className=" text-xl mb-2 underline">Try our Other tools</h2>
        <div className="flex flex-wrap gap-2 mb-2 text-sm md:text-base">

          <Link href={`/image-compressor`} className=" border p-2 border-primary/40 hover:bg-primary/40 rounded-xl">
            Compress Image
          </Link>
          <Link href={`/passport-image-resizer`} className=" border p-2 border-primary/40 hover:bg-primary/40 rounded-xl">
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
            <h3 className="font-bold dark:text-slate-200 text-slate-600 mb-2">How to compress PDF to {size} online?</h3>
            <p className="text-slate-400 text-sm">
              Upload your file and our tool will automatically compress PDF to {size}.
            </p>
          </div>
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
            <p className="text-slate-400 text-sm">Yes. PDF files are processed in your browser and never uploaded.</p>
          </div>
          <div>
            <h3 className="font-bold dark:text-slate-200 text-slate-600 mb-2">Does compressing pdf to {size} reduce quality?</h3>
            <p className="text-slate-400 text-sm">No, we use smart compression to maintain quality when compressing pdf to {size}.</p>
          </div>
          <div>
            <h3 className="font-bold dark:text-slate-200 text-slate-600 mb-2">Why is it faster than other tools?</h3>
            <p className="text-slate-400 text-sm">Traditional tools require you to upload your file,
              wait for server processing, and then download. We skip the network delay entirely.
            </p>
          </div>
          <p className=" flex gap-2 p-2 bg-primary/10 rounded-2xl items-center border border-primary/50"><Lock size={18} /> Your pdf never leave your device</p>
        </div>
        <p className=" mt-1">Use this free tool to compress PDF to {size} quickly and securely.
          Perfect for passport, exam forms, and online uploads.</p>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </div>
  )
}