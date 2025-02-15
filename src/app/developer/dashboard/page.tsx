"use client"
import Certifications from '@/components/developer/onboarding/Certifications'
import Skills from '@/components/developer/onboarding/Skills'
import WorkExperience from '@/components/developer/onboarding/WorkExperience'
import WorkPreference from '@/components/developer/onboarding/WorkPreference'
import InputField from '@/components/InputField'
import Modal from '@/components/modal/Modal'
import authWrapper from '@/lib/hoc/AuthWrapper'
import { ChevronRight, ChevronsDown, CornerUpRightIcon, DollarSign, MapPin } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

const JobListingCard = ({ title, location, salary, type }: any) => {
    const color = type === "Remote" ? "green" : type === "Full Time" ? "orange" : "purple";
    return (
        <div className="bg-gray-50 w-full rounded-2xl p-5 flex items-center justify-between flex-wrap gap-4 mb-6">
            <div>
                <div className="flex items-center gap-2 flex-wrap mb-2">
                    <p className="tracking-tight text-lg font-semibold">{title}</p>
                    <span className={`inline-block py-1 px-2 rounded-3xl border border-${color}-100 bg-${color}-50 tracking-tight text-${color}-500 text-xs font-medium`}>{type}</span>
                </div>
                <div className="flex gap-3 items-center">
                    <p className="tracking-tight text-gray-700 text-sm">{location}</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="4" height="4" viewBox="0 0 4 4" fill="none">
                        <circle cx="2" cy="2" r="2" fill="#71717A">
                        </circle>
                    </svg>
                    <p className="tracking-tight text-gray-700 text-sm">{salary}</p>
                </div>
            </div>
            <a href="#" className="bg-white border border-gray-200 h-11 rounded-full px-4 py-2 inline-flex items-center justify-center gap-2 hover:bg-black group transition duration-200">
                <span className="tracking-tight text-sm font-semibold text-gray-900 group-hover:text-white transition duration-200">Apply Now</span>
                <div className="group-hover:text-white transition duration-200">
                    <CornerUpRightIcon className="w-4 h-4" />
                </div>
            </a>
        </div>
    )
}

