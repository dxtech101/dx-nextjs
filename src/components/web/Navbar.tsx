import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const NavBar = () => {
    return (
        <div>
            <nav className="fixed top-0 w-full py-6 bg-white z-50 border-b-[0.5px] shadow-sm">
                <div className="container px-4 mx-auto">
                    <div className="flex items-center relative">
                        <Link className="inline-block text-lg font-bold" href="#">
                            {/* <img className="h-10" src="saturn-assets/logos/logo-saturn-dark.svg" alt="" width="auto"> */}
                        </Link>
                        <div className="xl:hidden ml-auto">
                            <button className="flex w-12 h-12 items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-md transition duration-200">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3 12H21" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                    <path d="M3 6H21" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                    <path d="M3 18H21" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                </svg>
                            </button>
                        </div>
                        <ul className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden xl:flex lg:w-auto lg:space-x-12">
                            <li><Link className="inline-block text-sm text-gray-900 hover:text-orange-900 font-medium" href="#">Home</Link></li>
                            <li><Link className="inline-block text-sm text-gray-900 hover:text-orange-900 font-medium" href="#">Services</Link></li>
                            <li><Link className="inline-block text-sm text-gray-900 hover:text-orange-900 font-medium" href="#">About Us</Link></li>
                            <li><Link className="inline-block text-sm text-gray-900 hover:text-orange-900 font-medium" href="#">Contact Us</Link></li>
                        </ul>
                        <div className="hidden xl:block ml-auto">
                            <div className="flex group items-center">
                                <Link className="relative inline-block py-3 px-4 text-sm font-semibold text-indigo-500 hover:text-indigo-50 bg-indigo-100 hover:bg-indigo-600 rounded-md transition duration-300" href="#">
                                    <span className="relative">Login your account</span>
                                    <div className='text-black hidden group-hover:block absolute z-50 top-full right-0'>
                                        <div className="-top-2 z-20 absolute right-10 w-4 h-4 rounded-sm bg-white border-l border-t border-gray-200 transform rotate-45"></div>
                                        <div className="w-full shadow-lg max-w-xl bg-white border border-gray-200 rounded-3xl pt-4 pb-4 px-4 flex flex-row gap-4">
                                            <div className='flex flex-col gap-4'>
                                                <Link href="/developer/login">
                                                    <div className='w-64 h-24 bg-purple-100 hover:bg-purple-200 border-[1px] border-purple-400 rounded-xl flex justify-around items-center relative'>
                                                        <span className='font-extrabold flex flex-col text-purple-900'>
                                                            Developer
                                                            <span className='text-xs text-gray-500'>
                                                                Login as developer
                                                            </span>
                                                        </span>
                                                        <Image src="/developer.png" alt="Developer" width={100} height={100} className='' />
                                                    </div>
                                                </Link>
                                                <Link href="/company/login">
                                                    <div className='w-64 h-24 bg-amber-50 hover:bg-amber-100 border-[1px] border-amber-400 rounded-xl flex justify-around items-center relative'>
                                                        <span className='font-extrabold flex flex-col text-amber-900'>
                                                            Company
                                                            <span className='text-xs text-gray-500'>
                                                                Login as company
                                                            </span>
                                                        </span>
                                                        <Image src="/company.png" alt="Developer" width={100} height={100} className='' />
                                                    </div>
                                                </Link>
                                            </div>
                                            <Link href="/signup">
                                                <div className='w-64 h-52 bg-blue-50 hover:bg-blue-100 border-[1px] border-blue-400 rounded-xl flex flex-col justify-start items-start p-6 relative'>
                                                    <span className='font-extrabold flex flex-col text-blue-900 '>
                                                        <span className='text-2xl font-black '>
                                                            Sign Up
                                                        </span>
                                                        <span className='text-xs text-gray-500'>
                                                            Register your
                                                        </span>
                                                    </span>
                                                    <Image src="/company.png" alt="Developer" width={120} height={120} className='absolute bottom-0 right-0' />
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="fixed top-0 left-0 bottom-0 w-5/6 max-w-md z-50 hidden">
                <div className="fixed inset-0 bg-gray-800 opacity-25"></div>
                <nav className="relative flex flex-col py-6 px-10 w-full h-full bg-white border-r overflow-y-auto">
                    <div className="flex items-center mb-16">
                        <Link className="mr-auto text-2xl font-medium leading-none" href="#">
                            {/* <img className="h-10" src="saturn-assets/logos/logo-saturn-dark.svg" alt="" width="auto"> */}
                        </Link>
                        <button>
                            <svg className="h-6 w-6 text-gray-500 cursor-pointer hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                    <div>
                        <ul className="mb-2">
                            <li><Link className="block py-4 px-5 text-gray-900 hover:bg-orange-50 rounded-lg" href="#">About Us</Link></li>
                            <li><Link className="block py-4 px-5 text-gray-900 hover:bg-orange-50 rounded-lg" href="#">Featured</Link></li>
                            <li><Link className="block py-4 px-5 text-gray-900 hover:bg-orange-50 rounded-lg" href="#">Solutions</Link></li>
                            <li><Link className="block py-4 px-5 text-gray-900 hover:bg-orange-50 rounded-lg" href="#">Products</Link></li>
                            <li><Link className="block py-4 px-5 text-gray-900 hover:bg-orange-50 rounded-lg" href="#">Articles</Link></li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default NavBar
