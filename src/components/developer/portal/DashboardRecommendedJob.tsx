import { Link, ChevronRight, CornerUpRightIcon } from 'lucide-react'
import React from 'react'

const JobListingCard = ({ title, location, salary, type }: any) => {
    const color = type === "Remote" ? "green" : type === "Full Time" ? "orange" : "purple";
    return (
        <div className="bg-gray-50 w-full rounded-2xl p-5 flex items-center justify-between flex-wrap gap-4 mb-6">
            <div>
                <div className="flex items-center gap-2 flex-wrap mb-2">
                    <p className="tracking-tight text-lg font-semibold">{title}</p>
                    <span className={`inline-block py-1 px-2 rounded-3xl border border-${color}-100 bg-${color}-50 tracking-tight text-${color}-500 text-xs font-medium`}>{type}</span>
                </div>
                <div className="flex gap-3 items-center">
                    <p className="tracking-tight text-gray-700 text-sm">{location}</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="4" height="4" viewBox="0 0 4 4" fill="none">
                        <circle cx="2" cy="2" r="2" fill="#71717A">
                        </circle>
                    </svg>
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

const DashboardRecommendedJob = () => {
    return (
        <div className={`h-fit bg-white border border-gray-300 text-black rounded-3xl w-full flex flex-col gap-6 items-start justify-start p-6`}>
            <span className=''>
                <h1 className="font-heading tracking-tight text-3xl md:text-4xl font-medium mb-1">
                    Recommended Jobs
                </h1>
                <p className="tracking-tight text-gray-500 text-sm">
                    Apply for a position that fits your skills and interests.
                </p>
            </span>
            <div className='flex overflow-hidden items-center w-full h-[26rem] justify-center relative'>
                <div className='absolute w-full h-full flex flex-col items-center justify-center bg-black/1 border border-black/2 backdrop-blur-lg z-20 p-12 rounded-xl' />
                <span className='text-gray-700 text-5xl uppercase font-extrabold z-20 absolute'>
                    Coming Soon
                </span>
                <span className='text-black/5 text-8xl whitespace-nowrap uppercase font-extrabold z-20 absolute top-0'>
                    Coming Soon
                </span>
                <span className='text-black/5 text-8xl whitespace-nowrap uppercase font-extrabold z-20 absolute top-20'>
                    Coming Soon
                </span>
                <span className='text-black/5 text-8xl whitespace-nowrap uppercase font-extrabold z-20 absolute'>
                    Coming Soon
                </span>
                <span className='text-black/5 text-8xl whitespace-nowrap uppercase font-extrabold z-20 absolute bottom-20'>
                    Coming Soon
                </span>
                <span className='text-black/5 text-8xl whitespace-nowrap uppercase font-extrabold z-20 absolute bottom-0'>
                    Coming Soon
                </span>
                <JobListingCard title="Product Designer" type="Remote" location="New York" salary="$60k - $72k" />
                <JobListingCard title="Senior UX Designer" type="Full Time" location="New York" salary="$120k - $150k" />
                <JobListingCard title="Senior UX Designer" type="Part Time" location="New York" salary="$120k - $150k" />
                <JobListingCard title="Senior UX Designer" type="Part Time" location="New York" salary="$120k - $150k" />

                <Link
                    href="/developer/dashboard/job-listing"
                    className='text-blue-600 flex items-center transition duration-200 hover:text-blue-800'>
                    Show More <ChevronRight className='inline-block' />
                </Link>
            </div>
        </div>
    )
}

export default DashboardRecommendedJob
