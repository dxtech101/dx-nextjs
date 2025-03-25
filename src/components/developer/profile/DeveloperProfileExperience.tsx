import Dropdown from '@/components/Dropdown';
import InputArea from '@/components/InputArea';
import InputField from '@/components/InputField';
import Modal from '@/components/modal/Modal';
import MultiSelectDropdown from '@/components/MultiSelectDropdown';
import { industries, salesforce_technologies } from '@/constants/data';
import { handleFormDataChange, InfoLabel, validateForm } from '@/lib/helper';
import { WorkExperienceService } from '@/lib/service/portfolio.service';
import { FileUser, Plus } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import DeveloperProfileCardHeader from './DeveloperProfileCardHeader';

const WorkExperienceCard = (props: any) => {
    const { experience, index, openEditModal, deleteWorkExperience } = props;

    return (
        <div className='relative bg-gray-100 rounded-3xl flex flex-col gap-4 flex-1 p-6 w-full z-10'>
            <h1 className='absolute text-6xl lg:text-8xl top-0 right-0 font-bold p-5 text-gray-300 uppercase'>
                {index + 1}
            </h1>
            <InfoLabel label="Project Name" content={experience.company_project_name} />

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                <InfoLabel label="Duration" content={experience.duration || "N/A"} />
                <InfoLabel label="Industry" content={experience.industry} />
            </div>

            <InfoLabel label="Work Experience Summary" content={experience.project_description || "N/A"} />
            <div className='absolute bottom-0 right-0 flex gap-2 z-20 p-4'>
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

const DeveloperProfileExperience = ({ experience, loading, updateDetails }: any) => {
    const formRef = useRef<HTMLFormElement>(null)
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState<any>({
        company_project_name: "",
        duration: "",
        industry: "",
        job_title: "",
        project_description: ""
    });
    const [errors, setErrors] = useState({
        company_project_name: "",
        industry: "",
        job_title: "",
    });
    const [loadingUI, setLoadingUI] = useState(false)
    const [type, setType] = useState("add")
    const [editSFID, setEditSFID] = useState<any>(null);
    const contactSfid = useSelector((state: any) => state.userSalesforceID)

    const openEditModal = (experience: any) => {
        setFormData({
            company_project_name: experience.company_project_name || "",
            duration: experience.duration || "",
            industry: experience.industry || "",
            job_title: experience.job_title || "",
            project_description: experience.project_description || ""
        });
        setShowModal(true);
        setType("edit")
        setEditSFID(experience.id)
    };

    const deleteDeveloperWorkExperience = async (experienceId: string) => {
        try {
            setLoadingUI(true);
            await WorkExperienceService.deleteWorkExperience(experienceId);
            updateDetails()
        } catch (error) {
            console.error("Error fetching certifications:", error);
        } finally {
            setLoadingUI(false);
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

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
            setLoadingUI(true);
            if (type === "add") {
                const response = await WorkExperienceService.addWorkExperience(workExperienceData);
                if (response) {
                    updateDetails()
                }
            } else {
                const response = await WorkExperienceService.updateWorkExperience(editSFID, workExperienceData);
                if (response) {
                    updateDetails()
                }
            }
        } catch (error) {
            console.error("Error fetching certifications:", error);
        } finally {
            setLoadingUI(false);
            setShowModal(false)
        }
    };

    return (
        <>
            <div className='bg-gray-50 rounded-2xl w-full flex flex-col gap-6 p-6'>
                <DeveloperProfileCardHeader
                    headerIcon={<FileUser />}
                    headerTitle={"Work Experience"}
                    headerContent={
                        <button
                            onClick={() => {
                                setType("add")
                                setShowModal(true)
                            }}
                            className='bg-gray-200 border border-gray-300 flex flex-row items-center justify-center gap-2 rounded-full text-gray-900 py-2 px-4 text-sm font-bold group'
                        >
                            <Plus className="w-4 h-4 cursor-pointer ml-2" />
                            <span className="overflow-hidden whitespace-nowrap transition-all duration-700 ease-in-out opacity-0 w-0 group-hover:w-auto group-hover:opacity-100">
                                Add Work Experience
                            </span>
                        </button>
                    }
                />

                {loading ? (
                    <div className='flex flex-row gap-6 w-full flex-nowrap lg:flex-wrap overflow-x-scroll'>
                        <div className='animate-pulse w-1/2 flex-1 h-72 rounded-3xl bg-gray-200' />
                        <div className='animate-pulse w-1/2 flex-1 h-72 rounded-3xl bg-gray-200' />
                    </div>
                ) : (
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-3 w-full flex-nowrap lg:flex-wrap overflow-x-scroll'>
                        {experience?.length > 0 ? <>
                            {experience?.map((item: any, index: any) => (
                                <WorkExperienceCard
                                    key={index}
                                    experience={item}
                                    index={index}
                                    openEditModal={openEditModal}
                                    deleteWorkExperience={deleteDeveloperWorkExperience}
                                />
                            ))}
                        </> : (
                            <div className='text-start text-black text-sm'>
                                No Experience Summary found
                            </div>
                        )}
                    </div>
                )}
            </div>
            {showModal && (
                <Modal
                    header={`${type === "edit" ? "Edit" : "Add"} Experience`}
                    setModal={setShowModal}
                    loading={loadingUI}
                    size="md"
                    onSubmit={handleSubmit}
                    formRef={formRef}
                >
                    <form onSubmit={handleSubmit} className='w-full flex flex-col gap-4' ref={formRef}>
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
                                rows={5}
                                maxLength={1000}
                            />
                        </div>
                        <div className='flex flex-col lg:flex-row w-full gap-6'>
                            <Dropdown
                                id="rates"
                                label={"Duration"}
                                className="w-full flex-1"
                                onChange={(value) => setFormData({ ...formData, duration: value })}
                                options={[{ value: "0-5months", label: "<6 Months" }, { value: "6-12months", label: "6-12 Months" }, { value: "morethan12months", label: ">12 Months" }]}
                            />
                        </div>
                        <div className='flex flex-col w-full gap-4 mt-2'>
                            {/* <MultiSelectDropdown
                                id="salesforce_technologies"
                                label={"Salesforce Technologies"}
                                className="w-full"
                                options={salesforce_technologies}
                                onChange={(selectedValues) => setFormData({ ...formData, salesforce_technologies: selectedValues })}
                            /> */}
                            <MultiSelectDropdown
                                id="industry"
                                label={"Industry"}
                                className="w-full"
                                options={industries}
                                onChange={(selectedValues) => setFormData({ ...formData, industry: selectedValues })}
                            />
                        </div>
                    </form>
                </Modal>)
            }
        </>

    )
}

export default DeveloperProfileExperience
