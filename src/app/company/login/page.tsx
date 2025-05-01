"use client"
import WebLayout from '@/app/(web)/layout';
import InputField from '@/components/InputField';
import ErrorToast from '@/components/toast/ErrorToast';
import SuccessfulToast from '@/components/toast/SuccessfulToast';
import { onBoardingHandleNext } from '@/feature/reducers/userOnboarding';
import { addUserProfile } from '@/feature/reducers/userProfile';
import { addSalesforceId } from '@/feature/reducers/userSalesforceId';
import { handleFormDataChange, validateForm } from '@/lib/helper';
import { getCompanySalesforceAccountId, userOnBoarded, userSignIn } from '@/lib/service/user.service';
import { ArrowLeft, LoaderCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';

export default function Login() {

    const router = useRouter();
    const dispatch = useDispatch();
    const [commingSoon, setCommingSoon] = useState(true);
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

    if (commingSoon) {
        return (
            <WebLayout>
                <section className="relative bg-white h-fit lg:h-screen p-6 xl:p-0 overflow-hidden">
                    <div className="relative z-10 flex flex-col lg:flex-row justify-around min-h-screen items-center gap-6 container mx-auto">
                        <div className="relative w-full flex flex-col justify-start items-start xl:max-w-lg mx-auto text-black gap-10">
                            <span className='flex flex-col gap-6'>
                                <h2 className="text-4xl md:text-7xl font-medium leading-tight">
                                    Coming Soon in May 2025!
                                </h2>
                                <p className='text-gray-500 text-md xl:text-xl'>
                                    Hire Exceptional Salesforce Experts for Your Projects
                                </p>
                                <Link href='/'>
                                    <div className="bg-black text-white px-6 py-2 w-fit rounded-full flex items-center">
                                        Explore more <span className="ml-1">→</span>
                                    </div>
                                </Link>
                            </span>
                        </div>
                        <div className='flex flex-col gap-6 items-center w-full relative'>
                            <div
                                className="size-[44rem] rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                style={{
                                    backgroundImage: 'radial-gradient(circle, rgba(139,92,246,0.5) 0%, transparent 70%)'
                                }}
                            />
                            <img src="/comingsoon.png" alt="sumo logo" className="rounded-xl aspect-auto object-cover h-48 lg:h-96 w-auto z-20" />
                        </div>
                    </div>
                </section>
            </WebLayout>
        )
    }

    return (
        <section className="relative bg-white h-fit lg:h-screen p-6 xl:p-0">
            <img className="absolute left-0 top-0 w-full h-full" src="https://static.shuffle.dev/components/preview/238eb578-e531-4cf4-a658-a1ff13c9b896/assets/public/flaro-assets/images/sign-in/gradient.svg" alt="" />
            <div className="relative z-10 flex flex-wrap justify-center min-h-screen items-center gap-6 container mx-auto">
                <div className="relative w-full flex flex-col justify-center items-start xl:max-w-lg mx-auto text-black gap-10">
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
                        <p className='text-gray-500 text-md xl:text-xl'>
                            Join Us to Discover and Hire Exceptional Salesforce Talent for Your Projects Today!
                        </p>
                    </span>
                </div>
                <div className="w-full xl:w-1/2">
                    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
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
        </section>
    )
}

