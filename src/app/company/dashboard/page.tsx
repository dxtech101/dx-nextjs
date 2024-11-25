import CompanyCurrentProjects from '@/components/company/portal/CompanyCurrentProjects';
import CompanyInterviewSchedule from '@/components/company/portal/CompanyInterviewSchedule';
import { ChevronRight, Zap } from 'lucide-react';

const page = () => {
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
        <div className='flex flex-col md:flex-row w-full h-full gap-5'>
            <div className='flex flex-col flex-1 gap-5'>
                <div className={`bg-[url(/Good-Afternoon.png)] h-fit bg-bottom bg-cover bg-no-repeat text-white rounded-3xl flex items-center justify-start`}>
                    <div className={`p-6 ${greeting === "Good-Evening" ? "text-white" : "text-black"}`}>
                        <h2 className={`text-2xl font-semibold mb-2 `}>{greeting.split('-').join(' ')} Hardik</h2>
                        <p >You have 75 new applications to review today!</p>
                        <button className="mt-4 bg-white/80 text-gray-600 px-4 py-2 rounded-lg">
                            Review It
                        </button>
                    </div>
                </div>
                <div className='border border-gray-300 rounded-3xl flex-col p-6 gap-4 h-fit bg-white'>
                    <div className='flex flex-row items-center justify-between w-full'>
                        <span className='inline-flex gap-2'>
                            <Zap className='w-6 h-6' />
                            Current Projects
                        </span>
                        <button className='text-blue-500 inline-flex items-center gap-1'>
                            See all
                            <ChevronRight className='w-4 h-4' />
                        </button>
                    </div>
                    <CompanyCurrentProjects />
                </div>
            </div>
            <CompanyInterviewSchedule />
        </div>
    )
}

export default page
