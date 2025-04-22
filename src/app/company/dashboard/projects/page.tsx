"use client"
import DetailedView from '@/components/company/detailedView/DetailedView'
import CreateProjectForm from '@/components/company/project/CreateProjectForm'
import RaiseResourceRequestForm from '@/components/company/resourceRequest/RaiseResourceRequestForm'
import ResourceMandatoryForm from '@/components/company/resourceRequest/ResourceMandatoryForm'
import ResourceRequestCard from '@/components/company/ResourceRequestCard'
import CompanyProjectTableLoader from '@/components/loaders/CompanyProjectTableLoader'
import ResourseDataLoader from '@/components/loaders/ResourseDataLoader'
import Modal from '@/components/modal/Modal'
import { skillsDetails } from '@/constants/data'
import { deleteProject, getAllResourceRequest, getCompanyProjects, getSkillRequirementByResourceRequest } from '@/lib/service/projectResource.service'
import { ArrowUpRight, Pencil, Plus, Sparkle, Trash } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

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

const page = () => {
  const router = useRouter()
  const [openModal, setOpenModal] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [projects, setProjects] = React.useState<any>([]);
  const [mandatoryDetails, setMandatoryDetails] = React.useState<any>(false)
  const [resourceDetails, setResourceDetails] = React.useState<any>()
  const [showProjectDetails, setShowProjectDetails] = React.useState<any>({ type: false, id: null })
  const accountSfid = useSelector((state: any) => state.userSalesforceID)
  const [resources, setResources] = useState<any>([]);
  const [skillsMap, setSkillsMap] = useState<{ [key: string]: any[] }>({});
  const [loadingSkills, setLoadingSkills] = useState<{ [key: string]: boolean }>({});
  const [loadingResources, setLoadingResources] = useState(false);


  const getCompanyProjectsData = async () => {
    try {
      setLoading(true);
      const { results: contactProjects } = await getCompanyProjects(accountSfid);
      setProjects(contactProjects);
    } catch (error) {
      console.error("Error fetching certifications:", error);
    } finally {
      setLoading(false);
    }
  }

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

  const getCompanyResourcesData = async (projectId: any) => {
    try {
      const { results: contactProjects } = await getAllResourceRequest();
      const filteredResourceRequests = contactProjects.filter((resource: any) => {
        if (resource.project && resource.project.id) {
          return resource.project.id === projectId;
        } else {
          console.warn("Invalid resource project:", resource);
          return false;
        }
      });
      setResources(filteredResourceRequests);
    } catch (error) {
      console.error("Error fetching certifications:", error);
    }
  }

  const handleProjectExpand = async (projectId: any) => {
    setLoadingResources(true);
    setShowProjectDetails((prevState: any) => ({
      type: prevState.id !== projectId || !prevState.type,
      id: projectId,
    }));
    await getCompanyResourcesData(projectId);
    setLoadingResources(false);
  };

  const handleProjectDelete = async (projectId: any) => {
    await deleteProject(projectId);
    setShowProjectDetails({ type: false, id: null });
    getCompanyProjectsData();
  };

  useEffect(() => {
    getCompanyProjectsData();
  }, [])



  const userOnboarding = useSelector((state: any) => state.userOnboarding["companyOnboarding"])
  return (
    <div className='flex flex-col gap-5'>
      <section className="bg-white rounded-3xl border border-gray-300">
        <div className="container mx-auto px-4">
          <div className="flex flex-col flex-wrap">
            <div className='w-full bg-white z-20 sticky top-0 left-0 py-6 px-4 flex flex-col gap-6 md:flex-row justify-between items-start lg:items-center'>
              <span>
                <h1 className="font-heading tracking-tight text-4xl md:text-5xl font-medium mb-4">
                  Current Project
                </h1>
                <p className="tracking-tight text-gray-600 max-w-sm">
                  Apply for a position that fits your skills and interests.
                </p>
              </span>
              <button
                onClick={() => setOpenModal(true)}
                className='text-white font-normal h-12 whitespace-nowrap flex flex-row gap-2 justify-center items-center bg-blue-500 px-4 rounded-xl'>
                <Plus className='w-6 h-6 text-white' /> Create a Project
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="relative max-w-screen overflow-scroll md:w-full bg-gray-100">
        <table className="w-full overflow-x-scroll table-auto border-collapse rounded-xl">
          <thead className="bg-blue-400 h-20 rounded-3xl">
            <tr>
              <th className="rounded-l-2xl" >S. No.</th>
              <th>Project Name</th>
              <th>Industries</th>
              <th>Start Date</th>
              <th className='max-w-24'>Daily Hrs</th>
              <th>Description</th>
              <th className='rounded-r-2xl border-0'>Action</th>
            </tr>
          </thead>
          <tr className="h-4"></tr> {/* Spacer row */}
          <tbody>
            {loading ? <>
              <CompanyProjectTableLoader />
            </> : <>
              {projects?.length > 0 ? <>
                {projects.map((project: any, index: any) => (
                  <>
                    <tr key={index} className={`bg-white py-2`}>
                      <td className={`border-gray-200 px-4 py-2 h-20 ${showProjectDetails.id === project.id && showProjectDetails.type ? "rounded-tl-2xl" : "rounded-l-2xl"}`}>
                        <div>
                          {index + 1}.
                        </div>
                      </td>
                      <td className="border-l border-gray-200 px-4 py-2 h-20">{project.project_name}</td>
                      <td className="border-l border-gray-200 px-4 py-2 h-20">
                        {project.industry.split(';').slice(0, 2).join(', ')}
                        {project.industry.split(';').length > 2 && <span className='text-sm ml-1 text-gray-500'>+ {project.industry.split(';').length - 2} more</span>}
                      </td>
                      <td className="border-l border-gray-200 px-4 py-2 h-20">{project.start_date}</td>
                      <td className="border-l border-gray-200 px-4 py-2 h-20">{project.project_duration.split('.')[0]}</td>
                      <td className='border-l border-gray-200 px-4 py-2'>
                        {project.description}
                      </td>
                      <td className={`border-l border-gray-200 px-4 py-2 h-20 ${showProjectDetails.id === project.id && showProjectDetails.type ? "rounded-tr-2xl" : "rounded-r-2xl"}`}>
                        <div className='w-full h-full flex flex-row items-center justify-start'>
                          <button
                            onClick={() => handleProjectExpand(project.id)}
                            className='bg-red-200 text-red-800 border hover:border-red-800 text-xs font-extrabold uppercase rounded-full px-3 py-2 ml-2'
                          >
                            {showProjectDetails.id === project.id && showProjectDetails.type ? 'Collapse' : 'Expand'}
                          </button>
                          <Link
                            href={`/company/dashboard/projects/${project.id}`}
                            className='inline-flex gap-2 bg-blue-200 text-blue-800 border hover:border-blue-800 text-xs font-extrabold uppercase rounded-full px-3 py-2 ml-2'>
                            <Pencil className='w-4 h-4' />
                          </Link>
                          <button
                            onClick={() => handleProjectDelete(project.sfid)}
                            className='inline-flex gap-2 bg-red-200 text-red-800 border hover:border-red-800 text-xs font-extrabold uppercase rounded-full px-3 py-2 ml-2'>
                            <Trash className='w-4 h-4' />
                          </button>
                        </div>
                      </td>
                    </tr>
                    {showProjectDetails.id === project.id && showProjectDetails.type && (
                      <tr className='bg-red-200'>
                        <td colSpan={7} className='w-full text-center p-6 bg-gray-200 rounded-b-2xl'>
                          {loadingResources ? <>
                            <ResourseDataLoader />
                          </> : <>
                            {resources.length > 0 ? <div className='flex flex-row'>
                              {resources.map((resource: any, index: any) => {
                                const skills = skillsMap[resource.sfid] || [];
                                const querySkills = skills.map((skill: any) => skill.name).join(',');

                                return (
                                  <div key={index} className='flex flex-col items-end gap-4 border-r p-4 w-full'>
                                    <div className='flex flex-row items-start gap-4 w-full'>
                                      <span className='text-4xl font-extrabold text-gray-600'>
                                        {index + 1}.
                                      </span>
                                      <div className='w-full flex flex-col gap-6'>
                                        <ResourceRequestCard resource={resource} />
                                        <div className='flex flex-col w-fit gap-4'>
                                          <span className='inline-flex gap-2 items-center'>
                                            <Sparkle /> <h2 className='text-sm uppercase font-semibold'>Skills</h2>
                                          </span>
                                          <div className='flex flex-row flex-wrap gap-2 items-center'>
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

                                    <div className='flex flex-row justify-end gap-4'>
                                      <button
                                        onClick={() => router.push(`/company/dashboard/developers/?skills=${querySkills}&resource=${resource.sfid}&id=${resource.id}`)}
                                        className='inline-flex gap-1 bg-green-300 border hover:border-green-800 text-green-800 text-xs font-bold uppercase rounded-md px-3 py-3'>
                                        <span>
                                          Search for {resource.name}
                                        </span>
                                        <ArrowUpRight className='w-4 h-4' />
                                      </button>
                                    </div>
                                  </div>
                                )
                              })}
                            </div> : <>
                              <div className='flex flex-col items-center justify-center gap-4'>
                                <img className='h-40 object-cover z-0' src="/noRecord.png" alt="" />
                                <p className='text-sm uppercase font-bold'>No Project Related Resources Found</p>
                              </div>
                            </>}
                          </>}
                        </td>
                      </tr>
                    )}
                    <tr className="h-4"></tr> {/* Spacer row */}
                  </>
                ))}
              </> : <>
                <tr className='h-20 '>
                  <td colSpan={10} className='text-center py-12'>
                    <div className='flex flex-col items-center justify-center gap-4'>
                      <img className='h-20 object-cover z-0' src="/noRecord.png" alt="" />
                      <p className='text-sm uppercase font-bold'>No Records Found</p>
                    </div>
                  </td>
                </tr>
              </>}
            </>}

          </tbody>
        </table>
      </div>

      {openModal && (
        <Modal
          header={"Create a Project"}
          setModal={setOpenModal}
          isFooter={false}
          loading={loading}
          size={"lg"}
        >
          {userOnboarding[0].isActive && <CreateProjectForm loading={loading} setLoading={setLoading} />}
          {(userOnboarding[1].isActive && !mandatoryDetails) &&
            <RaiseResourceRequestForm
              loading={loading}
              setLoading={setLoading}
              setMandatoryDetails={setMandatoryDetails}
              setResourceDetails={setResourceDetails}
            />
          }
          {(userOnboarding[1].isActive && mandatoryDetails) &&
            <ResourceMandatoryForm
              loading={loading}
              setLoading={setLoading}
              resourceDetails={resourceDetails}
              setMandatoryDetails={setMandatoryDetails}
            />
          }
          {userOnboarding[2].isActive && <DetailedView loading={loading} setLoading={setLoading} setOpenModal={setOpenModal} />}
        </Modal >
      )}

    </div>

  )
}

export default page;