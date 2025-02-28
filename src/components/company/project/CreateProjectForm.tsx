import DashboardStepper from '@/components/DashboardStepper'
import InputArea from '@/components/InputArea'
import InputDate from '@/components/InputDate'
import InputField from '@/components/InputField'
import CompanyProjectModalLoader from '@/components/loaders/CompanyProjectModalLoader'
import MultiSelectDropdown from '@/components/MultiSelectDropdown'
import ErrorToast from '@/components/toast/ErrorToast'
import SuccessfulToast from '@/components/toast/SuccessfulToast'
import { industries } from '@/constants/data'
import { addProjectId } from '@/feature/reducers/companyCreateProject'
import { onBoardingHandleNext } from '@/feature/reducers/userOnboarding'
import { handleFormDataChange, InfoLabel, validateForm } from '@/lib/helper'
import { addProject, deleteProject, editProject, getCompanyProjects, getProjectSFIDbyName } from '@/lib/service/projectResource.service'
import { ArrowLeft, Briefcase } from 'lucide-react'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

export const CompanyProjectCard = (props: any) => {
    const { project, index, openEditModal, deleteProjectRecord } = props;

    return (
        <div className='relative bg-gray-200 rounded-3xl flex flex-col gap-4 flex-1 p-6 w-full z-10'>
            <Briefcase className={`absolute ${!openEditModal && !deleteProjectRecord ? "right-0 bottom-0 mb-4 m-6" : "right-0 top-0 m-8"}  h-24 w-24  z-0 text-gray-300`} />
            <div className='grid grid-cols-2 gap-4'>
                <InfoLabel label="Project Name" content={project.project_name} />
                <InfoLabel label="Industry" content={project.industry} />
            </div>
            <div className='grid grid-cols-2 gap-4'>
                <InfoLabel label="Start Date" content={project.start_date || "N/A"} />
                <InfoLabel label="Project Duration" content={project.project_duration.split(".")[0] || "N/A"} />
            </div>
            <InfoLabel label="Project Summary" content={project.description || "N/A"} />

            <div className='absolute bottom-0 right-0 flex gap-2 z-10 p-4'>
                {openEditModal && (
                    <button
                        onClick={() => openEditModal({ type: "edit", project: project, value: true })}
                        className='bg-blue-200 border uppercase hover:border-blue-400 text-sm text-blue-600 font-bold h-8 px-4 rounded-full'
                    >
                        Edit
                    </button>
                )}
                {deleteProjectRecord && (
                    <button
                        onClick={() => deleteProjectRecord(project.sfid)}
                        className='bg-red-200 border uppercase hover:border-red-400 text-sm text-red-600 font-bold h-8 px-4 rounded-full'
                    >
                        Delete
                    </button>
                )}
            </div>
        </div >
    )
}

