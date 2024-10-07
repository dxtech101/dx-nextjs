"use client"
import React, { useState } from 'react'
import { CodeXml, Building2 } from 'lucide-react';
import Link from 'next/link';

const page = () => {
    const [selected, setSelected] = useState('developer')

    return (
        <section className="relative bg-white overflow-hidden h-screen">
            <img className="absolute left-0 bottom-0" src="https://static.shuffle.dev/components/preview/238eb578-e531-4cf4-a658-a1ff13c9b896/assets/public/flaro-assets/images/sign-up/gradient.svg" alt="" />
            <div className="relative z-10 flex flex-wrap -m-8">
                <div className="w-full md:w-1/2 p-8">
                    <div className="container px-4 mx-auto">
                        <div className="flex flex-wrap">
                            <div className="w-full">
                                <div className="md:max-w-lg mx-auto  md:pb-32 text-black">
                                    <Link className="mb-28 inline-block" href="#">
                                        <img src="flaro-assets/logos/flaro-logo-black-xl.svg" alt="" />
                                    </Link>
                                    <h2 className="mb-32 text-6xl md:text-7xl font-bold font-heading tracking-px-n leading-tight">Create an account & get started.</h2>
                                    <h3 className="mb-9 text-xl font-bold font-heading leading-normal">Why should you join us?</h3>
                                    <ul className="md:max-w-xs">
                                        <li className="mb-5 flex flex-wrap">
                                            <svg className="mr-2" width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M12.5 23C18.0228 23 22.5 18.5228 22.5 13C22.5 7.47715 18.0228 3 12.5 3C6.97715 3 2.5 7.47715 2.5 13C2.5 18.5228 6.97715 23 12.5 23ZM17.1339 11.3839C17.622 10.8957 17.622 10.1043 17.1339 9.61612C16.6457 9.12796 15.8543 9.12796 15.3661 9.61612L11.25 13.7322L9.63388 12.1161C9.14573 11.628 8.35427 11.628 7.86612 12.1161C7.37796 12.6043 7.37796 13.3957 7.86612 13.8839L10.3661 16.3839C10.8543 16.872 11.6457 16.872 12.1339 16.3839L17.1339 11.3839Z" fill="#4F46E5"></path>
                                            </svg>
                                            <span className="flex-1 font-medium leading-relaxed">The best you can do in no time at all, amazing feature goes here</span>
                                        </li>
                                        <li className="mb-5 flex flex-wrap">
                                            <svg className="mr-2" width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M12.5 23C18.0228 23 22.5 18.5228 22.5 13C22.5 7.47715 18.0228 3 12.5 3C6.97715 3 2.5 7.47715 2.5 13C2.5 18.5228 6.97715 23 12.5 23ZM17.1339 11.3839C17.622 10.8957 17.622 10.1043 17.1339 9.61612C16.6457 9.12796 15.8543 9.12796 15.3661 9.61612L11.25 13.7322L9.63388 12.1161C9.14573 11.628 8.35427 11.628 7.86612 12.1161C7.37796 12.6043 7.37796 13.3957 7.86612 13.8839L10.3661 16.3839C10.8543 16.872 11.6457 16.872 12.1339 16.3839L17.1339 11.3839Z" fill="#4F46E5"></path>
                                            </svg>
                                            <span className="flex-1 font-medium leading-relaxed">24/7 Support of our dedicated, highly professional team</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/2 p-8">
                    <div className={`p-4 flex flex-col justify-start items-center bg-blue-50 h-full`}>
                        <div className='shadow-inner bg-black/10 my-10 flex flex-row w-3/4 justify-around text-black items-center h-16 p-2 rounded-xl gap-2'>
                            <button onClick={() => setSelected("developer")} className={`${selected === "developer" ? "bg-white shadow-xl" : "bg-transparent text-slate-400 hover:text-slate-600 hover:bg-white/50"}  w-full h-full flex items-center justify-center gap-2 rounded-xl font-bold`}>
                                <div className={`${selected === "developer" ? "bg-blue-100" : "bg-gray-200"} bg-blue-100 w-8 h-8 rounded-full flex items-center justify-center`}><CodeXml size={20} color={selected === "developer" ? "#3b82fc" : "#4b5563"} strokeWidth={2} /> </div>  Developer
                            </button>
                            <button onClick={() => setSelected("company")} className={`${selected === "company" ? "bg-white shadow-xl" : "bg-transparent text-slate-400 hover:text-slate-600 hover:bg-white/50"} group w-full h-full flex items-center justify-center gap-2 rounded-xl font-bold`}>
                                <div className={`${selected === "company" ? "bg-blue-100" : "bg-gray-200 group-hover:bg-gray-100"} bg-blue-100 w-8 h-8 rounded-full flex items-center justify-center`}><Building2 size={20} color={selected === "company" ? "#3b82fc" : "#4b5563"} strokeWidth={2} /> </div>
                                Company
                            </button>
                        </div>
                        <form className="w-3/4">
                            <div className='flex flex-row w-full justify-between gap-4'>
                                <label className="block mb-4 flex-1">
                                    <p className="mb-2 text-gray-900 font-semibold leading-normal">First Name *</p>
                                    <div className="flex flex-wrap sm:flex-nowrap">
                                        <div className="w-full sm:w-auto">
                                            <div className="relative h-full">
                                                <select className="appearance-none py-2 pl-3.5 pr-10 text-sm text-neutral-500 font-medium w-full h-full bg-light outline-none cursor-pointer rounded-tl-lg rounded-bl-lg border border-gray-300">
                                                    <option value="US">Mr</option>
                                                    <option value="US">Mrs</option>
                                                    <option value="US">Ms</option>
                                                </select>
                                                <svg className="absolute top-1/2 right-4 transform -translate-y-1/2" width="16" height="22" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12.6673 9L8.00065 13.6667L3.33398 9" stroke="#495460" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="w-full sm:flex-1">
                                            <input className="px-4 py-3.5 w-full text-gray-400 font-medium placeholder-gray-400 bg-white outline-none border border-gray-300 rounded-tr-lg rounded-br-lg focus:ring focus:ring-indigo-300" id="inputsInput14-1" type="text" placeholder="First Name" />
                                        </div>
                                    </div>
                                </label>

                                <label className="block mb-4">
                                    <p className="mb-2 text-gray-900 font-semibold leading-normal">Last Name *</p>
                                    <input className="px-4 py-3.5 w-full text-gray-400 font-medium placeholder-gray-400 bg-white outline-none border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300" id="signUpInput1-1" type="text" placeholder="Last name" />
                                </label>
                            </div>


                            {selected === "company" && (
                                <div className='flex flex-row gap-4'>
                                    <label className="block mb-4 flex-1">
                                        <p className="mb-2 text-gray-900 font-semibold leading-normal">Company Name *</p>
                                        <input className="px-4 py-3.5 w-full text-gray-400 font-medium placeholder-gray-400 bg-white outline-none border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300" id="signUpInput1-1" type="text" placeholder="First name" />
                                    </label>
                                    <label className="block mb-4 flex-1">
                                        <p className="mb-2 text-gray-900 font-semibold leading-normal">Industry *</p>
                                        <input className="px-4 py-3.5 w-full text-gray-400 font-medium placeholder-gray-400 bg-white outline-none border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300" id="signUpInput1-1" type="text" placeholder="Last name" />
                                    </label>
                                </div>
                            )}

                            <label className="block mb-4">
                                <p className="mb-2 text-gray-900 font-semibold leading-normal">Email Address *</p>
                                <input className="px-4 py-3.5 w-full text-gray-400 font-medium placeholder-gray-400 bg-white outline-none border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300" id="signUpInput1-2" type="text" placeholder="Enter email address" />
                            </label>
                            <label className="block mb-5">
                                <p className="mb-2 text-gray-900 font-semibold leading-normal">Phone Number *</p>
                                <input className="px-4 py-3.5 w-full text-gray-400 font-medium placeholder-gray-400 bg-white outline-none border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300" id="signUpInput1-3" type="password" placeholder="********" />
                            </label>
                            <button className="mb-3 py-4 px-9 w-full text-white font-semibold border border-indigo-700 rounded-xl shadow-4xl focus:ring focus:ring-indigo-300 bg-indigo-600 hover:bg-indigo-700 transition ease-in-out duration-200" type="button">Sign Up</button>

                            <div className='text-black'>
                                Already have an account? <Link className="text-indigo-600 hover:text-indigo-700 font-extrabold" href={`/${selected}/login`}>Login</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default page
