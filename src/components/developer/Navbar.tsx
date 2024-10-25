"use client"
import { ArrowDown, BellIcon, ChevronDown, Ham, Home, HomeIcon, LogOut, MenuIcon, MessageCircle, User } from 'lucide-react'
import React from 'react'
import Stepper from './onboarding/Stepper'
import { useSelector } from 'react-redux';
import Link from 'next/link';
import Breadcrumb from '../Breadcrumb';

const Navbar = () => {
    const onboarding = false;
    const developerOnboarding = useSelector((state: any) => state.developerOnboarding)

    return (
        <section className="py-5 px-6 bg-white shadow-sm border border-gray-300 rounded-3xl w-full h-full inline-flex items-center">
            <div className="flex flex-col-reverse gap-3 lg:flex-row w-full items-start lg:items-center justify-between">
                {onboarding ? <Stepper /> : <Breadcrumb type="developer" />}
                <div className="flex items-center justify-between w-full">
                    <div>
                        <button className="block lg:hidden text-gray-200 hover:text-gray-300">
                            <MenuIcon className="h-5 w-5" strokeWidth={2} color='#000' />
                        </button>
                    </div>
                    <div className='flex items-center justify-end w-full space-x-6'>
                        <a className="text-gray-200 hover:text-gray-300" href="#">
                            <MessageCircle className="h-5 w-5" strokeWidth={2} color='#000' />
                        </a>
                        <a className="text-gray-200 hover:text-gray-300" href="#">
                            <BellIcon className="h-5 w-5" strokeWidth={2} color='#000' />
                        </a>
                        <div>
                            <button className="relative flex items-center p-1 rounded-full bg-gray-100 gap-1">
                                <ChevronDown className="h-4 w-4 text-black ml-2" />
                                <img className="w-10 h-10 rounded-full object-cover object-right" src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80" alt="" />
                                <div className='text-black hidden group-hover:flex absolute z-50 top-full right-0'>
                                    <div className="-top-2 z-20 absolute right-12 w-4 h-4 rounded-sm bg-white border-l border-t border-gray-200 transform rotate-45"></div>
                                    <div className="w-full shadow-lg max-w-xl bg-white border border-gray-200 rounded-2xl py-6 px-5 flex flex-col gap-4">
                                        <Link href="/developer/dashboard/profile" className='w-full inline-flex items-center gap-4 pb-3 border-b border-gray-200'>
                                            <User />
                                            Profile
                                        </Link>
                                        <Link href="/developer/dashboard/profile/demo" className='w-full inline-flex items-center gap-4 pt-1'>
                                            <LogOut />
                                            Logout
                                        </Link>
                                    </div>
                                </div>
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default Navbar
