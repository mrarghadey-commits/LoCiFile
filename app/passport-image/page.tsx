import { Metadata } from "next"
import PassportPhotoMaker from "@/tools/passphotocompressor"

// SEO metadata per exam key
const EXAM_META: Record<string, { title: string; description: string }> = {
  upsc: {
    title: "UPSC Passport Photo Maker — 350×450px, 20–50KB",
    description: "Make passport photo for UPSC Civil Services exam. Auto-resize to 350×450px, 20–50KB with white background. Free, browser-based.",
  },
  ssc_cgl: {
    title: "SSC CGL / CHSL Passport Photo Maker — 413×531px",
    description: "Create passport photo for SSC CGL and CHSL exam. Correct size 413×531px, 20–50KB. Free online tool.",
  },
  ssc_gd: {
    title: "SSC GD Constable Passport Photo — 413×531px, 20–50KB",
    description: "Make passport photo for SSC GD Constable exam. Auto-resize and compress to exact specifications. Free & private.",
  },
  rrb_ntpc: {
    title: "RRB NTPC Passport Photo Maker — Railway Exam Photo",
    description: "Create passport photo for RRB NTPC Railway exam. Correct size 320×240px, 30–70KB. Processed in your browser for free.",
  },
  rrb_group_d: {
    title: "RRB Group D Passport Photo Maker — Railway Exam",
    description: "Make passport photo for RRB Group D Railway exam. Auto-resize to 320×240px, 20–50KB with correct background.",
  },
  ibps_po: {
    title: "IBPS PO / Clerk Passport Photo — 200×230px, 20–50KB",
    description: "Create the correct passport photo for IBPS PO and Clerk exam. 200×230px, 20–50KB. Free and browser-based.",
  },
  sbi_po: {
    title: "SBI PO / Clerk Passport Photo Maker — Free Online",
    description: "Make passport photo for SBI PO and Clerk exam. Auto-resize to 200×230px, 20–50KB. No upload needed.",
  },
  neet: {
    title: "NEET Passport Photo Maker — NTA Photo Requirements",
    description: "Create passport photo for NEET UG as per NTA requirements. 413×531px, 10–200KB, white background. Free tool.",
  },
  jee_main: {
    title: "JEE Main Passport Photo Maker — NTA Photo Size",
    description: "Make passport photo for JEE Main as per NTA specifications. 413×531px, 10–300KB. Free browser tool.",
  },
  gate: {
    title: "GATE Passport Photo Maker — 530×690px Photo",
    description: "Create passport photo for GATE exam. Correct size 530×690px, 5–600KB. Free, no upload required.",
  },
  passport: {
    title: "Indian Passport Photo Maker — 35×45mm, 20–50KB",
    description: "Make Indian passport photo online. Correct size 413×531px, 20–50KB, white background. Free & private.",
  },
}

const DEFAULT_META = {
  title: "Passport Photo Maker for Indian Exams — UPSC, SSC, RRB, IBPS, NEET",
  description: "Free online passport photo maker for all Indian government exams. Supports UPSC, SSC, RRB, IBPS, SBI, NEET, JEE, GATE. Auto-resize, background change, correct KB size.",
}

type Props = {
  searchParams: { exam?: string }
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const exam = searchParams?.exam ?? ""
  const meta = EXAM_META[exam] ?? DEFAULT_META
  return {
    title: meta.title,
    description: meta.description,
    keywords: [
      "passport photo maker",
      "government exam photo",
      exam ? exam.replace("_", " ").toUpperCase() : "UPSC SSC RRB IBPS NEET JEE GATE",
      "India passport photo online",
      "photo resize compress",
    ].join(", "),
    openGraph: {
      title: meta.title,
      description: meta.description,
    },
  }
}

export default function PassportImagePage({ searchParams }: Props) {
  const examKey = searchParams?.exam ?? ""
  const meta = EXAM_META[examKey] ?? DEFAULT_META

  return (
    <div className="min-h-screen dark:bg-[#0a0a0f] bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 py-10 sm:px-6">

        {/* Header — changes based on exam */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-xl bg-violet-600/20 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 className="text-xl font-black dark:text-white text-slate-900">
              {meta.title.split("—")[0].trim()}
            </h1>
          </div>
          <p className="text-slate-500 text-sm">{meta.description}</p>
        </div>

        {/* Tool — passes defaultExam so the right preset is pre-selected */}
        <PassportPhotoMaker defaultExam={examKey || "upsc"} />

      </div>
    </div>
  )
}