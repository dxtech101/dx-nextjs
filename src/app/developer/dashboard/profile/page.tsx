"use client"
import DeveloperProfileAISummary from '@/components/developer/profile/DeveloperProfileAISummary'
import DeveloperProfileCertification from '@/components/developer/profile/DeveloperProfileCertification'
import DeveloperProfileDetails from '@/components/developer/profile/DeveloperProfileDetails'
import DeveloperProfileExperience from '@/components/developer/profile/DeveloperProfileExperience'
import DeveloperProfileSkills from '@/components/developer/profile/DeveloperProfileSkills'
import DeveloperProfileVideoSummary from '@/components/developer/profile/DeveloperProfileVideoSummary'
import { getAllSalesforceCertifications, getUserPortfolio } from '@/lib/service/portfolio.service'
import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'


const page = () => {
  const [loading, setLoading] = useState(true);
  const [profileData ,setProfileData] = useState<any>({
    skills: [],
    certifications: [],
    workExperience: [],
    personalDetails: [],
  });
  const [skills, setSkills] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [workExperience, setWorkExperience] = useState([]);
  const [checkedCertificates, setCheckedCertificates] = useState([]);
  const [personalDetails, setPersonalDetails] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [technologies, setTechnologies] = useState([]);
  const contactSfid = useSelector((state: any) => state.userSalesforceID)

  const getUserPortoflioDetails = useCallback(async () => {
    if (!contactSfid) return;

    try {
      setLoading(true);
      const { results } = await getUserPortfolio(contactSfid);
      setProfileData({
        skills: results.skills,
        certifications: results.certifications,
        workExperience: results.work_experience,
        personalDetails: results.personal_details,
      })
      // Fetch certifications inside the same function
      const { results: allCertifications } = await getAllSalesforceCertifications();
      const assignedCertificationIds = results.certifications.map((cert: any) => cert.certification_id);

      setCheckedCertificates(
        allCertifications
          .filter((item: any) => assignedCertificationIds.includes(item.sfid))
          .map((item: any) => {
            const assignedCert: any = results.certifications.find((cert: any) => cert.certification_id === item.sfid);
            return { ...item, id: assignedCert?.id };
          })
      );

    } catch (error) {
      console.error("Error fetching portfolio details:", error);
    } finally {
      setLoading(false);
    }
  }, [contactSfid]);

  useEffect(() => {
    getUserPortoflioDetails();
  }, [getUserPortoflioDetails]);

  return (
    <div className='bg-white border border-gray-300 rounded-3xl flex flex-col items-start justify-center gap-6 p-6'>
      <DeveloperProfileDetails personalDetails={profileData?.personalDetails} updateDetails={getUserPortoflioDetails} />
      <DeveloperProfileVideoSummary />
      <DeveloperProfileAISummary />
      <div className='w-full h-full flex flex-col lg:flex-row items-start justify-center gap-4'>
        <DeveloperProfileSkills loading={loading} skills={profileData?.skills} updateDetails={getUserPortoflioDetails} />
        {/* <DeveloperProfileTechnologies loading={loading} technologies={technologies} /> */}
      </div>
      {/* <DeveloperProfileIndustries loading={loading} industries={industries}/> */}
      <DeveloperProfileCertification loading={loading} certification={checkedCertificates} updateDetails={getUserPortoflioDetails} />
      <DeveloperProfileExperience loading={loading} experience={profileData?.workExperience} updateDetails={getUserPortoflioDetails} />

    </div>
  )
}

export default page
