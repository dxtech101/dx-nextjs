"use client"
import Certifications from '@/components/developer/onboarding/Certifications'
import Skills from '@/components/developer/onboarding/Skills'
import Stepper from '@/components/developer/onboarding/Stepper'
import TimePreference from '@/components/developer/onboarding/TimePreference'
import WorkExperience from '@/components/developer/onboarding/WorkExperience'
import React from 'react'
import { useSelector } from 'react-redux'

const page = () => {
    const developerOnboarding = useSelector((state: any) => state.developerOnboarding)
    console.log("developerOnboarding::", developerOnboarding)
    const isDeveloperOnboarded = false;
    return (
        <div className='h-full overflow-y-scroll gap-6'>
            {!isDeveloperOnboarded && (
                <>
                    {developerOnboarding[0].isActive && <Certifications />}
                    {developerOnboarding[1].isActive && <Skills />}
                    {developerOnboarding[2].isActive && <WorkExperience />}
                </>
            )}
            {/* <TimePreference /> */}
        </div>
    )
}

export default page
