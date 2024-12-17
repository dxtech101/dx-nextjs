import React from 'react'

const CompanyProjectModalLoader = () => {
    return (
        <>
            <div className='flex flex-row justify-between gap-6 w-full py-4 px-4'>
                <div className='flex flex-row gap-6 w-full py-4'>
                    <div className='animate-pulse w-1/4 h-12 rounded-full bg-gray-200' />
                    <div className='animate-pulse w-1/4 h-12 rounded-full bg-gray-200' />
                    <div className='animate-pulse w-1/4 h-12 rounded-full bg-gray-200' />
                </div>
                <div className='flex flex-row justify-end gap-6 w-full py-4'>
                    <div className='animate-pulse w-1/4 h-12 rounded-xl bg-gray-200' />
                    <div className='animate-pulse w-1/4 h-12 rounded-xl bg-gray-200' />
                </div>
            </div>
            <div className='flex flex-col justify-between gap-6 w-full py-4'>
                <div className='animate-pulse w-full h-60 rounded-xl bg-gray-200' />
            </div>
        </>
    )
}

export default CompanyProjectModalLoader
