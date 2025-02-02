"use client"
import { BellIcon, ChevronDown, CircleAlert, HelpCircle, Layout, LogOut, MenuIcon, MessageCircle, Settings, Shield, Sidebar, User } from 'lucide-react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import DashbaordBreadcrumb from './DashboardBreadcrumb';
import DashboardStepper from './DashboardStepper';
import { removeAuthenticationToken } from '@/lib/cookie';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';

const DashboardNavbar = ({ toggleSideBar, setToggleSideBar }: any) => {
    const userProfile = useSelector((state: any) => state.userProfile);
    const isUserOnboarded = userProfile.is_onboard;
    const router = useRouter();
    const pathName = usePathname();
    const role: any = pathName.split('/')[1];

    return (
        <section className="p-6 bg-white shadow-sm border border-gray-300 rounded-3xl w-full h-full inline-flex items-center">
            <div className="flex flex-col-reverse md:flex-row w-full gap-2 items-start lg:items-center justify-between">
                {isUserOnboarded &&
                    <button className="hidden lg:block" onClick={() => { setToggleSideBar((prev: any) => !prev) }}>
                        {toggleSideBar ? <Image src={'/sideOpen.svg'} width={26} height={26} alt="sideOpen" /> : <Image src={'/sideClosed.svg'} width={26} height={26} alt="sideClose" />}
                    </button>
                }

                <div className='block md:hidden'>
                    {isUserOnboarded ? <DashbaordBreadcrumb type={role} /> : <DashboardStepper role={role} />}
                </div>
                <div className="flex items-center justify-between w-full">
                    {isUserOnboarded &&
                        <button className="block lg:hidden text-gray-200 hover:text-gray-300 mr-4" onClick={() => { setToggleSideBar((prev: any) => !prev) }}>
                            <MenuIcon className="h-5 w-5" strokeWidth={2} color='#000' />
                        </button>
                    }
                    <div className='hidden md:block'>
                        {isUserOnboarded ? <DashbaordBreadcrumb type={role} /> : <DashboardStepper role={role} />}
                    </div>
                    <div className='flex items-center justify-end w-full space-x-2'>
                        {/* {isUserOnboarded &&
                            <>
                                <a className="relative text-gray-200 hover:text-gray-300 p-3" href="#">
                                    <div className='absolute w-3 h-3 bg-blue-500 rounded-full right-0 top-0' />
                                    <div className='absolute w-3 h-3 bg-blue-500 rounded-full right-0 top-0 animate-ping' />
                                    <MessageCircle className="h-5 w-5" strokeWidth={2} color='#000' />
                                </a>
                                <a className="relative text-gray-200 hover:text-gray-300 p-3 rounded-full" href="#">
                                    <div className='absolute w-3 h-3 bg-red-500 rounded-full right-0 top-0' />
                                    <div className='absolute w-3 h-3 bg-red-500 rounded-full right-0 top-0 animate-ping' />
                                    <BellIcon className="h-5 w-5" strokeWidth={2} color='#000' />
                                </a>
                            </>
                        } */}

                        <div>
                            <button className="relative group flex items-center p-1 rounded-full bg-gray-100 gap-1">
                                <img className="w-10 h-10 rounded-full object-cover mr-0 object-right z-0" src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80" alt="" />
                                <ChevronDown className="h-4 w-4 text-black mr-2" />
                                <div className='text-black hidden group-hover:flex transition-all duration-300 ease-in-out absolute z-50 top-full right-0 w-fit'>
                                    <div className="w-full shadow-lg max-w-xl bg-white border border-gray-200 rounded-2xl flex flex-col">
                                        <div className="-top-2 z-20 absolute right-6 w-4 h-4 rounded-sm bg-white border-l border-t border-gray-200 transform rotate-45" />
                                        <div className='z-30 w-full flex flex-col items-center gap-4 p-5 border-b border-gray-200 rounded-t-2xl'>
                                            <div className='flex flex-col items-start min-w-44'>
                                                <h2 className="text-2xl font-semibold mb-1 capitalize">{userProfile.first_name} {userProfile.last_name}</h2>
                                                <p className='text-gray-400 text-sm'>Software Developer</p>
                                            </div>

                                            <button
                                                onClick={() => {
                                                    if (userProfile.is_onboard) {
                                                        router.push(`/${role}/dashboard/profile`)
                                                    }
                                                }}
                                                className={`w-full relative bg-blue-100 text-blue-600 px-4 text-sm ${userProfile.is_onboard ? "hover:bg-blue-600 hover:text-white" : ""}  py-2 transition-all duration-300 ease-in-out rounded-lg`} >
                                                Edit Profile
                                                {!userProfile.is_onboard && (
                                                    <div className='absolute bottom-2 right-2 gap-2 text-xs p-0 -mt-4 text-red-600 font-semibold'>
                                                        <div className='relative group/item'>
                                                            <CircleAlert className='h-5 w-5 text-red-600 group/item bg-red-50 rounded-full' />
                                                            <span className='hidden group-hover/item:flex absolute w-40 top-5 right-0 bg-red-50 p-1 border border-red-600 rounded-lg'>
                                                                Complete your profile to access all features
                                                            </span>
                                                        </div>
                                                    </div>
                                                )}
                                            </button>
                                        </div>
                                        <Link href="/developer/dashboard/profile/demo" className='w-full inline-flex items-center gap-4 p-5 hover:bg-gray-100 transition-all duration-300 ease-in-out text-sm'>
                                            <Settings className='h-5' />
                                            Settings
                                        </Link>
                                        <Link href="/developer/dashboard/profile/demo" className='w-full inline-flex items-center gap-4 p-5 hover:bg-gray-100 transition-all duration-300 ease-in-out text-sm'>
                                            <HelpCircle className='h-5' />
                                            Help
                                        </Link>
                                        <button onClick={() => {
                                            removeAuthenticationToken()
                                            router.push("/")
                                        }}
                                            className='w-full inline-flex items-center gap-4 p-5 hover:bg-gray-100 transition-all duration-300 ease-in-out rounded-b-2xl text-sm'>
                                            <LogOut className='h-5' />
                                            Logout
                                        </button>
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

export default DashboardNavbar
