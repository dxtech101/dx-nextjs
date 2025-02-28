"use client"
import React, { useEffect, useState } from 'react'

const Services = () => {
    return (
        <section className="py-12 md:py-24 bg-gradient-to-b from-blue-100 from-1% rounded-t-[3rem] mx-6">
            <div className="container mx-auto px-4">
                <div className="mb-12 text-center max-w-6xl mx-auto text-black">
                    <h1 className="mb-16 font-semibold text-3xl sm:text-4xl md:text-7xl xl:text-11xl font-heading">
                        <span>Your trusted Platform for
                            <span className='flex flex-row items-center justify-center pt-4 gap-2'>
                                <img src="/Salesforce.png" alt="Salesforce" className='w-20 md:w-32 z-0' />
                                {" "}resources
                            </span>
                        </span>
                    </h1>
                    {/* <p className="font-semibold text-xl text-neutral-600 tracking-tight">Your journey to digital excellence starts here.</p> */}
                </div>
                {/* <img className="mb-16 mx-auto object-cover rounded-3xl height-[480px]" src="https://static.shuffle.dev/components/preview/aeb728e4-30a0-44d1-975a-1287008887cb/assets/public/mirga-assets/images/services/woman.jpg" alt="" /> */}
                <div className="mb-20">
                    <div className="flex flex-wrap -m-2.5">
                        <div className="w-full md:w-1/2 lg:w-1/3 p-2.5">
                            <div className="h-full p-10 border bg-white rounded-2xl relative">
                                <div className="mb-24">
                                    <h4 className="mb-2 text-3xl font-bold text-black tracking-tight font-heading">
                                        1000+ Registered &
                                        Vetted Developers</h4>
                                    <p className="font-medium text-md text-neutral-600 tracking-tight max-w-xl">Can create, connect, verify, and search across all you knowledge platforms is one centralized, secure place - accelarating productivity.</p>
                                    <img src="/verified.png" alt="herosection1" className='absolute right-6 bottom-6 opacity-95 h-20' />
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/3 p-2.5">
                            <div className="h-full p-10 border bg-white rounded-2xl relative">
                                <div className="mb-24">
                                    <h4 className="mb-2 text-3xl font-bold text-black tracking-tight font-heading">200+ Listed Projects</h4>
                                    <p className="font-medium text-md text-neutral-600 tracking-tight max-w-xl">Can create, connect, verify, and search across all you knowledge platforms is one centralized, secure place - accelarating productivity.</p>
                                    <img src="/closure.png" alt="herosection1" className='absolute right-6 bottom-6 opacity-95 h-20' />
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/3 p-2.5">
                            <div className="h-full p-10 border bg-white rounded-2xl relative">
                                <div className="mb-24">
                                    <h4 className="mb-2 text-3xl font-bold text-black tracking-tight font-heading">Salesforce CTA
                                        Approved Resources</h4>
                                    <p className="font-medium text-md text-neutral-600 tracking-tight max-w-xl">Can create, connect, verify, and search across all you knowledge platforms is one centralized, secure place - accelarating productivity.</p>
                                    <img src="/coding.png" alt="herosection1" className='absolute right-6 bottom-6 opacity-95 h-20' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Services
