"use client"
import CompanyCurrentProjects from '@/components/company/portal/CompanyCurrentProjects';
import CompanyInterviewSchedule from '@/components/company/portal/CompanyInterviewSchedule';
import CompanyResourceRequest from '@/components/company/portal/CompanyResourceRequest';
import { useSelector } from 'react-redux';

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
            <div className='flex flex-col flex-1 gap-5 w-full'>
                <div className={`bg-[url(/Good-Afternoon.png)] h-fit bg-bottom bg-cover bg-no-repeat text-white rounded-3xl flex items-center justify-start`}>
                    <div className={`p-6 ${greeting === "Good-Evening" ? "text-white" : "text-black"}`}>
                        <h2 className={`text-2xl font-semibold mb-2 `}>{greeting.split('-').join(' ')} Hardik</h2>
                        <p >You have 75 new applications to review today!</p>
                        <button className="mt-4 bg-white/80 text-gray-600 px-4 py-2 rounded-lg">
                            Review It
                        </button>
                    </div>
                </div>
                <div className='flex flex-col xl:flex-row w-full h-full gap-4'>
                    <CompanyCurrentProjects />
                    {/* <CompanyResourceRequest /> */}
                </div>
            </div>
            <CompanyInterviewSchedule />
        </div >
    )
}

export default page
