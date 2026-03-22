import { Metadata } from "next"
import PassportPhotoMaker from "@/tools/passphotocompressor"

const EXAM_META: Record<string, { title: string; description: string }> = {
  upsc:      { title: "UPSC Passport Photo Maker — 350×450px, 20–50KB",         description: "Make passport photo for UPSC Civil Services. Auto-resize to 350×450px, 20–50KB. Free." },
  ssc_cgl:   { title: "SSC CGL / CHSL Passport Photo Maker — 413×531px",        description: "Passport photo for SSC CGL and CHSL. 413×531px, 20–50KB. Free online tool." },
  ssc_gd:    { title: "SSC GD Constable Passport Photo — 413×531px, 20–50KB",   description: "Passport photo for SSC GD Constable. Auto-resize to exact specifications. Free." },
  rrb_ntpc:  { title: "RRB NTPC Passport Photo Maker — Railway Exam Photo",     description: "Passport photo for RRB NTPC Railway exam. 320×240px, 30–70KB. Free, browser-based." },
  rrb_group_d:{ title: "RRB Group D Passport Photo Maker — Railway Exam",       description: "Passport photo for RRB Group D. Auto-resize to 320×240px, 20–50KB. Free." },
  ibps_po:   { title: "IBPS PO / Clerk Passport Photo — 200×230px, 20–50KB",   description: "Correct passport photo for IBPS PO and Clerk exam. 200×230px, 20–50KB. Free." },
  sbi_po:    { title: "SBI PO / Clerk Passport Photo Maker — Free Online",      description: "Passport photo for SBI PO and Clerk. Auto-resize to 200×230px, 20–50KB. Free." },
  neet:      { title: "NEET Passport Photo Maker — NTA Photo Requirements",     description: "Passport photo for NEET UG as per NTA. 413×531px, 10–200KB. Free tool." },
  jee_main:  { title: "JEE Main Passport Photo Maker — NTA Photo Size",         description: "Passport photo for JEE Main as per NTA. 413×531px, 10–300KB. Free." },
  gate:      { title: "GATE Passport Photo Maker — 530×690px Photo",            description: "Passport photo for GATE exam. 530×690px, 5–600KB. Free, no upload required." },
  passport:  { title: "Indian Passport Photo Maker — 35×45mm, 20–50KB",        description: "Indian passport photo online. 413×531px, 20–50KB, white background. Free & private." },
}

const DEFAULT_META = {
  title: "Passport Photo Maker for Indian Exams — UPSC, SSC, RRB, IBPS, NEET",
  description: "Free online passport photo maker for all Indian government exams. UPSC, SSC, RRB, IBPS, SBI, NEET, JEE, GATE. Auto-resize and compress to exact specifications.",
}

type Props = { searchParams: { exam?: string } }

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const exam = searchParams?.exam ?? ""
  const meta = EXAM_META[exam] ?? DEFAULT_META
  return {
    title: meta.title,
    description: meta.description,
    keywords: ["passport photo maker", "government exam photo", exam ? exam.replace(/_/g, " ").toUpperCase() : "UPSC SSC RRB IBPS NEET JEE GATE", "India passport photo", "photo resize compress"].join(", "),
    openGraph: { title: meta.title, description: meta.description },
  }
}

export default function PassportImageResizerPage({ searchParams }: Props) {
  const examKey = searchParams?.exam ?? ""
  const meta = EXAM_META[examKey] ?? DEFAULT_META
  return (
    <div className="min-h-screen dark:bg-[#0a0a0f] bg-slate-100 dark:text-white text-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6 w-full">
        <div className="text-center mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            {meta.title.split("—")[0].trim()}
          </h1>
          <p className="dark:text-slate-400 text-slate-500 text-sm mt-1">{meta.description}</p>
        </div>
        <PassportPhotoMaker defaultExam={examKey || "upsc"} />
      </div>
    </div>
  )
}