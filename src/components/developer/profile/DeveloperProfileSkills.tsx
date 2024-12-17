import { Sparkle } from 'lucide-react';
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
            <div className={`inline-flex gap-2 items-center min-w-max whitespace-nowrap ${checkedItem.bgColor} border ${checkedItem.borderColor} p-2 px-4 rounded-full relative z-10`}>
                <img className='w-auto h-6' src={checkedItem.imageSrc} alt={name} />
                <span className={`font-bold ${checkedItem.textColor}`}>
                    {name}
                </span>
            </div>
        );
    }
};

const DeveloperProfileSkills = ({ skills, loading }: any) => {
    console.log("skills", skills);

    return (
        <div className='bg-gray-50 rounded-2xl w-full p-4 lg:p-6 flex flex-col gap-6'>
            <span className='text-2xl font-bold inline-flex items-center gap-2'>
                <Sparkle /> Skills
            </span>
            {loading ? (
                <div className='flex flex-row gap-3 w-full flex-nowrap lg:flex-wrap overflow-x-scroll'>
                    <div className='animate-pulse w-1/4 h-10 rounded-full bg-gray-200' />
                    <div className='animate-pulse w-1/4 h-10 rounded-full bg-gray-200' />
                    <div className='animate-pulse w-1/4 h-10 rounded-full bg-gray-200' />
                </div>
            ) : (
                <div className='flex flex-row gap-3 w-full flex-nowrap lg:flex-wrap overflow-x-scroll'>
                    {skills.map((item: any, index: any) => (
                        <SkillItem key={index} name={item.skill_name} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default DeveloperProfileSkills
