"use client"
import DeveloperProfileCertification from '@/components/developer/profile/DeveloperProfileCertification'
import DeveloperProfileDetails from '@/components/developer/profile/DeveloperProfileDetails'
import DeveloperProfileExperience from '@/components/developer/profile/DeveloperProfileExperience'
import DeveloperProfileSkills from '@/components/developer/profile/DeveloperProfileSkills'
import DeveloperProfileVideoSummary from '@/components/developer/profile/DeveloperProfileVideoSummary'
import { getAllSalesforceCertifications, getAllSalesforceSkills, getUserPortfolio } from '@/lib/service/portfolio.service'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'


const page = () => {
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState<any>({
    skills: [],
    certifications: [],
    workExperience: [],
    personalDetails: [],
  });
  const contactSfid = useSelector((state: any) => state.userSalesforceID)

  const getUserPortoflioDetails = async () => {
    if (!contactSfid) return;

    try {
      setLoading(true);
      const { results } = await getUserPortfolio(contactSfid);
      const { results: allSalesforceCertifications } = await getAllSalesforceCertifications();
      const { results: allSkills } = await getAllSalesforceSkills();

      setProfileData({
        skills: allSkills.filter((item: any) => results.skills.some((skill: any) => skill.skill_name === item.name))
          .map((item: any) => {
            const matchedSkill = results.skills.find((skill: any) => skill.skill_name === item.name);
            return {
              url: item?.url,
              ...matchedSkill
            };
          }),
        certifications: allSalesforceCertifications.filter((item: any) => results.certifications.map((cert: any) => cert.certification_id).includes(item.sfid)),
        workExperience: results.work_experience,
        personalDetails: results.personal_details,
      })

    } catch (error) {
      console.error("Error fetching portfolio details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (contactSfid) {
      getUserPortoflioDetails();
    }
  }, [contactSfid]);


  return (
    <div className='bg-white border border-gray-300 rounded-3xl flex flex-col items-start justify-center gap-6 p-6'>
      <DeveloperProfileDetails loading={loading} personalDetails={profileData?.personalDetails} certificationCount={profileData?.certifications?.length} updateDetails={getUserPortoflioDetails} />
      <DeveloperProfileVideoSummary />
      {/* <DeveloperProfileAISummary /> */}
      <div className='w-full h-full flex flex-col lg:flex-row items-start justify-center gap-4'>
        <DeveloperProfileSkills loading={loading} skills={profileData?.skills} updateDetails={getUserPortoflioDetails} />
        {/* <DeveloperProfileTechnologies loading={loading} technologies={technologies} /> */}
      </div>
      {/* <DeveloperProfileIndustries loading={loading} industries={industries}/> */}
      <DeveloperProfileCertification loading={loading} certification={profileData?.certifications} updateDetails={getUserPortoflioDetails} />
      <DeveloperProfileExperience loading={loading} experience={profileData?.workExperience} updateDetails={getUserPortoflioDetails} />
    </div>
  )
}

export default page
