import DashboardStepper from '@/components/DashboardStepper';
import CompanyProjectModalLoader from '@/components/loaders/CompanyProjectModalLoader';
import { skillsDetails } from '@/constants/data';
import { removeProjectId } from '@/feature/reducers/companyCreateProject';
import { onBoardingHandlePrevious } from '@/feature/reducers/userOnboarding';
import { getAllSalesforceSkills } from '@/lib/service/portfolio.service';
import { getAllResourceRequest, getCertificationsRequirementByResourceRequest, getCompanyProjects, getSkillRequirementByResourceRequest } from '@/lib/service/projectResource.service';
import { ShieldCheck, Sparkle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ResourceRequestCard } from '../resourceRequest/ResourceMandatoryForm';
import { CompanyProjectCard } from '@/app/company/dashboard/projects/[project_id]/page';

const SkillItem = ({ name }: any) => {
    const [checkedItem, setCheckedItem] = useState<any>();

    useEffect(() => {
        setCheckedItem(skillsDetails.find((item: any) => item.text === name))
    }, [])

    if (checkedItem?.bgColor) {
        return (
            <div className={`inline-flex gap-2 items-center min-w-max whitespace-nowrap ${checkedItem.bgColor} border ${checkedItem.borderColor} p-2 px-4 rounded-full relative z-10`}>
                <img className='w-auto h-6' src={checkedItem.imageSrc} alt={name} />
                <span className={`font-bold ${checkedItem.textColor}`}>
                    {name}
                </span>
            </div>
        );
    }
};

const DetailedView = ({ loading, setLoading, setOpenModal }: any) => {
    const dispatch = useDispatch();
    const accountSfid = useSelector((state: any) => state.userSalesforceID)
    const [projects, setProjects] = useState<any>([]);
    const [resources, setResources] = useState<any>([]);
    const [skills, setSkills] = useState<any>([]);
    const projectId = useSelector((state: any) => state.companyCreateProject);
    const [skillsMap, setSkillsMap] = useState<{ [key: string]: any[] }>({});
    const [loadingSkills, setLoadingSkills] = useState<{ [key: string]: boolean }>({});
    const [certificationsMap, setCertificationsMap] = useState<{ [key: string]: any[] }>({});
    const [loadingCertifications, setLoadingCertifications] = useState<{ [key: string]: boolean }>({});

    const fetchSkillsForResource = async (resourceId: string) => {
        try {
            setLoadingSkills((prev) => ({ ...prev, [resourceId]: true }));
            const { results: skills } = await getSkillRequirementByResourceRequest(resourceId);
            setSkillsMap((prev) => ({ ...prev, [resourceId]: skills }));
        } catch (error) {
            console.error(`Error fetching skills for resource ${resourceId}:`, error);
        } finally {
            setLoadingSkills((prev) => ({ ...prev, [resourceId]: false }));
        }
    };

    const fetchCertificationsForResource = async (resourceId: string) => {
        try {
            setLoadingCertifications((prev) => ({ ...prev, [resourceId]: true }));
            const { results: certifications } = await getCertificationsRequirementByResourceRequest(resourceId);
            setCertificationsMap((prev) => ({ ...prev, [resourceId]: certifications }));
        } catch (error) {
            console.error(`Error fetching certifications for resource ${resourceId}:`, error);
        } finally {
            setLoadingCertifications((prev) => ({ ...prev, [resourceId]: false }));
        }
    };

    useEffect(() => {
        resources.forEach((resource: any) => {
            if (!skillsMap[resource.sfid]) {
                fetchSkillsForResource(resource.sfid);
            }
            if (!certificationsMap[resource.sfid]) {
                console.log("resource.sfid::", resource.sfid);

                fetchCertificationsForResource(resource.sfid);
            }
        });
    }, [resources]);

    const getCompanyProjectsData = async () => {
        try {
            setLoading(true);
            const { results: contactProjects } = await getCompanyProjects(accountSfid);
            const filteredProject = contactProjects.filter((project: any) => project.id == projectId);
            setProjects(filteredProject);
        } catch (error) {
            console.error("Error fetching certifications:", error);
        } finally {
            setLoading(false);
        }
    }

    console.log("Project", projectId);

    const getCompanyResourcesData = async () => {
        try {
            setLoading(true);
            const { results: contactProjects } = await getAllResourceRequest();
            console.log("contactProjects", contactProjects);
            
            const filteredResourceRequests = contactProjects.filter((resource: any) => resource?.project?.id == projectId);
            setResources(filteredResourceRequests);
        } catch (error) {
            console.error("Error fetching certifications:", error);
        } finally {
            setLoading(false);
        }
    }

    const getSkillsDetails = async () => {
        try {
            setLoading(true);
            const { results: allSkills } = await getAllSalesforceSkills();
            setSkills(allSkills);
        } catch (error) {
            console.error("Error fetching certifications:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getCompanyResourcesData();
        getCompanyProjectsData();
        getSkillsDetails()
    }, [])


    const handlePrevious = async () => {
        dispatch(onBoardingHandlePrevious({ role: "company", stepperId: 3 }))
    }

    console.log("ResourseDataLoader", resources);
    
    return (
        <>
            {loading ? <>
                <CompanyProjectModalLoader />
            </> : <>
                <div className='w-full sticky -top-6 z-20 p-2 md:p-4 border-b bg-white flex flex-col xl:flex-row justify-between gap-4 items-end xl:items-center'>
                    <DashboardStepper role={"company"} company_developer={false} />
                    <div className='flex items-center gap-3'>
                        <button
                            type='button'
                            onClick={handlePrevious}
                            className='bg-gray-200 text-bold text-white font-bold h-12 px-6 rounded-xl'
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => {
                                dispatch(removeProjectId())
                                setOpenModal(false)
                            }}
                            type='button'
                            className='bg-blue-500 text-bold text-white font-bold h-12 px-6 rounded-xl'
                        >
                            Create Project
                        </button>
                    </div>
                </div>
                <div className='flex justify-between gap-6 w-full py-4'>
                    {projects?.map((project: any, index: any) => (
                        <CompanyProjectCard
                            index={index}
                            project={project}
                        />
                    ))}
                </div>
                <span className='text-xl font-bold'>
                    Resource Requests
                </span>
                <div className='flex flex-col justify-between gap-6 w-full py-4'>
                    {resources.map((resource: any, index: any) => {
                        const skills = skillsMap[resource.sfid] || [];

                        const certifications = certificationsMap[resource.sfid] || [];

                        return (
                            <div className='flex flex-row gap-4 items-start border-b p-4 w-full'>
                                <span className='text-4xl font-extrabold text-gray-600'>
                                    {index + 1}
                                </span>
                                <div className='w-full flex flex-col gap-6'>
                                    <ResourceRequestCard resource={resource} />
                                    <div className='grid grid-cols-2 justify-between items-start gap-4 w-full pb-6'>
                                        <div className='flex flex-col w-fit gap-4'>
                                            <span className='inline-flex gap-2 items-center'>
                                                <Sparkle /> <h2 className='text-sm uppercase font-semibold flex-1'>Skills</h2>
                                            </span>
                                            <div className='flex flex-row flex-wrap gap-2 w-fit items-center'>
                                                {loadingSkills[resource.sfid] ? (
                                                    <span>Loading skills...</span>
                                                ) : skills.length > 0 ? (
                                                    skills.slice(0, 5).map((item: any, idx: number) => (
                                                        <SkillItem key={idx} name={item.name} />
                                                    ))
                                                ) : (
                                                    <span>No skills found</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </>
            }
        </>
    )
}

export default DetailedView
