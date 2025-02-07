"use client"
import InputField from '@/components/InputField';
import ErrorToast from '@/components/toast/ErrorToast';
import SuccessfulToast from '@/components/toast/SuccessfulToast';
import { onBoardingHandleNext } from '@/feature/reducers/userOnboarding';
import { addUserProfile } from '@/feature/reducers/userProfile';
import { addSalesforceId } from '@/feature/reducers/userSalesforceId';
import { handleFormDataChange, validateForm } from '@/lib/helper';
import { getCompanySalesforceAccountId, userOnBoarded, userSignIn } from '@/lib/service/user.service';
import { ArrowLeft, LoaderCircle } from 'lucide-react';
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';

export default function Login() {

    const router = useRouter();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        medium: 'email'
    });
    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm(formData, errors, setErrors)) {
            return;
        }

        const loginData = new FormData();
        loginData.append('email', formData.email);
        loginData.append('password', formData.password);
        loginData.append('medium', "email");

        try {
            setLoading(true)
            const response: any = await userSignIn(loginData);
            const { results: userSalesforceId } = await getCompanySalesforceAccountId(response.user.email);
            console.log(userSalesforceId);

            if (response && response.user) {
                const { results } = await userOnBoarded(response.user.id);
                if (results) {
                    dispatch(addUserProfile(results));
                }
                dispatch(addSalesforceId(userSalesforceId[0].sfid));
                toast.custom((t) => (
                    <SuccessfulToast t={t} message={"Logged in successfully"} />
                ));
                dispatch(onBoardingHandleNext({ role: "developer", stepperId: 2 }))
                if (response.user.role === "Individual") {
                    router.push('/developer/dashboard');
                } else if (response.user.role === "Company") {
                    router.push('/company/dashboard');
                }
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
        <section className="relative bg-white h-fit lg:h-screen">
            <img className="absolute left-0 top-0 w-full h-full" src="https://static.shuffle.dev/components/preview/238eb578-e531-4cf4-a658-a1ff13c9b896/assets/public/flaro-assets/images/sign-in/gradient.svg" alt="" />
            <div className="relative flex flex-wrap h-full items-center justify-evenly">
                <div className="relative w-full md:w-1/2 p-8 flex flex-col justify-center items-center">
                    <div className="md:max-w-xl mx-auto md:pb-32 text-black flex flex-col gap-20">
                        <h1 className="text-3xl font-medium inline-flex gap-4 items-center">
                            <Link href='/' className='p-3 border border-gray-900 rounded-full'>
                                <ArrowLeft />
                            </Link>
                            DX Digital
                        </h1>
                        <span className='flex flex-col gap-6'>
                            <h2 className="text-4xl md:text-7xl font-medium leading-tight">
                                Sign in and hire smart minded people today!
                            </h2>
                            <p className='text-gray-500 text-xl'>
                                Join Us to Discover and Hire Exceptional Salesforce Talent for Your Projects Today!
                            </p>
                        </span>
                    </div>
                </div>
                <div className="w-full md:w-1/2">
                    <div className="p-8 flex flex-col justify-center items-center h-fit lg:h-screen ">
                        <form onSubmit={handleSubmit} className="w-full lg:w-3/4 flex flex-col gap-6">
                            <InputField
                                type="email"
                                label={"Email Address"}
                                className="w-full"
                                value={formData.email}
                                onChange={(e: any) => handleFormDataChange(e, setFormData, setErrors)}
                                id="email"
                                error={errors.email}
                                isRequired={true}
                            />
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
                            <div className="flex flex-wrap justify-between -m-2 mb-4">
                                <div className="w-auto p-2">
                                    <div className="flex items-center">
                                        <input className="w-4 h-4" id="default-checkbox" type="checkbox" value="" />
                                        <label className="ml-2 text-sm text-gray-900 font-medium" htmlFor="default-checkbox">Remember Me</label>
                                    </div>
                                </div>
                                <div className="w-auto p-2"><Link className="text-sm text-indigo-600 hover:text-indigo-700 font-medium" href="#">Forgot Password?</Link></div>
                                <button
                                    disabled={loading}
                                    className="mt-8 py-4 px-9 w-full text-white font-semibold border border-indigo-700 rounded-xl shadow-4xl focus:ring focus:ring-indigo-300 bg-indigo-600 hover:bg-indigo-700 transition ease-in-out duration-200"
                                    type="submit"
                                >
                                    {loading ?
                                        <div className="flex items-center justify-center">
                                            <LoaderCircle className="animate-spin h-6 w-auto mr-2" />
                                            Loading...
                                        </div>
                                        : "Login"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

