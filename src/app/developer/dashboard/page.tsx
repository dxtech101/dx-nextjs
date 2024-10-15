"use client"
import Certifications from '@/components/developer/onboarding/Certifications'
import Skills from '@/components/developer/onboarding/Skills'
import Stepper from '@/components/developer/onboarding/Stepper'
import WorkExperience from '@/components/developer/onboarding/WorkExperience'
import React from 'react'
import { useSelector } from 'react-redux'

const page = () => {
    const developerOnboarding = useSelector((state: any) => state.developerOnboarding)
    console.log("developerOnboarding::", developerOnboarding)
    return (
        <div className='h-full overflow-y-scroll gap-6'>
            {developerOnboarding[0].isActive && <Certifications />}
            {developerOnboarding[1].isActive && <Skills />}
            {developerOnboarding[2].isActive && <WorkExperience />}
        </div>
    )
}

export default page
