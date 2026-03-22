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

function HighlightCard({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="dark:bg-[#12121a] bg-white border dark:border-white/5 border-slate-200 rounded-xl p-4 flex items-start gap-3">
      <div className="w-9 h-9 rounded-full bg-violet-600/20 flex items-center justify-center flex-shrink-0 mt-0.5">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
        </svg>
      </div>
      <div>
        <p className="font-black text-sm dark:text-white text-slate-900 mb-1">{title}</p>
        <p className="text-xs dark:text-slate-400 text-slate-500 leading-relaxed">{desc}</p>
      </div>
    </div>
  )
}

export default function Security() {
  return (
    <div className="min-h-screen dark:bg-[#0a0a0f] bg-slate-100 dark:text-white text-slate-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16">

        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-black uppercase tracking-widest text-violet-400 mb-2">Security</p>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            How We Keep Your Files Safe
          </h1>
          <p className="dark:text-slate-400 text-slate-500 text-sm leading-relaxed max-w-xl">
            The most secure system is one that never sees your data in the first place. That's the principle
            LoCiFile is built on.
          </p>
        </div>

        {/* Highlight cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
          <HighlightCard
            icon="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            title="Zero File Uploads"
            desc="Your files never leave your device. There's no upload button that secretly sends data to a server."
          />
          <HighlightCard
            icon="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            title="No Account Required"
            desc="We don't ask for your email, name, or any personal details to use the tools. Nothing to breach."
          />
          <HighlightCard
            icon="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v10m0 0h10M9 13H5m0 0a2 2 0 01-2-2V5m2 8v6a2 2 0 002 2h10a2 2 0 002-2v-6"
            title="No Server Storage"
            desc="We run no file storage infrastructure. There's no database of user documents because none are ever collected."
          />
          <HighlightCard
            icon="M13 10V3L4 14h7v7l9-11h-7z"
            title="Processed in Your Browser"
            desc="All compression, resizing, and conversion runs using JavaScript inside your own browser tab."
          />
        </div>

        <div className="flex flex-col gap-8 dark:text-slate-300 text-slate-700 text-sm leading-relaxed">

          <section>
            <SectionTitle>The Architecture That Makes This Possible</SectionTitle>
            <p>
              Most online file tools work by uploading your document to a server, processing it there, and
              sending the result back. That approach is convenient to build, but it means your files are
              transmitted over the internet, stored temporarily (sometimes permanently) on someone else's
              infrastructure, and processed by code you can't inspect.
            </p>
            <p className="mt-3">
              LoCiFile works differently. Every tool on the site uses browser-native APIs and open-source
              JavaScript libraries — things like PDF.js for reading PDFs and pdf-lib for creating them — to
              do all the processing directly on your device. The only thing that travels over the network
              is the webpage itself when you first load it. After that, your files stay put.
            </p>
          </section>

          <Divider />

          <section>
            <SectionTitle>What Happens When You Process a File</SectionTitle>
            <p>Here's exactly what happens when you use a LoCiFile tool, step by step:</p>
            <ol className="mt-3 flex flex-col gap-2.5">
              {[
                "You select or drag a file into the tool. It's read into your browser's memory — it doesn't go anywhere else.",
                "The browser runs the processing logic (compression, resizing, format conversion) locally using JavaScript.",
                "The result is generated in memory and made available for you to download.",
                "When you close or refresh the tab, the file is cleared from memory. Nothing is retained.",
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-violet-600/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-violet-400 text-xs font-black">{i + 1}</span>
                  </div>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </section>

          <Divider />

          <section>
            <SectionTitle>Open Source Libraries We Use</SectionTitle>
            <p>
              The processing tools LoCiFile relies on are well-established, open-source libraries with large
              communities and public codebases. You can inspect them yourself:
            </p>
            <ul className="mt-3 flex flex-col gap-2.5">
              {[
                { label: "PDF.js", desc: "Mozilla's open-source PDF reader, used to render and read PDF pages in the browser." },
                { label: "pdf-lib", desc: "A JavaScript library for creating and modifying PDFs entirely in the browser, with no server dependency." },
                { label: "Canvas API", desc: "A built-in browser API used for image processing and resizing. No third-party code involved." },
              ].map(({ label, desc }) => (
                <li key={label} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-1.5 flex-shrink-0" />
                  <span><strong className="dark:text-white text-slate-900">{label}:</strong> {desc}</span>
                </li>
              ))}
            </ul>
          </section>

          <Divider />

          <section>
            <SectionTitle>HTTPS Everywhere</SectionTitle>
            <p>
              The LoCiFile website is served over HTTPS. This means the connection between your browser and
              our servers is encrypted, so nobody can intercept the page as it loads. It also means your
              browser will warn you if anything is tampered with in transit.
            </p>
          </section>

          <Divider />

          <section>
            <SectionTitle>Contact Form Security</SectionTitle>
            <p>
              The contact form is the one place where data does leave your device — specifically, the name,
              email, and message you type. This is routed through Formspree, a trusted form handling service,
              directly to our Gmail inbox. We don't store form submissions ourselves. Formspree's own
              security practices are documented at their website.
            </p>
          </section>

          <Divider />

          <section>
            <SectionTitle>Found a Security Issue?</SectionTitle>
            <p>
              If you spot something that looks like a security vulnerability — even if you're not sure —
              please tell us. We'd rather investigate a false alarm than miss something real. Email us
              directly and we'll look into it promptly.
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