import type { Metadata } from "next"
import TermsOfService from "@/tools/TermsOfService"

export const metadata: Metadata = {
  title: "Terms of Service — LoCiFile | Free Browser-Based File Tools",
  description: "LoCiFile's terms of service. Free to use, no account required. All file processing happens locally in your browser. Read our full terms before using our tools.",
  keywords: "locifile terms of service, locifile terms, file tool terms, pdf compressor terms, free file tools terms of use",
  openGraph: {
    title: "Terms of Service — LoCiFile",
    description: "Free to use, no account required. Read our terms before using LoCiFile's browser-based file tools.",
    type: "website",
  },
}

export default function TermsOfServicePage() {
  return <TermsOfService />
}