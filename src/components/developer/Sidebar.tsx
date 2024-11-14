import { Briefcase, BriefcaseBusiness, LayoutDashboard, LogOutIcon, MapIcon } from 'lucide-react'
import React from 'react'
import JobListing from './portal/JobListing'
import Link from 'next/link'
import { usePathname } from 'next/navigation';

const SidebarItem = ({ href, icon: Icon, label }: any) => {
    const router = usePathname();
    const isActive = router === href;

    return (
        <Link href={href} className={`flex items-center p-4 ${isActive ? 'text-white bg-blue-500' : 'text-gray-300 hover:bg-gray-800'} rounded-xl mb-4`}>
            <Icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
            <span className="ml-4 text-sm font-medium">{label}</span>
        </Link>
    );
};

const Sidebar = () => {
    return (
        <>
            <div className="hidden lg:block relative h-full">
                <div className="bg-white absolute top-0 left-0 w-full p-1 rounded-t-3xl border border-gray-300">
                    <div className="flex items-center justify-center p-4 text-gray-900 rounded-xl">
                        <MapIcon className="h-5 w-5" />
                        <span className="ml-4 text-sm font-medium">DX Digital</span>
                    </div>
                </div>
                <nav className="w-full h-full flex flex-col px-4 bg-white overflow-auto border border-gray-300 rounded-3xl">
                    <div className="mb-6">
                        <a className="inline-block mb-12" href="#">
                            <div className="h-7" />
                        </a>
                        <ul>
                            <SidebarItem href="/developer/dashboard" icon={LayoutDashboard} label="Dashboard" />
                            <SidebarItem href="/developer/dashboard/job-listing" icon={BriefcaseBusiness} label="Job Listing" />
                        </ul>
                    </div>
                </nav>
                <div className="bg-white absolute bottom-0 left-0 w-full p-1 rounded-b-3xl group hover:bg-gray-800 border border-gray-300">
                    <a className="flex relative items-center justify-center w-full p-4 text-gray-300 rounded-xl" href="#">
                        <img src="/Einstein.png" alt="bgImage" className='absolute bottom-0 left-1 h-36 object-left-bottom object-cover z-0' />
                        <span className="ml-8 text-sm font-semibold group-hover:text-gray-100 text-gray-600">Log Out</span>
                    </a>
                </div>
            </div>
            <div className="relative z-50 mx-auto lg:ml-80"></div>
        </>
    )
}

export default Sidebar
