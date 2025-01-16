"use client"
import React, { useEffect, useState } from 'react'

const SkillItem = ({ name }: any) => {
    const [checkedItem, setCheckedItem] = useState<any>();
    const initialItems = [
        { text: 'Salesforce', imageSrc: '/Salesforce.png', bgColor: 'bg-blue-100', checkedColor: 'bg-blue-500', borderColor: 'border-blue-600', textColor: 'text-blue-400' },
        { text: 'Mulesoft', imageSrc: '/Mulesoft.png', bgColor: 'bg-blue-100', checkedColor: 'bg-blue-500', borderColor: 'border-blue-600', textColor: 'text-blue-400' },
        { text: 'Heroku', imageSrc: '/heroku.png', bgColor: 'bg-purple-100', checkedColor: 'bg-purple-500', borderColor: 'border-purple-600', textColor: 'text-purple-900' },
        { text: 'Sales Cloud', imageSrc: '/sales-cloud.svg', bgColor: 'bg-green-100', checkedColor: 'bg-green-500', borderColor: 'border-green-600', textColor: 'text-green-800' },
        { text: 'Service Cloud', imageSrc: '/service-cloud.svg', bgColor: 'bg-pink-100', checkedColor: 'bg-pink-500', borderColor: 'border-pink-600', textColor: 'text-pink-600' },
        { text: 'Marketing Cloud', imageSrc: '/marketing-cloud.svg', bgColor: 'bg-orange-100', checkedColor: 'bg-orange-500', borderColor: 'border-orange-600', textColor: 'text-orange-400' },
        { text: 'B2B Commerce Cloud', imageSrc: '/commerce-cloud.svg', bgColor: 'bg-green-100', checkedColor: 'bg-green-500', borderColor: 'border-green-600', textColor: 'text-green-800' },
        { text: 'B2C Commerce Cloud', imageSrc: '/commerce-cloud.svg', bgColor: 'bg-green-100', checkedColor: 'bg-green-500', borderColor: 'border-green-600', textColor: 'text-green-800' },
        { text: 'Experience Cloud', imageSrc: '/Salesforce.png', bgColor: 'bg-blue-100', checkedColor: 'bg-blue-500', borderColor: 'border-blue-600', textColor: 'text-blue-400' },
        { text: 'Industry Cloud', imageSrc: '/Salesforce.png', bgColor: 'bg-blue-100', checkedColor: 'bg-blue-500', borderColor: 'border-blue-600', textColor: 'text-blue-400' },
        { text: 'Einstein Copilot', imageSrc: '/encop.webp', bgColor: 'bg-purple-100', checkedColor: 'bg-purple-500', borderColor: 'border-purple-600', textColor: 'text-purple-900' },
        { text: 'AI', imageSrc: '/encop.webp', bgColor: 'bg-purple-100', checkedColor: 'bg-purple-500', borderColor: 'border-purple-600', textColor: 'text-purple-900' },
    ];

    useEffect(() => {
        setCheckedItem(initialItems.find((item: any) => item.text === name))
    }, [])

    if (checkedItem?.bgColor) {
        return (
            <div className={`inline-flex gap-2 items-center min-w-max whitespace-nowrap ${checkedItem.bgColor} border ${checkedItem.borderColor} p-1 px-3 rounded-full relative z-10`}>
                <img className='w-auto h-6' src={checkedItem.imageSrc} alt={name} />
                <span className={`font-bold ${checkedItem.textColor}`}>
                    {name}
                </span>
            </div>
        );
    }
};

const DeveloperTestimonials = () => {
    return (
        <section className="py-12 md:py-24 container mx-auto flex flex-col justify-center items-start">
            <h1 className="mb-16 font-semibold text-6xl sm:text-6xl xl:text-11xl font-heading">
                Work with anyone. Anywhere.
            </h1>
            <div className="flex w-full justify-evenly flex-wrap -m-2.5">
                <div className="w-full md:w-1/2 lg:w-1/3 p-2.5">
                    <div className="h-full p-4 border bg-white rounded-2xl relative">
                        <img
                            src="https://static.shuffle.dev/components/preview/2f808e47-944e-42cf-b821-2358251e0600/assets/public/saturn-assets/images/team/large-photo-color2.png"
                            alt="herosection1"
                            className='rounded-xl'
                        />
                        <div className='p-6'>
                            <h4 className="mb-4 text-3xl font-bold text-black tracking-tight font-heading">
                                Lorem ipsum.
                                <p className='text-lg font-normal text-gray-700 '>Certified Technical Architect</p>
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                <SkillItem name={"Salesforce"} />
                                <SkillItem name={"Mulesoft"} />
                                <SkillItem name={"Heroku"} />
                                <SkillItem name={"Marketing Cloud"} />
                            </div>
                        </div>
                        <button className='w-full mt-4 py-2 px-6 text-white font-semibold border border-indigo-700 rounded-xl focus:ring focus:ring-indigo-300 bg-indigo-600 hover:bg-indigo-700 transition ease-in-out duration-200'>
                            See More
                        </button>
                    </div>
                </div>
                <div className="w-full md:w-1/2 lg:w-1/3 p-2.5">
                    <div className="h-full p-4 border bg-white rounded-2xl relative">
                        <img
                            src="https://static.shuffle.dev/components/preview/2f808e47-944e-42cf-b821-2358251e0600/assets/public/saturn-assets/images/team/large-photo-color3.png"
                            alt="herosection1"
                            className='rounded-xl'
                        />
                        <div className='p-6'>
                            <h4 className="mb-4 text-3xl font-bold text-black tracking-tight font-heading">
                                Lorem ipsum.
                                <p className='text-lg font-normal text-gray-700 '>Certified Technical Architect</p>
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                <SkillItem name={"B2B Commerce Cloud"} />
                                <SkillItem name={"Experience Cloud"} />
                            </div>
                        </div>
                        <button className='w-full mt-4 py-2 px-6 text-white font-semibold border border-indigo-700 rounded-xl focus:ring focus:ring-indigo-300 bg-indigo-600 hover:bg-indigo-700 transition ease-in-out duration-200'>
                            See More
                        </button>
                    </div>
                </div>
                <div className="w-full md:w-1/2 lg:w-1/3 p-2.5">
                    <div className="h-full p-4 border bg-white rounded-2xl relative">
                        <img
                            src="https://static.shuffle.dev/components/preview/2f808e47-944e-42cf-b821-2358251e0600/assets/public/saturn-assets/images/team/large-photo-color1.png"
                            alt="herosection1"
                            className='rounded-xl'
                        />
                        <div className='p-6'>
                            <h4 className="mb-4 text-3xl font-bold text-black tracking-tight font-heading">
                                Lorem ipsum.
                                <p className='text-lg font-normal text-gray-700 '>Certified Technical Architect</p>
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                <SkillItem name={"Mulesoft"} />
                                <SkillItem name={"Industry Cloud"} />
                            </div>
                        </div>
                        <button className='w-full mt-4 py-2 px-6 text-white font-semibold border border-indigo-700 rounded-xl focus:ring focus:ring-indigo-300 bg-indigo-600 hover:bg-indigo-700 transition ease-in-out duration-200'>
                            See More
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default DeveloperTestimonials
