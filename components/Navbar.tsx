"use client"
import { House, Moon, FileImage, FileText, Sun, X, Menu, Home, ChevronDown } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Navbar = () => {
    
    const [dark, setDark] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const [isImageToolOpen, setisImageToolOpen] = useState(false)
    useEffect(() => {
        const saved = localStorage.getItem("theme");

        if (saved) {
        const isDark = saved === "dark";
        document.documentElement.classList.toggle("dark", isDark);
        setDark(isDark);
        } else {
        const media = window.matchMedia("(prefers-color-scheme: dark)");
        const isDark = media.matches;

        document.documentElement.classList.toggle("dark", isDark);
        setDark(isDark);

        const handler = (e: any) => {
            document.documentElement.classList.toggle("dark", e.matches);
            setDark(e.matches);
        };

        media.addEventListener("change", handler);
        return () => media.removeEventListener("change", handler);
        }
    }, []);
    const toggleTheme = () => {
        const isDark = document.documentElement.classList.toggle("dark");
        setDark(isDark);
        localStorage.setItem("theme", isDark ? "dark" : "light");
    };
  return (
    <div className=' fixed z-50 top-0  md:h-16 w-full bg-backgroundLight/50 dark:bg-backgroundDark/50 backdrop-blur-md border-b border-slate-200 dark:border-primary/50 flex items-center justify-between md:px-3 '>
        <div className="flex gap-2 items-center">
            <Image src='/logo.png' alt='hello' width={50} height={50} />
            <h1 className="text-xl font-semibold tracking-[4]">LoCiFile</h1>
        </div>
        <div className=" hidden md:flex items-center gap-8">
            <div className="flex hover:text-primary transition-colors gap-1.5 items-center">
                <House size={18} />
                <Link href='/' >Home</Link>
            </div>
            <div className="relative group flex gap-1.5 items-center hover:text-primary transition-colors cursor-pointer">
                <FileImage size={18} />
                <span>Image Tool</span>
                <ChevronDown className="transition-transform group-hover:rotate-180 duration-200" />
                <div className=" absolute top-full w-48 mt-2 -left-12 flex flex-col opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 invisible group-hover:visible transition-all duration-200 bg-white dark:bg-backgroundDark shadow-lg py-2 z-50 border rounded-2xl border-slate-200 dark:border-primary/50">
                    <Link href="/image-compressor" className='px-4 py-2 hover:bg-primary/10 dark:hover:text-white hover:text-slate-800 transition-all duration-200'>Image Compressor</Link>
                    <Link href="/passport-image-resizer" className='px-4 py-2 hover:bg-primary/10 dark:hover:text-white hover:text-slate-800 transition-all duration-200'>Image Resizer</Link>
                </div>
            </div>
            <div className="flex gap-1.5 items-center hover:text-primary transition-colors">
                <FileText size={18} />
                <Link href='/pdf-compressor' >PDF Tool</Link>
            </div>
        </div>
        <div className={` cursor-pointer md:hidden flex flex-col fixed top-14 left-0 w-full bg-backgroundLight/80 dark:bg-backgroundDark/80  backdrop-blur-lg border-b rounded-b-2xl border-slate-200 dark:border-primary/50 py-4 gap-4 px-5 z-50 transform transition-all duration-300 ease-in-out ${isMobile ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5 pointer-events-none"}`}>
            <Link href='/' onClick={()=> setIsMobile(false)} className=' hover:bg-primary/50 rounded-2xl p-2 flex gap-1.5 items-center border-b border-primary/70'> <Home size={18}/> Home</Link>
            <div  className={`${!isImageToolOpen && "hover:bg-primary/50"} border-b border-primary/70 rounded-2xl p-2`}>
                <div onClick={()=>{setisImageToolOpen(!isImageToolOpen)}} className=" flex gap-1.5 items-center">
                    <FileImage size={18}/>Image Tool <ChevronDown className={`transition-transform ${isImageToolOpen ? " rotate-180": ""}`} />
                </div>
                <div className={` overflow-hidden transition-all duration-300 ${isImageToolOpen? "max-h-40 mt-2 " : "max-h-0" } flex flex-col gap-2 ml-3 pl-2 text-sm border-l border-primary`}>
                    <Link href="/image-compressor" onClick={(e)=>{e.stopPropagation(); setIsMobile(false);}} className='hover:bg-primary p-2 rounded-xl'>Image Compressor</Link>
                    <Link href="/passport-image-resizer" onClick={(e)=>{e.stopPropagation(); setIsMobile(false);}} className='hover:bg-primary p-2 rounded-xl'>Image Resizer</Link>
                </div>
            </div>
            <Link href='/pdf-compressor' onClick={()=> setIsMobile(false)} className='hover:bg-primary rounded-2xl p-2 flex gap-1.5 items-center border-b border-primary/70'><FileText size={18}/>PDF Tool</Link>
        </div>
        <div className=" flex items-center gap-x-1 mr-3">
            <div onClick={toggleTheme} className=' p-1 w-10 h-10 rounded-lg  active:scale-95 bg-slate-200 dark:bg-primary/10 text-slate-700 dark:text-primary hover:bg-primary/20 transition-all ' >
                { dark ? <Sun size={30} strokeWidth={2.25} /> : <Moon size={30} strokeWidth={2.25} />}
            </div>
            <div onClick={()=> {setIsMobile(!isMobile); if(isImageToolOpen) setisImageToolOpen(false);}} className=" md:hidden  p-1 w-10 h-10 rounded-lg  active:scale-95 bg-slate-200 dark:bg-primary/10 text-slate-700 dark:text-primary hover:bg-primary/20 transition-all ">
                { isMobile ? <X size={30} strokeWidth={2.25}/> : <Menu strokeWidth={2.25} size={30}/> }
            </div>
        </div>
    </div>
  )
}

export default Navbar