"use client"
import InputField from '@/components/InputField';
import SuccessModal from '@/components/modal/SuccessModal';
import ErrorToast from '@/components/toast/ErrorToast';
import SuccessfulToast from '@/components/toast/SuccessfulToast';
import { addUserCompany } from '@/feature/reducers/userCompany';
import { addUserProfile } from '@/feature/reducers/userProfile';
import { addSalesforceId } from '@/feature/reducers/userSalesforceId';
import { handleFormDataChange, validateForm } from '@/lib/helper';
import { forgetPassword, getDeveloperSalesforceContactId, userSignIn, verifyCompanyDeveloper } from '@/lib/service/user.service';
import { ArrowLeft, ArrowRight, LoaderCircle, Mail, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
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
    const [successModal, setSuccessModal] = useState(false);
    const [rememberMe, setRememberMe] = useState<any>(false);
    const [savedUserDetails, setSavedUserDetails] = useState<any>([]);
    const searchParams = useSearchParams();
    const next = searchParams.get("next");

    useEffect(() => {
        if (localStorage.getItem("savedUserDetails")) {
            setSavedUserDetails(JSON.parse(localStorage.getItem("savedUserDetails") || "[]"));
        }
    }, [])

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
            dispatch(addUserProfile(response.user));

            if (response && response?.user?.role === "Individual") {
                verifyCompanyDeveloper(response?.user?.email).then(async (res) => {
                    if (res) {
                        const { results: userSalesforceId } = await getDeveloperSalesforceContactId(response.user.email);
                        console.log(userSalesforceId);
                        dispatch(addSalesforceId(userSalesforceId[0].sfid));
                        dispatch(addUserCompany(userSalesforceId[0].company_developer));
                        toast.custom((t) => (
                            <SuccessfulToast t={t} message={"Logged in successfully"} />
                        ));
                        router.push(next ? next : '/developer/dashboard');
                        if (rememberMe) {
                            const existingData = JSON.parse(localStorage.getItem("savedUserDetails") || "[]");

                            const updatedData = Array.isArray(existingData) ? existingData : [];

                            updatedData.push({
                                email: formData.email,
                                password: formData.password,
                                profile_picture: response.user.profile_picture,
                                first_name: response.user.first_name,
                                last_name: response.user.last_name,
                            });

                            localStorage.setItem("savedUserDetails", JSON.stringify(updatedData));
                        }
                    }
                })
            } else if (response && response?.user?.role === "Company") {
                router.push(next ? next : '/company/dashboard');
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

    const handleForgetPassword = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setLoading(true)
            const response = await forgetPassword(formData.email);
            if (response) {
                setSuccessModal(true)
            }
        } catch (error: any) {
            console.log(error)
        }
        finally {
            setLoading(false)
        }
    };

    return (
        <>
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
                                Sign in and Grow Your Career!
                            </h2>
                            <p className='text-gray-500 text-md xl:text-xl'>
                                Unlock your potential with endless Salesforce opportunities tailored just for you.
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
                                    <button
                                        type='button'
                                        onClick={handleForgetPassword}
                                        className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                                        Forgot Password?
                                    </button>
                                </div>
                            </div>
                            <div className='w-8/12 lg:w-full mx-auto'>
                                {savedUserDetails && savedUserDetails.length > 0 && (
                                    <h3 className='text-xs font-medium'>Saved User Details</h3>
                                )}
                                {savedUserDetails && savedUserDetails.map((userDetail: any, index: any) => {
                                    return (
                                        <div className='relative flex flex-row group justify-between hover:bg-gray-100 border border-black/20 rounded-lg p-4 mt-2'>
                                            <button
                                                type='button'
                                                onClick={() => {
                                                    localStorage.removeItem("savedUserDetails");
                                                    setSavedUserDetails([]);
                                                }}
                                                className='bg-red-600 hidden group-hover:flex rounded-full p-2 text-white absolute -top-3 -right-3'>
                                                <Trash2 className='w-4 h-4 text-white' strokeWidth={2} />
                                            </button>
                                            <div className='flex flex-row gap-6 items-center'>
                                                <div className='w-16 h-16 bg-gray-400 rounded-full'>
                                                    <img src={userDetail?.profile_picture} alt='profile' className='w-full h-full rounded-full' />
                                                </div>

                                                <div className='flex flex-col gap-1'>
                                                    <span className='text-2xl font-bold'>{userDetail?.first_name}{" "}{userDetail?.last_name}</span>
                                                    <span className='text-sm inline-flex gap-2 items-center text-gray-700'><Mail className='w-4 h-4' />{userDetail?.email}</span>
                                                </div>
                                            </div>
                                            <button
                                                type='submit'
                                                onClick={() => {
                                                    setFormData({
                                                        ...formData,
                                                        email: userDetail?.email,
                                                        password: userDetail?.password,
                                                    })
                                                }}
                                                className='bg-gray-200 rounded-lg px-4'>
                                                <ArrowRight />
                                            </button>
                                        </div>
                                    )
                                })}

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
                </div>
            </section>
            {successModal &&
                <SuccessModal
                    type="forget"
                    email={formData.email}
                    onClose={() => setSuccessModal(false)}
                />}
        </>
    )
}

