"use client"
import { BriefcaseBusiness, CodeIcon, MailIcon, PencilIcon, Phone, PinIcon, ShieldCheck } from 'lucide-react';
import { useSelector } from 'react-redux';

const DeveloperProfileDetails = () => {
    const developerProfile = useSelector((state: any) => state.developerProfile)

    return (
        <div className='relative w-full h-full bg-gray-50 rounded-2xl flex flex-col items-start justify-start gap-4 p-4 lg:p-6'>
            <div className="absolute top-4 right-4 group flex items-center justify-center">
                <button
                    className='bg-gray-200 border border-gray-300 flex flex-row items-center justify-center gap-2 rounded-full text-gray-900 py-2 px-4 text-sm font-bold group'
                >
                    <PencilIcon className="w-5 h-5 cursor-pointer ml-2" />
                    <span className="overflow-hidden whitespace-nowrap transition-all duration-700 ease-in-out opacity-0 w-0 group-hover:w-auto group-hover:opacity-100">
                        Edit
                    </span>
                </button>
            </div>
            <div className='w-full h-full flex flex-col xl:flex-row items-center justify-between gap-6'>
                <img
                    className="h-1/2 w-1/2 lg:h-1/4 lg:w-1/4 aspect-square rounded-full object-cover object-right relative"
                    src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80"
                    alt=""
                />

                <div className='w-full flex flex-col gap-6 justify-between h-full'>
                    <div className='flex flex-col gap-2'>
                        <span className='text-3xl lg:text-4xl font-bold capitalize'>{developerProfile.first_name} {developerProfile.last_name}</span>
                        <div className='flex flex-wrap gap-2 text-sm'>
                            <span className='shadow-inner inline-flex items-center gap-2 bg-purple-100 border border-purple-300 text-purple-900 w-fit rounded-full py-0.5 px-4'>
                                <CodeIcon className='w-5 h-5' />
                                Senior Developer
                            </span>
                            <span className='inline-flex shadow-inner items-center gap-2 bg-amber-100 border border-amber-300 text-amber-900 w-fit rounded-full py-0.5 px-4'>
                                <ShieldCheck className='w-5 h-5' />
                                16 Certification
                            </span>
                            <span className='inline-flex items-center shadow-inner gap-2 bg-blue-100 border border-blue-300 text-blue-900 w-fit rounded-full py-0.5 px-4'>
                                <BriefcaseBusiness className='w-5 h-5' />
                                7+ Years Experience
                            </span>
                        </div>

                    </div>


                    <div className='grid grid-cols-2 w-full lg:w-3/4 gap-4 justify-between'>
                        <span className='inline-flex items-center gap-4'><MailIcon className='w-5 h-5 text-purple-900' /> Email</span>
                        <span>{developerProfile.email}</span>

                        <span className='inline-flex items-center gap-4'><Phone className='w-5 h-5 text-purple-900' /> Phone</span>
                        <span>+91-9876543210</span>

                        <span className='inline-flex items-center gap-4'><PinIcon className='w-5 h-5 text-purple-900' /> Address</span>
                        <span>123 Main Street, New York, NY 5010</span>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default DeveloperProfileDetails
