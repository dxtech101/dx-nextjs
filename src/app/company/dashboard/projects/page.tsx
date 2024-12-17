"use client"
import DetailedView from '@/components/company/detailedView/DetailedView'
import CreateProjectForm from '@/components/company/project/CreateProjectForm'
import RaiseResourceRequestForm from '@/components/company/resourceRequest/RaiseResourceRequestForm'
import ResourceMandatoryForm from '@/components/company/resourceRequest/ResourceMandatoryForm'
import CompanyProjectTableLoader from '@/components/loaders/CompanyProjectTableLoader'
import Modal from '@/components/modal/Modal'
import { getCompanyProjects } from '@/lib/service/projectResource.service'
import { Filter, Plus } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

const page = () => {
  const [openModal, setOpenModal] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [projects, setProjects] = React.useState<any>([]);
  const [mandatoryDetails, setMandatoryDetails] = React.useState<any>(false)
  const [resourceDetails, setResourceDetails] = React.useState<any>()
  const accountSfid = useSelector((state: any) => state.userSalesforceID)

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

      <div className="relative max-w-screen overflow-scroll rounded-3xl border border-gray-300 md:w-full bg-white">
        <table className="w-full overflow-x-scroll table-auto border-collapse border border-gray-200 rounded-xl">
          <thead className="bg-gray-100 h-20">
            <tr>
              <th>S. No.</th>
              <th>Project Name</th>
              <th>Industries</th>
              <th>Start Date</th>
              <th className='max-w-24'>Daily Hrs</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? <>
              <CompanyProjectTableLoader />
            </> : <>
              {projects?.length > 0 ? <>
                {projects.map((project: any, index: any) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="border border-gray-200 px-4 py-2 h-20">{index + 1}.</td>
                    <td className="border border-gray-200 px-4 py-2 h-20">{project.project_name}</td>
                    <td className="border border-gray-200 px-4 py-2 h-20">
                      {project.industry.split(';').slice(0, 3).map((industry: any, index: any) => {
                        return <span key={index}>{index + 1}. {industry} <br /></span>;
                      })}
                      {project.industry.split(';').length > 3 && <span className='text-sm text-gray-500'>+ {project.industry.split(';').length - 3} more</span>}
                    </td>
                    <td className="border border-gray-200 px-4 py-2 h-20">{project.start_date}</td>
                    <td className="border border-gray-200 px-4 py-2 h-20">{project.project_duration.split('.')[0]}</td>
                    <td className='border border-gray-200 px-4 py-2'>
                      {project.description}
                    </td>
                    <td className='flex flex-col items-start px-4 py-2 justify-center text-center h-full w-full gap-2'>
                      <Link href={`/company/dashboard/projects/${project.sfid}`}>
                        <span className='bg-blue-100 text-blue-500 px-3 font-bold text-xs uppercase rounded-full py-1 border hover:border-blue-500'>View</span>
                      </Link>
                      <Link href={`/company/dashboard/projects/${project.sfid}`}>
                        <span className='bg-red-100 text-red-500 px-3 font-bold text-xs uppercase rounded-full py-1 border hover:border-red-500'>Delete</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </> : <>
                <tr className='h-20 '>
                  <td colSpan={10} className='text-center py-12'>
                    <div className='flex flex-col items-center justify-center gap-4'>
                      <img className='h-40 object-cover z-0' src="/noRecord.png" alt="" />
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

export default page