const page = () => {
    const userOnboarding = useSelector((state: any) => state.userOnboarding["developerOnboarding"])
    const userProfile = useSelector((state: any) => state.userProfile);
    const [greeting, setGreeting] = useState("");
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


    const getTimeOfDayGreeting = () => {
        const currentHour = new Date().getHours();
        if (currentHour < 12) {
            setGreeting("Good-Morning");
        } else if (currentHour < 18) {
            setGreeting("Good-Afternoon");
        } else {
            setGreeting("Good-Evening");
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
        getTimeOfDayGreeting();
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
                        <div className={`relative text-white rounded-3xl flex-1 flex items-center justify-start`}>
                            <img src={`/${greeting}.png`} alt="" className='w-full h-full object-cover rounded-3xl z-0 absolute' />
                            <div className={`p-6 ${greeting === "GoodEvening" ? "text-white" : "text-black"} z-10`}>
                                <h2 className={`text-2xl font-semibold mb-2 capitalize`}>{greeting.split('-').join(' ')} {userProfile.first_name}</h2>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, ducimus?</p>
                                <button className="mt-4 bg-white/80 text-gray-600 px-4 py-2 rounded-lg">
                                    Review It
                                </button>
                            </div>
                        </div>
                        <div className="hidden md:flex bg-white text-white rounded-3xl flex-row items-center justify-center px-6 p-4 gap-4">
                            <img className="h-28 w-28 rounded-full object-cover mr-2 object-right z-0" src={userProfile?.profile_picture || "https://www.tech101.in/wp-content/uploads/2018/07/blank-profile-picture.png"} alt="" />
                            <div className="text-black">
                                <h2 className="text-2xl font-semibold mb-2 capitalize"> {userProfile.first_name}  {userProfile.last_name}</h2>
                                <p className='text-gray-400 text-sm'>Software Developer</p>
                                <button className="mt-4 w-full bg-blue-100 text-blue-600 px-4 text-sm hover:bg-blue-600 hover:text-white py-2 rounded-lg">
                                    Edit Profile
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col items-center justify-center w-full text-left py-10 md:py-16 px-6 md:px-10'>
                        <div className='w-full flex flex-row items-center justify-between'>
                            <span className='pb-4'>
                                <h1 className="font-heading tracking-tight text-3xl md:text-5xl font-medium mb-4">
                                    Let's find your Dream Job 💼
                                </h1>
                                <p className='text-gray-500 text-sm'>
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium, eum?
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

                        <div className='mt-6 w-full flex flex-col md:flex-row items-center justify-center gap-4 relative'>
                            <div className='absolute w-full h-full flex flex-col items-center justify-center bg-black/1 border border-black/2 backdrop-blur-lg z-20 p-12 rounded-xl' />
                            <span className='text-gray-700 text-4xl uppercase font-extrabold z-20 absolute'>
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
                        <div className={`h-fit bg-white border border-gray-300 text-black rounded-3xl w-full flex flex-col gap-6 items-start justify-start p-6`}>
                            <span className=''>
                                <h1 className="font-heading tracking-tight text-3xl md:text-4xl font-medium mb-1">
                                    Recommended Jobs
                                </h1>
                                <p className="tracking-tight text-gray-500 text-sm">
                                    Apply for a position that fits your skills and interests.
                                </p>
                            </span>
                            <div className='w-full h-full relative items-center justify-center'>
                                <div className='absolute w-full h-full flex flex-col items-center justify-center bg-black/1 border border-black/2 backdrop-blur-lg z-20 p-12 rounded-xl' />
                                <span className='text-gray-700 text-4xl uppercase font-extrabold z-20 absolute'>
                                    Coming Soon
                                </span>
                                <JobListingCard title="Product Designer" type="Remote" location="New York" salary="$60k - $72k" />
                                <JobListingCard title="Senior UX Designer" type="Full Time" location="New York" salary="$120k - $150k" />
                                <JobListingCard title="Senior UX Designer" type="Part Time" location="New York" salary="$120k - $150k" />
                                <Link
                                    href="/developer/dashboard/job-listing"
                                    className='text-blue-600 flex items-center transition duration-200 hover:text-blue-800'>
                                    Show More <ChevronRight className='inline-block' />
                                </Link>
                            </div>
                        </div>
                        <div className={`h-fit bg-white border border-gray-300 text-black rounded-3xl w-full flex flex-col gap-6 items-start justify-start p-6`}>
                            <span className=''>
                                <h1 className="font-heading tracking-tight text-3xl md:text-4xl font-medium mb-1">
                                    Applied Jobs
                                </h1>
                                <p className="tracking-tight text-gray-500 text-sm">
                                    Apply for a position that fits your skills and interests.
                                </p>
                            </span>
                            <div className='flex items-center w-full justify-center relative'>
                                <div className='absolute w-full h-full flex flex-col items-center justify-center bg-black/1 border border-black/2 backdrop-blur-lg z-20 p-12 rounded-xl' />
                                <span className='text-gray-700 text-4xl uppercase font-extrabold z-20 absolute'>
                                    Coming Soon
                                </span>
                                <img src="/noRecords3.png" alt="" className='w-1/2' />
                            </div>
                        </div>
                    </div>
                    {!isUserAssessmentConducted && (
                        <Modal
                            isFooter={false}
                            size="lg"
                            loading={true}
                        >
                            <div className='h-96 relative w-full flex flex-col items-end justify-center'>
                                <img
                                    src="/welcome.svg"
                                    alt=""
                                    className='hidden md:flex h-64 lg:h-96 -m-6 bottom-0 left-2 object-contain rounded-3xl z-0 absolute'
                                />
                                <div className='flex flex-col gap-6 p-6 max-w-lg lg:max-w-2xl'>
                                    <div>
                                        <h2 className='text-4xl font-bold mb-2 capitalize'>Welcome to DX Digital</h2>
                                        <p className='text-gray-400 text-md'>
                                            We are excited to have you onboard to DX Digital. <br /> Please take a moment to review the following information.
                                        </p>
                                    </div>

                                    <div className='flex flex-row gap-4 items-center bg-gray-100 p-6 rounded-xl'>
                                        <span className='text-5xl font-extrabold text-gray-300'>
                                            {"</>"}
                                        </span>
                                        <p className='text-gray-500 text-sm'>
                                            As a part of Onboarding Process, you will be required to take a quiz to verify your skills and knowledge.
                                        </p>
                                    </div>

                                    <button
                                        onClick={handleQuizStart}
                                        className='bg-blue-500 text-white px-4 py-2 rounded-xl inline-flex items-center justify-center gap-2 w-1/2'>
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

