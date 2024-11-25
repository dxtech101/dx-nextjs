"use client"
import InputField from '@/components/InputField';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Login() {

    const router = useRouter();

    return (
        <section className="relative bg-white h-fit lg:h-screen">
            <img className="absolute left-0 top-0 w-full h-full" src="https://static.shuffle.dev/components/preview/238eb578-e531-4cf4-a658-a1ff13c9b896/assets/public/flaro-assets/images/sign-in/gradient.svg" alt="" />
            <div className="relative flex flex-wrap h-full items-center justify-evenly">
                <div className="relative w-full md:w-1/2 p-8 flex flex-col justify-center items-center">
                    <div className="md:max-w-xl mx-auto md:pb-32 text-black flex flex-col gap-20">
                        <h1 className="text-3xl font-medium inline-flex items-center">
                            <Link href='/' className='mr-2'>
                                <ArrowLeft />
                            </Link>
                            DX Digital
                        </h1>
                        <span className='flex flex-col gap-6'>
                            <h2 className="text-4xl md:text-7xl font-medium leading-tight">
                                Sign in and hire smart minded people today!
                            </h2>
                            <p className='text-gray-500 text-xl'>
                                Unlock your potential with endless opportunities tailored just for you.
                            </p>
                        </span>
                    </div>
                </div>
                <div className="w-full md:w-1/2">
                    <div className="p-8 flex flex-col justify-center items-center h-fit lg:h-screen ">
                        <form className="w-full lg:w-3/4 flex flex-col gap-6">
                            <InputField
                                type="email"
                                label={"Email Address"}
                                className="w-full"
                                isRequired={true}
                            />
                            <InputField
                                type="password"
                                label={"Password"}
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
                                    className="py-4 mt-8 px-9 w-full text-white font-semibold border border-indigo-700 rounded-xl shadow-4xl focus:ring focus:ring-indigo-300 bg-indigo-600 hover:bg-indigo-700 transition ease-in-out duration-200"
                                    type="button"
                                    onClick={() => router.push('/company/dashboard')}
                                >
                                    Sign In
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

