import React from 'react'


const SkillItem = ({ text, imageSrc, bgColor, borderColor, textColor }: any) => {
    return (
        <div className={`inline-flex gap-2 items-center min-w-max whitespace-nowrap ${bgColor} border ${borderColor} p-2 px-4 rounded-full relative z-10`}>
            <img className='w-auto h-6' src={imageSrc} alt={text} />
            <span className={`font-bold ${textColor}`}>
                {text}
            </span>
        </div>
    );
};

const DeveloperProfileSkills = () => {
    const initialItems = [
        { id: 1, text: 'Salesforce', imageSrc: '/Salesforce.png', bgColor: 'bg-blue-100', checkedColor: 'bg-blue-500', borderColor: 'border-blue-600', textColor: 'text-blue-400' },
        { id: 2, text: 'Mulesoft', imageSrc: '/mulesoft.webp', bgColor: 'bg-blue-100', checkedColor: 'bg-blue-500', borderColor: 'border-blue-600', textColor: 'text-blue-400' },
        { id: 3, text: 'Heroku', imageSrc: '/heroku.png', bgColor: 'bg-purple-100', checkedColor: 'bg-purple-500', borderColor: 'border-purple-600', textColor: 'text-purple-900' },
        { id: 4, text: 'Sales Cloud', imageSrc: '/sales-cloud.svg', bgColor: 'bg-green-100', checkedColor: 'bg-green-500', borderColor: 'border-green-600', textColor: 'text-green-800' },
        { id: 5, text: 'Service Cloud', imageSrc: '/service-cloud.svg', bgColor: 'bg-pink-100', checkedColor: 'bg-pink-500', borderColor: 'border-pink-600', textColor: 'text-pink-600' },
        { id: 6, text: 'B2B Commerce Cloud', imageSrc: '/commerce-cloud.svg', bgColor: 'bg-green-100', checkedColor: 'bg-green-500', borderColor: 'border-green-600', textColor: 'text-green-800' },
        { id: 7, text: 'Marketing Cloud', imageSrc: '/marketing-cloud.svg', bgColor: 'bg-orange-100', checkedColor: 'bg-orange-500', borderColor: 'border-orange-600', textColor: 'text-orange-400' },
        { id: 8, text: 'B2C Commerce Cloud', imageSrc: '/commerce-cloud.svg', bgColor: 'bg-green-100', checkedColor: 'bg-green-500', borderColor: 'border-green-600', textColor: 'text-green-800' },
        { id: 9, text: 'Experience Cloud', imageSrc: '/Salesforce.png', bgColor: 'bg-blue-100', checkedColor: 'bg-blue-500', borderColor: 'border-blue-600', textColor: 'text-blue-400' },
        { id: 10, text: 'Industry Cloud', imageSrc: '/Salesforce.png', bgColor: 'bg-blue-100', checkedColor: 'bg-blue-500', borderColor: 'border-blue-600', textColor: 'text-blue-400' },
        { id: 11, text: 'Einstein Copilot', imageSrc: '/encop.webp', bgColor: 'bg-purple-100', checkedColor: 'bg-purple-500', borderColor: 'border-purple-600', textColor: 'text-purple-900' },
    ];
    return (
        <div className='bg-gray-50 rounded-2xl w-full p-4 lg:p-6 flex flex-col gap-6'>
            <span className='text-2xl font-bold'>
                Skills
            </span>
            <div className='flex flex-row gap-3 w-full flex-nowrap lg:flex-wrap overflow-x-scroll'>
                {initialItems.map(item => (
                    <SkillItem
                        key={item.id}
                        text={item.text}
                        imageSrc={item.imageSrc}
                        bgColor={item.bgColor}
                        borderColor={item.borderColor}
                        textColor={item.textColor}
                        checkedColor={item.checkedColor}
                        checked={initialItems.some(checkedItem => checkedItem.id === item.id)}
                    />
                ))}
            </div>

        </div>
    )
}

export default DeveloperProfileSkills
