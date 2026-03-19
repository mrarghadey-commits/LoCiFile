import Image from 'next/image'
import React from 'react'

const Footer = () => {
  return (
    <div className=' border-t border-slate-200 dark:border-primary/20 bg-slate-50 dark:bg-slate-900/30 flex flex-col sm:flex-row gap-2 justify-between items-center lg:px-20 px-3 pt-4 pb-8'>
        <div className="flex gap-2 items-center">
            <Image src='/logo.png' alt='logo' width={40} height={40}></Image>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">© 2026 LoCiFile. All processing is private and local.</p>
        </div>
        <div className=" flex justify-between gap-2 ">
          <a className='text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-primary transition-colors cursor-pointer underline whitespace-nowrap'>privacy policy</a>
          <a className='text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-primary transition-colors cursor-pointer underline whitespace-nowrap'>Terms of Service</a>
          <a className='text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-primary transition-colors cursor-pointer underline'>Security</a>
        </div>
    </div>
  )
}

export default Footer