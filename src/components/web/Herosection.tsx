import Link from 'next/link'
import React from 'react'

const Herosection = () => {
    return (
        <div className="flex flex-col gap-8 items-center my-32 xl:my-0 justify-evenly xl:justify-around xl:flex-row min-h-screen">
            <div className="w-10/12 xl:w-4/12 p-0 lg:p-6">
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
                    <Link href={"/signup"} className="py-4 px-6 w-full text-white font-semibold border border-indigo-700 rounded-xl focus:ring focus:ring-indigo-300 bg-indigo-600 hover:bg-indigo-700 transition ease-in-out duration-200" type="button">
                        Sign up now
                    </Link>
                </div>
            </div>
            <div className='hidden lg:flex flex-col lg:flex-row justify-end items-center gap-4 w-10/12 lg:w-7/12 p-0 lg:p-8'>
                <div className='w-full lg:w-1/3 flex'>
                    <img className="mx-auto object-cover rounded-xl lg:rounded-3xl" src="https://dx-assests.s3.amazonaws.com/assets/herosection1.png" alt="" />
                </div>
                <div className="w-full lg:w-1/3 flex flex-col justify-between lg:justify-center gap-4">
                    <img className="mx-auto object-cover rounded-xl lg:rounded-3xl" src="https://dx-assests.s3.amazonaws.com/assets/herosection2.png" alt="" />
                    <img className="mx-auto object-cover rounded-xl lg:rounded-3xl" src="https://dx-assests.s3.amazonaws.com/assets/herosection3.png" alt="" />
                </div>
                <div className="w-full lg:w-1/3 flex flex-row">
                    <img className="mx-auto object-cover rounded-xl lg:rounded-3xl" src="https://dx-assests.s3.amazonaws.com/assets/herosection4.png" alt="" />
                </div>
            </div>
            <div className='flex lg:hidden flex-col lg:flex-row justify-end items-center gap-4 w-10/12 p-0'>
                <div className='w-full flex'>
                    <img className="mx-auto object-cover rounded-xl lg:rounded-3xl" src="https://dx-assests.s3.amazonaws.com/assets/herosection1.png" alt="" />
                </div>
                <div className='flex flex-row gap-4'>
                    <div className="w-full flex flex-col justify-between lg:justify-center gap-4">
                        <img className="mx-auto object-cover rounded-xl lg:rounded-3xl" src="https://dx-assests.s3.amazonaws.com/assets/herosection2.png" alt="" />
                        <img className="mx-auto object-cover rounded-xl lg:rounded-3xl" src="https://dx-assests.s3.amazonaws.com/assets/herosection3.png" alt="" />
                    </div>
                    <div className="w-full flex flex-row">
                        <img className="mx-auto object-cover rounded-xl lg:rounded-3xl" src="https://dx-assests.s3.amazonaws.com/assets/herosection4.png" alt="" />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Herosection
