"use client"
import InputField from '@/components/InputField';
import SuccessModal from '@/components/modal/SuccessModal';
import ErrorToast from '@/components/toast/ErrorToast';
import { handleFormDataChange, validateForm } from '@/lib/helper';
import axios from 'axios';
import { ArrowLeft, Building2, CodeXml, LoaderCircle, ScrollText } from 'lucide-react';
import Link from 'next/link';
import React, { forwardRef, useState } from 'react';
import toast from 'react-hot-toast';
import PhoneInput from 'react-phone-number-input';
import Modal from '@/components/modal/Modal';
import 'react-phone-number-input/style.css'


const page = () => {
    const [selected, setSelected] = useState('Individual');
    const [successModal, setSuccessModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showTermsConditions, setShowTermsConditions] = useState(false);
    const [value, setValue] = useState<any>();
    const [formData, setFormData] = useState<any>({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        password: '',
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
        password: '',
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
        signupData.append('password', formData.password);
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

    console.log("value::", formData.phone, value);


    const handleFormDataChangePhone = (value: string) => {
        setFormData((prev: any) => ({ ...prev, phone: value }));
    };

    return (
        <section className="relative bg-white overflow-scroll lg:overflow-hidden min-h-screen">
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
                    <div className={`p-8 flex flex-col justify-center items-center h-fit w-full`}>
                        <div className='shadow-inner bg-black/10 my-10 flex flex-row w-full lg:w-3/4 justify-around text-black items-center h-16 p-2 rounded-xl gap-2'>
                            <button onClick={() => setSelected("Individual")} className={`text-sm lg:text-base ${selected === "Individual" ? "bg-white shadow-xl" : "bg-transparent text-slate-400 hover:text-slate-600 hover:bg-white/50"}  w-full h-full flex items-center justify-center gap-2 rounded-xl font-bold`}>
                                <div className={`${selected === "Individual" ? "bg-blue-100" : "bg-gray-200"} bg-blue-100 w-6 h-6 lg:w-8 lg:h-8 rounded-full flex items-center justify-center`}>
                                    <CodeXml className='h-4 lg:h-6' color={selected === "Individual" ? "#3b82fc" : "#4b5563"} strokeWidth={2} />
                                </div>
                                Developer
                            </button>
                            <button onClick={() => setSelected("Company")} className={`text-sm lg:text-base ${selected === "Company" ? "bg-white shadow-xl" : "bg-transparent text-slate-400 hover:text-slate-600 hover:bg-white/50"} group w-full h-full flex items-center justify-center gap-2 rounded-xl font-bold`}>
                                <div className={`${selected === "Company" ? "bg-blue-100" : "bg-gray-200 group-hover:bg-gray-100"} bg-blue-100 w-6 h-6 lg:w-8 lg:h-8 rounded-full flex items-center justify-center`}>
                                    <Building2 className='h-4 lg:h-6' color={selected === "Company" ? "#3b82fc" : "#4b5563"} strokeWidth={2} />
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


                            <div className='flex flex-col lg:flex-row gap-4'>
                                {selected === "Company" && (
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
                            </div>


                            <InputField
                                type="password"
                                label="Password"
                                value={formData.password}
                                isRequired={true}
                                onChange={(e: any) => handleFormDataChange(e, setFormData, setErrors)}
                                id="password"
                                className="w-full"
                                placeholder="Enter Password"
                                error={errors.password}
                            />

                            <div className='flex flex-col w-full gap-2'>
                                <label className='text-sm font-bold text-gray-700 text-nowrap'>
                                    Phone Number <span className='text-red-600'>{" "}*</span>
                                </label>
                                <PhoneInput
                                    value={formData.phone} // Ensure `value` comes from formData
                                    onChange={(value) => setFormData((prev: any) => ({ ...prev, phone: value }))} // Update formData.phone on change
                                    defaultCountry="IN"
                                    className="h-12 pl-4 pr-4 w-full text-black border border-gray-400 bg-gray-50 rounded-xl"
                                />
                            </div>

                            <div className='flex flex-row items-center justify-start gap-2 w-full'>
                                <input type="checkbox" className="" name="terms" id="terms" required />
                                <label htmlFor="terms" className="text-sm text-gray-700">
                                    I agree to the{" "}
                                    <button
                                        type='button'
                                        onClick={() => setShowTermsConditions(true)}
                                        className="text-blue-600 font-semibold">
                                        {" "}Terms and Conditions
                                    </button>
                                </label>
                            </div>

                            <button
                                // disabled={loading}
                                className="mb-3 py-3 px-9 w-full text-white rounded-xl text-sm bg-indigo-600"
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
                        <div className='text-sm text-black float-start'>
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
            {showTermsConditions &&
                <Modal
                    header="Terms and Conditions"
                    setModal={setShowTermsConditions}
                    size="md"
                    submitButtonText="Accept"
                    onSubmit={() => setShowTermsConditions(false)}
                >
                    <div className="bg-gray-100 px-10 pb-10 rounded-lg">
                        <div className='flex flex-col py-10 items-center justify-center gap-4'>
                            <ScrollText className='w-20 h-20 text-gray-500 text-4xl' />
                            <h1 className="text-2xl font-bold text-center uppercase text-gray-800 tracking-wide space-x-6 whitespace-nowrap">Terms and Conditions</h1>
                        </div>

                        <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-700">1. Introduction</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Welcome to <span className="font-medium">DX Digital</span>! These terms and conditions outline the rules and regulations for using our website, located at
                            <span className="font-medium">[Website URL]</span>.
                        </p>
                        <p className="mt-4 text-gray-600 leading-relaxed">
                            By accessing this website, we assume you accept these terms and conditions. Do not continue to use
                            <span className="font-medium">[Website Name]</span> if you do not agree to all the terms and conditions stated on this page.
                        </p>

                        <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-700">2. Intellectual Property Rights</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Unless otherwise stated, <span className="font-medium">DX Digital</span> owns the intellectual property rights for all material on this website. All intellectual property rights are reserved. You may access this material for your own personal use, subject to restrictions set in these terms and conditions.
                        </p>
                        <ul className="list-disc ml-6 mt-4 text-gray-600">
                            <li>Republish material from <span className="font-medium">[Website Name]</span></li>
                            <li>Sell, rent, or sub-license material from <span className="font-medium">[Website Name]</span></li>
                            <li>Reproduce, duplicate, or copy material from <span className="font-medium">[Website Name]</span></li>
                            <li>Redistribute content from <span className="font-medium">[Website Name]</span> without explicit permission</li>
                        </ul>

                        <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-700">3. User Responsibilities</h2>
                        <p className="text-gray-600 leading-relaxed">
                            By using our website, you agree to:
                        </p>
                        <ul className="list-disc ml-6 mt-4 text-gray-600">
                            <li>Provide accurate and up-to-date information.</li>
                            <li>Use the website in a lawful manner and not engage in fraudulent activities.</li>
                            <li>Respect the privacy and rights of other users.</li>
                        </ul>

                        <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-700">4. Limitation of Liability</h2>
                        <p className="text-gray-600 leading-relaxed">
                            <span className="font-medium">DX Digital</span> will not be held responsible for any damages that arise from the use of our website. This includes, but is not limited to, direct, indirect, incidental, or consequential damages.
                        </p>

                        <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-700">5. Third-Party Links</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Our website may contain links to third-party websites or services. We are not responsible for the content or practices of these external sites.
                        </p>

                        <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-700">6. Privacy Policy</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Your use of this website is also governed by our{" "}
                            {/* <a href="[Link to Privacy Policy]" className="text-blue-600 underline">{" "}Privacy Policy</a>,  */}
                            which explains how we collect, use, and protect your data.
                        </p>

                        <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-700">7. Modifications to Terms</h2>
                        <p className="text-gray-600 leading-relaxed">
                            <span className="font-medium">DX Digital</span> reserves the right to update or modify these terms at any time. Continued use of the website after changes indicates your acceptance of the new terms.
                        </p>

                        <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-700">8. Governing Law</h2>
                        <p className="text-gray-600 leading-relaxed">
                            These terms and conditions are governed by and construed in accordance with the laws of <span className="font-medium">[Your Country/State]</span>, and you submit to the exclusive jurisdiction of the courts in that location.
                        </p>

                        <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-700">9. Contact Us</h2>
                        <p className="text-gray-600 leading-relaxed">
                            If you have any questions about these Terms and Conditions, please contact us at:
                        </p>
                        {/* <ul className="list-none mt-4 text-gray-600">
                            <li>Email: <a href="mailto:[Email Address]" className="text-blue-600 underline">[Email Address]</a></li>
                            <li>Phone: <a href="tel:[Phone Number]" className="text-blue-600 underline">[Phone Number]</a></li>
                        </ul> */}
                    </div>
                </Modal>
            }
        </section>
    )
}

export default page
