"use client"
import InputField from '@/components/InputField';
import SuccessModal from '@/components/modal/SuccessModal';
import ErrorToast from '@/components/toast/ErrorToast';
import { handleFormDataChange, validateForm } from '@/lib/helper';
import axios from 'axios';
import { ArrowLeft, Building2, CodeXml, LoaderCircle } from 'lucide-react';
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
            <img className="absolute left-0 bottom-0 z-10 w-full h-full" src="https://static.shuffle.dev/components/preview/238eb578-e531-4cf4-a658-a1ff13c9b896/assets/public/flaro-assets/images/sign-up/gradient.svg" alt="" />
            <div className="relative z-10 flex flex-wrap m-0 lg:-m-8">
                <div className="relative w-full md:w-1/2 p-8 lg:p-8 flex flex-col justify-center items-center">
                    <div className="md:max-w-lg mx-auto md:pb-32 text-black flex flex-col gap-20">
                        <h1 className="text-3xl font-medium inline-flex gap-4 items-center">
                            <Link href='/' className='p-3 border border-gray-900 rounded-full'>
                                <ArrowLeft />
                            </Link>
                            DX Digital
                        </h1>
                        <h2 className="text-4xl md:text-7xl font-medium leading-tight">
                            Create an account & get started.
                        </h2>
                    </div>
                </div>
                <div className="relative w-full md:w-1/2 lg:p-8 h-fit">
                    <div className={`p-8 flex flex-col justify-start items-center h-fit lg:h-screen w-full`}>
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
                                type="password"
                                label="Password"
                                value={formData.password}
                                isRequired={true}
                                onChange={(e: any) => handleFormDataChange(e, setFormData, setErrors)}
                                id="password"
                                className="w-full"
                                placeholder="Enter Password"
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
