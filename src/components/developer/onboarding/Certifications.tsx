"use client"
import InputField from '@/components/InputField'
import { onBoardingHandleNext } from '@/feature/reducers/developerOnboarding'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

export const CertificationComponent = ({
    src,
    id,
    onSelectCertification
}: any) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        const updatedChecked = !isChecked;
        setIsChecked(updatedChecked);
        onSelectCertification(id, updatedChecked);
    };

    return (
        <div className='flex flex-col border-r border-r-gray-200 pr-4 cursor-pointer'>
            <label htmlFor={id} className='cursor-pointer'>
                <img className='w-24' src={src} alt='' />
            </label>
            {onSelectCertification && (
                <input
                    id={id}
                    type='checkbox'
                    className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-full'
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                />
            )}
        </div>
    )
}

const Certifications = () => {
    const dispatch = useDispatch();
    const [selectedCertifications, setSelectedCertifications] = useState<string[]>([]);

    const handleNext = () => {
        console.log('Selected Certifications:', selectedCertifications);
        dispatch(onBoardingHandleNext({ stepperId: 1 }))
    }

    const handleSelectCertification = (certification: string, isChecked: boolean) => {
        if (isChecked) {
            setSelectedCertifications(prev => [...prev, certification]);
        } else {
            setSelectedCertifications(prev => prev.filter(cert => cert !== certification));
        }
    };

    return (
        <>
            <div className='rounded-2xl w-full h-full relative px-5 lg:px-10'>
                <div className='w-full bg-white border-b border-gray-200 sticky top-0 left-0 py-6 flex flex-col gap-6 lg:flex-row justify-between items-start lg:items-center'>
                    <span>
                        <h1 className='text-start text-2xl lg:text-3xl font-bold text-black'>
                            Certification Details
                        </h1>
                        <p className='pt-2 text-gray-400 text-sm'>
                            Select Salesforce Certifications that you hold
                        </p>
                    </span>
                    <div className='flex flex-row gap-2 justify-center items-end lg:items-center'>
                        <InputField placeHolder="Search Skills" iconName="search" className="w-full lg:w-80" />
                        <button
                            onClick={() => handleNext()}
                            className='bg-blue-500 text-bold text-white font-bold h-12 px-4 rounded-xl whitespace-nowrap'>
                            Save & Next
                        </button>
                    </div>
                </div>
                <div className='py-6'>
                    <h3 className=''>Salesforce Administrator</h3>
                    <div className='flex flex-row gap-6 py-6'>
                        <CertificationComponent id="adminstrator" src="/Administrator.png" onSelectCertification={handleSelectCertification} />
                        <CertificationComponent id="advanvanced-administrator" src="/Advanced-Administrator.png" onSelectCertification={handleSelectCertification} />
                        <CertificationComponent id="platform-app-builder" src="/Platform-App-Builder.png" onSelectCertification={handleSelectCertification} />
                    </div>
                </div>
                <div className='pb-6'>
                    <h3 className=''>Salesforce Developer</h3>
                    <div className='flex flex-row flex-wrap gap-6 py-6'>
                        <CertificationComponent id="javascript-developer-i" src="/JavaScript-Developer-I.png" onSelectCertification={handleSelectCertification} />
                        <CertificationComponent id="platform-developer-i" src="/Platform-Developer-I.png" onSelectCertification={handleSelectCertification} />
                        <CertificationComponent id="platform-developer-ii" src="/Platform-Developer-II.png" onSelectCertification={handleSelectCertification} />
                        <CertificationComponent id="industries-cpq-developer" src="/Industries-CPQ-Developer.png" onSelectCertification={handleSelectCertification} />
                        <CertificationComponent id="b2c-commerce-developer" src="/B2C-Commerce-Developer.png" onSelectCertification={handleSelectCertification} />
                    </div>
                </div>
                <div className='pb-6'>
                    <h3 className=''>Salesforce Architect</h3>
                    <div className='flex flex-row flex-wrap gap-6 py-6'>
                        <CertificationComponent id="application-architect" src="/Application-Architect.png" onSelectCertification={handleSelectCertification} />
                        <CertificationComponent id="system-architect" src="/System-Architect.png" onSelectCertification={handleSelectCertification} />
                        <CertificationComponent id="technical-architect" src="/Technical-Architect.png" onSelectCertification={handleSelectCertification} />
                        <CertificationComponent id="b2c-solution-architect" src="/B2C-Solution-Architect.png" onSelectCertification={handleSelectCertification} />
                        <CertificationComponent id="heroku-architect" src="/Heroku-Architect.png" onSelectCertification={handleSelectCertification} />
                        <CertificationComponent id="data-architect" src="/Data-Architect.png" onSelectCertification={handleSelectCertification} />
                        <CertificationComponent id="integration-architect" src="/Integration-Architect.png" onSelectCertification={handleSelectCertification} />
                        <CertificationComponent id="sharing-and-visibility-architect" src="/Sharing-and-Visibility-Architect.png" onSelectCertification={handleSelectCertification} />
                        <CertificationComponent id="id-and-access-mgmt-architect" src="/ID-and-Access-Mgmt-Architect.png" onSelectCertification={handleSelectCertification} />
                        <CertificationComponent id="dev-lifecycle-and-deploy-architect" src="/Dev-Lifecycle-and-Deploy-Architect.png" onSelectCertification={handleSelectCertification} />
                    </div>
                </div>
                <div className='pb-6'>
                    <h3 className=''>Salesforce Consultant</h3>
                    <div className='flex flex-row flex-wrap gap-6 py-6'>
                        <CertificationComponent id="sales-cloud-consultant" src="/Sales-Cloud-Consultant.png" onSelectCertification={handleSelectCertification} />
                        <CertificationComponent id="service-cloud-consultant" src="/Service-Cloud-Consultant.png" onSelectCertification={handleSelectCertification} />
                        <CertificationComponent id="marketing-cloud-consultant" src="/Marketing-Cloud-Consultant.png" onSelectCertification={handleSelectCertification} />
                        <CertificationComponent id="experience-cloud-consultant" src="/Experience-Cloud-Consultant.png" onSelectCertification={handleSelectCertification} />
                        <CertificationComponent id="education-cloud-consultant" src="/Education-Cloud-Consultant.png" onSelectCertification={handleSelectCertification} />
                        <CertificationComponent id="field-service-consultant" src="/Field-Service-Consultant.png" onSelectCertification={handleSelectCertification} />
                        <CertificationComponent id="nonprofit-cloud-consultant" src="/Nonprofit-Cloud-Consultant.png" onSelectCertification={handleSelectCertification} />
                        <CertificationComponent id="omnistudio-consultant" src="/OmniStudio-Consultant.png" onSelectCertification={handleSelectCertification} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Certifications;
