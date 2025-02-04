import React from 'react'
import Image from "next/image";

const AssessmentLoader = () => {
    return (
        <div className="w-full h-screen flex flex-col justify-center items-center">
            <span className='flex flex-col gap-4 items-center'>
                <Image src="/uploadIcon.jpg" alt="assessment-loader" width={200} height={200} />
                <div className="text-2xl font-medium">We{"'"}re preparing your Assessment</div>
                <div className="text-gray-500 text-sm">
                    This may take upto a minute. Please dont refresh the page or close the window.
                </div>
            </span>

        </div>
    )
}

export default AssessmentLoader
