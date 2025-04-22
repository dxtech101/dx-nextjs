import DashboardStepper from '@/components/DashboardStepper'
import InputArea from '@/components/InputArea'
import InputDate from '@/components/InputDate'
import InputField from '@/components/InputField'
import MultiSelectDropdown from '@/components/MultiSelectDropdown'
import ErrorToast from '@/components/toast/ErrorToast'
import SuccessfulToast from '@/components/toast/SuccessfulToast'
import { industries } from '@/constants/data'
import { addProjectId } from '@/feature/reducers/companyCreateProject'
import { onBoardingHandleNext } from '@/feature/reducers/userOnboarding'
import { handleFormDataChange, InfoLabel, validateForm } from '@/lib/helper'
import { addProject, editProject, getCompanyProjects } from '@/lib/service/projectResource.service'
import { Briefcase } from 'lucide-react'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'


const CreateProjectForm = ({ loading, setLoading }: any) => {
    const dispatch = useDispatch();
    const accountSfid = useSelector((state: any) => state.userSalesforceID)
    const projectId = useSelector((state: any) => state.companyCreateProject.id);
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
    });

    const handleNext = async () => {
        dispatch(onBoardingHandleNext({ role: "company", stepperId: 1 }))
    }

    const getCompanyProjectsData = async () => {
        try {
            setLoading(true);
            const { results: contactProjects } = await getCompanyProjects(accountSfid);
            const filteredProject = contactProjects.find((project: any) => project.id === projectId);
            console.log("filteredProject", filteredProject, projectId);
            
            if (filteredProject) {
                setShowForm({ type: "edit", project: filteredProject, value: true })
            }
        } catch (error) {
            console.error("Error fetching certifications:", error);
        } finally {
            setLoading(false);
        }
    }

    console.log("showForm", showForm);
    console.log("Project", projectId);
    
    console.log("I am here in fnkkk");


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
            console.log("response.results.id", response.results.id);

            if (response) {
                toast.custom((t) => (
                    <SuccessfulToast t={t} message={"Project created successfully"} />
                ));
                if (showForm.value) {
                    setShowForm({ type: "add", project: null, value: false })
                } else {
                    console.log("I am here in fn");
                    
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

    return (
        <>
            <form onSubmit={handleSubmit} className='relative w-full flex flex-col gap-4'>
                <div className='w-full sticky -top-4 lg:-top-6 p-2 md:p-4 z-20 border-b bg-white flex flex-col xl:flex-row justify-between gap-4 items-end xl:items-center'>
                    <DashboardStepper role={"company"} />
                    <div className='flex flex-row gap-4'>
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
                        isRequired={true}
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
        </>
    )
}

export default CreateProjectForm
