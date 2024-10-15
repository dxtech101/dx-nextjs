"use client"
import { BellIcon, Home, HomeIcon, MessageCircle } from 'lucide-react'
import React from 'react'
import Stepper from './onboarding/Stepper'
import { useSelector } from 'react-redux';

const Navbar = () => {
    const onboarding = true;
    const developerOnboarding = useSelector((state: any) => state.developerOnboarding)
    console.log("developerOnboarding::", developerOnboarding)

    return (
        <section className="py-5 px-6 bg-white shadow-sm border border-gray-300 rounded-3xl w-full">
            <nav className="relative">
                <div className="flex items-center justify-between">
                    {onboarding ?
                        <Stepper /> :
                        <div className="flex items-center mr-auto">
                            <a className="flex items-center text-sm hover:text-black" href="#">
                                <span className="inline-block mr-2">
                                    <HomeIcon color='#000' />
                                </span>
                                <span className='text-gray-600'>Dashboard</span>
                            </a>
                            <span className="inline-block mx-3">
                                <svg className="text-black" width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.23242 9.3689C1.06762 9.36887 0.906542 9.31997 0.769534 9.2284C0.632526 9.13683 0.525742 9.0067 0.462684 8.85445C0.399625 8.7022 0.383124 8.53467 0.415263 8.37304C0.447403 8.21141 0.526741 8.06294 0.643249 7.9464L3.58916 5L0.643224 2.05364C0.486959 1.89737 0.399171 1.68543 0.39917 1.46444C0.399169 1.24345 0.486957 1.03151 0.64322 0.875248C0.799483 0.718984 1.01142 0.631195 1.23241 0.631194C1.4534 0.631193 1.66534 0.718981 1.82161 0.875244L5.35676 4.41084C5.43416 4.48819 5.49556 4.58004 5.53745 4.68114C5.57934 4.78224 5.6009 4.89059 5.6009 5.00003C5.6009 5.10946 5.57934 5.21782 5.53745 5.31891C5.49556 5.42001 5.43416 5.51186 5.35676 5.58922L1.82161 9.12478C1.74432 9.20228 1.65249 9.26375 1.55137 9.30564C1.45026 9.34754 1.34186 9.36903 1.23242 9.3689Z" fill="currentColor"></path>
                                </svg>
                            </span>
                        </div>
                    }


                    <ul className="hidden lg:flex items-center space-x-6">
                        <li>
                            <a className="text-gray-200 hover:text-gray-300" href="#">
                                <MessageCircle className="h-5 w-5" strokeWidth={2} color='#000' />
                            </a>
                        </li>
                        <li>
                            <a className="text-gray-200 hover:text-gray-300" href="#">
                                <BellIcon className="h-5 w-5" strokeWidth={2} color='#000' />
                            </a>
                        </li>
                        <li className="hidden lg:block">
                            <button className="flex items-center p-1 rounded-full hover:shadow">
                                <img className="w-10 h-10 rounded-full object-cover object-right" src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80" alt="" />
                            </button>
                        </li>
                    </ul>

                </div>
            </nav>
        </section>
    )
}

export default Navbar
