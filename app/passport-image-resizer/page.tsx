import { Metadata } from "next"
import PassportPhotoMaker from "@/tools/passphotocompressor"
import Link from "next/link";
import { Lock } from "lucide-react";

const EXAM_META: Record<string, { title: string; description: string }> = {
  upsc: { title: "UPSC Passport Photo Maker — 350×450px, 20–50KB", description: "Make passport photo for UPSC Civil Services. Auto-resize to 350×450px, 20–50KB. Free." },
  ssc_cgl: { title: "SSC CGL / CHSL Passport Photo Maker — 413×531px", description: "Passport photo for SSC CGL and CHSL. 413×531px, 20–50KB. Free online tool." },
  ssc_gd: { title: "SSC GD Constable Passport Photo — 413×531px, 20–50KB", description: "Passport photo for SSC GD Constable. Auto-resize to exact specifications. Free." },
  rrb_ntpc: { title: "RRB NTPC Passport Photo Maker — Railway Exam Photo", description: "Passport photo for RRB NTPC Railway exam. 320×240px, 30–70KB. Free, browser-based." },
  rrb_group_d: { title: "RRB Group D Passport Photo Maker — Railway Exam", description: "Passport photo for RRB Group D. Auto-resize to 320×240px, 20–50KB. Free." },
  ibps_po: { title: "IBPS PO / Clerk Passport Photo — 200×230px, 20–50KB", description: "Correct passport photo for IBPS PO and Clerk exam. 200×230px, 20–50KB. Free." },
  sbi_po: { title: "SBI PO / Clerk Passport Photo Maker — Free Online", description: "Passport photo for SBI PO and Clerk. Auto-resize to 200×230px, 20–50KB. Free." },
  neet: { title: "NEET Passport Photo Maker — NTA Photo Requirements", description: "Passport photo for NEET UG as per NTA. 413×531px, 10–200KB. Free tool." },
  jee_main: { title: "JEE Main Passport Photo Maker — NTA Photo Size", description: "Passport photo for JEE Main as per NTA. 413×531px, 10–300KB. Free." },
  gate: { title: "GATE Passport Photo Maker — 530×690px Photo", description: "Passport photo for GATE exam. 530×690px, 5–600KB. Free, no upload required." },
  passport: { title: "Indian Passport Photo Maker — 35×45mm, 20–50KB", description: "Indian passport photo online. 413×531px, 20–50KB, white background. Free & private." },
}

const DEFAULT_META = {
  title: "Passport Photo Maker for Indian Exams — UPSC, SSC, RRB, IBPS, NEET",
  description: "Free online passport photo maker for all Indian government exams. UPSC, SSC, RRB, IBPS, SBI, NEET, JEE, GATE. Auto-resize and compress to exact specifications.",
}

