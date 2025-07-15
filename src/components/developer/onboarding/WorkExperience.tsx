"use client"
import MultiSelectDropdown from '@/components/MultiSelectDropdown'
import InputArea from '@/components/InputArea'
import InputDate from '@/components/InputDate'
import InputField from '@/components/InputField'
import Modal from '@/components/modal/Modal'
import { onBoardingHandleNext, onBoardingHandlePrevious } from '@/feature/reducers/userOnboarding'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handleFormDataChange, validateForm } from '@/lib/helper'
import { WorkExperienceService } from '@/lib/service/portfolio.service'
import { Plus } from 'lucide-react'
import ConfirmationModal from '@/components/modal/ConfirmationModal'
import { industries, salesforce_technologies } from '@/constants/data'
import Dropdown from '@/components/Dropdown'

const InfoLabel = ({ label, content }: any) => {
    return (
        <span className="flex flex-col gap-1">
            <span className="uppercase text-xs font-medium text-gray-500">{label}</span>
            <span className="line-clamp-1 hover:line-clamp-3">
                {content?.split(';').join(", ")}
            </span>
        </span>
    );
};

const WorkExperienceCard = (props: any) => {
    const { experience, index, openEditModal, deleteWorkExperience } = props;

    return (
        <div className='relative bg-gray-100 rounded-3xl flex flex-col gap-4 flex-1 p-6 w-full z-10'>
            <h1 className='absolute text-8xl top-0 right-0 font-bold p-5 text-gray-300 uppercase'>
                {index + 1}
            </h1>
            <InfoLabel label="Project Name" content={experience.company_project_name} />

            <div className='grid grid-cols-2 gap-4'>
                {/* <InfoLabel label="Salesforce Cloud(s)" content="Sales Cloud, Service Cloud" /> */}
                <InfoLabel label="Duration" content={experience.duration || "N/A"} />
                <InfoLabel label="Industry" content={experience.industry || "N/A"} />
            </div>

            <InfoLabel label="Work Experience Summary" content={experience.project_description || "N/A"} />

            <div className='absolute bottom-0 right-0 flex gap-2 z-10 p-4'>
                <button
                    onClick={() => openEditModal(experience)}
                    className='bg-blue-200 border hover:border-blue-400 text-sm text-blue-600 font-medium h-8 px-4 rounded-full'
                >
                    Edit
                </button>
                <button
                    onClick={() => deleteWorkExperience(experience.id)}
                    className='bg-red-200 border hover:border-red-400 text-sm text-red-600 font-medium h-8 px-4 rounded-full'
                >
                    Delete
                </button>
            </div>
        </div >
    )
}

