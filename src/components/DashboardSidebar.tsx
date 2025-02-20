"use client"
import { removeAuthenticationToken } from '@/lib/cookie';
import { BriefcaseBusiness, ChevronLeft, LayoutDashboard, LogOut, UserRoundSearch } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import Tooltip from './Tooltip';
import DashboardProfileCard from './developer/portal/DashboardProfileCard';


const SidebarItem = ({ href, icon: Icon, label, toggleSideBar }: any) => {
    const router = usePathname();
    const isActive = router === href;

    return (
        <Tooltip popupContent={label} show={toggleSideBar}>
            <Link href={href} className={`flex items-center ${toggleSideBar ? "justify-start pl-6" : "justify-center"} h-20 md:h-14 xl:h-16 ${isActive ? 'text-white bg-gray-800' : 'text-gray-600 bg-gray-100 hover:bg-gray-200'} gap-4 rounded-xl mb-4`}>
                <Icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-gray-600'}`} />
                {toggleSideBar && <span className=" text-sm font-medium">{label}</span>}
            </Link>
        </Tooltip>
    );
};

const DashboardSidebar = ({ toggleSideBar, setToggleSideBar }: any) => {
    const router = useRouter();
    const currentUser = useSelector((state: any) => state.userProfile);
    const userRole: any = currentUser ? currentUser?.role : null;

    const developerNavigationLinks = [
        {
            href: "/developer/dashboard",
            icon: LayoutDashboard,
            label: "Dashboard"
        },
    ];
    const companyNavigationLinks = [
        {
            href: "/developer/dashboard",
            icon: LayoutDashboard,
            label: "Dashboard"
        },
        {
            href: "/developer/dashboard/job-listing",
            icon: BriefcaseBusiness,
            label: "Job Listing"
        },
        {
            href: "/developer/dashboard/profile",
            icon: UserRoundSearch,
            label: "Profile"
        },
    ];

    const renderNavigationLinks = () => {
        const roleToNavigationMap: any = {
            Individual: developerNavigationLinks,
            Company: companyNavigationLinks,
        };

        return roleToNavigationMap[userRole];
    };

    return (
        <>
            <div className="hidden lg:block relative h-full overflow-visible">
                <div className="bg-white absolute top-0 left-0 w-full p-1 rounded-t-3xl border border-gray-300">
                    <div className="flex items-center justify-center p-4 text-gray-900 rounded-xl">
                        <span className="text-sm font-medium">DX{toggleSideBar && "Digital"}</span>
                    </div>
                </div>
                <nav className="w-full h-full flex flex-col px-4 bg-white overflow-visible border border-gray-300 rounded-3xl">
                    <div className="mb-6">
                        <a className="inline-block mb-12" href="#">
                            <div className="h-7" />
                        </a>
                        <ul>
                            {renderNavigationLinks().map((item: any, index: any) => (
                                <SidebarItem
                                    key={index}
                                    href={item.href}
                                    icon={item.icon}
                                    label={item.label}
                                    toggleSideBar={toggleSideBar}
                                />
                            ))}
                        </ul>
                    </div>
                </nav>
                <div className="bg-white absolute bottom-0 left-0 w-full p-1 rounded-b-3xl group hover:bg-gray-800 border border-gray-300">
                    <a className="flex relative items-center justify-center w-full p-4 text-gray-300 rounded-xl" href="#">
                        <div className={`${toggleSideBar ? "block" : "hidden"} transition-opacity duration-300 ease-in-out`}>
                            <img src="/Einstein.png" alt="bgImage" className='absolute bottom-0 left-2 h-32 object-left-bottom object-cover z-0' />
                            <span className="ml-8 text-sm font-semibold group-hover:text-gray-100 text-gray-600">
                                Log Out
                            </span>
                        </div>
                        {!toggleSideBar && <LogOut className='h-5 w-5 text-gray-700 group-hover:text-gray-50' />}
                    </a>
                </div>
            </div>
            <>
                <div className={`${toggleSideBar ? "block" : "hidden"}  lg:hidden absolute w-screen h-screen top-0 left-0 z-50 bg-black/20`} />
                <nav
                    className={`absolute top-0 left-0 px-4 w-full md:w-1/3 ${toggleSideBar ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out lg:hidden h-screen bg-white z-50`}
                    style={{
                        transition: "all 0.3s ease-in-out",
                    }}
                >
                    <div className="bg-white absolute top-0 left-0 w-full p-1 border-b border-gray-300 flex items-center justify-between">
                        <div className="flex items-center justify-center p-4 text-gray-900 rounded-xl">
                            <span className="text-xl font-medium">DX {toggleSideBar && "Digital"}</span>
                        </div>
                        <button onClick={() => setToggleSideBar(false)}>
                            <ChevronLeft className='w-6 h-6 text-black mr-2' />
                        </button>
                    </div>
                    <div className="mb-6">
                        <a className="inline-block mb-12" href="#">
                            <div className="h-10" />
                        </a>
                        <ul>
                            <DashboardProfileCard userProfile={currentUser} className="border border-gray-200 mb-4" />
                            {renderNavigationLinks().map((item: any, index: any) => (
                                <SidebarItem
                                    key={index}
                                    href={item.href}
                                    icon={item.icon}
                                    label={item.label}
                                    toggleSideBar={toggleSideBar}
                                />
                            ))}
                        </ul>
                    </div>
                    <div className="bg-white absolute bottom-0 left-0 w-full p-1 group hover:bg-gray-800 border border-gray-300">
                        <button
                            onClick={() => {
                                removeAuthenticationToken()
                                router.push("/")
                            }}
                            className="flex relative items-center justify-center w-full p-4 text-gray-300 rounded-xl">
                            <img src="/Einstein.png" alt="bgImage" className='absolute bottom-0 left-2 h-44 object-left-bottom object-cover z-0' />
                            <span className="ml-8 text-sm font-semibold group-hover:text-gray-100 text-gray-600">
                                Log Out
                            </span>
                            {!toggleSideBar && <LogOut className='h-5 w-5 text-gray-700 group-hover:text-gray-50' />}
                        </button>
                    </div>
                </nav>
            </>
        </>
    )
}

export default DashboardSidebar