const CreateProjectForm = ({ loading, setLoading }: any) => {
    const dispatch = useDispatch();
    const accountSfid = useSelector((state: any) => state.userSalesforceID)
    const projectId = useSelector((state: any) => state.companyCreateProject);
    const [projects, setProjects] = React.useState<any>([]);
    const [showForm, setShowForm] = React.useState<any>({
        type: "add",
        project: null,
        value: false,
    });
    const [formData, setFormData] = React.useState<any>({
        project_name: "",
        start_date: "",
        project_duration: "",
        industry: "",
        description: ""
    });
    const [errors, setErrors] = React.useState({
        project_name: "",
        start_date: "",
        project_duration: "",
        industry: "",
        description: ""
    });

    const handleNext = async () => {
        dispatch(onBoardingHandleNext({ role: "company", stepperId: 1 }))
    }

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm(formData, errors, setErrors)) {
            return;
        }

        const projectData = {
            account_sfid: accountSfid,
            project_name: formData.project_name,
            start_date: formData.start_date,
            project_duration: parseInt(formData.project_duration),
            industry: formData.industry,
            description: formData.description,
        };

        try {
            setLoading(true);
            let response
            if (showForm.value && showForm.type === "edit") {
                response = await editProject(showForm.project.sfid, projectData);
            } else {
                response = await addProject(projectData);
            }
            if (response) {
                toast.custom((t) => (
                    <SuccessfulToast t={t} message={"Project created successfully"} />
                ));
                if (showForm.value) {
                    setShowForm({ type: "add", project: null, value: false })
                    getCompanyProjectsData();
                } else {
                    dispatch(addProjectId(response.results.id));
                    handleNext()
                }
            }
        } catch (error) {
            toast.custom((t) => (
                <ErrorToast t={t} message={"Something went wrong"} />
            ))
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setFormData({
            project_name: showForm.project?.project_name || "",
            start_date: showForm.project?.start_date || "",
            project_duration: showForm.project?.project_duration || "",
            industry: showForm.project?.industry || "",
            description: showForm.project?.description || ""
        });
    }, [showForm.project])

    const deleteProjectRecord = async (sfid: string) => {
        try {
            setLoading(true);
            await deleteProject(sfid);
            getCompanyProjectsData();
        } catch (error) {
            console.error("Error deleting Projects", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            {loading ? <>
                <CompanyProjectModalLoader />
            </> : <>
                {showForm.value ? <>
                    <form onSubmit={handleSubmit} className='relative w-full flex flex-col gap-4'>
                        <div className='w-full sticky -top-4 lg:-top-6 p-2 md:p-4 z-20 border-b bg-white flex flex-row justify-between gap-4 items-end xl:items-center'>
                            <span className='text-2xl font-bold text-gray-700 text-nowrap flex flex-row items-center justify-center gap-4'>
                                <button onClick={() => setShowForm({ type: "add", project: null, value: false })} className='bg-blue-500 text-white rounded-full p-2'>
                                    <ArrowLeft className='w-8 h-8' />
                                </button>
                                {showForm.type === "add" ? "Add " : "Edit "} Project
                            </span>
                            <div className='flex flex-row gap-4'>
                                <button
                                    type='submit'
                                    disabled={loading}
                                    className={`h-12 px-6 rounded-xl font-medium text-normal ${loading
                                        ? 'bg-blue-300 text-blue-100 cursor-not-allowed'
                                        : 'bg-blue-500 text-white'
                                        }`}>
                                    Save {showForm.type === "edit" && " Changes"}
                                </button>
                            </div>
                        </div>
                        <div className='flex flex-col lg:flex-row w-full gap-6'>
                            <InputField
                                label={"Project Name"}
                                value={formData.project_name}
                                type="text"
                                className="w-full"
                                isRequired={true}
                                onChange={(e: any) => handleFormDataChange(e, setFormData, setErrors)}
                                id="project_name"
                                error={errors.project_name}
                            />
                        </div>
                        <div className='flex flex-col lg:flex-row w-full gap-6'>
                            <InputArea
                                id="description"
                                label={"Description"}
                                value={formData.description}
                                onChange={(e: any) => handleFormDataChange(e, setFormData, setErrors)}
                                className="w-full"
                                maxLength={100}
                                cols={20}
                            />
                        </div>
                        <div className='flex flex-col lg:flex-row w-full gap-6'>
                            <InputDate
                                label={"Start Date"}
                                value={formData.start_date}
                                className=" w-full"
                                onChange={(e: any) => handleFormDataChange(e, setFormData, setErrors)}
                                id="start_date"
                                error={errors.start_date}
                            />
                            <InputField
                                label={"Project Duration"}
                                value={formData.project_duration}
                                type="number"
                                className="w-full"
                                isRequired={true}
                                onChange={(e: any) => handleFormDataChange(e, setFormData, setErrors)}
                                id="project_duration"
                                error={errors.project_duration}
                            />
                        </div>
                        <div className='flex flex-col w-full gap-4 mt-2'>
                            <MultiSelectDropdown
                                id="industry"
                                label={"Industry"}
                                className="w-full"
                                options={industries}
                                onChange={(selectedValues) => setFormData({ ...formData, industry: selectedValues })}
                            />
                        </div>
                    </form>
                </> : <>
                    {(projects?.length > 0) && (!projectId) ?
                        <>
                            <div className='w-full sticky -top-4 lg:-top-6 p-2 md:p-4 z-20 border-b bg-white flex flex-col xl:flex-row justify-between gap-4 items-end xl:items-center'>
                                <DashboardStepper role={"company"} />
                                <div className='flex flex-row gap-4'>
                                    {/* {projects?.length > 0 && (
                                        <button
                                            type='button'
                                            onClick={() => setShowForm({ type: "add", project: null, value: true })}
                                            disabled={loading}
                                            className={`h-12 px-6 rounded-xl font-medium text-normal ${loading
                                                ? 'bg-blue-300 text-blue-100 cursor-not-allowed'
                                                : 'bg-blue-500 text-white'
                                                }`}>
                                            Add Projects
                                        </button>
                                    )} */}
                                    <button
                                        type='button'
                                        disabled={loading}
                                        onClick={handleNext}
                                        className={`h-12 px-6 rounded-xl font-medium text-normal ${loading
                                            ? 'bg-blue-300 text-blue-100 cursor-not-allowed'
                                            : 'bg-blue-500 text-white'
                                            }`}>
                                        Save & Next
                                    </button>
                                </div>
                            </div>
                            <div className='flex justify-between gap-6 w-full py-4'>
                                {projects.map((project: any, index: any) => (
                                    <CompanyProjectCard
                                        index={index}
                                        key={project.sfid}
                                        openEditModal={setShowForm}
                                        project={project}
                                        deleteProjectRecord={deleteProjectRecord}
                                    />
                                ))}
                            </div>
                        </> :
                        <form onSubmit={handleSubmit} className='relative w-full flex flex-col gap-4'>
                            <div className='w-full sticky -top-4 lg:-top-6 p-2 md:p-4 z-20 border-b bg-white flex flex-col xl:flex-row justify-between gap-4 items-end xl:items-center'>
                                <DashboardStepper role={"company"} />
                                <div className='flex flex-row gap-4'>
                                    {/* {projects?.length > 0 && (
                                        <button
                                            type='button'
                                            disabled={loading}
                                            className={`h-12 px-6 rounded-xl font-medium text-normal ${loading
                                                ? 'bg-blue-300 text-blue-100 cursor-not-allowed'
                                                : 'bg-blue-500 text-white'
                                                }`}>
                                            Add Projects
                                        </button>
                                    )} */}
                                    <button
                                        type='submit'
                                        disabled={loading}
                                        className={`h-12 px-6 rounded-xl font-medium text-normal ${loading
                                            ? 'bg-blue-300 text-blue-100 cursor-not-allowed'
                                            : 'bg-blue-500 text-white'
                                            }`}>
                                        Save & Next
                                    </button>
                                </div>
                            </div>
                            <div className='flex flex-col lg:flex-row w-full gap-6'>
                                <InputField
                                    label={"Project Name"}
                                    value={formData.project_name}
                                    type="text"
                                    className="w-full"
                                    isRequired={true}
                                    onChange={(e: any) => handleFormDataChange(e, setFormData, setErrors)}
                                    id="project_name"
                                    error={errors.project_name}
                                />
                            </div>
                            <div className='flex flex-col lg:flex-row w-full gap-6'>
                                <InputArea
                                    id="description"
                                    label={"Description"}
                                    value={formData.description}
                                    onChange={(e: any) => handleFormDataChange(e, setFormData, setErrors)}
                                    className="w-full"
                                    maxLength={100}
                                    cols={20}
                                />
                            </div>
                            <div className='flex flex-col lg:flex-row w-full gap-6'>
                                <InputDate
                                    label={"Start Date"}
                                    value={formData.start_date}
                                    className=" w-full"
                                    onChange={(e: any) => handleFormDataChange(e, setFormData, setErrors)}
                                    id="start_date"
                                    error={errors.start_date}
                                />
                                <InputField
                                    label={"Project Duration"}
                                    value={formData.project_duration}
                                    type="number"
                                    className="w-full"
                                    isRequired={true}
                                    onChange={(e: any) => handleFormDataChange(e, setFormData, setErrors)}
                                    id="project_duration"
                                    error={errors.project_duration}
                                />
                            </div>
                            <div className='flex flex-col w-full gap-4 mt-2'>
                                <MultiSelectDropdown
                                    id="industry"
                                    label={"Industry"}
                                    className="w-full"
                                    options={industries}
                                    onChange={(selectedValues) => setFormData({ ...formData, industry: selectedValues })}
                                />
                            </div>
                        </form>
                    }
                </>}
            </>}
        </>
    )
}

export default CreateProjectForm
