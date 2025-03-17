"use client"
import { skillsDetails } from '@/constants/data';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const SkillItem = ({ name, imageSrc }: any) => {
    const [checkedItem, setCheckedItem] = useState<any>();

    useEffect(() => {
        setCheckedItem(skillsDetails.find((item: any) => item.text === name))
    }, [])

    if (checkedItem?.bgColor) {
        return (
            <div className={`inline-flex gap-2 items-center min-w-max whitespace-nowrap ${checkedItem.bgColor} border ${checkedItem.borderColor} p-1 px-3 rounded-full relative z-10`}>
                <img className='w-auto h-6 mix-blend-multiply' src={imageSrc} alt={name} />
                <span className={`font-bold ${checkedItem.textColor}`}>
                    {name}
                </span>
            </div>
        );
    }
};

const DeveloperTestimonialsCard = ({ imgUrl, details, skills }: any) => {
    return (
        <div className="w-full flex flex-col gap-4 justify-between h-full p-4 border bg-white rounded-2xl relative">
            <img
                src={imgUrl}
                alt="herosection1"
                className='rounded-xl h-50 w-auto'
            />
            <div className='flex flex-col justify-between px-3'>
                <h4 className="mb-4 text-3xl font-bold text-black tracking-tight font-heading">
                    Lorem ipsum.
                    <p className='text-lg font-normal text-gray-700 '>Certified Technical Architect</p>
                </h4>
                <div className="flex flex-wrap gap-2">
                    {skills && skills.map((skill: any, index: any) => {
                        return (
                            <SkillItem key={index} name={skill.name} imageSrc={skill.icon} />
                        )
                    })}
                </div>
            </div>
            <Link
                href='/developer/login'
                className='w-full mt-4 py-2 px-6 text-white text-center font-semibold border border-indigo-700 rounded-xl focus:ring focus:ring-indigo-300 bg-indigo-600 hover:bg-indigo-700 transition ease-in-out duration-200'>
                See More
            </Link>
        </div>
    )
}

const DeveloperTestimonials = () => {
    return (
        <section className="py-12 md:py-24 mx-4 lg:mx-10 flex flex-col justify-center items-start">
            <h1 className="mb-16 font-semibold text-4xl sm:text-6xl xl:text-11xl font-heading">
                Work with Anyone. Anywhere.
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                <DeveloperTestimonialsCard
                    imgUrl="https://static.shuffle.dev/components/preview/2f808e47-944e-42cf-b821-2358251e0600/assets/public/saturn-assets/images/team/large-photo-color3.png"
                    details={"Lorem ipsum."}
                    skills={[
                        { name: "B2B Commerce Cloud", icon: "https://dx-assests.s3.amazonaws.com/assets/commerce-cloud.svg" },
                        { name: "Salesforce", icon: "https://dx-assests.s3.amazonaws.com/assets/Salesforce.png" },
                        { name: "Marketing Cloud", icon: "https://dx-assests.s3.amazonaws.com/assets/marketing-cloud.svg" }
                    ]}
                />
                <DeveloperTestimonialsCard
                    imgUrl="https://static.shuffle.dev/components/preview/2f808e47-944e-42cf-b821-2358251e0600/assets/public/saturn-assets/images/team/large-photo-color1.png"
                    details={"Lorem ipsum."}
                    skills={[
                        { name: "Mulesoft", icon: "https://dx-assests.s3.amazonaws.com/assets/Mulesoft.png" },
                        { name: "B2C Commerce Cloud", icon: "https://dx-assests.s3.amazonaws.com/assets/commerce-cloud.svg" },
                        { name: "Experience Cloud", icon: "https://dx-assests.s3.amazonaws.com/assets/Salesforce.png" }]}
                />
                <DeveloperTestimonialsCard
                    imgUrl="https://static.shuffle.dev/components/preview/2f808e47-944e-42cf-b821-2358251e0600/assets/public/saturn-assets/images/team/large-photo-color2.png"
                    details={"Lorem ipsum."}
                    skills={[
                        { name: "Mulesoft", icon: "https://dx-assests.s3.amazonaws.com/assets/Mulesoft.png" },
                        { name: "Industry Cloud", icon: "https://dx-assests.s3.amazonaws.com/assets/industry.png" },
                        { name: "AI", icon: "https://dx-assests.s3.amazonaws.com/assets/ai.png" }
                    ]}
                />
            </div>
        </section>
    )
}

export default DeveloperTestimonials
