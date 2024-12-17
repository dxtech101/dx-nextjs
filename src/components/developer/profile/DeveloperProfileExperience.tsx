import { InfoLabel } from '@/lib/helper';
import { FileUser } from 'lucide-react';
import React from 'react'

const WorkExperienceCard = (props: any) => {
    const { experience, index } = props;

    return (
        <div className='relative bg-gray-100 rounded-3xl flex flex-col gap-4 flex-1 p-6 w-full z-10'>
            <h1 className='absolute text-8xl top-0 right-0 font-bold p-5 text-gray-300 uppercase'>
                {index + 1}
            </h1>
            <InfoLabel label="Project Name" content={experience.company_project_name} />

            <div className='grid grid-cols-2 gap-4'>
                <InfoLabel label="Salesforce Cloud(s)" content="Sales Cloud, Service Cloud" />
                <InfoLabel label="Industry" content={experience.industry} />
            </div>

            <div className='grid grid-cols-2 gap-4'>
                <InfoLabel label="Start Date" content={experience.start_date || "N/A"} />
                <InfoLabel label="End Date" content={experience.end_date || "N/A"} />
            </div>

            <InfoLabel label="Work Experience Summary" content={experience.project_description || "N/A"} />
        </div >
    )
}

const DeveloperProfileExperience = ({ experience, loading }: any) => {
    console.log(experience)

    return (
        <div className='bg-gray-50 rounded-2xl w-full flex flex-col gap-6 p-6'>
            <span className='text-2xl uppercase font-bold inline-flex items-center gap-2'>
                <FileUser /> Experience Summary
            </span>
            {loading ? (
                <div className='flex flex-row gap-6 w-full flex-nowrap lg:flex-wrap overflow-x-scroll'>
                    <div className='animate-pulse w-1/2 flex-1 h-72 rounded-3xl bg-gray-200' />
                    <div className='animate-pulse w-1/2 flex-1 h-72 rounded-3xl bg-gray-200' />
                </div>
            ) : (
                <div className='flex flex-row gap-3 w-full flex-nowrap lg:flex-wrap overflow-x-scroll'>
                    {experience.map((item: any, index: any) => (
                        <WorkExperienceCard key={index} experience={item} index={index} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default DeveloperProfileExperience
