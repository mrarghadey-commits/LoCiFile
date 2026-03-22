import type { Metadata } from "next"
import Security from "@/tools/Security"

export const metadata: Metadata = {
  title: "Security — LoCiFile | How We Keep Your Files Safe",
  description: "LoCiFile is built on a simple security principle: we never touch your files. All processing happens locally in your browser. No uploads, no servers, no risk.",
  keywords: "locifile security, browser file processing security, local file processing, no upload pdf tool, secure file compression, passport photo security",
  openGraph: {
    title: "Security — LoCiFile",
    description: "Your files never leave your device. Learn how LoCiFile is built to be secure by design.",
    type: "website",
  },
}

export default function SecurityPage() {
  return <Security />
}