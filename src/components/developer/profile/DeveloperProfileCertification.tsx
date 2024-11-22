"use client"
import { ShieldCheck } from 'lucide-react';
import React, { useState } from 'react'

const CertificationComponent = ({
    src,
    name,
    onSelectCertification
}: any) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        const updatedChecked = !isChecked;
        setIsChecked(updatedChecked);
        onSelectCertification(name, updatedChecked);
    };

    return (
        <div className='flex flex-col border-r border-r-gray-200 pr-4 cursor-pointer'>
            {onSelectCertification && (
                <input
                    id={name}
                    type='checkbox'
                    className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-full'
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                />
            )}
            <label htmlFor={name} className='cursor-pointer flex flex-col items-center gap-2'>
                <img className='w-24' src={'/' + name.split(' ').join('-') + '.png'} alt={name} />
                <span className='capitalize text-sm font-bold text-center text-gray-600 max-w-[12rem]'>
                    {name.replace(/salesforce/i, '')}
                </span>
            </label>
        </div >
    )
}

const DeveloperProfileCertification = ({ certification, loading }: any) => {
    const [visibleCount, setVisibleCount] = useState(6);
    const [showAll, setShowAll] = useState(false);

    const handleShowMore = () => {
        setShowAll(!showAll);
        setVisibleCount(showAll ? 6 : certification.length);
    };
    return (
        <div className='bg-gray-50 rounded-2xl w-full p-4 lg:p-6'>
            <span className='text-2xl font-bold inline-flex items-center gap-2'>
                <ShieldCheck /> Salesforce Certifications
            </span>
            <div className='flex flex-row gap-6 py-6 flex-wrap justify-start'>
                {loading ?
                    <div className='flex flex-row gap-4 w-full flex-nowrap'>
                        <div className='animate-pulse w-1/6 h-36 rounded-3xl bg-gray-200' />
                        <div className='animate-pulse w-1/6 h-36 rounded-3xl bg-gray-200' />
                        <div className='animate-pulse w-1/6 h-36 rounded-3xl bg-gray-200' />
                    </div> :
                    <>
                        {certification.slice(0, visibleCount).map((cert: any, index: any) => (
                            <CertificationComponent key={index} name={cert.certification_name} src={cert.src} />
                        ))}
                        {certification.length > 6 && (
                            <button onClick={handleShowMore} className='text-blue-700 font-bold'>
                                {showAll ? 'Show Less' : 'Show More' }
                            </button>
                        )}
                    </>}
            </div>
        </div>
    )
}

export default DeveloperProfileCertification
