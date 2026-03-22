import React from "react"

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-base font-black dark:text-white text-slate-900 mb-3 flex items-center gap-2">
      <span className="w-1 h-4 rounded-full bg-violet-500 inline-block" />
      {children}
    </h2>
  )
}

function Divider() {
  return <div className="border-t dark:border-white/5 border-slate-200" />
}

export default function TermsOfService() {
  return (
    <div className="min-h-screen dark:bg-[#0a0a0f] bg-slate-100 dark:text-white text-slate-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16">

        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-black uppercase tracking-widest text-violet-400 mb-2">Legal</p>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">Terms of Service</h1>
          <p className="dark:text-slate-400 text-slate-500 text-sm">Last updated: March 2026</p>
        </div>

        <div className="flex flex-col gap-8 dark:text-slate-300 text-slate-700 text-sm leading-relaxed">

          <section>
            <p>
              By using LoCiFile, you agree to these terms. They're written to be straightforward — no
              hidden clauses, no legal tricks. If something isn't clear, email us and we'll explain it.
            </p>
            <p className="mt-3">
              LoCiFile is a free, browser-based file utility. You don't need an account to use it.
              There's nothing to sign up for. These terms exist to protect both you and us.
            </p>
          </section>

          <Divider />

          <section>
            <SectionTitle>Using LoCiFile</SectionTitle>
            <p>
              You're welcome to use LoCiFile's tools for personal or professional purposes at no cost. The
              tools are provided as-is. We do our best to keep them working reliably, but we can't guarantee
              uninterrupted availability — things break sometimes, and we're a small team.
            </p>
            <p className="mt-3">
              You agree not to use LoCiFile to process files that contain illegal content, or to attempt
              to reverse-engineer, copy, or exploit the tools in a way that harms the service or other users.
            </p>
          </section>

          <Divider />

          <section>
            <SectionTitle>Your Files and Content</SectionTitle>
            <p>
              You own your files. We don't claim any rights to the documents, images, or other content you
              process using our tools. Since all processing happens locally in your browser, we never even
              see your files — so there's nothing for us to claim rights over.
            </p>
            <p className="mt-3">
              You are responsible for ensuring you have the right to process any file you use with our tools.
              Don't process files that belong to someone else without permission.
            </p>
          </section>

          <Divider />

          <section>
            <SectionTitle>No Warranties</SectionTitle>
            <p>
              LoCiFile is provided free of charge and without warranty of any kind. We make no guarantees
              about the accuracy, reliability, or fitness of the tools for any particular purpose. Use them
              at your own discretion, and always keep backups of important files before processing them.
            </p>
            <p className="mt-3">
              We won't be liable for any loss of data, damaged files, or other issues that arise from using
              our tools. That said, we've built them carefully and use them ourselves — so we have every
              reason to keep them working well.
            </p>
          </section>

          <Divider />

          <section>
            <SectionTitle>Intellectual Property</SectionTitle>
            <p>
              The LoCiFile name, logo, and website design are our property. You're welcome to link to our
              tools and mention us by name, but please don't copy the design or pass our tools off as your
              own.
            </p>
            <p className="mt-3">
              The underlying libraries we use (like PDF.js and pdf-lib) are open-source and governed by
              their respective licences. We're grateful to the open-source community that makes tools like
              ours possible.
            </p>
          </section>

          <Divider />

          <section>
            <SectionTitle>Third-Party Links</SectionTitle>
            <p>
              Our site may occasionally link to external websites or resources. We don't control those sites
              and aren't responsible for their content or privacy practices. A link from us isn't an
              endorsement.
            </p>
          </section>

          <Divider />

          <section>
            <SectionTitle>Changes to These Terms</SectionTitle>
            <p>
              We may update these terms occasionally. If we make a significant change, we'll update the date
              at the top. Continuing to use LoCiFile after a change means you accept the updated terms. If
              you disagree with any change, you can simply stop using the service — there's no account to
              delete or subscription to cancel.
            </p>
          </section>

          <Divider />

          <section>
            <SectionTitle>Governing Law</SectionTitle>
            <p>
              These terms are governed by the laws of India. Any disputes arising from the use of LoCiFile
              will be subject to the jurisdiction of the courts of India.
            </p>
          </section>

          <Divider />

          <section>
            <SectionTitle>Get in Touch</SectionTitle>
            <p>
              If you have any questions about these terms, or if something isn't clear, please reach out.
              We'd rather explain something than have you uncertain about it.
            </p>
            <p className="mt-2">
              Email:{" "}
              <a href="mailto:locifiletools@gmail.com" className="text-violet-400 hover:underline font-medium">
                locifiletools@gmail.com
              </a>
            </p>
          </section>

        </div>
      </div>
    </div>
  )
}