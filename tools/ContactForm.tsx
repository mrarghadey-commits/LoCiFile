"use client"

import { useState } from "react"


const FORMSPREE_ENDPOINT = "https://formspree.io/f/xgonbdpv"

export default function ContactForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) return
    setStatus("sending")
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name, email, _replyto: email, subject, message }),
      })
      if (res.ok) {
        setStatus("sent")
        setName(""); setEmail(""); setSubject(""); setMessage("")
        setTimeout(() => setStatus("idle"), 5000)
      } else {
        setStatus("error")
        setTimeout(() => setStatus("idle"), 4000)
      }
    } catch {
      setStatus("error")
      setTimeout(() => setStatus("idle"), 4000)
    }
  }

  const inputClass =
    "w-full dark:bg-[#0a0a0f] bg-slate-100 border dark:border-white/10 border-slate-200 rounded-xl px-4 py-3 dark:text-white text-slate-900 text-sm font-medium outline-none focus:ring-2 focus:ring-violet-500 transition-all placeholder:text-slate-500"

  return (
    <div className="min-h-screen dark:bg-[#0a0a0f] bg-slate-100 dark:text-white text-slate-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

        {/* Page Header */}
        <div className="mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight mb-2">Contact Us</h1>
          <p className="dark:text-slate-400 text-slate-500 text-sm max-w-xl">
            Something not working the way you expected? Have an idea that would make LoCiFile more useful?
            We want to hear it. Fill out the form and we'll get back to you.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4">

          {/* Left: Form */}
          <div className="flex-1 flex flex-col gap-3">

            {/* Name + Email row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="dark:bg-[#12121a] bg-white border dark:border-white/10 border-slate-200 rounded-2xl p-4 flex flex-col gap-2">
                <label className="text-xs font-black dark:text-slate-400 text-slate-500 uppercase tracking-wider">
                  Your Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className={inputClass}
                />
              </div>
              <div className="dark:bg-[#12121a] bg-white border dark:border-white/10 border-slate-200 rounded-2xl p-4 flex flex-col gap-2">
                <label className="text-xs font-black dark:text-slate-400 text-slate-500 uppercase tracking-wider">
                  Your Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={inputClass}
                />
              </div>
            </div>

            {/* Subject */}
            <div className="dark:bg-[#12121a] bg-white border dark:border-white/10 border-slate-200 rounded-2xl p-4 flex flex-col gap-2">
              <label className="text-xs font-black dark:text-slate-400 text-slate-500 uppercase tracking-wider">
                Subject
              </label>
              <input
                type="text"
                value={subject}
                onChange={e => setSubject(e.target.value)}
                placeholder="e.g. PDF not compressing correctly"
                className={inputClass}
              />
            </div>

            {/* Message */}
            <div className="dark:bg-[#12121a] bg-white border dark:border-white/10 border-slate-200 rounded-2xl p-4 flex flex-col gap-2">
              <label className="text-xs font-black dark:text-slate-400 text-slate-500 uppercase tracking-wider">
                Your Message
              </label>
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Describe your issue or suggestion in as much detail as you'd like. Screenshots or steps to reproduce a bug are always helpful."
                rows={6}
                className={`${inputClass} resize-none`}
              />
            </div>

            {/* Submit button */}
            <button
              onClick={handleSubmit}
              disabled={!name.trim() || !email.trim() || !subject.trim() || !message.trim() || status === "sending"}
              className={`w-full py-3 rounded-2xl font-black text-white text-sm transition-all flex items-center justify-center gap-2 ${
                status === "sent" ? "bg-emerald-600" :
                status === "error" ? "bg-red-600" :
                !name.trim() || !email.trim() || !subject.trim() || !message.trim() || status === "sending"
                  ? "bg-slate-700 cursor-not-allowed text-slate-400"
                  : "bg-violet-600 hover:bg-violet-500 shadow-lg shadow-violet-500/25"
              }`}
            >
              {status === "sending" && (
                <>
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Sending...
                </>
              )}
              {status === "sent" && (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Message Sent!
                </>
              )}
              {status === "error" && (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Failed — Try Again
                </>
              )}
              {status === "idle" && (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Send Message
                </>
              )}
            </button>

            <p className="text-xs text-slate-500 text-center leading-relaxed">
              Your message is sent directly to{" "}
              <a href="mailto:locifiletools@gmail.com" className="text-violet-400 hover:underline">
                locifiletools@gmail.com
              </a>
              . We typically reply within 48 hours.
            </p>
          </div>

          {/* Right: Contact info + cards */}
          <div className="w-full lg:w-72 flex flex-col gap-3">

            {/* Direct email */}
            <div className="dark:bg-[#12121a] bg-white border dark:border-white/10 border-slate-200 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="font-black text-sm dark:text-white text-slate-900">Email Us Directly</span>
              </div>
              <a
                href="mailto:locifiletools@gmail.com"
                className="text-violet-400 hover:text-violet-300 text-sm font-bold transition-colors break-all"
              >
                locifiletools@gmail.com
              </a>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Prefer to write your own email? Just click the address above. Works the same way.
              </p>
            </div>

            {/* What to expect */}
            <div className="dark:bg-[#12121a] bg-white border dark:border-white/10 border-slate-200 rounded-2xl p-4">
              <p className="text-xs font-black dark:text-slate-400 text-slate-500 uppercase tracking-wider mb-3">
                What to Expect
              </p>
              <ul className="flex flex-col gap-2.5">
                {[
                  "We read every single message personally.",
                  "Most replies go out within 24–48 hours.",
                  "Bug reports get prioritised — please be specific.",
                  "Feature ideas are always welcome, even rough ones.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-1.5 flex-shrink-0" />
                    <span className="text-xs dark:text-slate-400 text-slate-600 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Info cards */}
            {[
              {
                icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
                color: "emerald",
                title: "No Data Stored",
                desc: "Your message goes straight to our inbox. We don't log or store anything.",
              },
              {
                icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z",
                color: "violet",
                title: "All Topics Welcome",
                desc: "Bugs, feedback, partnerships, or just saying hi — we're open to it all.",
              },
            ].map(({ icon, color, title, desc }) => (
              <div key={title} className="dark:bg-[#12121a] bg-white border dark:border-white/5 border-slate-200 rounded-xl p-3 flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full bg-${color}-600/20 flex items-center justify-center flex-shrink-0`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 text-${color}-400`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
                  </svg>
                </div>
                <div>
                  <p className="font-black text-xs dark:text-white text-slate-900">{title}</p>
                  <p className="text-slate-500 text-xs">{desc}</p>
                </div>
              </div>
            ))}

          </div>
        </div>

        {/* Bottom note */}
        <div className="mt-8 dark:bg-[#12121a] bg-white border dark:border-white/5 border-slate-200 rounded-2xl p-4 sm:p-5">
          <h2 className="font-black text-sm dark:text-white text-slate-900 mb-1">About LoCiFile</h2>
          <p className="text-xs dark:text-slate-400 text-slate-500 leading-relaxed max-w-2xl">
            LoCiFile is a free, browser-based file utility built for everyday use — compressing PDFs,
            resizing passport photos, and more. Everything runs locally in your browser, so your files
            never leave your device. If something isn't working right or you have an idea that would
            make it better, we genuinely want to know.
          </p>
        </div>

      </div>
    </div>
  )
}