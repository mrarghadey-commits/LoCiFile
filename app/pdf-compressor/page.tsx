import CompressTool from "../../tools/pdfcompressor"
import { Lock } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free  PDF Compressor Online (No Quality Loss) | LoCiFile",
  description:
    "Compress PDF online without losing quality. Reduce PDF size instantly. Supports JPG, PNG, WebP.",
  keywords: [
    "pdf compressor",
    "compress PDF online",
    "reduce PDF size",
    "free PF compressor",
    "compress PDF online free",
    "wasm PDF compressor",
    "compress PDF online",
  ],
  alternates: {
    canonical: "https://locifile.in/pdf-compressor",
  },
  openGraph: {
    title: `Free PDF Compressor Online (No Quality Loss) | LoCiFile`,
    description: `Compress PDF online without losing quality. Reduce PDF size instantly. Supports JPG, PNG, WebP.`,
    url: "https://locifile.in/PDF-compressor",
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
export default function Page() {
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `How to compress PDF to a specific size?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Upload your PDF and set your target size then compress it instantly using our free tool.`,
        },
      },
      {
        "@type": "Question",
        name: `Does compressing PDF reduce quality?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `No, we use smart compression to maintain quality when compressing PDF.`,
        },
      },
      {
        "@type": "Question",
        name: `Is this PDF compressor private?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes. PDF are processed in your browser and never uploaded.`,
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
        name: "PDF Compressor",
        item: "https://locifile.in/pdf-compressor",
      },
    ],
  };
  const howTo = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to compress PDF`,
    description: `Step by step guide to compress PDF`,
    step: [
      {
        "@type": "HowToStep",
        name: "Upload your PDF file",
        text: "Upload your PDF file from your device.",
      },
      {
        "@type": "HowToStep",
        name: "Set target compressed size",
        text: "Set your target compressed size",
      },
      {
        "@type": "HowToStep",
        name: "Start Compression for target size",
        text: `Click compress to reduce PDF size.`,
      },
      {
        "@type": "HowToStep",
        name: "Download PDF",
        text: "Download the compressed PDF instantly.",
      },
    ],
  };
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "PDF Compressor Tool",
    url: "https://locifile.in/compress-pdf-to-${size}",
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
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">PDF Compressor</h1>
          <p className="dark:text-slate-400 text-slate-500 text-sm mt-1">
            Reduce file size without losing quality. Fast, secure, and completely free.
          </p>
        </div>
        <CompressTool targetSize={200} />
      </div>
      <div className="glass lg:px-20 px-5 md:py-5  pb-4 rounded-3xl border-primary/20">
        <h2 className=" text-2xl underline">Compress PDF to any size instantly Online Free tool</h2>

        <p>Looking to compress an PDF to a specific size? This free online tool helps you reduce PDF size to exactly that acording to your needed without noticeable quality loss.
          Works with JPG, PNG, and WebP formats. No signup required and processing happens directly in your browser.</p>
        <h2 className=" text-2xl underline">Reduce PDF size without losing quality</h2>
        <p>
          You can easily reduce PDF size for email, forms, and uploads
          while keeping readability intact.
        </p>
        <h2 className=" text-xl underline">Features of PDF Compressor</h2>

        <ul className=" list-disc pl-4 mb-1">
          <li>Compress PDF to any size instantly</li>
          <li>No quality loss with smart optimization</li>
          <li>Supports JPG, PNG, WebP</li>
          <li>100% secure (no server upload)</li>
          <li>Fast processing using browser compression</li>
        </ul>
        <h2 className=" text-xl underline">How to Compress PDF online</h2>

        <ol>
          <li>Upload your PDF file</li>
          <li>Set target compressed size</li>
          <li>Start compression for target size</li>
          <li>Download PDF</li>
        </ol>
        <h2 className=" text-xl mb-0.5 underline">Why Compress PDF to a specific size?</h2>

        <ul className=" list-decimal pl-4 mb-1">
          <li>Uploading PDF to websites with size limits</li>
          <li>Submitting forms or exam portals</li>
          <li>Reducing storage space</li>
          <li>Improving website loading speed</li>
          <li>Sharing PDF on email or WhatsApp</li>
        </ul>
        <h2 className=" text-xl mb-2 underline">Try other PDF compression sizes</h2>

        <div className="flex flex-wrap gap-2 mb-2 text-sm md:text-base">
          {["10kb", "20kb", "50kb", "100kb", "200kb", "400kb", "500kb", "1mb"].map(s => (
            <Link key={s} href={`/compress-pdf-to-${s}`} className=" border p-2 border-primary/40 hover:bg-primary/40 rounded-xl shadow-lg shadow-primary/50">
              Compress to {s.toUpperCase()}
            </Link>
          ))}
        </div>
        <h2 className=" text-xl mb-2 underline">Popular compression tools</h2>

        <div className="flex flex-wrap gap-2 mb-2 text-sm md:text-base">
          <Link href="/compress-pdf-to-100kb" className=" border p-2 border-primary/40 hover:bg-primary/40 rounded-xl shadow-lg shadow-primary/50">Compress PDF to 100KB</Link>
          <Link href="/compress-pdf-to-200kb" className=" border p-2 border-primary/40 hover:bg-primary/40 rounded-xl shadow-lg shadow-primary/50">Compress PDF to 200KB</Link>
          <Link href="/compress-image-to-50kb" className=" border p-2 border-primary/40 hover:bg-primary/40 rounded-xl shadow-lg shadow-primary/50">Compress Image to 50KB</Link>
        </div>
        <h2 className=" text-xl mb-2 underline">Try our Other tools</h2>
        <div className="flex flex-wrap gap-2 mb-2 text-sm md:text-base">

          <Link href={`/image-compressor`} className=" border p-2 border-primary/40 hover:bg-primary/40 rounded-xl shadow-lg shadow-primary/50">
            Compress Image
          </Link>
          <Link href={`/passport-image-resizer`} className=" border p-2 border-primary/40 hover:bg-primary/40 rounded-xl shadow-lg shadow-primary/50">
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
            <h3 className="font-bold dark:text-slate-200 text-slate-600 mb-2">How to compress PDF to a specific size?</h3>
            <p className="text-slate-400 text-sm">Upload your PDF and set your target size then compress it instantly using our free tool.</p>
          </div>
          <div>
            <h3 className="font-bold dark:text-slate-200 text-slate-600 mb-2">Is this PDF compressor private?</h3>
            <p className="text-slate-400 text-sm">Yes. PDF are processed in your browser and never uploaded.</p>
          </div>
          <div>
            <h3 className="font-bold dark:text-slate-200 text-slate-600 mb-2">Does compressing PDF reduce quality?</h3>
            <p className="text-slate-400 text-sm">No, we use smart compression to maintain quality when compressing PDF</p>
          </div>
          <div>
            <h3 className="font-bold dark:text-slate-200 text-slate-600 mb-2">Why is it faster than other tools?</h3>
            <p className="text-slate-400 text-sm">Traditional tools require you to upload your file, wait for server processing, and then download. We skip the network delay entirely.
            </p>
          </div>
          <p className=" flex gap-2 p-2 bg-primary/10 rounded-2xl items-center border border-primary/50"><Lock size={18} /> Your PDF never leave your device</p>
        </div>
        <p className=" mt-1">Try it now for fast and secure compression. It is Completely free</p>
        <p className=" mt-1">
          Use this free PDF compressor to reduce PDF size quickly and securely.
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