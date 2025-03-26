"use client"
import InputField from '@/components/InputField';
import ErrorToast from '@/components/toast/ErrorToast';
import { handleFormDataChange, validateForm } from '@/lib/helper';
import { resetPassword } from '@/lib/service/user.service';
import { LoaderCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

export default function ResetPassword({ params }: any) {
    const { id } = params;
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        token: id,
        password: '',
    });
    const [errors, setErrors] = useState({
        password: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm(formData, errors, setErrors)) {
            return;
        }

        try {
            setLoading(true)
            const response = await resetPassword(formData);
            if(response){
                router.push("/developer/login")
            }
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
            <div className="w-full xl:w-1/2 z-20">
                <h2 className="text-4xl font-medium leading-tight mb-4">
                    Set your Password
                </h2>
                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
                    <InputField
                        type="password"
                        label={"Password"}
                        value={formData.password}
                        onChange={(e: any) => handleFormDataChange(e, setFormData, setErrors)}
                        id="password"
                        error={errors.password}
                        className="w-full"
                        isRequired={true}
                    />
                    <button
                        disabled={loading}
                        className="cursor-pointer mt-2 py-4 px-9 w-full text-white font-semibold border border-indigo-700 rounded-xl shadow-4xl focus:ring focus:ring-indigo-300 bg-indigo-600 hover:bg-indigo-700 transition ease-in-out duration-200"
                        type="submit"
                    >
                        {loading ?
                            <div className="flex items-center justify-center">
                                <LoaderCircle className="animate-spin h-6 w-auto mr-2" />
                                Loading...
                            </div>
                            : "Continue"}
                    </button>

                </form>
            </div>
        </section>
    )
}

