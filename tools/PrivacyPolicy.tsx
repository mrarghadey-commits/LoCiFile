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

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen dark:bg-[#0a0a0f] bg-slate-100 dark:text-white text-slate-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16">

        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-black uppercase tracking-widest text-violet-400 mb-2">Legal</p>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">Privacy Policy</h1>
          <p className="dark:text-slate-400 text-slate-500 text-sm">Last updated: March 2026</p>
        </div>

        <div className="flex flex-col gap-8 dark:text-slate-300 text-slate-700 text-sm leading-relaxed">

          <section>
            <p>
              We built LoCiFile with one rule in mind: your files are yours. We never see them, never store
              them, and never send them anywhere. Every tool on this site — whether you're compressing a PDF
              or resizing a passport photo — runs entirely inside your browser using your device's own
              processing power.
            </p>
            <p className="mt-3">
              This page explains what information we do and don't collect, and why. It's written to be
              readable, not to bury anything in legal language.
            </p>
          </section>

          <Divider />

          <section>
            <SectionTitle>Your Files Stay on Your Device</SectionTitle>
            <p>
              When you use any LoCiFile tool, your files are processed using browser-side JavaScript and the
              Web APIs built into your browser. Nothing is uploaded to a server. Nothing leaves your device.
              The moment you close the tab, any processed file is gone — we have no copy of it, and neither
              does anyone else.
            </p>
            <p className="mt-3">
              This isn't a marketing claim. It's just how the tools are built. There is no server-side
              processing endpoint. There is no file storage bucket. There is no pipeline that your document
              passes through.
            </p>
          </section>

          <Divider />

          <section>
            <SectionTitle>What We Actually Collect</SectionTitle>
            <p>We collect very little. Here's what we do use:</p>
            <ul className="mt-3 flex flex-col gap-2.5">
              {[
                { label: "Analytics", desc: "We use basic, privacy-respecting analytics to understand how many people visit the site and which tools are most used. This does not include any personal identifiers." },
                { label: "Contact form submissions", desc: "If you reach out to us via the contact page, we receive your name, email address, and message. We use this only to reply to you. We don't add you to any mailing list or share your details with anyone." },
                { label: "Browser storage", desc: "Some tools may use your browser's local storage to remember preferences like dark mode. This data never leaves your device." },
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
            <SectionTitle>Cookies</SectionTitle>
            <p>
              We don't use advertising cookies or tracking cookies. If our analytics tool sets a cookie, it's
              a first-party cookie used only to avoid counting the same visitor twice in a single session. We
              don't use any third-party ad networks, retargeting pixels, or cross-site trackers.
            </p>
          </section>

          <Divider />

          <section>
            <SectionTitle>Third-Party Services</SectionTitle>
            <p>We use a small number of third-party services to keep the site running:</p>
            <ul className="mt-3 flex flex-col gap-2.5">
              {[
                { label: "Hosting", desc: "The site is hosted on a standard cloud platform. They process web requests but have no access to your files, since files are never transmitted." },
                { label: "Formspree", desc: "If you submit the contact form, your message is routed through Formspree to our email inbox. Their privacy policy is available at formspree.io." },
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
            <SectionTitle>Children's Privacy</SectionTitle>
            <p>
              LoCiFile is a general-purpose file utility and is not directed at children under 13. We don't
              knowingly collect any personal information from children. If you believe a child has submitted
              personal information through our contact form, please email us and we'll delete it promptly.
            </p>
          </section>

          <Divider />

          <section>
            <SectionTitle>Changes to This Policy</SectionTitle>
            <p>
              If we make meaningful changes to this policy, we'll update the date at the top of this page.
              We won't notify you by email unless a change significantly affects how your data is handled —
              and given the nature of how this site works, that's unlikely to happen.
            </p>
          </section>

          <Divider />

          <section>
            <SectionTitle>Questions?</SectionTitle>
            <p>
              If anything here is unclear or you have a specific concern, feel free to reach out. We're a
              small team and we read everything.
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