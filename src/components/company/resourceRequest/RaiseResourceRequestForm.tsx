import DashboardStepper from '@/components/DashboardStepper'
import InputDate from '@/components/InputDate'
import InputField from '@/components/InputField'
import CompanyProjectModalLoader from '@/components/loaders/CompanyProjectModalLoader'
import MultiSelectDropdown from '@/components/MultiSelectDropdown'
import ErrorToast from '@/components/toast/ErrorToast'
import SuccessfulToast from '@/components/toast/SuccessfulToast'
import { onBoardingHandleNext, onBoardingHandlePrevious } from '@/feature/reducers/userOnboarding'
import { handleFormDataChange } from '@/lib/helper'
import { getAllSalesforceCertifications, getAllSalesforceSkills } from '@/lib/service/portfolio.service'
import { addResourceRequest, deleteResourceRequest, editResourceRequest, getAllResourceRequest, getCompanyProjects } from '@/lib/service/projectResource.service'
import { ArrowLeft, ArrowRight, Pencil, PlusCircle, Trash } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

const RaiseResourceRequestForm = ({ loading, setLoading, setResourceDetails, setMandatoryDetails }: any) => {
    const dispatch = useDispatch();
    const accountSfid = useSelector((state: any) => state.userSalesforceID)
    const projectId = useSelector((state: any) => state.companyCreateProject);
    const [resourceSfid, setResourceSfid] = useState<any>();
    const [project, setProject] = useState<any>();
    const [resources, setResources] = useState<any>([]);
    const [showForm, setShowForm] = useState<any>({
        type: "add",
        resource: null,
        value: false,
    });
    const [formData, setFormData] = useState<any>({
        resource_name: "",
        project: "",
        start_date: "",
        daily_hours_required: "",
        role_required: "",
    });
    const [errors, setErrors] = useState({
        resource_name: "",
        project: "",
        start_date: "",
        daily_hours_required: "",
    });

    const getCompanyResourcesData = async () => {
        try {
            setLoading(true);
            const { results: contactResources } = await getAllResourceRequest();
            const filteredResourceRequests = contactResources.filter((resource: any) => resource?.project && resource.project.id === projectId);
            setResources(filteredResourceRequests);
        } catch (error) {
            console.error("Error fetching certifications:", error);
        } finally {
            setLoading(false);
        }
    }

    const getCreatedCompanyResourcesData = async (id: any) => {
        try {
            setLoading(true);
            const { results: contactProjects } = await getAllResourceRequest();
            const filteredResourceRequests = contactProjects.find((resource: any) => resource.id === id);
            return filteredResourceRequests;
        } catch (error) {
            console.error("Error fetching resources:", error);
        } finally {
            setLoading(false);
        }
    };

    const getCompanyProjectsData = async () => {
        try {
            setLoading(true);
            const { results: contactProjects } = await getCompanyProjects(accountSfid);
            const projectName = contactProjects.find((project: any) => project.id === projectId);
            setProject(projectName);
        } catch (error) {
            console.error("Error fetching certifications:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getCompanyProjectsData();
        getCompanyResourcesData();
        setShowForm({ type: "add", project: null, value: false })
    }, [])

    const handleNext = async () => {
        dispatch(onBoardingHandleNext({ role: "company", stepperId: 2 }))
    }

    const handlePrevious = async () => {
        dispatch(onBoardingHandlePrevious({ role: "company", stepperId: 2 }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // if (!validateForm(formData, setErrors)) {
        //     return;
        // }

        const resourceRequestData = {
            resource_name: formData.resource_name,
            project_id: project?.id,
            start_date: formData.start_date,
            daily_hours_required: parseInt(formData.daily_hours_required),
            role_required: "Developer"
        };

        try {
            setLoading(true);
            let response;
            if (showForm.value && showForm.type === "edit") {
                response = await editResourceRequest(showForm.sfid, resourceRequestData);
            } else {
                response = await addResourceRequest(resourceRequestData);
            }
            if (response) {
                toast.custom((t) => (
                    <SuccessfulToast t={t} message={"Resource Request raised successfully"} />
                ));
                if (showForm.value) {
                    if (showForm.type === "add") {
                        setMandatoryDetails(true)
                        setResourceDetails(response.results)
                    } else {
                        getCompanyResourcesData();
                        getCompanyProjectsData();
                    }
                } else {
                    handleNext()
                }
            }
        } catch (error) {
            toast.custom((t) => (
                <ErrorToast t={t} message={"error"} />
            ))
        } finally {
            setLoading(false);
        }
    };




    const deleteRequest = async (sfid: string) => {
        try {
            setLoading(true);

            const response: any = await deleteResourceRequest(sfid);
            if (response) {
                toast.custom((t) => (
                    <SuccessfulToast t={t} message={"Resource Request deleted successfully"} />
                ));
                getCompanyResourcesData();
            }

        } catch (error) {
            toast.custom((t) => (
                <ErrorToast t={t} message={"Something went wrong"} />
            ))
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setFormData({
            resource_name: showForm.resource?.name || "",
            project: project?.sfid,
            start_date: showForm.resource?.start_date || "",
            daily_hours_required: parseInt(showForm.resource?.daily_hours_required) || "",
            role_required: "Developer"
        });
    }, [showForm.resource])

    return (
        <>
            {loading ?
                <>
                    <CompanyProjectModalLoader />
                </> : <>
                    {showForm.value ? <>
                        <form onSubmit={handleSubmit} className='relative w-full flex flex-col gap-4'>
                            <div className='w-full sticky -top-4 lg:-top-6 p-2 md:p-4 z-20 border-b bg-white flex flex-row justify-between gap-4 items-end xl:items-center'>
                                <span className='text-2xl font-bold text-gray-700 text-nowrap flex flex-row items-center justify-center gap-4'>
                                    <button onClick={() => setShowForm({ type: "add", resource: null, value: false })} className='bg-blue-500 text-white rounded-full p-2'>
                                        <ArrowLeft className='w-8 h-8' />
                                    </button>
                                    {showForm.type === "add" ? "Raise" : "Edit"} Resource Request for {project?.project_name} 
                                </span>
                                <div className='flex flex-row gap-4'>
                                    <button
                                        type='submit'
                                        disabled={loading}
                                        className={`h-12 px-6 rounded-xl font-medium text-normal ${loading
                                            ? 'bg-blue-300 text-blue-100 cursor-not-allowed'
                                            : 'bg-blue-500 text-white'
                                            }`}>
                                        Save {showForm.type === "edit" ? " Changes" : " and Next"}
                                    </button>
                                </div>
                            </div>
                            <InputField
                                label={"Resource Name"}
                                value={formData.resource_name}
                                type="text"
                                className="w-full"
                                isRequired={true}
                                onChange={(e: any) => handleFormDataChange(e, setFormData, setErrors)}
                                id="resource_name"
                                error={errors.resource_name}
                            />
                            <MultiSelectDropdown
                                id="role_required"
                                label={"Role Required"}
                                className="w-full"
                                options={[{ value: "1", label: "Admin" }, { value: "2", label: "Manager" }, { value: "3", label: "Employee" }]}
                                onChange={(selectedValues) => setFormData({ ...formData, role_required: selectedValues })}
                            />
                            <InputDate
                                label={"Start Date"}
                                value={formData.start_date}
                                className=" w-full"
                                onChange={(e: any) => handleFormDataChange(e, setFormData, setErrors)}
                                id="start_date"
                                error={errors.start_date}
                            />
                            <InputField
                                label={"Daily Hours Required"}
                                value={formData.daily_hours_required}
                                type="number"
                                className="w-full"
                                isRequired={true}
                                onChange={(e: any) => handleFormDataChange(e, setFormData, setErrors)}
                                id="daily_hours_required"
                                error={errors.daily_hours_required}
                            />
                        </form>
                    </> : <>
                        {resources?.length > 0 ? <>
                            <div className='w-full sticky -top-6 z-20 p-2 md:p-4 border-b bg-white flex flex-col xl:flex-row justify-between gap-4 items-end xl:items-center'>
                                <DashboardStepper role={"company"} />
                                <div className='flex items-center gap-3'>
                                    <button
                                        type='button'
                                        onClick={handlePrevious}
                                        className='bg-gray-200 text-bold text-white font-bold h-12 px-6 rounded-xl'
                                    >
                                        Previous
                                    </button>
                                    <button
                                        type='button'
                                        onClick={handleNext}
                                        className='bg-blue-500 text-bold text-white font-bold h-12 px-6 rounded-xl'
                                    >
                                        Save & Next
                                    </button>
                                </div>
                            </div>
                            <div className='w-full flex flex-col md:flex-row justify-between items-center gap-4 my-6'>
                                <h2 className='text-sm uppercase font-semibold'>Create Resource Request for {project?.project_name}</h2>
                                <button
                                    onClick={() => setShowForm({ type: "add", resource: null, value: true })}
                                    className='bg-blue-500 inline-flex items-center gap-2 text-white rounded-full py-1 pl-1 pr-4 text-sm'>
                                    <PlusCircle className='w-6 h-6' />
                                    Add More Resource Request
                                </button>
                            </div>
                            <div className="relative max-w-screen overflow-scroll md:w-full bg-white">
                                <table className="w-full overflow-x-scroll table-auto border-collapse border border-gray-200 rounded-xl">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="w-fit border border-gray-200 text-left pl-3 uppercase text-xs">Sr. No.</th>
                                            <th className="border border-gray-200 px-4 py-2 text-left uppercase text-xs">Resource Name</th>
                                            <th className="border border-gray-200 px-4 py-2 text-left uppercase text-xs">Role Required</th>
                                            <th className="border border-gray-200 px-4 py-2 text-left uppercase text-xs">Start Date</th>
                                            <th className="border border-gray-200 px-4 py-2 text-left uppercase text-xs max-w-24">Daily Hours (in hrs)</th>
                                            <th className="border border-gray-200 px-4 py-2 text-left uppercase text-xs w-40">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {resources.map((resource: any, index: any) => (
                                            <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                                <td className="border border-gray-200 px-4 py-2">{index + 1}.</td>
                                                <td className="border border-gray-200 px-4 py-2">{resource.name}</td>
                                                <td className="border border-gray-200 px-4 py-2">
                                                    {resource.role_required}
                                                </td>
                                                <td className="border border-gray-200 px-4 py-2">{resource.start_date}</td>
                                                <td className="border border-gray-200 px-4 py-2">{resource.daily_hours_required.split('.')[0]}</td>
                                                <td className='border border-gray-200 px-4 py-2 gap-3 w-40'>
                                                    <button
                                                        onClick={() => setShowForm({ type: "add", resource: resource, value: true })}
                                                        className='bg-blue-200 mb-2 whitespace-nowrap border mr-4 hover:border-blue-400 text-sm text-blue-600 font-medium h-8 px-4 rounded-full'
                                                    >
                                                        View Mandatory Details
                                                    </button>
                                                    <button
                                                        onClick={() => setShowForm({ type: "edit", resource: resource, value: true })}
                                                        className='bg-blue-200 border inline-flex items-center justify-center gap-2 mr-4 hover:border-blue-400 text-sm text-blue-600 font-medium h-8 px-4 rounded-full'
                                                    >
                                                        <Pencil className='w-4 h-4' /> Edit
                                                    </button>
                                                    <button
                                                        onClick={() => deleteRequest(resource.sfid)}
                                                        className='bg-red-200 border inline-flex items-center justify-center gap-2 hover:border-red-400 text-sm text-red-600 font-medium h-8 px-4 rounded-full'
                                                    >
                                                        <Trash className='w-4 h-4' /> Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </> : <>
                            <div className='bg-[url(/noRecordBG2.png)] bg-left-bottom bg-cover rounded-xl'>
                                <div className='w-full sticky -top-6 z-20 p-2 md:p-4 border-b bg-white flex flex-col xl:flex-row justify-between gap-4 items-end xl:items-center'>
                                    <DashboardStepper role={"company"} />
                                    <div className='flex items-center gap-3'>
                                        <button
                                            type='button'
                                            onClick={handlePrevious}
                                            className='bg-gray-300 text-bold text-white font-bold h-12 px-6 rounded-xl'
                                        >
                                            Previous
                                        </button>
                                        <button
                                            type='button'
                                            onClick={handleNext}
                                            className='bg-blue-500 text-bold text-white font-bold h-12 px-6 rounded-xl'
                                        >
                                            Save & Next
                                        </button>
                                    </div>
                                </div>
                                <div className='flex flex-col items-center justify-center p-6 h-80 w-full gap-2'>
                                    <h2 className='text-xl font-semibold mb-4'>Raise Resources Request for your Project : {project?.project_name}</h2>
                                    <button
                                        onClick={() => setShowForm({ type: "add", project: null, value: true })}
                                        className='bg-blue-500 text-white rounded-xl p-2 px-4 inline-flex gap-2 items-center justify-center'>
                                        Raise Resource Request
                                        <ArrowRight className='w-4 h-4' />
                                    </button>
                                </div>
                            </div>
                        </>}
                    </>}
                </>}
        </>
    )
}

export default RaiseResourceRequestForm
