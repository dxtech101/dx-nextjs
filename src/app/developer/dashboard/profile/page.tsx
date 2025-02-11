"use client"
import DeveloperProfileCertification from '@/components/developer/profile/DeveloperProfileCertification'
import DeveloperProfileDetails from '@/components/developer/profile/DeveloperProfileDetails'
import DeveloperProfileExperience from '@/components/developer/profile/DeveloperProfileExperience'
import DeveloperProfileSkills from '@/components/developer/profile/DeveloperProfileSkills'
import { getUserPortfolio } from '@/lib/service/portfolio.service'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const page = () => {
  const [loading, setLoading] = useState(true);
  const [skills, setSkills] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [workExperience, setWorkExperience] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [technologies, setTechnologies] = useState([]);
  const contactSfid = useSelector((state: any) => state.userSalesforceID)

  const getUserPortoflioDetails = async () => {
    try {
      setLoading(true);
      const { results } = await getUserPortfolio(contactSfid);
      setSkills(results.skills);
      setCertifications(results.certifications);
      setWorkExperience(results.work_experience);
    } catch (error) {
      console.error("Error fetching certifications:", error);
    }
    finally {
      setLoading(false);
    }
  }



  useEffect(() => {
    getUserPortoflioDetails()
  }, [])

  return (
    <div className='bg-white border border-gray-300 rounded-3xl flex flex-col items-start justify-center gap-6 p-6'>
      <DeveloperProfileDetails />
      <div className='w-full h-full flex flex-col lg:flex-row items-start justify-center gap-4'>
        <DeveloperProfileSkills loading={loading} skills={skills} updateDetails={getUserPortoflioDetails} />
        {/* <DeveloperProfileTechnologies loading={loading} technologies={technologies} /> */}
      </div>
      {/* <DeveloperProfileIndustries loading={loading} industries={industries}/> */}
      <DeveloperProfileCertification loading={loading} certification={certifications} updateDetails={getUserPortoflioDetails} />
      <DeveloperProfileExperience loading={loading} experience={workExperience} updateDetails={getUserPortoflioDetails} />
    </div>
  )
}

export default page
