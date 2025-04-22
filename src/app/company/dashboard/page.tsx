"use client"
import DashboardGreeting from "@/components/DashboardGreeting";
import { useSelector } from "react-redux";
import DeveloperSearch from "./developers/page";


const page = () => {
    const userProfile = useSelector((state: any) => state.userProfile);

    const getTimeOfDayGreeting = () => {
        const currentHour = new Date().getHours();
        if (currentHour < 12) {
            return "Good-Morning";
        } else if (currentHour < 18) {
            return "Good-Afternoon";
        } else {
            return "Good-Evening";
        }
    };

    const greeting = getTimeOfDayGreeting();

    return (
        <div className='flex flex-col xl:flex-row w-full h-full gap-5'>
            <div className='flex flex-col gap-5 h-1/2 w-full'>
                <DashboardGreeting />
                <div className='w-full h-full gap-4'>
                    <DeveloperSearch />
                    {/* <CompanyCurrentProjects /> */}
                    {/* <CompanyResourceRequest /> */}
                </div>
            </div>
            {/* <CompanyCurrentProjects /> */}
            {/* <CompanyInterviewSchedule /> */}
        </div >
    )
}

export default page
