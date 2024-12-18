"use client";
import DetailedView from '@/components/company/detailedView/DetailedView';
import { CompanyProjectCard } from '@/components/company/project/CreateProjectForm';
import { ResourceRequestCard } from '@/components/company/resourceRequest/ResourceMandatoryForm';
import { skillsDetails } from '@/constants/data';
import { getAllSalesforceSkills } from '@/lib/service/portfolio.service';
import { getSkillRequirementByResourceRequest, getCertificationsRequirementByResourceRequest, getCompanyProjects, getAllResourceRequest } from '@/lib/service/projectResource.service';
import { ArrowLeft, Pencil, Sparkle } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

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

const page = ({ params }: any) => {
    const projectID = params.project_sfid

    const dispatch = useDispatch();
    const accountSfid = useSelector((state: any) => state.userSalesforceID)
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

    const getCompanyProjectsData = async () => {
        try {
            setLoading(true);
            const { results: contactProjects } = await getCompanyProjects(accountSfid);
            const filteredProject = contactProjects.filter((project: any) => project.sfid === projectID);
            setProjects(filteredProject);
        } catch (error) {
            console.error("Error fetching certifications:", error);
        } finally {
            setLoading(false);
        }
    }

    const getCompanyResourcesData = async () => {
        try {
            setLoading(true);
            const { results: contactProjects } = await getAllResourceRequest();
            const filteredResourceRequests = contactProjects.filter((resource: any) => {
                if (resource.project && resource.project.sfid) {
                    return resource.project.sfid === projectID;
                } else {
                    console.warn("Invalid resource project:", resource);
                    return false;
                }
            });
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

    console.log("skillsMap::", skillsMap);
    console.log("skills::", skills);
    console.log("projects::", projects);

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
                        Project Details
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
            </>}
        </div>
    )
}

export default page
