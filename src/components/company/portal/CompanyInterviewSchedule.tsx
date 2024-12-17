"use client"
import { Calendar, CalendarCheck, CalendarIcon, ChevronDown, ChevronLeft, ChevronRight, ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';

const InterviewCard = ({ title, time, platform, salesforceTechnology, status }: any) => {
    const color = status === "completed" ? "teal" : "blue";

    return (
        <div className={`flex flex-col gap-4 border border-gray-300 rounded-lg p-4 mt-6`}>
            <div className='flex flex-row items-center justify-between'>
                <span className='font-bold'>
                    {title}
                    <p className='font-normal text-xs text-gray-500 mt-1'>
                        {time}
                    </p>
                </span>
                <div className={`bg-${color}-200 p-2 rounded-full`}>
                    <ChevronDown className={`w-4 h-4 text-${color}-900`} strokeWidth={4} />
                </div>
            </div>
            <div className='text-sm flex flex-row items-center justify-between'>
                on {platform}
                <p className={`text-xs bg-${color}-200 text-${color}-700 font-medium px-2 py-1 rounded-full`}>
                    {salesforceTechnology}
                </p>
            </div>
        </div>
    )
}


function formatDate(date: any) {
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
}

// Function to get the abbreviated day name
function getDayName(date: any) {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[date.getDay()];
}

// Function to get the full month name
function getMonthName(date: any) {
    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
    ];
    return months[date.getMonth()];
}

// Function to get the year
function getYear(date: any) {
    return date.getFullYear();
}

const DateCarousel = () => {
    const [startDate, setStartDate] = useState(new Date()); // Start date for the current view

    // Generate the date array based on the current startDate
    const generateDateArray = (startDate: Date) => {
        let dates = [];
        for (let i = 0; i < 4; i++) {
            let nextDate = new Date(startDate);
            nextDate.setDate(startDate.getDate() + i);
            dates.push({
                fulldate: formatDate(nextDate),
                date: nextDate.getDate(),
                day: getDayName(nextDate),
                month: getMonthName(nextDate),
            });
        }
        return dates;
    };

    const dateArray = generateDateArray(startDate);

    const handlePrevious = () => {
        let newStartDate = new Date(startDate);
        newStartDate.setDate(startDate.getDate() - 4); // Move back 5 days
        setStartDate(newStartDate);
    };

    const handleNext = () => {
        let newStartDate = new Date(startDate);
        newStartDate.setDate(startDate.getDate() + 4); // Move forward 5 days
        setStartDate(newStartDate);
    };

    return (
        <div className="flex items-center justify-between w-full">
            <button
                className="border border-gray-200 p-2 rounded-full"
                onClick={handlePrevious}
            >
                <ChevronLeft className="w-4 h-4 text-gray-500 cursor-pointer" strokeWidth={4} />
            </button>
            <div className="flex relative items-center justify-center">
                {dateArray.map((item, index) => {
                    const isToday = item.fulldate === formatDate(new Date());
                    const showMonth =
                        index === 0 || // Always show the month name for the first item
                        new Date(dateArray[index - 1]?.fulldate).getMonth() !==
                        new Date(item.fulldate).getMonth(); // Show month if it changes

                    return (
                        <>
                            {showMonth && (
                                <span className="text-gray-700 font-bold w-fit text-sm uppercase h-fit -rotate-90">
                                    {item.month}
                                </span>
                            )}
                            <div key={item.fulldate} className="flex flex-col items-center">
                                <button
                                    className={`flex flex-col mx-1 items-center rounded-lg min-w-14 py-3 ${isToday ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-400'
                                        }`}
                                >
                                    <h1>{item.day}</h1>
                                    <h1 className="font-bold">{item.date}</h1>
                                </button>
                            </div>
                        </>

                    );
                })}
            </div>
            <button
                className="border border-gray-200 p-2 rounded-full"
                onClick={handleNext}
            >
                <ChevronRight className="w-4 h-4 text-gray-500 cursor-pointer" strokeWidth={4} />
            </button>
        </div>
    );
}


const CompanyInterviewSchedule = () => {
    const [selected, setSelected] = useState("scheduled")
    const [interview, setInterview] = useState<any>([]);

    // Get today's date
    let today = new Date();

    // Create an array to store the dates
    let dateArray = [];

    // Generate the next 7 days including today
    for (let i = 0; i < 5; i++) {
        let nextDate = new Date(today);
        nextDate.setDate(today.getDate() + i);

        // Push an object with the required details
        dateArray.push({
            fulldate: formatDate(nextDate), // full date in YYYY-MM-DD
            date: nextDate.getDate(), // day of the month (numeric)
            day: getDayName(nextDate), // abbreviated day name
        });
    }

    return (
        <div className="w-full lg:w-1/3 bg-white border border-gray-300 text-black rounded-3xl flex-col p-6 gap-4 h-fit">
            <div className='flex flex-row items-center justify-between w-full'>
                <span className='inline-flex gap-2'>
                    <CalendarIcon className='w-6 h-6' />
                    Schedule
                </span>
                <button className='bg-blue-200 text-blue-600 text-sm px-2 py-1 font-bold rounded-md inline-flex items-center gap-1'>
                    {getYear(new Date())}
                    <ChevronsUpDown className='w-4 h-4' />
                </button>
            </div>
            <div className='flex flex-col gap-8 border-b border-b-gray-200 pb-6 my-6'>
                <DateCarousel />
            </div>
            <div>
                <div className='flex flex-col lg:flex-row items-center justify-between gap-4 w-full'>
                    <button
                        onClick={() => setSelected("scheduled")}
                        className={`${selected === "scheduled" ? "bg-blue-500 " : "bg-gray-300 "} flex-1 text-white rounded-lg font-normal w-full py-3 inline-flex items-center justify-center gap-2`}>
                        <Calendar className='w-6 h-6 text-white' />
                        Scheduled
                    </button>
                    <button
                        onClick={() => setSelected("completed")}
                        className={`${selected === "completed" ? "bg-green-500" : "bg-gray-300"} flex-1 text-white rounded-lg font-normal w-full py-3 inline-flex items-center justify-center gap-2`}>
                        <CalendarCheck className='w-6 h-6 text-white mr-2' />
                        Completed
                    </button>
                </div>

                <InterviewCard
                    title="Inteview with James Brown"
                    time="8:00 AM - 9:00 AM (UTC)"
                    platform="Sales Cloud"
                    salesforceTechnology="Salesforce"
                    status={selected}
                />
                <InterviewCard
                    title="Interview with James Brown"
                    time="8:00 AM - 9:00 AM (UTC)"
                    platform="Sales Cloud"
                    salesforceTechnology="Salesforce"
                    status={selected}
                />
                <InterviewCard
                    title="Interview with James Brown"
                    time="8:00 AM - 9:00 AM (UTC)"
                    platform="Sales Cloud"
                    salesforceTechnology="Salesforce"
                    status={selected}
                />
                <InterviewCard
                    title="Interview with James Brown"
                    time="8:00 AM - 9:00 AM (UTC)"
                    platform="Sales Cloud"
                    salesforceTechnology="Salesforce"
                    status={selected}
                />
            </div>
        </div>
    )
}

export default CompanyInterviewSchedule
