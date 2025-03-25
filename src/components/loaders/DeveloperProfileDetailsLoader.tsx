import React from 'react'

const DeveloperProfileDetailsLoader = () => {
    return (
        <div className="w-full flex flex-col gap-6 justify-between h-full animate-pulse">
            {/* Name & Job Title Skeleton */}
            <div className="flex flex-col gap-2">
                <div className="h-8 w-48 bg-gray-300 rounded-md"></div>
                <div className="flex flex-wrap gap-2">
                    <div className="h-6 w-32 bg-purple-200 rounded-full"></div>
                    <div className="h-6 w-32 bg-amber-200 rounded-full"></div>
                    <div className="h-6 w-40 bg-blue-200 rounded-full"></div>
                </div>
            </div>

            {/* Profile Details Skeleton */}
            <div className="grid grid-cols-2 lg:grid-cols-4 w-full gap-2 lg:gap-4 items-start justify-between">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="flex flex-col gap-1">
                        <div className="h-4 w-28 bg-gray-300 rounded-md"></div>
                        <div className="h-4 w-32 bg-gray-200 rounded-md"></div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DeveloperProfileDetailsLoader
