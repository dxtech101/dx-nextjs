import DeveloperProfileCertification from '@/components/developer/profile/DeveloperProfileCertification'
import DeveloperProfileDetails from '@/components/developer/profile/DeveloperProfileDetails'
import DeveloperProfileExperience from '@/components/developer/profile/DeveloperProfileExperience'
import DeveloperProfileIndustries from '@/components/developer/profile/DeveloperProfileIndustries'
import DeveloperProfileSkills from '@/components/developer/profile/DeveloperProfileSkills'
import DeveloperProfileTechnologies from '@/components/developer/profile/DeveloperProfileTechnologies'
import React from 'react'

const page = () => {
  return (
    <div className='flex flex-col items-start justify-center gap-6 p-6'>
      <DeveloperProfileDetails />
      <div className='w-full h-full flex flex-col lg:flex-row items-start justify-center gap-4'>
        <DeveloperProfileSkills />
        <DeveloperProfileTechnologies />
      </div>
      <DeveloperProfileIndustries />
      <DeveloperProfileCertification />
      <DeveloperProfileExperience />
    </div>
  )
}

export default page
