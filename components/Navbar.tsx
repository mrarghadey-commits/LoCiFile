"use client"
import { House, Moon, FileImage, FileText, Sun } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

function toggleTheme() {
  document.documentElement.classList.toggle("dark");
}
const Navbar = () => {
    const [dark, setDark] = useState(true)
  return (
    <div className=' fixed z-50 top-0  h-16 w-full bg-backgroundLight/50 dark:bg-backgroundDark/50 backdrop-blur-md border-b border-slate-200 dark:border-primary/50 flex items-center justify-between px-3'>
        <div className="flex gap-2 items-center">
            <Image src='/logo.png' alt='hello' width={50} height={50} />
            <h1 className="text-xl font-semibold tracking-[4]">LoCiFile</h1>
        </div>
        <div className=" hidden md:flex items-center gap-8">
            <div className="flex hover:text-primary transition-colors gap-1.5 items-center">
                <House size={18} />
                <Link href='/' >Home</Link>
            </div>
            <div className="flex gap-1.5 items-center hover:text-primary transition-colors">
                <FileImage size={18} />
                <Link href='/image-compressor' >Image Tool</Link>
            </div>
            <div className="flex gap-1.5 items-center hover:text-primary transition-colors">
                <FileText size={18} />
                <Link href='/pdf-compressor' >PDF Tool</Link>
            </div>
        </div>
        <div onClick={()=> {toggleTheme(); setDark(!dark);}} className='mr-5 p-1 w-10 h-10 rounded-lg  active:scale-95 bg-slate-200 dark:bg-primary/10 text-slate-700 dark:text-primary hover:bg-primary/20 transition-all ' >
            { dark ? <Sun size={30} strokeWidth={2.25} /> : <Moon size={30} strokeWidth={2.25} />}
        </div>
    </div>
  )
}

export default Navbar