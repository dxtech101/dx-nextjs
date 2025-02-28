"use client"
import { X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const NavBar = () => {
    const [mobileNavOpen, setMobileNavOpen] = useState(false);
    const [scrollDirection, setScrollDirection] = useState("up");
    const [prevOffset, setPrevOffset] = useState(0);
    const [visible, setVisible] = useState(true);

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

    return (
        <div>
            <nav className={`fixed top-0 w-full py-6 bg-white z-30 tansition-transform duration-300 ${visible ? "translate-y-0" : "-translate-y-full"}`}>
                <div className="container px-4 mx-auto">
                    <div className="flex items-center relative">
                        <Link className="inline-block text-lg font-bold" href="#">
                            <img className="w-64 h-auto" src="/logo.png" alt="" />
                        </Link>
                        <div className="xl:hidden ml-auto">
                            <button
                                onClick={() => setMobileNavOpen(!mobileNavOpen)}
                                className="flex w-12 h-12 items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-md transition duration-200">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3 12H21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                    <path d="M3 6H21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                    <path d="M3 18H21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                </svg>
                            </button>
                        </div>
                        <ul className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden xl:flex lg:w-auto lg:space-x-12">
                            <li><Link className="inline-block text-md text-gray-900 hover:text-orange-900 font-medium" href="/">Home</Link></li>
                            <li><Link className="inline-block text-md text-gray-900 hover:text-orange-900 font-medium" href="#">Services</Link></li>
                            <li><Link className="inline-block text-md text-gray-900 hover:text-orange-900 font-medium" href="/about-us">About Us</Link></li>
                            <li><Link className="inline-block text-md text-gray-900 hover:text-orange-900 font-medium" href="/contact">Contact Us</Link></li>
                        </ul>
                        <div className="hidden xl:block ml-auto">
                            <div className="flex group items-center">
                                <button className="relative inline-block py-3 px-4 text-sm font-semibold text-indigo-500 hover:text-indigo-50 bg-indigo-100 hover:bg-indigo-600 rounded-md transition duration-300" >
                                    <span className="relative">Login / Signup</span>
                                    <div className='text-black hidden group-hover:block absolute z-50 top-full right-0'>
                                        <div className="-top-2 z-20 absolute right-10 w-4 h-4 rounded-sm bg-white border-l border-t border-gray-200 transform rotate-45"></div>
                                        <div className="w-full shadow-lg max-w-xl bg-white border border-gray-200 rounded-3xl pt-4 pb-4 px-4 flex flex-row gap-4">
                                            <div className='flex flex-col gap-4'>
                                                <Link href="/developer/login" className='w-64 h-52 bg-purple-100 hover:bg-purple-200 border-[1px] border-purple-400 rounded-xl flex justify-start items-start p-6 relative'>
                                                    <span className='font-bold text-xl flex flex-col items-start text-purple-900'>
                                                        Login
                                                        <span className='text-xs font-normal text-gray-500 text-start'>
                                                            Access your account and continue exploring!
                                                        </span>
                                                    </span>
                                                    <Image src="/developer.png" alt="Developer" width={120} height={120} className='absolute bottom-0 right-0 m-6' />
                                                </Link>
                                                {/* <Link href="/company/login" className='w-64 h-24 bg-amber-50 hover:bg-amber-100 border-[1px] border-amber-400 rounded-xl flex justify-around items-center relative'>
                                                    <span className='font-bold text-xl flex flex-col items-start text-amber-900'>
                                                        Company
                                                        <span className='text-xs font-normal text-gray-500'>
                                                            Login as company
                                                        </span>
                                                    </span>
                                                    <Image src="/company.png" alt="Developer" width={100} height={100} className='' />
                                                </Link> */}
                                            </div>
                                            <Link href="/signup" className='w-64 h-52 bg-blue-50 hover:bg-blue-100 border-[1px] border-blue-400 rounded-xl flex flex-col justify-start items-start p-6 relative'>
                                                <span className='font-bold text-xl flex flex-col items-start text-blue-900 '>
                                                    Sign Up
                                                    <span className='text-xs font-normal text-gray-500 max-w-xl text-start'>
                                                        Join us today and start your journey!
                                                    </span>
                                                </span>
                                                <Image src="/company.png" alt="Developer" width={120} height={120} className='absolute bottom-0 right-0 m-4' />
                                            </Link>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <div className={`fixed ${!mobileNavOpen && "hidden"} top-0 left-0 z-40 bg-gray-800 w-screen h-screen opacity-25`}></div>
            <div className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ease-in-out ${mobileNavOpen ? '-translate-x-0' : '-translate-x-full'}`}>

                <nav className="relative flex flex-col py-6 px-10 w-fit h-full bg-white border-r overflow-y-auto">
                    <div className="flex items-center mb-6">
                        <Link className="mr-auto text-2xl font-medium leading-none" href="#">
                            DX DIGITAL
                        </Link>
                        <button onClick={() => setMobileNavOpen(!mobileNavOpen)}>
                            <X />
                        </button>
                    </div>
                    <div className='flex flex-col items-start justify-start gap-6 h-screen'>
                        <ul className="mb-2">
                            <li><Link className="block py-4 px-5 text-gray-900 hover:bg-orange-50 rounded-lg" href="#">Home</Link></li>
                            <li><Link className="block py-4 px-5 text-gray-900 hover:bg-orange-50 rounded-lg" href="#">Services</Link></li>
                            <li><Link className="block py-4 px-5 text-gray-900 hover:bg-orange-50 rounded-lg" href="/about-us">About Us</Link></li>
                            <li><Link className="block py-4 px-5 text-gray-900 hover:bg-orange-50 rounded-lg" href="/contact">Contact Us</Link></li>
                        </ul>
                        <Link href="/developer/login" className='w-64 h-24 bg-purple-100 hover:bg-purple-200 border-[1px] border-purple-400 rounded-xl flex justify-around items-center relative'>
                            <span className='font-extrabold flex flex-col text-purple-900'>
                                Developer
                                <span className='text-xs text-gray-500'>
                                    Login as developer
                                </span>
                            </span>
                            <Image src="/developer.png" alt="Developer" width={100} height={100} className='' />
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
                        <Link href="/signup" className='w-64 h-24 bg-blue-50 hover:bg-blue-100 border-[1px] border-blue-400 rounded-xl flex justify-around items-center relative'>
                            <span className='font-extrabold flex flex-col text-blue-900'>
                                Sign Up
                                {/* <span className='text-xs text-gray-500'>
                                    Register yourself as a Company or Developer
                                </span> */}
                            </span>
                            <Image src="/company.png" alt="Developer" width={100} height={100} className='' />
                        </Link>
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default NavBar