const WorkExperience = () => {
    const dispatch = useDispatch();

    const [experience, setExperience] = useState<any[]>([])
    const [openModal, setOpenModal] = useState<any>(false)
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState<any>("add");
    const [editID, setEditID] = useState<any>(null);
    const [openConfirmModal, setOpenConfirmModal] = useState(false);
    const [formData, setFormData] = useState<any>({
        company_project_name: "",
        duration: "",
        industry: "",
        job_title: "",
        project_description: ""
    });
    const [errors, setErrors] = useState({
        company_project_name: "",
        job_title: "",
    });
    const contactSfid = useSelector((state: any) => state.userSalesforceID)
    const company_developer = useSelector((state: any) => state.userCompany);

    useEffect(() => {
        getDeveloperWorkExperienceDetails();
    }, [])

    const resetForm = () => {
        setFormData({
            company_project_name: "",
            duration: "",
            industry: "",
            job_title: "",
            project_description: ""
        });
        setErrors({
            company_project_name: "",
            job_title: "",
        });
    }

    const getDeveloperWorkExperienceDetails = async () => {
        try {
            setLoading(true);
            const { results: contactWorkExperience } = await WorkExperienceService.getWorkExperience(contactSfid);
            setExperience(contactWorkExperience);
        } catch (error) {
            console.error("Error fetching certifications:", error);
        } finally {
            setLoading(false);
        }
    }

    const deleteDeveloperWorkExperience = async (experienceId: string) => {
        try {
            setLoading(true);
            await WorkExperienceService.deleteWorkExperience(experienceId);
            getDeveloperWorkExperienceDetails()
        } catch (error) {
            console.error("Error fetching certifications:", error);
        } finally {
            setLoading(false);
        }
    }

    const openEditModal = (experience: any) => {
        setFormData({
            company_project_name: experience.company_project_name || "",
            duration: experience.duration || "",
            industry: experience.industry || "",
            job_title: experience.job_title || "",
            project_description: experience.project_description || ""
        });
        setOpenModal(true);
        setType("edit")
        setEditID(experience.id)
    };


    const handleNext = () => {
        dispatch(onBoardingHandleNext({ role: "developer", stepperId: 3 }))
    }

    const handlePrevious = () => {
        dispatch(onBoardingHandlePrevious({ role: "developer", stepperId: 3 }))
    }

    const handleSubmit = async (e: React.FormEvent) => {

        if (!validateForm(formData, errors, setErrors)) {
            return;
        }

        const workExperienceData = {
            company_project_name: formData.company_project_name,
            contact: contactSfid,
            duration: formData.duration,
            industry: formData.industry,
            job_title: formData.job_title,
            project_description: formData.project_description,
        };

        try {
            setLoading(true);
            if (type === "add") {
                const response = await WorkExperienceService.addWorkExperience(workExperienceData);
                if (response) {
                    getDeveloperWorkExperienceDetails();
                    resetForm();
                }
            } else {
                const response = await WorkExperienceService.updateWorkExperience(editID, workExperienceData);
                if (response) {
                    getDeveloperWorkExperienceDetails();
                    resetForm()
                }
            }
        } catch (error) {
            console.error("Error fetching certifications:", error);
        } finally {
            setLoading(false);
            setOpenModal(false)
        }
    };

    return (
        <>
            <div className='bg-[url(/skillsBG1.webp)] bg-white bg-contain bg-no-repeat bg-bottom rounded-3xl border border-gray-300 overflow-clip w-full min-h-full relative px-5 lg:px-10'>
                <div className='w-full bg-white top-0 left-0 sticky py-6 flex flex-col gap-6 lg:flex-row justify-between items-start z-20 lg:items-center'>
                    <span>
                        <h1 className='text-start text-4xl md:text-5xl font-heading tracking-tight font-medium text-black'>
                            Complete your Profile
                        </h1>
                        <p className='pt-2 tracking-tight text-gray-600 max-w-sm inline-flex w-full'>
                            Enter your experience(s) that you have
                        </p>
                        {experience?.length > 0 &&
                            <button
                                onClick={() => {
                                    setType("add")
                                    setOpenModal(true)
                                }}
                                className='bg-blue-500 inline-flex items-center gap-2 text-normal text-white font-medium h-8 pr-3 pl-1 mt-3 rounded-full'
                            >
                                <Plus className='w-5 h-5 text-blue-500 bg-white rounded-full' />
                                Add Experience
                            </button>
                        }
                    </span>
                    <div className='flex flex-row gap-4'>
                        <button
                            disabled={loading}
                            onClick={handlePrevious}
                            className={`h-12 px-6 rounded-xl font-normal text-normal bg-gray-200 text-gray-400`}>
                            Previous
                        </button>
                        <button
                            onClick={() => {
                                if (company_developer) {
                                    setOpenConfirmModal(true)
                                } else {
                                    handleNext()
                                }
                            }}
                            disabled={loading}
                            className={`h-12 px-6 rounded-xl font-medium text-normal ${loading
                                ? 'bg-blue-300 text-blue-100 cursor-not-allowed'
                                : 'bg-blue-500 text-white'
                                }`}>
                            Save & Next
                        </button>

                    </div>
                </div>
                {loading ?
                    <div className='grid grid-cols-2 w-full h-full gap-6'>
                        <div className='bg-gray-200 flex-1 h-72 rounded-3xl animate-pulse' />
                        <div className='bg-gray-200 flex-1 h-72 rounded-3xl animate-pulse' />
                    </div> : <>
                        {experience?.length > 0 ?
                            <div className='grid grid-cols-1 lg:grid-cols-2 justify-between gap-6 w-full py-4'>
                                {experience.map((experience: any, index: any) => (
                                    <div className='flex-1' key={experience.sfid}>
                                        <WorkExperienceCard
                                            index={index}
                                            openEditModal={openEditModal}
                                            experience={experience}
                                            deleteWorkExperience={deleteDeveloperWorkExperience}
                                        />
                                    </div>
                                ))}
                            </div> : (
                                <div className='absolute bottom-0 left-0 w-full h-3/4 flex items-start pt-32 lg:pt-20 justify-center'>
                                    <div className='flex flex-col gap-4 text-start z-10'>
                                        <span className='uppercase font-extranormal text-2xl text-center lg:text-4xl text-slate-300 '>
                                            Add your work experience
                                        </span>
                                        <button
                                            onClick={() => {
                                                setType("add")
                                                setOpenModal(true)
                                            }}
                                            className='bg-blue-500 text-normal text-white font-medium h-12 px-6 rounded-xl'
                                        >
                                            Add Experience
                                        </button>
                                    </div>
                                </div>
                            )
                        }
                    </>}
            </div >
            {openModal && (
                <Modal
                    header={`${type === "add" ? "Add" : "Edit"} Work Experience`}
                    setModal={setOpenModal}
                    onSubmit={handleSubmit}
                >
                    <form className='w-full flex flex-col gap-4'>
                        <div className='flex flex-col lg:flex-row w-full gap-6'>
                            <InputField
                                label={"Project Name"}
                                value={formData.company_project_name}
                                type="text"
                                className=" w-full"
                                isRequired={true}
                                onChange={(e: any) => handleFormDataChange(e, setFormData, setErrors)}
                                id="company_project_name"
                                error={errors.company_project_name}
                            />
                            <InputField
                                label={"Your Role"}
                                value={formData.job_title}
                                type="text"
                                className=" w-full"
                                isRequired={true}
                                onChange={(e: any) => handleFormDataChange(e, setFormData, setErrors)}
                                id="job_title"
                                error={errors.job_title}
                            />
                        </div>
                        <div className='flex flex-col lg:flex-row w-full gap-6'>
                            <InputArea
                                id="project_description"
                                label={"Description"}
                                value={formData.project_description}
                                onChange={(e: any) => handleFormDataChange(e, setFormData, setErrors)}
                                className="w-full"
                                cols={20}
                                maxLength={1000}
                            />
                        </div>
                        <div className='flex flex-col lg:flex-row w-full gap-6'>
                            <Dropdown
                                id="rates"
                                label={"Duration"}
                                className="w-full flex-1"
                                defaultValue={type === "edit" ? formData?.duration : ""}
                                onChange={(value: any) => setFormData({ ...formData, duration: value })}
                                options={[{ value: "<6 Months", label: "<6 Months" }, { value: "6-12 months", label: "6-12 Months" }, { value: ">12 Months", label: ">12 Months" }]}
                            />
                        </div>
                        <div className='flex flex-col w-full gap-4 mt-2'>
                            {/* <MultiSelectDropdown
                                id="salesforce_technologies"
                                label={"Salesforce Skills"}
                                className="w-full"
                                defaultValues={formData.salesforce_technologies}
                                options={salesforce_technologies}
                                onChange={(selectedValues) => setFormData({ ...formData, salesforce_technologies: selectedValues })}
                            /> */}
                            <MultiSelectDropdown
                                id="industry"
                                label={"Industry"}
                                className="w-full"
                                defaultValues={type === "edit" ? Array.isArray(formData?.industry) ? formData?.industry : formData?.industry?.split(";") : ""}
                                options={industries}
                                onChange={(selectedValues) => setFormData({ ...formData, industry: selectedValues })}
                            />
                        </div>
                    </form>
                </Modal >
            )}

            {openConfirmModal && (<ConfirmationModal setOpenConfirmModal={setOpenConfirmModal} />)}
        </>
    )

}

export default WorkExperience
