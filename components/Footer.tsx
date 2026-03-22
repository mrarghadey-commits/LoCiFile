import Image from 'next/image'
import Link from "next/link";
import React from 'react'

const Footer = () => {
  return (
    <div className=' border-t border-slate-200 dark:border-primary/20 bg-slate-50 dark:bg-slate-900/30 flex flex-col sm:flex-row gap-2 justify-between items-center lg:px-20 px-3 pt-4 pb-8'>
        <div className="flex gap-2 items-center">
            <Image src='/logo.png' alt='logo' width={40} height={40}></Image>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">© 2026 LoCiFile. All processing is private and local.</p>
        </div>
        <div className=" flex justify-between gap-2 ">
          <Link href="/privacy-policy" className='text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-primary transition-colors cursor-pointer underline whitespace-nowrap'>Privacy Policy</Link>
          <Link href="/terms-service" className='text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-primary transition-colors cursor-pointer underline whitespace-nowrap'>Terms and Service</Link>
          <Link href="/security" className='text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-primary transition-colors cursor-pointer underline whitespace-nowrap'>Security</Link>
          <Link href="/contact-us" className='text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-primary transition-colors cursor-pointer underline whitespace-nowrap'>Contact Us</Link>
        </div>
    </div>
  )
}

export default Footer