"use client"
import { X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const NavBar = () => {
    const [mobileNavOpen, setMobileNavOpen] = useState(false);
    const [scrollDirection, setScrollDirection] = useState("up");
    const [prevOffset, setPrevOffset] = useState(0);
    const [visible, setVisible] = useState(true);

    const pathName = usePathname();

    const toggleVisible = () => {
        const currentScrollPos = window.scrollY;
        if (currentScrollPos > prevOffset) {
            setScrollDirection("down");
        } else if (currentScrollPos < prevOffset) {
            setScrollDirection("up");
        }
        setPrevOffset(currentScrollPos);
        setVisible(currentScrollPos < 10 || scrollDirection === "up");
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisible);
        return () => window.removeEventListener("scroll", toggleVisible);
    }, [prevOffset]);

    const navLinks = [
        { href: "/", label: "Home", isActive: pathName === "/" },
        { href: "/services", label: "Services", isActive: pathName === "/services" },
        { href: "/about-us", label: "About Us", isActive: pathName === "/about-us" },
        { href: "/contact", label: "Contact Us", isActive: pathName === "/contact" },
    ]

    return (
        <div>
            <nav className={`fixed top-0 w-full py-6 bg-white z-30 tansition-transform duration-300 ${visible ? "translate-y-0" : "-translate-y-full"}`}>
                <div className="flex items-center justify-between relative container mx-auto px-4">
                    <Link className="inline-block text-xl font-bold" href="#">
                        <span>D<span className='text-blue-800'>X</span> | Developer Exchange</span>
                    </Link>
                    <div className="xl:hidden">
                        <button
                            onClick={() => setMobileNavOpen(!mobileNavOpen)}
                            className="flex w-12 h-12 items-center justify-center rounded-md transition duration-200">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 12H21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                <path d="M3 6H21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                <path d="M3 18H21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                        </button>
                    </div>
                    <ul className="hidden xl:flex lg:w-auto lg:space-x-12">
                        {navLinks && navLinks?.map((navLink, index) => {
                            return (
                                <Link
                                    className={`relative inline-block text-md text-gray-900 font-medium after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-gray-900 after:transition-all after:duration-300 hover:after:w-full ${navLink.isActive && "after:w-full"}`}
                                    href={navLink.href}
                                    key={index}
                                >
                                    {navLink.label}
                                </Link>
                            )
                        })}
                    </ul>
                    <div className="hidden xl:block">
                        <div className="flex group items-center">
                            <button className="relative inline-block py-3 px-4 text-sm font-semibold text-indigo-500 hover:text-indigo-50 bg-indigo-100 hover:bg-indigo-600 rounded-md transition duration-300" >
                                <span className="relative">Login / Signup</span>
                                <div className='text-black hidden group-hover:block  absolute z-50 top-full right-0'>
                                    <div className="-top-2 z-20 absolute right-10 w-4 h-4 rounded-sm bg-white border-l border-t border-gray-200 transform rotate-45"></div>
                                    <div className="w-full shadow-lg max-w-xl bg-white border border-gray-200 rounded-3xl pt-4 pb-4 px-4 flex flex-row gap-4">
                                        <div className='flex flex-col gap-4'>
                                            <Link href="/developer/login" className='w-64 h-fit bg-purple-100 hover:bg-purple-200 rounded-xl flex justify-center items-center p-3 relative gap-3'>
                                                <Image src="/developer.png" alt="Developer" width={60} height={60} />
                                                <span className='font-bold text-xl flex flex-col items-start text-purple-900'>
                                                    Developer
                                                    <span className='text-xs font-normal text-gray-500 text-start'>
                                                        Access your account and continue exploring!
                                                    </span>
                                                </span>
                                            </Link>
                                            <Link href="/company/login" className='w-64 h-fit bg-emerald-100 hover:bg-emerald-200 rounded-xl flex justify-center items-center p-3 relative gap-3'>
                                                <Image src="/company.png" alt="Developer" width={60} height={60} />
                                                <span className='font-bold text-xl flex flex-col items-start text-emerald-900'>
                                                    Company
                                                    <span className='text-xs font-normal text-gray-500 text-start'>
                                                        Access your account and continue exploring!
                                                    </span>
                                                </span>
                                            </Link>
                                        </div>

                                        <Link href="/signup" className='w-64 bg-blue-50 hover:bg-blue-100 rounded-xl flex flex-col gap-1 justify-evenly items-start p-3 relative'>
                                            <Image src="/signup.jpg" alt="Developer" width={130} height={120} className='mix-blend-multiply' />
                                            <span className='font-bold text-xl flex flex-col items-start text-blue-900 '>
                                                Sign Up
                                                <span className='text-xs font-normal text-gray-500 max-w-xl text-start'>
                                                    Join us today and start your journey!
                                                </span>
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            <div
                className={`fixed ${!mobileNavOpen && "hidden"} top-0 left-0 z-40 bg-gray-800 w-screen h-screen opacity-25`}></div>
            <div className={`fixed top-0 w-full z-50 transition-transform duration-300 ease-in-out ${mobileNavOpen ? 'translate-x-0' : '-translate-x-full'}`}>

                <nav className="relative flex flex-col py-6 px-6 w-fit h-full bg-white border-l">
                    <div className="flex items-center mb-6">
                        <Link className="mr-auto text-lg font-bold leading-none" href="#">
                            <span>D<span className='text-blue-800'>X</span> | Developer Exchange</span>
                        </Link>
                        <button onClick={() => setMobileNavOpen(!mobileNavOpen)}>
                            <X />
                        </button>
                    </div>
                    <div className='flex flex-col items-start justify-start gap-3 h-screen'>
                        <div className='font-medium'>
                            {navLinks && navLinks.map((navLink, index) => {
                                return (
                                    <Link onClick={() => setMobileNavOpen(false)} className="block py-4 text-gray-900"
                                        href={navLink.href} key={index}>
                                        {navLink.label}
                                    </Link>
                                )
                            })}
                        </div>
                        <Link href="/developer/login" className='w-64 h-24 bg-purple-100 hover:bg-purple-200 p-3 rounded-xl flex justify-around items-center relative'>
                            <span className='font-extrabold flex flex-col text-purple-900'>
                                Developer
                                <span className='text-xs font-normal text-gray-500 text-start'>
                                    Access your account & continue exploring!
                                </span>
                            </span>
                            <Image src="/developer.png" alt="Developer" width={80} height={80} className='' />
                        </Link>
                        {/* <Link href="/company/login" className='w-64 h-24 bg-amber-50 hover:bg-amber-100 border-[1px] border-amber-400 rounded-xl flex justify-around items-center relative'>
                            <span className='font-extrabold flex flex-col text-amber-900'>
                                Company
                                <span className='text-xs text-gray-500'>
                                    Login as company
                                </span>
                            </span>
                            <Image src="/company.png" alt="Developer" width={100} height={100} className='' />
                        </Link> */}
                        <Link href="/signup" className='w-64 h-24 bg-blue-50 hover:bg-blue-100 p-3 rounded-xl flex justify-around items-center relative'>
                            <span className='font-extrabold flex flex-col text-blue-900'>
                                Sign Up
                                <span className='text-xs font-normal text-gray-500 text-start'>
                                    Join us today and start your journey!
                                </span>
                            </span>
                            <Image src="/company.png" alt="Developer" width={80} height={80} className='' />
                        </Link>
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default NavBar
