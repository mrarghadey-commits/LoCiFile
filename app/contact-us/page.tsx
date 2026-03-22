import type { Metadata } from "next"
import ContactForm from "@/tools/ContactForm"

export const metadata: Metadata = {
  title: "Contact LoCiFile — Get Help, Report Bugs & Share Feedback",
  description: "Reach out to the LoCiFile team for support, bug reports, or feature suggestions. We read every message and typically reply within 48 hours.",
  keywords: "contact locifile, locifile support, locifile feedback, locifile help, locifile bug report",
  openGraph: {
    title: "Contact LoCiFile — We're Here to Help",
    description: "Got a question about our PDF compressor or passport photo tool? Drop us a message and we'll get back to you soon.",
    type: "website",
  },
}

export default function ContactPage() {
  return <ContactForm />
}