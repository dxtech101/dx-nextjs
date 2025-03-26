"use client"
import InputField from '@/components/InputField';
import ErrorToast from '@/components/toast/ErrorToast';
import { handleFormDataChange, validateForm } from '@/lib/helper';
import { LoaderCircle } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

export default function Login() {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        old_password: '',
        new_password: '',
    });
    const [errors, setErrors] = useState({
        old_password: '',
        new_password: ''
    });
    const [rememberMe, setRememberMe] = useState<any>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm(formData, errors, setErrors)) {
            return;
        }

        try {
            setLoading(true)
        } catch (error: any) {
            toast.custom((t) => (
                <ErrorToast t={t} message={error?.response?.data?.error} />
            ))
        }
        finally {
            setLoading(false)
        }
    };

    return (
        <section className="relative bg-white h-screen w-full flex items-center justify-center p-6">
            <img className="absolute left-0 top-0 w-full h-screen" src="https://dx-assests.s3.amazonaws.com/assets/gradient.svg" alt="" />
            <div className="w-full xl:w-1/2">
                <h2 className="text-4xl font-medium leading-tight mb-4">
                    Reset Password
                </h2>
                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
                    <InputField
                        type="password"
                        label={"Old Password"}
                        className="w-full"
                        value={formData.old_password}
                        onChange={(e: any) => handleFormDataChange(e, setFormData, setErrors)}
                        id="email"
                        error={errors.old_password}
                        isRequired={true}
                    />
                    <InputField
                        type="password"
                        label={"New Password"}
                        value={formData.new_password}
                        onChange={(e: any) => handleFormDataChange(e, setFormData, setErrors)}
                        id="password"
                        error={errors.new_password}
                        className="w-full"
                        isRequired={true}
                        onBlur={() => {}}
                    />
                    <div className="flex flex-wrap justify-between -m-2">
                        <div className="w-auto p-2">
                            <div className="flex items-center">
                                <input
                                    className="w-4 h-4"
                                    id="default-checkbox"
                                    type="checkbox"
                                    value={rememberMe}
                                    onChange={() => setRememberMe(!rememberMe)}
                                />
                                <label className="ml-2 text-sm text-gray-900 font-medium" htmlFor="default-checkbox">Remember Me</label>
                            </div>
                        </div>
                        <div className="w-auto p-2">
                            <Link className="text-sm text-indigo-600 hover:text-indigo-700 font-medium" href="#">
                                Forgot Password?
                            </Link>
                        </div>
                    </div>
                    <button
                        disabled={loading}
                        className="mt-2 py-4 px-9 w-full text-white font-semibold border border-indigo-700 rounded-xl shadow-4xl focus:ring focus:ring-indigo-300 bg-indigo-600 hover:bg-indigo-700 transition ease-in-out duration-200"
                        type="submit"
                    >
                        {loading ?
                            <div className="flex items-center justify-center">
                                <LoaderCircle className="animate-spin h-6 w-auto mr-2" />
                                Loading...
                            </div>
                            : "Login"}
                    </button>

                </form>
            </div>
        </section>
    )
}

