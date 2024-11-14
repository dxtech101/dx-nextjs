"use client"
import Certifications from '@/components/developer/onboarding/Certifications'
import Skills from '@/components/developer/onboarding/Skills'
import Stepper from '@/components/developer/onboarding/Stepper'
import TimePreference from '@/components/developer/onboarding/TimePreference'
import WorkExperience from '@/components/developer/onboarding/WorkExperience'
import JobListing from '@/components/developer/portal/JobListing'
import { AuroraBackground } from '@/components/ui/aurora-background'
import { motion } from 'framer-motion'
import React from 'react'
import { useSelector } from 'react-redux'

const page = () => {
    const developerOnboarding = useSelector((state: any) => state.developerOnboarding)
    console.log("developerOnboarding::", developerOnboarding)
    const isDeveloperOnboarded = false;
    return (
        <div className='h-full overflow-y-scroll gap-6'>
            {/* {!isDeveloperOnboarded && (
                <>
                    {developerOnboarding[0].isActive && <Certifications />}
                    {developerOnboarding[1].isActive && <Skills />}
                    {developerOnboarding[2].isActive && <WorkExperience />}
                </>
            )} */}
            <AuroraBackground>
                <motion.div
                    initial={{ opacity: 0.0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.3,
                        duration: 0.8,
                        ease: "easeInOut",
                    }}
                    className="relative flex flex-col gap-4 items-center justify-center px-4"
                >
                    <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
                        Background lights are cool you know.
                    </div>
                    <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
                        And this, is chemical burn.
                    </div>
                    <button className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2">
                        Debug now
                    </button>
                </motion.div>
            </AuroraBackground>
        </div>
    )
}

export default page
