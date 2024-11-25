import { Factory } from 'lucide-react'
import React from 'react'

const DeveloperProfileIndustries = ({ loading, industries }: any) => {
    return (
        <div className='bg-gray-50 rounded-2xl w-full p-4 lg:p-6 flex flex-col gap-6'>
            <span className='text-2xl font-bold inline-flex items-center gap-2'>
                <Factory /> Industries
            </span>
            {loading ? (
                <div className='flex flex-row gap-3 w-full flex-nowrap lg:flex-wrap overflow-x-scroll'>
                    <div className='animate-pulse w-1/4 h-10 rounded-full bg-gray-200' />
                    <div className='animate-pulse w-1/4 h-10 rounded-full bg-gray-200' />
                    <div className='animate-pulse w-1/4 h-10 rounded-full bg-gray-200' />
                </div>
            ) : (
                <div className='flex flex-row gap-3 w-full flex-nowrap lg:flex-wrap overflow-x-scroll'>
                    No Records
                </div>
            )}
        </div>
    )
}

export default DeveloperProfileIndustries
