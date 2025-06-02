"use client"
import DashboardGreeting from '@/components/DashboardGreeting'
import Certifications from '@/components/developer/onboarding/Certifications'
import Skills from '@/components/developer/onboarding/Skills'
import WorkExperience from '@/components/developer/onboarding/WorkExperience'
import WorkPreference from '@/components/developer/onboarding/WorkPreference'
import DashboardJobListing from '@/components/developer/portal/DashboardJobListing'
import DashboardProfileCard from '@/components/developer/portal/DashboardProfileCard'
import DashboardRecommendedJob from '@/components/developer/portal/DashboardRecommendedJob'
import InputField from '@/components/InputField'
import Modal from '@/components/modal/Modal'
import authWrapper from '@/lib/hoc/AuthWrapper'
import { ChevronsDown, DollarSign, MapPin } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'



const page = () => {
    const userOnboarding = useSelector((state: any) => state.userOnboarding["developerOnboarding"])
    const userProfile = useSelector((state: any) => state.userProfile);
    const [visible, setVisible] = useState(true);
    const router = useRouter();

    const containerRef = useRef<HTMLDivElement>(null);

    const isUserOnboarded = userProfile?.is_onboard;
    const isUserAssessmentConducted = userProfile?.is_test_conducted;


    const handleQuizStart = () => {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen().then(() => {
                router.push("/developer/assessment");
            });
        } else {
            router.push("/developer/assessment");
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            if (containerRef.current && containerRef.current.scrollTop > 5) {
                setVisible(false);
            }
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
        }
        return () => {
            if (container) {
                container.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);


    return (
        <div ref={containerRef} className='h-full overflow-y-scroll gap-6'>
            {isUserOnboarded ? (
                <>
                    <div className={`${visible ? "block" : "hidden"} absolute bottom-10 left-[40%] lg:left-[50%] text-xs flex items-center justify-center p-2 rounded-full bg-blue-100 border border-blue-600 text-blue-700 animate-bounce`}>
                        <ChevronsDown className='h-4' /> Scroll Down
                    </div>

                    <div className='flex flex-col md:flex-row w-full gap-5'>
                        <DashboardGreeting />
                        <DashboardProfileCard userProfile={userProfile} className='hidden md:flex' />
                    </div>
                    <div className='flex flex-col items-center justify-center w-full text-left py-10 md:py-16 px-6 md:px-10'>
                        <div className='w-full flex flex-row items-center justify-between'>
                            <span className='pb-4'>
                                <h1 className="font-heading tracking-tight text-3xl md:text-5xl font-medium mb-4">
                                    Let's find your Dream Job 💼
                                </h1>
                                <p className='text-gray-500 text-sm'>
                                    The next step in your career starts here — explore new opportunities.
                                </p>
                            </span>
                            <div className='flex gap-2'>
                                <span className='hidden md:block font-medium text-xs whitespace-nowrap bg-purple-100 rounded-full px-4 border border-purple-800 text-purple-800 py-1'>
                                    500,000+ available jobs
                                </span>
                                <span className='hidden md:block font-medium text-xs whitespace-nowrap bg-amber-100 rounded-full px-4 border border-amber-800 text-amber-800 py-1'>
                                    100,000+ available companies
                                </span>
                            </div>
                        </div>

                        <div className='mt-6 w-full overflow-hidden md:overflow-visible flex flex-col md:flex-row items-center justify-center gap-4 relative'>
                            <div className='absolute  w-full h-full flex flex-col items-center justify-center bg-black/1 border border-black/2 backdrop-blur-lg z-20 p-12 rounded-xl' />
                            <span className='text-gray-700 text-4xl uppercase font-extrabold z-20 absolute'>
                                Coming Soon
                            </span>
                            <span className='text-black/5 text-8xl text-center lg:text-9xl uppercase font-extrabold z-20 absolute'>
                                Coming Soon
                            </span>
                            <InputField
                                className='w-full z-10 float-start'
                                iconName='search'
                                placeHolder='Search Keyword'
                            />
                            <div className='flex flex-wrap w-full gap-4'>
                                <button className='h-full bg-white rounded-xl px-4 py-2 text-black flex items-center gap-2 whitespace-nowrap'>
                                    <MapPin className='h-5 w-5 text-blue-600' />
                                    Newyork, NY
                                </button>
                                <button className='h-full bg-white rounded-xl px-4 py-2 text-black flex items-center gap-2 whitespace-nowrap'>
                                    <DollarSign className='h-5 w-5 text-blue-600' />
                                    2,000 - 4,000 USD
                                </button>
                                <button className='bg-blue-500 rounded-xl px-4 py-2 text-sm text-white whitespace-nowrap'>
                                    Find a Job
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col md:flex-row w-full h-full gap-5'>
                        <DashboardRecommendedJob />
                        <DashboardJobListing />
                    </div>

                    {!isUserAssessmentConducted && (
                        <Modal
                            isFooter={false}
                            size="lg"
                            loading={true}
                        >
                            <div className='h-full relative w-full flex flex-col-reverse items-center xl:items-end justify-center'>
                                <img
                                    src="https://dx-assests.s3.amazonaws.com/assets/welcome.svg"
                                    alt="test"
                                    className='hidden lg:flex xl:flex h-72 xl:h-96 -m-6 xl:bottom-0 xl:left-2 object-contain rounded-3xl z-0 xl:absolute'
                                />
                                <div className='flex flex-col gap-6 p-6 w-full xl:max-w-2xl'>
                                    <div>
                                        <h2 className='text-3xl md:text-4xl font-bold mb-2 capitalize'>Welcome to DX Digital</h2>
                                        <p className='text-gray-400 text-xs lg:text-md'>
                                            We are excited to have you onboard to DX Digital. <br /> Please take a moment to review the following information.
                                        </p>
                                    </div>

                                    <div className='flex flex-row gap-4 items-center bg-gray-100 p-6 rounded-xl'>
                                        <span className='text-3xl md:text-5xl font-extrabold text-gray-300'>
                                            {"</>"}
                                        </span>
                                        <p className='text-gray-500 text-xs md:text-sm'>
                                            As a part of Onboarding Process, you will be required to take a quiz to verify your skills and knowledge.
                                        </p>
                                    </div>

                                    <button
                                        onClick={handleQuizStart}
                                        className='bg-blue-500 text-white px-4 py-2 rounded-xl inline-flex items-center justify-center gap-2 w-full xl:w-1/2'>
                                        Take Quiz
                                    </button>
                                </div>
                            </div>
                        </Modal>
                    )}
                </>
            ) : (
                <>
                    {userOnboarding[0].isActive && <Certifications />}
                    {userOnboarding[1].isActive && <Skills />}
                    {userOnboarding[2].isActive && <WorkExperience />}
                    {userOnboarding[3].isActive && <WorkPreference />}
                </>
            )}
        </div>
    )
}

export default authWrapper(page, {
    authRequired: true,
    role: [
        "Individual",
    ],
});

