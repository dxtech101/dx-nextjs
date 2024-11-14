"use client"
import InputField from '@/components/InputField';
import SuccessModal from '@/components/modal/SuccessModal';
import ErrorToast from '@/components/toast/ErrorToast';
import { handleFormDataChange, validateForm } from '@/lib/helper';
import axios from 'axios';
import { Building2, CodeXml, LoaderCircle } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import toast from 'react-hot-toast';


const page = () => {
    const [selected, setSelected] = useState('developer');
    const [successModal, setSuccessModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [country, setCountry] = useState('US')
    const [formData, setFormData] = useState<any>({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        ...(selected === 'company' && { company_name: '', industry: '' }),
        role: selected
    });

    const [errors, setErrors] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        company_name: '',
        industry: '',
        role: selected
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm(formData, setErrors)) {
            return;
        }

        const signupData = new FormData();
        signupData.append('first_name', formData.first_name);
        signupData.append('last_name', formData.last_name);
        signupData.append('email', formData.email);
        signupData.append('phone', formData.phone);
        if (selected === 'company') {
            signupData.append('company_name', formData.company_name);
            signupData.append('industry', formData.industry);
        }
        signupData.append('role', selected);
        signupData.append('medium', "email");
        try {
            setLoading(true);
            const response = await axios.post('/users/enroll-user/', signupData);
            console.log(response.data);
            setSuccessModal(true)
        } catch (error: any) {
            toast.custom((t) => (
                <ErrorToast t={t} message={error.response.data.error} />
            ))
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <section className="relative bg-white overflow-scroll lg:overflow-hidden h-full md:h-screen">
            <div className="relative z-10 flex flex-wrap m-0 lg:-m-8">
                <div className="relative w-full md:w-1/2 p-3 lg:p-8">
                    <img className="absolute left-0 bottom-0" src="https://static.shuffle.dev/components/preview/238eb578-e531-4cf4-a658-a1ff13c9b896/assets/public/flaro-assets/images/sign-up/gradient.svg" alt="" />
                    <div className="container px-4 mx-auto">
                        <div className="flex flex-wrap">
                            <div className="w-full">
                                <div className="md:max-w-lg mx-auto  md:pb-32 text-black">
                                    <Link className="mb-28 inline-block" href="#">
                                        <img src="flaro-assets/logos/flaro-logo-black-xl.svg" alt="" />
                                    </Link>
                                    <h2 className="mb-32 text-5xl md:text-7xl font-bold font-heading tracking-px-n leading-tight">Create an account & get started.</h2>
                                    <h3 className="mb-9 text-xl font-bold font-heading leading-normal">Why should you join us?</h3>
                                    <ul className="md:max-w-xs">
                                        <li className="mb-5 flex flex-wrap">
                                            <svg className="mr-2" width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M12.5 23C18.0228 23 22.5 18.5228 22.5 13C22.5 7.47715 18.0228 3 12.5 3C6.97715 3 2.5 7.47715 2.5 13C2.5 18.5228 6.97715 23 12.5 23ZM17.1339 11.3839C17.622 10.8957 17.622 10.1043 17.1339 9.61612C16.6457 9.12796 15.8543 9.12796 15.3661 9.61612L11.25 13.7322L9.63388 12.1161C9.14573 11.628 8.35427 11.628 7.86612 12.1161C7.37796 12.6043 7.37796 13.3957 7.86612 13.8839L10.3661 16.3839C10.8543 16.872 11.6457 16.872 12.1339 16.3839L17.1339 11.3839Z" fill="#4F46E5"></path>
                                            </svg>
                                            <span className="flex-1 font-medium leading-relaxed">The best you can do in no time at all, amazing feature goes here</span>
                                        </li>
                                        <li className="mb-5 flex flex-wrap">
                                            <svg className="mr-2" width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M12.5 23C18.0228 23 22.5 18.5228 22.5 13C22.5 7.47715 18.0228 3 12.5 3C6.97715 3 2.5 7.47715 2.5 13C2.5 18.5228 6.97715 23 12.5 23ZM17.1339 11.3839C17.622 10.8957 17.622 10.1043 17.1339 9.61612C16.6457 9.12796 15.8543 9.12796 15.3661 9.61612L11.25 13.7322L9.63388 12.1161C9.14573 11.628 8.35427 11.628 7.86612 12.1161C7.37796 12.6043 7.37796 13.3957 7.86612 13.8839L10.3661 16.3839C10.8543 16.872 11.6457 16.872 12.1339 16.3839L17.1339 11.3839Z" fill="#4F46E5"></path>
                                            </svg>
                                            <span className="flex-1 font-medium leading-relaxed">24/7 Support of our dedicated, highly professional team</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/2 lg:p-8 h-fit">
                    <div className={`p-8 flex flex-col justify-start items-center bg-blue-50 h-fit lg:h-screen w-full`}>
                        <div className='shadow-inner bg-black/10 my-10 flex flex-row w-full lg:w-3/4 justify-around text-black items-center h-16 p-2 rounded-xl gap-2'>
                            <button onClick={() => setSelected("developer")} className={`text-sm lg:text-base ${selected === "developer" ? "bg-white shadow-xl" : "bg-transparent text-slate-400 hover:text-slate-600 hover:bg-white/50"}  w-full h-full flex items-center justify-center gap-2 rounded-xl font-bold`}>
                                <div className={`${selected === "developer" ? "bg-blue-100" : "bg-gray-200"} bg-blue-100 w-6 h-6 lg:w-8 lg:h-8 rounded-full flex items-center justify-center`}>
                                    <CodeXml className='h-4 lg:h-6' color={selected === "developer" ? "#3b82fc" : "#4b5563"} strokeWidth={2} />
                                </div>
                                Developer
                            </button>
                            <button onClick={() => setSelected("company")} className={`text-sm lg:text-base ${selected === "company" ? "bg-white shadow-xl" : "bg-transparent text-slate-400 hover:text-slate-600 hover:bg-white/50"} group w-full h-full flex items-center justify-center gap-2 rounded-xl font-bold`}>
                                <div className={`${selected === "company" ? "bg-blue-100" : "bg-gray-200 group-hover:bg-gray-100"} bg-blue-100 w-6 h-6 lg:w-8 lg:h-8 rounded-full flex items-center justify-center`}>
                                    <Building2 className='h-4 lg:h-6' color={selected === "company" ? "#3b82fc" : "#4b5563"} strokeWidth={2} />
                                </div>
                                Company
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="w-full lg:w-3/4 flex flex-col gap-6 ">
                            <div className='flex flex-col lg:flex-row w-full justify-between gap-4'>
                                <InputField
                                    type="text"
                                    isRequired={true}
                                    label="First Name"
                                    value={formData.first_name}
                                    onChange={(e: any) => handleFormDataChange(e, setFormData, setErrors)}
                                    id="first_name"
                                    className="w-full"
                                    placeholder="Enter first name"
                                    error={errors.first_name}
                                    customTag={{ options: ["Mr", "Mrs", "Ms"] }}
                                />

                                <InputField
                                    type="text"
                                    isRequired={true}
                                    label="Last Name"
                                    value={formData.last_name}
                                    onChange={(e: any) => handleFormDataChange(e, setFormData, setErrors)}
                                    id="last_name"
                                    className="w-full"
                                    placeholder="Enter last name"
                                    error={errors.last_name}
                                />
                            </div>

                            {selected === "company" && (
                                <div className='flex flex-col lg:flex-row gap-4'>
                                    <InputField
                                        type="text"
                                        isRequired={true}
                                        label="Company Name"
                                        value={formData.company_name}
                                        onChange={(e: any) => handleFormDataChange(e, setFormData, setErrors)}
                                        id="company_name"
                                        className="w-full"
                                        placeholder="Enter company name"
                                        error={errors.company_name}
                                    />
                                    <InputField
                                        type="text"
                                        label="Industry"
                                        isRequired={true}
                                        value={formData.industry}
                                        onChange={(e: any) => handleFormDataChange(e, setFormData, setErrors)}
                                        id="industry"
                                        className="w-full"
                                        placeholder="Enter industry"
                                        error={errors.industry}
                                    />
                                </div>
                            )}

                            <InputField
                                type="email"
                                label="Email Address"
                                value={formData.email}
                                isRequired={true}
                                onChange={(e: any) => handleFormDataChange(e, setFormData, setErrors)}
                                id="email"
                                className="w-full"
                                placeholder="Enter email address"
                                error={errors.email}
                            />

                            <InputField
                                type="tel"
                                label="Phone Number"
                                isRequired={true}
                                value={formData.phone}
                                onChange={(e: any) => handleFormDataChange(e, setFormData, setErrors)}
                                id="phone"
                                className="w-full"
                                placeholder="Enter phone number"
                                error={errors.phone}
                            />
                            <button
                                // disabled={loading}
                                className="mb-3 py-4 px-9 w-full text-white rounded-xl bg-indigo-600"
                                type="submit">
                                {loading ?
                                    <div className="flex items-center justify-center">
                                        <LoaderCircle className="animate-spin h-6 w-auto mr-2" />
                                        Loading...
                                    </div>
                                    : "Sign Up"
                                }
                            </button>
                        </form>
                        <div className='text-black float-start'>
                            Already have an account?{" "}
                            <Link
                                href={`/${selected}/login`}
                                className='font-bold text-blue-600'
                            >
                                SignIn
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            {successModal && <SuccessModal email={formData.email} />}
        </section>
    )
}

export default page