type Props = { searchParams: Promise<{ exam?: string }> }

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  let {exam} = await searchParams;
  exam = exam ?? ""
  const meta = EXAM_META[exam] ?? DEFAULT_META

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `https://locifile.in/passport-photo${exam ? `?exam=${exam}` : ""}`,
    },
    keywords: [
      "passport photo maker",
      "government exam photo",
      exam ? exam.replace(/_/g, " ").toUpperCase() : "UPSC SSC RRB IBPS NEET JEE GATE", "India passport photo", "photo resize compress"].join(", "),
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `https://locifile.in/passport-photo?exam=${exam}`,
      siteName: "Your Site Name",
      images: [
        {
          url: "https://locifile.in/logo.png",
          width: 1200,
          height: 630,
          alt: meta.title,
        }
      ],
      locale: "en_IN",
      type: "website",
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default async function PassportImageResizerPage({ searchParams }: Props) {
  let {exam} = await searchParams;
  const examKey = exam ?? ""
  const meta = EXAM_META[examKey] ?? DEFAULT_META
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What is the photo size for ${examKey.toUpperCase()}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: "The required size depends on exam guidelines. This tool automatically sets correct dimensions."
        }
      },
      {
        "@type": "Question",
        name: "How to resize passport photo online?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Upload your image and the tool will automatically resize and compress it."
        }
      },
      {
        "@type": "Question",
        name: "Is this tool safe?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, all processing happens in your browser. No file is uploaded."
        }
      }
    ]
  }

  const howTo = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to create ${examKey.toUpperCase()} passport photo`,
    description: "Step by step process to create passport photo online",
    step: [
      {
        "@type": "HowToStep",
        name: "Upload Photo",
        text: "Upload your image from device"
      },
      {
        "@type": "HowToStep",
        name: "Auto Resize",
        text: "Tool resizes image to required dimensions"
      },
      {
        "@type": "HowToStep",
        name: "Download",
        text: "Download your passport size photo"
      }
    ]
  }

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://locifile.in"
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Passport Photo Maker",
        item: "https://locifile.in/passport-photo"
      },
      {
        "@type": "ListItem",
        position: 3,
        name: examKey.toUpperCase(),
        item: `https://locifile.in/passport-photo?exam=${examKey}`
      }
    ]
  }

  const webApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: meta.title,
    description: meta.description,
    url: `https://locifile.in/passport-photo?exam=${examKey}`,
    applicationCategory: "Utility",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR"
    }
  }

  const structuredData = [faq, howTo, breadcrumb, webApp]
  return (
    <div className="min-h-screen dark:bg-[#0a0a0f] bg-slate-100 dark:text-white text-slate-900" >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6 w-full">
        <div className="text-center mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            {meta.title.split("—")[0].trim()}
          </h1>
          <p className="dark:text-slate-400 text-slate-500 text-sm mt-1">{meta.description}</p>
        </div>
        <PassportPhotoMaker defaultExam={examKey || "upsc"} />
      </div>
      <div className="lg:px-20 px-5 md:py-5 mb-3 mx-1  pb-4 pt-2 rounded-3xl border border-primary/20">
        <h2 className=" text-2xl underline">{examKey.toUpperCase()} Passport Photo Maker Online (Free & Instant)</h2>

        <p>Create a passport size photo for {examKey.toUpperCase()} exam instantly using our free online tool.
          Automatically resize and compress your image to meet official exam requirements.
          No upload needed — everything works securely in your browser.</p>
        <h2 className=" text-2xl underline">{examKey.toUpperCase()} Photo Requirements</h2>
        <p>
          Each government exam has specific rules for passport photos including dimensions,
          file size, and background. This tool ensures your photo meets all requirements.
        </p>
        <ul className="list-disc pl-5 mb-3">
          <li>Correct width and height as per exam</li>
          <li>File size within allowed KB range</li>
          <li>Clear white background</li>
          <li>Proper face alignment and visibility</li>
        </ul>
        <h2 className=" text-xl underline">Features of Passport Photo Maker</h2>

        <ul className=" list-disc pl-4 mb-1">
          <li>Auto resize to exact exam dimensions</li>
          <li>Smart compression without quality loss</li>
          <li>100% secure (no server upload)</li>
          <li>Fast processing directly in browser</li>
        </ul>
        <h2 className=" text-xl underline">How to Create Passport Photo Online?</h2>

        <ol className=" list-decimal pl-4 mb-2">
          <li>Upload your photo</li>
          <li>Select your exam (e.g. {examKey.toUpperCase()})</li>
          <li>Auto resize and compress</li>
          <li>Download your photo instantly</li>
        </ol>
        <h2 className=" text-xl mb-0.5 underline">Why Use This Tool?</h2>
        <ul className=" list-decimal pl-4 mb-1">
          <li>Perfect for government exam forms</li>
          <li>Saves time compared to manual editing</li>
          <li>No software installation required</li>
          <li>Works on mobile and desktop</li>
        </ul>
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
        <h2 className="text-xl mb-2 underline font-semibold">
          Popular Exam Photo Tools
        </h2>

        <div className="flex flex-wrap gap-2 mb-3 text-sm md:text-base">
          <Link href="/passport-image-resizer?exam=upsc" className="border p-2 border-primary/40 hover:bg-primary/40 rounded-xl">UPSC Photo</Link>
          <Link href="/passport-image-resizer?exam=ssc_cgl" className="border p-2 border-primary/40 hover:bg-primary/40 rounded-xl">SSC CGL Photo</Link>
          <Link href="/passport-image-resizer?exam=neet" className="border p-2 border-primary/40 hover:bg-primary/40 rounded-xl">NEET Photo</Link>
        </div>
        <h2 className=" text-xl mb-2 underline font-semibold">Try Other Photo Tools</h2>
        <div className="flex flex-wrap gap-2 mb-3 text-sm md:text-base">
          <Link href="/image-compressor" className="border p-2 border-primary/40 hover:bg-primary/40 rounded-xl">
            Compress Image
          </Link>
          <Link href="/passport-image-resizer" className="border p-2 border-primary/40 hover:bg-primary/40 rounded-xl">
            Resize Image
          </Link>
        </div>
        <h2 className=" text-xl mb-2 underline font-semibold">Other tools</h2>

        <div className="flex flex-wrap gap-2 mb-2 text-sm md:text-base">
          <Link href="/compress-pdf-to-100kb" className=" border p-2 border-primary/40 hover:bg-primary/40 rounded-xl">Compress PDF to 100KB</Link>
          <Link href="/compress-pdf-to-200kb" className=" border p-2 border-primary/40 hover:bg-primary/40 rounded-xl">Compress PDF to 200KB</Link>
          <Link href="/compress-pdf-to-400kb" className=" border p-2 border-primary/40 hover:bg-primary/40 rounded-xl">Compress PDF to 400KB</Link>
          <Link href="/compress-image-to-50kb" className=" border p-2 border-primary/40 hover:bg-primary/40 rounded-xl">Compress Image to 50KB</Link>
          <Link href="/compress-image-to-100kb" className=" border p-2 border-primary/40 hover:bg-primary/40 rounded-xl">Compress image to 100KB</Link>
          <Link href="/compress-image-to-200kb" className=" border p-2 border-primary/40 hover:bg-primary/40 rounded-xl">Compress image to 200KB</Link>
        </div>
        <h3 className="text-2xl font-bold md:mb-6 mb-3">Frequently Asked Questions</h3>
        <div className="md:space-y-6 space-y-3">
          <div>
            <h3 className="font-bold">What is the photo size for {examKey.toUpperCase()}?</h3>
            <p>The required size depends on official guidelines. This tool automatically sets the correct dimensions.</p>
          </div>

          <div>
            <h3 className="font-bold">How to resize passport photo online?</h3>
            <p>Upload your image and the tool will resize and compress it automatically.</p>
          </div>

          <div>
            <h3 className="font-bold">Is this tool safe?</h3>
            <p>Yes. Your image is processed in your browser and never uploaded.</p>
          </div>

          <div>
            <h3 className="font-bold">Does compression reduce quality?</h3>
            <p>No, the tool uses smart optimization to maintain quality.</p>
          </div>
          <p className=" flex gap-2 p-2 bg-primary/10 rounded-2xl items-center border border-primary/50"><Lock size={18} /> Your photo never leave your device</p>
        </div>
        <p className="mt-3 text-sm">
          Use this free passport photo maker for {examKey.toUpperCase()} to quickly create a valid image for online applications.
        </p>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </div >
  )
}