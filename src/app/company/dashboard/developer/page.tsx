import InputField from '@/components/InputField'
import { MapPin, DollarSign } from 'lucide-react'
import React from 'react'

const page = () => {
    return (
        <div className='flex flex-col items-center justify-center w-full text-left py-10 md:py-16 px-6 md:px-10'>
            <div className='w-full flex flex-row items-center justify-between'>
                <span className='pb-4'>
                    <h1 className="font-heading tracking-tight text-3xl md:text-5xl font-medium mb-4">
                        Let's find your Dream Job 💼
                    </h1>
                    <p className='text-gray-500 text-sm'>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium, eum?
                    </p>
                </span>
                <div className='flex gap-2'>
                    <span className='hidden md:block font-medium text-xs whitespace-nowrap bg-purple-100 rounded-full px-4 border border-purple-800 text-purple-800 py-1'>
                        500,000+ available jobs
                    </span>
                    <span className='hidden md:block font-medium text-xs whitespace-nowrap bg-amber-100 rounded-full px-4 border border-amber-800 text-amber-800 py-1'>
                        100,000+ available companies
                    </span>
                </div>
            </div>

            <div className='mt-6 w-full flex flex-col md:flex-row items-center justify-center gap-4'>
                <InputField
                    className='w-full z-10'
                    iconName='search'
                    placeHolder='Search Keyword'
                />
                <div className='flex flex-wrap w-full gap-4'>
                    <button className='h-full bg-white rounded-xl px-4 py-2 text-black flex items-center gap-2 whitespace-nowrap'>
                        <MapPin className='h-5 w-5 text-blue-600' />
                        Newyork, NY
                    </button>
                    <button className='h-full bg-white rounded-xl px-4 py-2 text-black flex items-center gap-2 whitespace-nowrap'>
                        <DollarSign className='h-5 w-5 text-blue-600' />
                        2,000 - 4,000 USD
                    </button>
                    <button className='bg-blue-500 rounded-xl px-4 py-2 text-sm text-white whitespace-nowrap'>
                        Find a Job
                    </button>
                </div>
            </div>
        </div>
    )
}

export default page
