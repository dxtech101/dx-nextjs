import React from 'react'
import clsx from 'clsx'
import { usePathname, useRouter } from 'next/navigation';

const DashboardProfileCard = ({ userProfile, className, setToggleSideBar }: any) => {
    const router = useRouter();
    const pathName = usePathname();
    const role: any = pathName.split('/')[1];

    return (
        <div className={clsx("flex bg-white text-white rounded-3xl flex-row items-center justify-evenly px-6 p-4 gap-4", className)}>
            <img className="h-28 w-28 rounded-full object-cover mr-2 object-top z-0" src={userProfile?.profile_picture || "https://www.tech101.in/wp-content/uploads/2018/07/blank-profile-picture.png"} alt="" />
            <div className="text-black">
                <h2 className="text-2xl font-semibold mb-2 capitalize"> {userProfile?.first_name}  {userProfile?.last_name}</h2>
                {/* <p className='text-gray-400 text-sm'>Software Developer</p> */}
                {role !== 'company' && (
                    <button
                        onClick={() => {
                            router.push(`/${role}/dashboard/profile`)
                            setToggleSideBar(false)
                        }}
                        className="mt-4 w-full bg-blue-100 text-blue-600 px-4 text-sm hover:bg-blue-600 hover:text-white py-2 rounded-lg">
                        Edit Profile
                    </button>
                )}

            </div>
        </div>
    )
}

export default DashboardProfileCard
