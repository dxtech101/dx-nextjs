"use client"
import React from 'react'

const DeveloperProfileCardHeader = ({ headerTitle, headerContent, headerIcon }: any) => {
    return (
        <div className='flex flex-row justify-between gap-4 items-center'>
            <span className='text-base lg:text-2xl font-bold inline-flex items-center gap-2'>
                {headerIcon} {headerTitle}
            </span>
            {headerContent}
        </div>
    )
}

export default DeveloperProfileCardHeader
