import { Sparkle } from 'lucide-react'
import React from 'react'

const ResourseDataLoader = () => {
    return (
        <div className='flex flex-col gap-6 w-full'>
            <div className='flex flex-col gap-4 w-full'>
                <div className='w-full h-32 rounded-xl bg-gray-200 animate-pulse' />
                <div className='flex flex-row gap-4 w-full'>
                    <span className='inline-flex gap-2 items-center'>
                        <Sparkle /> <h2 className='text-sm uppercase font-semibold flex-1'>Skills</h2>
                    </span>
                    <div className='w-40 h-10 rounded-full bg-gray-200 animate-pulse' />
                    <div className='w-40 h-10 rounded-full bg-gray-200 animate-pulse' />
                    <div className='w-40 h-10 rounded-full bg-gray-200 animate-pulse' />
                    <div className='w-40 h-10 rounded-full bg-gray-200 animate-pulse' />
                </div>
            </div>
            <div className='flex flex-col gap-4 w-full'>
                <div className='w-full h-32 rounded-xl bg-gray-200 animate-pulse' />
                <div className='flex flex-row gap-4 w-full'>
                    <span className='inline-flex gap-2 items-center'>
                        <Sparkle /> <h2 className='text-sm uppercase font-semibold flex-1'>Skills</h2>
                    </span>
                    <div className='w-40 h-10 rounded-full bg-gray-200 animate-pulse' />
                    <div className='w-40 h-10 rounded-full bg-gray-200 animate-pulse' />
                    <div className='w-40 h-10 rounded-full bg-gray-200 animate-pulse' />
                    <div className='w-40 h-10 rounded-full bg-gray-200 animate-pulse' />
                </div>
            </div>
        </div>
    )
}

export default ResourseDataLoader
