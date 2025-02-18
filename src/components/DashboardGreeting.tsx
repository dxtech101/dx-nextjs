import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const DashboardGreeting = ({ updates }: any) => {
    const userProfile = useSelector((state: any) => state.userProfile);
    const [greeting, setGreeting] = useState("");

    const getTimeOfDayGreeting = () => {
        const currentHour = new Date().getHours();
        if (currentHour < 12) {
            setGreeting("Good-Morning");
        } else if (currentHour < 18) {
            setGreeting("Good-Afternoon");
        } else {
            setGreeting("Good-Evening");
        }
    };

    useEffect(() => {
        getTimeOfDayGreeting();
    }, [])

    return (
        <div className={`relative text-white rounded-3xl flex-1 flex items-center justify-start`}>
            <img src={`/${greeting}.png`} alt="" className='w-full h-full object-cover rounded-3xl z-0 absolute' />
            <div className={`p-6 ${greeting === "GoodEvening" ? "text-white" : "text-black"} z-10`}>
                <h2 className={`text-2xl font-semibold mb-2 capitalize`}>{greeting.split('-').join(' ')} {userProfile.first_name}</h2>
                <p>{updates || "No new updates"}</p>
                <button className="mt-4 bg-white/80 text-gray-600 px-4 py-2 rounded-lg">
                    Review It
                </button>
            </div>
        </div>
    )
}

export default DashboardGreeting
