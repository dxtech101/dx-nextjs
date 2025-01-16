"use client"
import { getResourceRequest, getShortlistedResources } from '@/lib/service/projectResource.service';
import { get } from 'http';
import { ChevronLeft, ChevronRight, CornerUpRight, CornerUpRightIcon, Filter } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const JobListingCard = ({ title, location, salary, type }: any) => {
    const color = type === "Remote" ? "green" : type === "Full Time" ? "orange" : "purple";
    return (
        <div className="bg-gray-50 rounded-2xl p-5 flex items-center justify-between flex-wrap gap-4 mb-6">
            <div>
                <div className="flex items-center gap-2 flex-wrap mb-2">
                    <p className="tracking-tight text-lg font-semibold">{title}</p>
                    <span className={`inline-block py-1 px-2 rounded-3xl border border-${color}-100 bg-${color}-50 tracking-tight text-${color}-500 text-xs font-medium`}>{type}</span>
                </div>
                <div className="flex gap-3 items-center">
                    <p className="tracking-tight text-gray-700 text-sm">{location}</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="4" height="4" viewBox="0 0 4 4" fill="none"><circle cx="2" cy="2" r="2" fill="#71717A"></circle></svg>
                    <p className="tracking-tight text-gray-700 text-sm">{salary}</p>
                </div>
            </div>
            <a href="#" className="bg-white border border-gray-200 h-11 rounded-full px-4 py-2 inline-flex items-center justify-center gap-2 hover:bg-black group transition duration-200">
                <span className="tracking-tight text-sm font-semibold text-gray-900 group-hover:text-white transition duration-200">Apply Now</span>
                <div className="group-hover:text-white transition duration-200">
                    <CornerUpRightIcon className="w-4 h-4" />
                </div>
            </a>
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
        <div className="flex items-center justify-around w-full">
            <button
                className="border border-gray-200 p-2 rounded-full"
                onClick={handlePrevious}
            >
                <ChevronLeft className="w-4 h-4 text-gray-500 cursor-pointer" strokeWidth={4} />
            </button>
            <button className="flex relative items-center justify-center">
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
            </button>
            <button
                className="border border-gray-200 p-2 rounded-full"
                onClick={handleNext}
            >
                <ChevronRight className="w-4 h-4 text-gray-500 cursor-pointer" strokeWidth={4} />
            </button>
        </div>
    );
}

const JobListing = () => {
    const [loading, setLoading] = useState(false);
    const contactId = useSelector((state: any) => state.userSalesforceID)
    const [selectedTimeSlot, setSelectedTimeSlot] = useState<any>("7:00 AM");
    const [jobs, setJobs] = useState<any>([]);

    const getJobs = async () => {
        try {
            setLoading(true);
            const { data } = await getShortlistedResources(contactId);
            console.log("jobs::", data);
            const { results: resourceRequests } = await getResourceRequest(data.resource_request);
            setJobs(resourceRequests);
        } catch (error) {
            console.error("Error fetching certifications:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getJobs();
    }, [])

    console.log("jobs::", jobs);

    return (
        <section className="bg-white rounded-3xl border border-gray-300 p-6">
            <div className="container mx-auto px-4">
                <div className="flex flex-col flex-wrap">
                    <div className='w-full bg-white z-20 sticky top-0 left-0 py-6 px-4 flex flex-col gap-6 lg:flex-row justify-between items-start lg:items-center'>
                        <span>
                            <h1 className="font-heading tracking-tight text-4xl md:text-5xl font-medium mb-4">
                                Book your Slots
                            </h1>
                            <p className="tracking-tight text-gray-600 max-w-sm">
                                You have been shortlisted for an Resource
                            </p>
                        </span>
                        <button className='bg-blue-500 text-white text-center rounded-lg w-fit p-2 px-4 inline-flex items-center justify-center gap-2'>
                            Schedule an Interview
                        </button>
                    </div>
                    {/* <div className="w-full flex flex-col lg:flex-row justify-around p-4 gap-6">
                        <div className='w-full'>
                            <p className="tracking-tight text-gray-700 font-medium mb-5">Design</p>
                            <JobListingCard title="Product Designer" type="Remote" location="New York" salary="$60k - $72k" />
                            <JobListingCard title="Senior UX Designer" type="Full Time" location="New York" salary="$120k - $150k" />
                            <JobListingCard title="Senior UX Designer" type="Part Time" location="New York" salary="$120k - $150k" />
                            <JobListingCard title="Product Designer" type="Remote" location="New York" salary="$60k - $72k" />
                            <JobListingCard title="Senior UX Designer" type="Full Time" location="New York" salary="$120k - $150k" />
                            <JobListingCard title="Senior UX Designer" type="Part Time" location="New York" salary="$120k - $150k" />
                        </div>

                        <div className='w-full'>
                            <p className="tracking-tight text-gray-700 font-medium mb-5">Engineering</p>
                            <JobListingCard title="Product Designer" type="Remote" location="New York" salary="$60k - $72k" />
                            <JobListingCard title="Senior UX Designer" type="Part Time" location="New York" salary="$120k - $150k" />
                        </div>
                    </div> */}
                </div>
            </div>
            <div className='flex flex-row gap-4 items-center justify-center w-full'>
                <DateCarousel />
                <div className='container flex flex-col gap-4 w-full py-6'>
                    <span className='text-2xl font-bold inline-flex items-center gap-2'>
                        Available Time Slots
                    </span>
                    <div className='flex flex-row flex-wrap gap-4 w-full'>
                        <button
                            onClick={() => setSelectedTimeSlot("7:00 AM")}
                            className={`text-sm font-bold text-white ${selectedTimeSlot === "7:00 AM" ? "bg-blue-500" : "bg-gray-200"} px-4 py-1 rounded-full w-fit`}>
                            7:00 AM
                        </button>
                        <button
                            onClick={() => setSelectedTimeSlot("8:00 AM")}
                            className={`text-sm font-bold text-white ${selectedTimeSlot === "8:00 AM" ? "bg-blue-500" : "bg-gray-200"} px-4 py-1 rounded-full w-fit`}>
                            8:00 AM
                        </button>
                        <button
                            onClick={() => setSelectedTimeSlot("10:00 AM")}
                            className={`text-sm font-bold text-white ${selectedTimeSlot === "10:00 AM" ? "bg-blue-500" : "bg-gray-200"} px-4 py-1 rounded-full w-fit`}>
                            10:00 AM
                        </button>
                        <button
                            onClick={() => setSelectedTimeSlot("11:00 AM")}
                            className={`text-sm font-bold text-white ${selectedTimeSlot === "11:00 AM" ? "bg-blue-500" : "bg-gray-200"} px-4 py-1 rounded-full w-fit`}>
                            11:00 AM
                        </button>
                        <button
                            onClick={() => setSelectedTimeSlot("1:00 PM")}
                            className={`text-sm font-bold text-white ${selectedTimeSlot === "1:00 PM" ? "bg-blue-500" : "bg-gray-200"} px-4 py-1 rounded-full w-fit`}>
                            1:00 PM
                        </button>
                        <button
                            onClick={() => setSelectedTimeSlot("2:00 PM")}
                            className={`text-sm font-bold text-white ${selectedTimeSlot === "2:00 PM" ? "bg-blue-500" : "bg-gray-200"} px-4 py-1 rounded-full w-fit`}>
                            2:00 PM
                        </button>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default JobListing
