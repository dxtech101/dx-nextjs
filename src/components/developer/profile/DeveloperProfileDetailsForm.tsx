"use client"
import Dropdown from '@/components/Dropdown'
import FileUpload from '@/components/FileUpload'
import InputDate from '@/components/InputDate'
import InputField from '@/components/InputField'
import MultiSelectDropdown from '@/components/MultiSelectDropdown'
import { industries } from '@/constants/data'
import { addUserProfile } from '@/feature/reducers/userProfile'
import { handleFormDataChange, validateForm } from '@/lib/helper'
import { updateProfile } from '@/lib/service/user.service'
import { forwardRef, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { allTimezones, useTimezoneSelect } from "react-timezone-select"

const labelStyle = "original"
const timezones = {
    ...allTimezones,
    "Europe/Berlin": "Frankfurt",
}

const DeveloperProfileDetailsForm = forwardRef(({
    personalDetails,
    loading,
    setLoading,
    setEditModal,
    updateDetails
}: any, ref: any) => {
    const dispatch = useDispatch();
    const [salutation, setSalutation] = useState<any>("")
    const [selectedFile, setSelectedFile] = useState()
    const [formData, setFormData] = useState<any>({
        "birth_date": "",
        "job_title": "",
        "work_experience": "",
        "industry_experience": "",
        "country": "",
        "preferred_time_zone": "",
        "profile_picture": "",
    })

    const [errors, setErrors] = useState<any>({

    })

    const { options, parseTimezone } = useTimezoneSelect({ labelStyle, timezones })

    useEffect(() => {
        setFormData({
            "first_name": personalDetails?.first_name || "",
            "last_name": personalDetails?.last_name || "",
            "phone": personalDetails?.phone || "",
            "birth_date": personalDetails?.birthdate || "",
            "job_title": personalDetails?.job_title || "",
            "work_year_experience": personalDetails?.work_experience || "",
            "industry_experience": personalDetails?.industry_experience || "",
            "country": personalDetails?.country || "",
            "preferred_time_zone": personalDetails?.preferred_timezone || ""
        })
    }, [personalDetails])

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!validateForm(formData, errors, setErrors)) return;

        const profileUpdateData = new FormData();
        console.log("formData.preferred_time_zone===>>>", formData.preferred_time_zone);

        if (formData.first_name) profileUpdateData.append("firstname", formData.first_name);
        if (formData.last_name) profileUpdateData.append("lastname", formData.last_name);
        if (formData.birth_date) profileUpdateData.append("birthdate", formData.birth_date);
        if (formData.job_title) profileUpdateData.append("job_title_c", formData.job_title);
        if (formData.work_year_experience) profileUpdateData.append("work_experience", formData.work_year_experience);
        if (formData.industry_experience) profileUpdateData.append("industry_experience_c", formData.industry_experience);
        if (formData.country) profileUpdateData.append("country_c", formData.country);
        if (formData.preferred_time_zone) profileUpdateData.append("preferred_timezone_c", formData.preferred_time_zone);
        if (selectedFile) profileUpdateData.append("profile_picture", selectedFile);

        setLoading(true);
        try {
            const { results } = await updateProfile(profileUpdateData);
            if (results) {
                dispatch(addUserProfile(results.user));
                setEditModal(false)
                updateDetails()
            }
        } catch (error) {
            console.error("Error uploading profile picture:", error);
        } finally {
            setLoading(false);
        }
    };

    console.log("FormData===>>>", formData);


    return (
        <form ref={ref} onSubmit={handleSubmit} className='flex flex-col gap-4 mt-4'>
            <div className='flex flex-col xl:flex-row items-start gap-4'>
                <div className='w-full xl:w-1/2'>
                    <FileUpload
                        uploadType="image"
                        loading={loading}
                        onFileSelect={setSelectedFile}
                    />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 w-full justify-between gap-4">
                    {/* <InputField
                        type="text"
                        isRequired={true}
                        label="First Name"
                        value={formData.first_name}
                        onChange={(e: any) =>
                            handleFormDataChange(e, setFormData, setErrors)
                        }
                        id="first_name"
                        className="w-full"
                        error={errors.first_name}
                        customTag={{ options: ["Mr", "Mrs", "Ms"] }}
                        setSalutation={setSalutation}
                        salutation={salutation}
                    />
                    <InputField
                        type="text"
                        isRequired={true}
                        label="Last Name"
                        value={formData.last_name}
                        onChange={(e: any) =>
                            handleFormDataChange(e, setFormData, setErrors)
                        }
                        id="last_name"
                        className="w-full"
                        error={errors.last_name}
                    /> */}
                    {/* <div className="flex flex-col gap-2">
                        <div className="w-full flex justify-between items-center">
                            <label className="text-sm font-bold text-gray-700 text-nowrap">
                                Phone Number <span className="text-red-600"> *</span>
                            </label>
                            {errors.phone && (
                                <span className="text-xs text-red-500 font-bold">
                                    {errors.phone}
                                </span>
                            )}
                        </div>
                        <PhoneInput
                            value={formData.phone}
                            onChange={(value) =>
                                setFormData((prev: any) => ({ ...prev, phone: value }))
                            }
                            defaultCountry="IN"
                            className={`h-12 pl-4 pr-4 w-full text-black border ${errors.phone
                                ? "border-red-400 bg-red-100"
                                : "border-gray-400 bg-white"
                                } rounded-xl`}
                        />
                    </div> */}
                    <InputField
                        type="text"
                        label="Job Title"
                        value={formData.job_title}
                        onChange={(e: any) =>
                            handleFormDataChange(e, setFormData, setErrors)
                        }
                        id="job_title"
                        className="w-full"
                        error={errors.job_title}
                    />
                    <InputDate
                        type="date"
                        label="Birth Date"
                        value={formData.birth_date}
                        onChange={(e: any) =>
                            handleFormDataChange(e, setFormData, setErrors)
                        }
                        id="birth_date"
                        className="w-full"
                        error={errors.birth_date}
                    />
                    <InputField
                        type="text"
                        label="Country"
                        value={formData.country}
                        onChange={(e: any) =>
                            handleFormDataChange(e, setFormData, setErrors)
                        }
                        id="country"
                        className="w-full"
                        error={errors.country}
                    />
                    <div className='col-span-2'>
                        <MultiSelectDropdown
                            id={'industry_experience'}
                            label={'Industry Experience'}
                            options={industries}
                            className=''
                            // defaultValues={formData.industry_experience}
                            onChange={(selectedValues) => setFormData({ ...formData, industry_experience: selectedValues })}
                        />
                    </div>

                    <Dropdown
                        label="Preferred Time Zone"
                        defaultValue={formData.preferred_time_zone}
                        onChange={(selectedValues) =>
                            setFormData({ ...formData, preferred_time_zone: selectedValues })
                        }
                        options={options}
                        id="preferred_time_zone"
                        className="w-full"
                    />

                    <InputField
                        type="number"
                        label="Work Experience (in years)"
                        value={formData.work_year_experience}
                        onChange={(e: any) =>
                            handleFormDataChange(e, setFormData, setErrors)
                        }
                        id="work_year_experience"
                        className="w-full"
                        error={errors.work_year_experience}
                    />
                </div>
            </div>
        </form>
    )
})

export default DeveloperProfileDetailsForm


