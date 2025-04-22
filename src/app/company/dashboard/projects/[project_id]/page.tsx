"use client";
import { ResourceRequestCard } from '@/components/company/resourceRequest/ResourceMandatoryForm';
import { skillsDetails } from '@/constants/data';
import { InfoLabel } from '@/lib/helper';
import { getAllResourceRequest, getProject, getSkillRequirementByResourceRequest } from '@/lib/service/projectResource.service';
import { ArrowLeft, Briefcase, Pencil, Sparkle } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const CompanyProjectCard = (props: any) => {
    const { project } = props;

    return (
        <div className='relative bg-gray-200 rounded-3xl flex flex-col gap-4 flex-1 p-6 w-full z-10'>
            <Briefcase className={`absolute bottom-10 right-10  h-24 w-24  z-0 text-gray-300`} />
            <div className='grid grid-cols-3 gap-4'>
                <InfoLabel label="Industry" content={project?.industry} />
                <InfoLabel label="Start Date" content={project?.start_date || "N/A"} />
                <InfoLabel label="Project Duration" content={project.project_duration?.split(".")[0] || "N/A"} />
            </div>
            <InfoLabel label="Project Summary" content={project?.description || "N/A"} />
        </div >
    )
}

const SkillItem = ({ name, imageSrc }: any) => {
    const [checkedItem, setCheckedItem] = useState<any>();

    useEffect(() => {
        setCheckedItem(skillsDetails.find((item: any) => item.text === name))
    }, [])

    if (checkedItem?.bgColor) {
        return (
            <div className={`inline-flex gap-2 items-center min-w-max whitespace-nowrap ${checkedItem.bgColor} border ${checkedItem.borderColor} p-2 px-4 rounded-full relative z-10`}>
                <img className='w-auto h-6' src={imageSrc} alt={name} />
                <span className={`font-bold ${checkedItem.textColor}`}>
                    {name}
                </span>
            </div>
        );
    }
};

const page = ({ params }: any) => {
    const projectID = params.project_id

    const [projects, setProjects] = useState<any>([]);
    const [resources, setResources] = useState<any>([]);
    const [skills, setSkills] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const [skillsMap, setSkillsMap] = useState<{ [key: string]: any[] }>({});
    const [loadingSkills, setLoadingSkills] = useState<{ [key: string]: boolean }>({});

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

    useEffect(() => {
        resources.forEach((resource: any) => {
            if (!skillsMap[resource.sfid]) {
                fetchSkillsForResource(resource.sfid);
            }
        });
    }, [resources]);

    const getProjectsData = async () => {
        try {
            setLoading(true);
            const { results: projects } = await getProject(projectID);
            setProjects(projects);
        } catch (error) {
            console.error("Error fetching certifications:", error);
        } finally {
            setLoading(false);
        }
    }

    const getCompanyResourcesData = async () => {
        try {
            setLoading(true);
            const { results: contactResources } = await getAllResourceRequest();
            const filteredResourceRequests = contactResources.filter((resource: any) => resource?.project?.id == projectID);
            setResources(filteredResourceRequests);
        } catch (error) {
            console.error("Error fetching certifications:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getCompanyResourcesData();
        getProjectsData();
    }, [])

    console.log("skillsMap::", skillsMap);
    console.log("skills::", skills);
    console.log("projects::", projects);
    console.log("Resoources::", resources);

    return (
        <div>
            {loading ? <>
                <div className='flex flex-col gap-6 w-full'>
                    <div className='h-48 w-full rounded-2xl bg-gray-300 animate-pulse' />
                    <div className='h-10 w-3/12 rounded-full bg-gray-300 animate-pulse' />
                    <div className='flex flex-row gap-8 w-full'>
                        <div className='h-12 w-12 rounded-full bg-gray-300 animate-pulse' />
                        <div className='flex flex-col gap-6 w-full'>
                            <div className='h-40 w-full rounded-2xl bg-gray-300 animate-pulse' />
                            <div className='flex flex-row gap-4 w-full'>
                                <div className='h-10 w-1/6 rounded-full bg-gray-300 animate-pulse' />
                                <div className='h-10 w-1/6 rounded-full bg-gray-300 animate-pulse' />
                                <div className='h-10 w-1/6 rounded-full bg-gray-300 animate-pulse' />
                            </div>
                        </div>
                    </div>
                </div>
            </> : <>
                <div className='w-full flex flex-row justify-between items-center gap-6 py-4'>
                    <h1 className="font-heading tracking-tight text-4xl md:text-5xl font-medium mb-4">
                        {projects?.project_name}
                    </h1>
                    <div className='flex flex-row gap-4'>
                        <Link href={`/company/dashboard/projects`} className='inline-flex gap-2 items-center bg-blue-500 text-white rounded-xl px-3 py-3'>
                            <ArrowLeft className='w-4 h-4' />
                            Back to Projects
                        </Link>
                        <button className='inline-flex gap-2 items-center bg-blue-500 text-white rounded-xl px-3 py-3'>
                            <Pencil className='w-4 h-4' />
                            Edit Project
                        </button>
                    </div>
                </div>
                <div className='flex justify-between gap-6 w-full py-4'>
                    {projects &&
                        <CompanyProjectCard
                            project={projects}
                        />
                    }
                </div>
                <span className='text-xl font-bold'>
                    Resource Requests
                </span>
                <div className='flex flex-col justify-between gap-6 w-full py-4'>
                    {resources.map((resource: any, index: any) => {
                        const skills = skillsMap[resource.sfid] || [];

                        return (
                            <div className='flex flex-row gap-4 items-start border-b p-4 w-full'>
                                <span className='text-4xl font-extrabold text-gray-600'>
                                    {index + 1}
                                </span>
                                <div className='w-full flex flex-col gap-6'>
                                    <ResourceRequestCard resource={resource} />
                                    <div className='grid grid-cols-2 justify-between items-start gap-4 w-full pb-6'>
                                        <div className='flex flex-row w-fit gap-4'>
                                            <span className='inline-flex gap-2 items-center'>
                                                <Sparkle /> <h2 className='text-sm uppercase font-semibold flex-1'>Skills</h2>
                                            </span>
                                            <div className='flex flex-row flex-wrap gap-2 w-fit items-center'>
                                                {loadingSkills[resource.sfid] ? (
                                                    <span>Loading skills...</span>
                                                ) : skills.length > 0 ? (
                                                    skills.slice(0, 5).map((item: any, idx: number) => (
                                                        <SkillItem key={idx} name={item.name} imageSrc={item.skill.url} />
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
            </>}
        </div>
    )
}

export default page
