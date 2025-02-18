import React from 'react'

const DashboardJobListing = () => {
    return (
        <div className={`h-fit bg-white border border-gray-300 text-black rounded-3xl w-full flex flex-col gap-6 items-start justify-start p-6`}>
            <span className=''>
                <h1 className="font-heading tracking-tight text-3xl md:text-4xl font-medium mb-1">
                    Applied Jobs
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
                <img src="/noRecords3.png" alt="" className='w-1/2' />
            </div>
        </div>
    )
}

export default DashboardJobListing
