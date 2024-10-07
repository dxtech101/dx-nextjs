import Image from 'next/image'
import React from 'react'

const Certifications = () => {
    return (
        <>
            <div className='rounded-2xl w-full h-full relative px-10'>
                <div className='w-full bg-white border-b border-gray-200 top-0 left-0 sticky py-6 flex flex-row justify-between items-center'>
                    <span>
                        <h1 className='text-start text-3xl font-bold text-black'>
                            Certification Details
                        </h1>
                        <p className='pt-2 text-gray-400'>
                            Select Salesforce Certifications that you hold
                        </p>
                    </span>
                    <div className='flex flex-row gap-6 py-6'>
                        <input type='text' className='h-12 px-6 text-blue-600 bg-gray-100 border border-gray-400 rounded-xl' placeholder='Search Certifications' />
                        <button className='bg-blue-500 text-bold text-white font-bold h-12 px-6 rounded-xl'>Save & Next</button>
                    </div>
                </div>
                <div className='py-6'>
                    <h3 className=''>Salesforce Adminstrator</h3>
                    <div className='flex flex-row gap-6 py-6'>
                        <div className='border-r border-r-gray-200 pr-4'>
                            <img className='w-24' src='/Administrator.png' alt='' />
                            <input type='checkbox' className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-full' />
                        </div>
                        <div className='border-r border-r-gray-200 pr-4'>
                            <img className='w-24' src='/Advanced-Administrator.png' alt='' />
                            <input type='checkbox' className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-full' />
                        </div>
                        <div>
                            <img className='w-24' src='/Platform-App-Builder.png' alt='' />
                            <input type='checkbox' className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-full' />

                        </div>
                    </div>
                </div>
                <div className='pb-6'>
                    <h3 className=''>Salesforce Developer</h3>
                    <div className='flex flex-row flex-wrap gap-6 py-6'>
                        <div className='border-r border-r-gray-200 pr-4'>
                            <img className='w-24' src='/JavaScript-Developer-I.png' alt='' />
                            <input type='checkbox' className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-full' />
                        </div>
                        <div className='border-r border-r-gray-200 pr-4'>
                            <img className='w-24' src='/Platform-Developer-I.png' alt='' />
                            <input type='checkbox' className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-full' />
                        </div>
                        <div className='border-r border-r-gray-200 pr-4'>
                            <img className='w-24' src='/Platform-Developer-II.png' alt='' />
                            <input type='checkbox' className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-full' />
                        </div>
                        <div className='border-r border-r-gray-200 pr-4'>
                            <img className='w-24' src='/Industries-CPQ-Developer.png' alt='' />
                            <input type='checkbox' className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-full' />
                        </div>
                        <div className=''>
                            <img className='w-24' src='/B2C-Commerce-Developer.png' alt='' />
                            <input type='checkbox' className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-full' />
                        </div>
                    </div>
                </div>
                
            </div>
        </>
    )
}

export default Certifications
