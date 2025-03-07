import Link from 'next/link'
import React from 'react'

const Herosection = () => {
    return (
        <div className="flex flex-col items-center justify-evenly xl:justify-around xl:flex-row h-screen">
            <div className="w-8/12 xl:w-4/12 p-0 lg:p-6">
                <h1 className="mb-9 text-3xl sm:text-6xl md:text-7xl font-bold font-heading w-full xl:w-full leading-none text-black">
                    Hire Top
                    <br />
                    <span className='inline-flex items-center gap-3'>
                        <img src="/salesforce-no-type-logo.svg" alt="Salesforce" className='w-16 md:w-24 z-0' />
                        <span className='z-10'>
                            Salesforce
                        </span>
                    </span>
                    <br />
                    Talent
                </h1>
                <div>
                    <p className="mb-9 text-lg text-gray-900 font-medium md:max-w-sm">
                        Trusted Salesforce Talent, Vetted for Excellence, Hired with Flexibility.
                    </p>
                    <div className="md:inline-block">
                        <Link href={"/signup"} className="py-4 px-6 w-full text-white font-semibold border border-indigo-700 rounded-xl focus:ring focus:ring-indigo-300 bg-indigo-600 hover:bg-indigo-700 transition ease-in-out duration-200" type="button">
                            Sign up now
                        </Link>
                    </div>
                </div>
            </div>
            <div className="w-8/12 lg:w-7/12 p-0 lg:p-8">
                <div className='flex flex-row justify-end items-center gap-4'>
                    <div className='w-1/3 h-1/3'>
                        <img className="mx-auto h-full object-cover rounded-3xl" src="/herosection1.png" alt="" />
                    </div>
                    <div className="w-1/3 flex flex-col justify-between gap-4">
                        <img className="mx-auto h-full object-cover rounded-3xl" src="/herosection2.png" alt="" />
                        <img className="mx-auto h-full object-cover rounded-3xl" src="https://static.shuffle.dev/components/preview/238eb578-e531-4cf4-a658-a1ff13c9b896/assets/public/flaro-assets/images/headers/people2.png" alt="" />
                    </div>
                    <div className="w-1/3 flex flex-row">
                        <img className="mx-auto object-cover rounded-3xl" src="https://static.shuffle.dev/components/preview/238eb578-e531-4cf4-a658-a1ff13c9b896/assets/public/flaro-assets/images/headers/people3.png" alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Herosection
