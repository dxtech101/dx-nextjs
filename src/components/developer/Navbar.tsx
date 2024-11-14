"use client"
import { BellIcon, ChevronDown, LogOut, MenuIcon, MessageCircle, User } from 'lucide-react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import Breadcrumb from '../Breadcrumb';
import Stepper from './onboarding/Stepper';

const Navbar = () => {
    const onboarding = true;
    const developerOnboarding = useSelector((state: any) => state.developerOnboarding)

    return (
        <section className="py-5 px-6 bg-white shadow-sm border border-gray-300 rounded-3xl w-full h-full inline-flex items-center">
            <div className="flex flex-col-reverse md:flex-row w-full gap-4 items-start lg:items-center justify-between">
                <div className='block md:hidden'>
                    {onboarding ? <Stepper /> : <Breadcrumb type="developer" />}
                </div>
                <div className="flex items-center justify-between w-full">
                    <button className="block lg:hidden text-gray-200 hover:text-gray-300 mr-4">
                        <MenuIcon className="h-5 w-5" strokeWidth={2} color='#000' />
                    </button>
                    <div className='hidden md:block'>
                        {onboarding ? <Stepper /> : <Breadcrumb type="developer" />}
                    </div>
                    <div className='flex items-center justify-end w-full space-x-6'>
                        <a className="text-gray-200 hover:text-gray-300" href="#">
                            <MessageCircle className="h-5 w-5" strokeWidth={2} color='#000' />
                        </a>
                        <a className="text-gray-200 hover:text-gray-300" href="#">
                            <BellIcon className="h-5 w-5" strokeWidth={2} color='#000' />
                        </a>
                        <div>
                            <button className="relative group flex items-center p-1 rounded-full bg-gray-100 gap-1">
                                <img className="w-10 h-10 rounded-full object-cover mr-0 object-right z-0" src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80" alt="" />
                                <ChevronDown className="h-4 w-4 text-black mr-2" />
                                <div className='text-black hidden group-hover:flex absolute z-50 top-full w-full'>
                                    <div className="w-full shadow-lg max-w-xl bg-white border border-gray-200 rounded-2xl flex flex-col">
                                        <Link href="/developer/dashboard/profile" className='w-full inline-flex items-center gap-4 p-5 border-b border-gray-200 hover:bg-gray-100'>
                                            <User className='h-5 ' />
                                            Profile
                                        </Link>
                                        <Link href="/developer/dashboard/profile/demo" className='w-full inline-flex items-center gap-4 p-5 hover:bg-gray-100 hover:rounded-sm'>
                                            <LogOut className='h-5' />
                                            Logout
                                        </Link>
                                    </div>
                                    <div className="-top-2 z-20 absolute right-12 w-4 h-4 rounded-sm bg-white border-l border-t border-gray-200 transform rotate-45"></div>
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
