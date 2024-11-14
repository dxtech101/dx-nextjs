import { Filter } from 'lucide-react';
import React from 'react'

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
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M12.25 5.83334H6.41667C3.83934 5.83334 1.75 7.92268 1.75 10.5V11.6667M12.25 5.83334L8.75 9.33334M12.25 5.83334L8.75 2.33334" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                </div>
            </a>
        </div>
    )
}

const JobListing = () => {
    return (
        <section className="">
            <div className="container mx-auto px-4">
                <div className="flex flex-col flex-wrap">
                    <div className='w-full bg-white z-20 sticky top-0 left-0 py-6 px-4 flex flex-col gap-6 lg:flex-row justify-between items-start lg:items-center'>
                        <span>
                            <h1 className="font-heading tracking-tight text-4xl md:text-5xl font-medium mb-4">
                                Open Positions
                            </h1>
                            <p className="tracking-tight text-gray-600 max-w-sm">
                                Apply for a position that fits your skills and interests.
                            </p>
                        </span>
                        <button
                            // onClick={() => handleNext()}
                            className=' text-white font-normal h-12  whitespace-nowrap flex flex-row gap-2 justify-center items-end lg:items-center bg-blue-500 px-4 rounded-xl'>
                            <Filter className='w-6 h-6 text-white' /> Apply Filter
                        </button>
                    </div>
                    <div className="w-full flex justify-around p-4 gap-6">
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

                    </div>
                </div>
            </div>
        </section>
    )
}

export default JobListing
