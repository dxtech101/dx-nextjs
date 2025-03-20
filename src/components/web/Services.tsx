"use client"
import { image } from 'framer-motion/client'
import React, { useEffect, useState } from 'react'

const Services = () => {

    const servicesData = [
        {
            title: "1000+ Registered & Vetted Developers",
            description: "Can create, connect, verify, and search across all you knowledge platforms is one centralized, secure place - accelarating productivity.",
            imageSrc: "/verified.png",
        },
        {
            title: "200+ Listed Projects",
            description: "Can create, connect, verify, and search across all you knowledge platforms is one centralized, secure place - accelarating productivity.",
            imageSrc: "/closure.png",
        },
        {
            title: "Salesforce CTA Approved Resources",
            description: "Can create, connect, verify, and search across all you knowledge platforms is one centralized, secure place - accelarating productivity.",
            imageSrc: "/coding.png",
        },
    ]

    return (
        <section className="py-12 md:py-24 bg-gradient-to-b from-blue-100 from-1% rounded-t-[2rem] lg:rounded-t-[3rem]">
            <div className="px-4 container mx-auto">
                <div className="mb-12 text-center max-w-6xl mx-auto text-black">
                    <h1 className="mb-16 font-bold text-2xl sm:text-4xl md:text-5xl xl:text-11xl font-heading">
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
                        {servicesData && servicesData.map((service, index) => {
                            return (
                                <div className="w-full md:w-1/2 lg:w-1/3 p-2.5">
                                    <div className="h-full p-10 border bg-white rounded-2xl relative">
                                        <div className="mb-24">
                                            <h4 className="mb-2 text-2xl lg:text-3xl font-bold text-black tracking-tight font-heading">
                                                {service?.title}
                                            </h4>
                                            <p className="font-medium text-md text-neutral-600 tracking-tight max-w-xl">
                                                {service?.description}
                                            </p>
                                            <img src={service?.imageSrc} alt="herosection1" className='absolute right-6 bottom-6 opacity-95 h-20' />
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Services
