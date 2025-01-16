"use client"
import Certifications from '@/components/developer/onboarding/Certifications'
import Skills from '@/components/developer/onboarding/Skills'
import TimePreference from '@/components/developer/onboarding/TimePreference'
import WorkExperience from '@/components/developer/onboarding/WorkExperience'
import InputArea from '@/components/InputArea'
import InputField from '@/components/InputField'
import Modal from '@/components/modal/Modal'
import { developerQuestions } from '@/constants/data'
import { ArrowLeft, ArrowRight, Bookmark, ChevronRight, ChevronsDown, CornerUpRightIcon, DollarSign, MapPin } from 'lucide-react'
import Link from 'next/link'
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
    const [greeting, setGreeting] = useState("Good-Evening");
    const [visible, setVisible] = useState(true);
    const [submitExam, setSubmitExam] = useState(false);
    const [testScreen, setTestScreen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isUserExamConducted, setIsUserExamConducted] = useState(true);

    const isUserOnboarded = userProfile.is_onboard;
    const [currentQuestion, setCurrentQuestion] = useState(1); // Track current question index

    const totalQuestions = 8; // Adjust based on the total number of questions

    const handlePrevious = () => {
        if (currentQuestion > 1) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const handleNext = () => {
        if (currentQuestion < totalQuestions) {
            setCurrentQuestion(currentQuestion + 1);
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

    const handleSubmit = () => {

    }

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
                        <div className={`bg-[url(/${greeting}.png)] bg-bottom bg-cover bg-no-repeat text-white rounded-3xl flex-1 flex items-center justify-start`}>
                            <div className={`p-6 ${greeting === "Good-Evening" ? "text-white" : "text-black"}`}>
                                <h2 className={`text-2xl font-semibold mb-2 capitalize`}>{greeting.split('-').join(' ')} {userProfile.first_name}</h2>
                                <p >Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, ducimus?</p>
                                <button className="mt-4 bg-white/80 text-gray-600 px-4 py-2 rounded-lg">
                                    Review It
                                </button>
                            </div>
                        </div>
                        <div className="hidden md:flex bg-white text-white rounded-3xl flex-row items-center justify-center px-6 p-4 gap-4">
                            <img className="h-28 w-28 rounded-full object-cover mr-2 object-right z-0" src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHxw-10=format&fit=crop&w=1050&q=80" alt="" />
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

                        <div className='mt-6 w-full flex flex-col md:flex-row items-center justify-center gap-4'>
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
                        <div className={`h-fit bg-white  border border-gray-300 text-black rounded-3xl w-full flex flex-col gap-6 items-start justify-start p-6`}>
                            <span className=''>
                                <h1 className="font-heading tracking-tight text-3xl md:text-4xl font-medium mb-1">
                                    Recommended Jobs
                                </h1>
                                <p className="tracking-tight text-gray-500 text-sm">
                                    Apply for a position that fits your skills and interests.
                                </p>
                            </span>
                            <div className='w-full'>
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
                        <div className="bg-white border border-gray-300 text-black mb-6 rounded-3xl w-full flex flex-col items-start justify-between p-6 gap-4">
                            <span className=''>
                                <h1 className="font-heading tracking-tight text-3xl md:text-4xl font-medium mb-1">
                                    Applied Jobs
                                </h1>
                                <p className="tracking-tight text-gray-500 text-sm">
                                    Apply for a position that fits your skills and interests.
                                </p>
                            </span>
                            <div className='flex items-center w-full justify-center'>
                                <img src="/noRecords3.png" alt="" className='w-1/2' />
                            </div>
                        </div>
                    </div>
                    {isUserExamConducted && (
                        <div className='absolute top-14 left-1/2 -translate-x-1/2 z-[55] flex p-1 px-4 rounded-full bg-white justify-center items-center whitespace-nowrap'>
                            <div className='w-4 h-4 bg-red-500 rounded-full absolute -top-1 -right-1'></div>
                            <div className='w-4 h-4 bg-red-500 rounded-full absolute -top-1 -right-1 animate-ping'></div>
                            As a part of Onboarding Process, you will be required to take a quiz to verify your skills and knowledge.
                        </div>
                    )}
                    {isUserExamConducted && (
                        <Modal
                            isFooter={false}
                            size="md"
                            setModal={setTestScreen}
                            loading={true}
                        >
                            <div className={`sticky -top-8 bg-white flex flex-row flex-wrap ${submitExam ? "justify-center" : "justify-between"}  items-center w-full border-b border-gray-200 py-3 mb-4 z-20`}>
                                {submitExam ? <>
                                    <div className='flex flex-col justify-center items-center'>
                                        <div className='relative'>
                                            <h3 className="text-2xl font-bold">{currentQuestion} / {totalQuestions} Questions attempted</h3>
                                        </div>
                                        <div className="flex flex-row gap-1 items-center justify-center w-full py-3">
                                            {Array.from({ length: totalQuestions }).map((_, index) => (
                                                <div
                                                    key={index}
                                                    className={`h-3 w-20 rounded-full bg-blue-400`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </> : <>
                                    <div>
                                        <div className='relative'>
                                            <span className='absolute text-5xl top-0 font-black text-black opacity-10'>{'</>'}</span>
                                            <h3 className="text-2xl font-bold">Question {currentQuestion}</h3>
                                        </div>
                                        <div className="flex flex-row gap-1 items-center justify-center w-full py-3">
                                            {Array.from({ length: totalQuestions }).map((_, index) => (
                                                <div
                                                    key={index}
                                                    className={`h-3 w-20 rounded-full ${index + 1 === currentQuestion
                                                        ? "bg-green-400"
                                                        : "bg-gray-200"
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <div className='inline-flex gap-2 items-center justify-center my-4'>
                                        <button
                                            onClick={handlePrevious}
                                            disabled={currentQuestion === 1}
                                            className='bg-gray-300 text-sm text-gray-700 px-3 py-1 rounded-full inline-flex items-center gap-1'>
                                            <ArrowLeft className='h-4 w-4' /> Previous
                                        </button>
                                        <button
                                            onClick={() => {
                                                if (currentQuestion === totalQuestions) {
                                                    setSubmitExam(true)
                                                    handleSubmit()
                                                } else {
                                                    handleNext()
                                                }
                                            }}
                                            className='bg-green-700 text-sm text-white px-3 py-1 rounded-full inline-flex items-center gap-1'>
                                            Save & Next <ArrowRight className='h-4' />
                                        </button>
                                    </div>
                                </>}

                            </div>
                            <div>
                                {submitExam ? <>
                                    <div className='flex flex-col items-center justify-center gap-2 p-6'>
                                        <p className='text-center text-lg'>
                                            Are you sure you want to submit your exam?
                                            <p className='text-sm text-gray-500'>
                                                You will not be able to edit your answers after submitting.
                                            </p>
                                        </p>

                                        <div className='flex flex-row items-center justify-center gap-2 mt-4'>
                                            <button onClick={() => setSubmitExam(false)} className='bg-red-500 text-sm text-white px-3 py-1 rounded-full inline-flex items-center gap-1'>
                                                Cancel
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setIsUserExamConducted(false)
                                                }}
                                                className='bg-blue-600 text-sm text-white px-3 py-1 rounded-xl inline-flex items-center gap-1'>
                                                Submit <ArrowRight className='h-4' />
                                            </button>
                                        </div>
                                    </div>
                                </> : <>
                                    <p className="tracking-tight text-gray-500 text-sm">
                                        Question
                                    </p>
                                    <p>
                                        {developerQuestions[currentQuestion]}
                                    </p>
                                    <InputArea
                                        className="w-full mt-2"
                                        placeHolder="Type your answer here"
                                        rows={"5"}
                                    />
                                </>}

                            </div>
                        </Modal>
                    )}
                </>
            ) : (
                <>
                    {userOnboarding[0].isActive && <Certifications />}
                    {userOnboarding[1].isActive && <Skills />}
                    {userOnboarding[2].isActive && <WorkExperience />}
                    {userOnboarding[3].isActive && <TimePreference />}
                </>
            )}
        </div>
    )
}

export default page
