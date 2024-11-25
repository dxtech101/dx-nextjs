"use client"
import { CalendarIcon, ChevronRight, ChevronLeft, Calendar, CalendarCheck, ChevronDown } from 'lucide-react'
import React, { useState } from 'react'

const InterviewCard = ({ title, time, platform, salesforceTechnology, status }: any) => {
    const color = status === "completed" ? "green" : "blue";
    return (
        <div className={`flex flex-col gap-4 bg-gradient-to-b from-${color}-100 to-${color}-50 rounded-lg p-4 mt-6`}>
            <div className='flex flex-row items-center justify-between'>
                <span className='font-bold'>
                    {title}
                    <p className='font-normal text-xs text-gray-500 mt-1'>
                        {time}
                    </p>
                </span>
                <div className={`bg-${color}-300 p-2 rounded-full`}>
                    <ChevronDown className={`w-4 h-4 text-${color}-900`} strokeWidth={4} />
                </div>
            </div>
            <div className='text-sm flex flex-row items-center justify-between'>
                on {platform}
                <p className={`text-xs bg-${color}-300 text-${color}-700 font-medium px-2 py-1 rounded-full`}>
                    {salesforceTechnology}
                </p>
            </div>
        </div>
    )
}

const CompanyInterviewSchedule = () => {
    const [selected, setSelected] = useState("scheduled")
    return (
        <div className="w-1/3 bg-white border border-gray-300 text-black rounded-3xl flex-col p-6 gap-4 h-fit">
            <div className='flex flex-row items-center justify-between w-full'>
                <span className='inline-flex gap-2'>
                    <CalendarIcon className='w-6 h-6' />
                    Schedule
                </span>
                <button className='text-blue-500 inline-flex items-center gap-1'>
                    See all
                    <ChevronRight className='w-4 h-4' />
                </button>
            </div>
            <div className='flex flex-col gap-8 border-b border-b-gray-200 pb-6 mb-6'>
                <div className='flex flex-row items-center justify-between w-full bg-gray-100 p-2 rounded-full mt-6 shadow-inner'>
                    <button className='bg-white p-2 rounded-full'>
                        <ChevronLeft className='w-4 h-4 text-gray-500 cursor-pointer' strokeWidth={4} />
                    </button>
                    April, 2023
                    <button className='bg-white p-2 rounded-full'>
                        <ChevronRight className='w-4 h-4 text-gray-500 cursor-pointer' strokeWidth={4} />
                    </button>
                </div>
                <div className='flex flex-row items-center justify-between w-full'>
                    <button className='border border-gray-200 p-2 rounded-full'>
                        <ChevronLeft className='w-4 h-4 text-gray-500 cursor-pointer' strokeWidth={4} />
                    </button>
                    <span className='flex flex-col items-center bg-gray-100 rounded-lg text-gray-400 p-3'>
                        <h1>
                            Fri
                        </h1>
                        <h1 className='font-bold'>
                            31
                        </h1>
                    </span>
                    <span className='flex flex-col items-center bg-gray-100 rounded-lg text-gray-400 p-3.5'>
                        <h1>
                            Sat
                        </h1>
                        <h1 className='font-bold'>
                            01
                        </h1>
                    </span>
                    <span className='flex flex-col items-center bg-blue-600 rounded-lg text-white p-4'>
                        <h1>
                            Sun
                        </h1>
                        <h1 className='font-bold'>
                            02
                        </h1>
                    </span>
                    <span className='flex flex-col items-center bg-gray-100 rounded-lg text-gray-400 p-3.5'>
                        <h1>
                            Mon
                        </h1>
                        <h1 className='font-bold'>
                            03
                        </h1>
                    </span>
                    <span className='flex flex-col items-center bg-gray-100 rounded-lg text-gray-400 p-3'>
                        <h1>
                            Tue
                        </h1>
                        <h1 className='font-bold'>
                            04
                        </h1>
                    </span>
                    <button className='border border-gray-200 p-2 rounded-full'>
                        <ChevronRight className='w-4 h-4 text-gray-500 cursor-pointer' strokeWidth={4} />
                    </button>
                </div>
            </div>
            <div>
                <div className='flex flex-row items-center justify-between gap-4 w-full'>
                    <button
                        onClick={() => setSelected("scheduled")}
                        className={`${selected === "scheduled" ? "bg-blue-500 " : "bg-gray-300 "} flex-1 text-white rounded-lg font-normal h-12 px-4 inline-flex items-center justify-center gap-2`}>
                        <Calendar className='w-6 h-6 text-white' />
                        Scheduled
                    </button>
                    <button
                        onClick={() => setSelected("completed")}
                        className={`${selected === "completed" ? "bg-green-500" : "bg-gray-300"} flex-1 text-white rounded-lg font-normal h-12 px-4 inline-flex items-center justify-center gap-2`}>
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
