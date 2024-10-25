"use client"
import React, { useState } from 'react'
import { CertificationComponent } from '../onboarding/Certifications'

const DeveloperProfileCertification = () => {
    const certifications = [
        { id: 'administrator', src: '/Administrator.png' },
        { id: 'advanced-administrator', src: '/Advanced-Administrator.png' },
        { id: 'platform-app-builder', src: '/Platform-App-Builder.png' },
        { id: 'javascript-developer-i', src: '/JavaScript-Developer-I.png' },
        { id: 'platform-developer-i', src: '/Platform-Developer-I.png' },
        { id: 'platform-developer-ii', src: '/Platform-Developer-II.png' },
        { id: 'industries-cpq-developer', src: '/Industries-CPQ-Developer.png' },
        { id: 'b2c-commerce-developer', src: '/B2C-Commerce-Developer.png' },
        { id: 'platform-developer-i', src: '/Platform-Developer-I.png' },
        { id: 'platform-developer-ii', src: '/Platform-Developer-II.png' },
        { id: 'industries-cpq-developer', src: '/Industries-CPQ-Developer.png' },
        { id: 'b2c-commerce-developer', src: '/B2C-Commerce-Developer.png' },

    ];

    const [visibleCount, setVisibleCount] = useState(6);
    const [showAll, setShowAll] = useState(false);

    const handleShowMore = () => {
        setShowAll(!showAll);
        setVisibleCount(showAll ? 6 : certifications.length);
    };
    return (
        <div className='bg-gray-50 rounded-2xl w-full p-4 lg:p-6'>
            <span className='text-2xl font-bold'>
                Salesforce Certifications
            </span>
            <div className='flex flex-row gap-6 py-6 flex-wrap '>
                {certifications.slice(0, visibleCount).map((cert) => (
                    <CertificationComponent key={cert.id} id={cert.id} src={cert.src} />
                ))}
                {certifications.length > 6 && (
                    <button onClick={handleShowMore} className='btn-show-more'>
                        {showAll ? 'Show Less' : 'Show More'}
                    </button>
                )}
            </div>
        </div>
    )
}

export default DeveloperProfileCertification
