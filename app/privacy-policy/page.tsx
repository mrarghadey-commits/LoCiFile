import type { Metadata } from "next"
import PrivacyPolicy from "@/tools/PrivacyPolicy"

export const metadata: Metadata = {
  title: "Privacy Policy — LoCiFile | Your Files Never Leave Your Device",
  description: "LoCiFile processes all files locally in your browser. We don't upload, store, or share your documents. Read our full privacy policy to understand exactly how we handle your data.",
  keywords: "locifile privacy policy, browser based file processing, no upload file tool, local file processing privacy, pdf compressor privacy",
  openGraph: {
    title: "Privacy Policy — LoCiFile",
    description: "Everything runs in your browser. Your files never touch our servers. Here's our full privacy policy.",
    type: "website",
  },
}

export default function PrivacyPolicyPage() {
  return <PrivacyPolicy />
}