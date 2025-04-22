import Modal from '@/components/modal/Modal';
import { InfoLabel } from '@/lib/helper';
import { getCompanyProjects } from '@/lib/service/projectResource.service';
import { ChevronRight, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import DetailedView from '../detailedView/DetailedView';
import CreateProjectForm from '../project/CreateProjectForm';
import RaiseResourceRequestForm from '../resourceRequest/RaiseResourceRequestForm';
import ResourceMandatoryForm from '../resourceRequest/ResourceMandatoryForm';

const CompanyCurrentProjects = () => {
    const userOnboarding = useSelector((state: any) => state.userOnboarding["companyOnboarding"])
    const accountSfid = useSelector((state: any) => state.userSalesforceID)

    const [projects, setProjects] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [mandatoryDetails, setMandatoryDetails] = useState("Hello");

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
        getCompanyProjectsData()
    }, [])

    console.log("mandatoryDetails::", mandatoryDetails);

    const CompanyProjectCard = ({ project, index }: any) => {
        return (
            <div className='relative bg-gray-100 rounded-3xl flex flex-col gap-4 flex-1 p-6 h-full w-full z-10'>
                <h1 className='absolute text-8xl top-0 right-0 font-bold p-5 text-gray-300 uppercase'>
                    {index + 1}
                </h1>
                <div className='grid grid-cols-2 gap-4'>
                    <InfoLabel label="Project Name" content={project.project_name} />
                    <InfoLabel label="Industry" content={project.industry} />
                </div>
                <div className='grid grid-cols-2 gap-4'>
                    <InfoLabel label="Start Date" content={project.start_date || "N/A"} />
                    <InfoLabel label="Project Duration (in hrs)" content={project.project_duration.split(".")[0] || "N/A"} />
                </div>
                <InfoLabel label="Project Description" content={project.description || "N/A"} />
            </div>
        )
    }

    return (
        <>
            <div className='border border-gray-300 rounded-3xl flex-col p-6 gap-4 h-full w-1/3 bg-white bg-no-repeat bg-contain bg-top'>
                <div className='flex flex-row items-center justify-between w-full'>
                    <span className='inline-flex gap-2'>
                        <Zap className='w-6 h-6' />
                        Current Projects
                    </span>
                    <button className='text-blue-500 inline-flex items-center gap-1'>
                        See all
                        <ChevronRight className='w-4 h-4' />
                    </button>
                </div>
                {projects?.length > 0 ?
                    <div className='grid grid-cols-1 w-full gap-4 mt-6'>
                        {projects.map((project: any, index: any) => {
                            return (
                                <>
                                    <CompanyProjectCard project={project} index={index} />
                                </>
                            )
                        })}
                    </div>
                    :
                    <div className='flex flex-col items-center justify-center gap-4 p-5 h-full w-full'>
                        <img className='h-20 object-cover z-0' src="/noRecordBG3.png" alt="" />
                        <span className='top-10 left-0 text-black text-md font-medium z-20'>
                            No Projects records found
                        </span>
                        <button onClick={() => setOpenModal(true)} className='mt-4 bg-blue-700 text-white px-4 py-2 rounded-lg'>
                            Create a Project
                        </button>
                    </div>
                }
            </div >


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
                            mandatoryDetails={mandatoryDetails}
                            setMandatoryDetails={setMandatoryDetails}
                        />
                    }
                    {(userOnboarding[1].isActive && mandatoryDetails) &&
                        <ResourceMandatoryForm
                            loading={loading}
                            setLoading={setLoading}
                        />
                    }
                    {userOnboarding[2].isActive && <DetailedView loading={loading} setLoading={setLoading} />}
                </Modal >
            )}
        </>
    )
}

export default CompanyCurrentProjects
