"use client"
import DeveloperProfileDetailsLoader from '@/components/loaders/DeveloperProfileDetailsLoader';
import Modal from '@/components/modal/Modal';
import { BriefcaseBusiness, CakeIcon, CodeIcon, MailIcon, MapPinned, PencilIcon, Phone, ShieldCheck, TimerIcon, VideoIcon } from 'lucide-react';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import DeveloperProfileDetailsForm from './DeveloperProfileDetailsForm';

const DeveloperProfileDetails = ({ personalDetails, updateDetails, certificationCount, loading, editable = true, hourlyRates }: any) => {
    const formRef = useRef<HTMLFormElement>(null)
    const userProfile = useSelector((state: any) => state.userProfile)
    const [editModal, setEditModal] = useState(false);
    const [loadingUI, setLoadingUI] = useState(false);

    const generateDeveloperName = (name: string) => {
        const nameArray = name?.split(" ");
        if (nameArray?.length === 3) {
            return nameArray[0] + " " + nameArray[1][0] + " " + nameArray[2];
        } else if (nameArray?.length === 2) {
            return nameArray[0][0] + " " + nameArray[1];
        } else {
            return name;
        }
    }

    const obfuscateValue = (label: string, value: string) => {
        if (!value) return value;

        if (label === "Email") {
            const parts = value.split("@");
            return parts.length === 2 ? "xxxx@" + parts[1] : "xxxx";
        }

        if (label === "Phone") {
            return "xxxxxx" + value.slice(-4);
        }

        if (label === "DOB") {
            return "xx/xx/xxxx";
        }

        return "xxxx";
    };

    const profileDetails = [{
        icon: <MailIcon className='w-5 h-5 text-purple-900' />,
        label: "Email",
        value: personalDetails?.email,
        visible: ["Individual"]?.includes(userProfile?.role)
    }, {
        icon: <Phone className='w-5 h-5 text-purple-900' />,
        label: "Phone",
        value: personalDetails?.phone,
        visible: ["Individual"]?.includes(userProfile?.role)
    }, {
        icon: <MapPinned className='w-5 h-5 text-purple-900' />,
        label: "Country",
        value: personalDetails?.country,
        visible: ["Individual"]?.includes(userProfile?.role)
    }, {
        icon: <CakeIcon className='w-5 h-5 text-purple-900' />,
        label: "DOB",
        value: personalDetails?.birthdate,
        visible: ["Individual"]?.includes(userProfile?.role)
    }, {
        icon: <TimerIcon className='w-5 h-5 text-purple-900' />,
        label: "Timezone",
        value: personalDetails?.preferred_timezone,
        visible: ["Individual"]?.includes(userProfile?.role)
    }]

    return (
        <>
            <div className='relative w-full h-full bg-gray-50 rounded-2xl flex flex-col items-start justify-start gap-4 p-4 lg:p-6'>
                <div className="absolute top-4 right-4 group flex gap-2 items-center justify-center">
                    {editable && (
                        <button
                            onClick={() => setEditModal(true)}
                            className='bg-gray-200 border border-gray-300 flex flex-row items-center justify-center gap-2 rounded-full text-gray-900 py-2 px-4 text-sm font-bold group'
                        >
                            <PencilIcon className="w-5 h-5 cursor-pointer ml-2" />
                            <span className="overflow-hidden whitespace-nowrap transition-all duration-700 ease-in-out opacity-0 w-0 group-hover:w-auto group-hover:opacity-100">
                                Edit
                            </span>
                        </button>
                    )}
                </div>
                <div className='w-full h-full flex flex-col xl:flex-row items-center justify-between gap-10'>
                    <div className="h-1/2 w-1/2 overflow-hidden lg:h-1/3 lg:w-1/3 relative rounded-full">
                        <img
                            className='rounded-full aspect-square object-cover object-top border border-gray-300 overflow-hidden'
                            src={userProfile?.profile_picture || "https://www.tech101.in/wp-content/uploads/2018/07/blank-profile-picture.png"}
                            alt=""
                        />
                    </div>
                    {loading ?
                        <DeveloperProfileDetailsLoader />
                        :
                        <div className='w-full flex flex-col gap-6 justify-between h-full'>
                            <div className='flex flex-col gap-4'>
                                <span className='text-3xl lg:text-4xl font-bold capitalize flex flex-row items-end'>
                                    {editable ? personalDetails?.name : generateDeveloperName(personalDetails?.name)}
                                    {hourlyRates && (
                                        <span className='text-lg font-medium ml-2 py-1 bg-amber-200 text-amber-800 px-3 rounded-full'>
                                            {hourlyRates}
                                        </span>
                                    )}
                                </span>

                                <div className='flex flex-wrap gap-2 text-sm'>
                                    {personalDetails?.job_title && ["Individual"].includes(userProfile?.role) && (
                                        <span className='shadow-inner inline-flex items-center gap-2 bg-purple-100 border border-purple-300 text-purple-900 w-fit rounded-full py-0.5 px-4'>
                                            <CodeIcon className='w-5 h-5' />
                                            {personalDetails?.job_title}
                                        </span>
                                    )}
                                    {certificationCount && ["Individual"].includes(userProfile?.role) && (
                                        <span className='inline-flex shadow-inner items-center gap-2 bg-amber-100 border border-amber-300 text-amber-900 w-fit rounded-full py-0.5 px-4'>
                                            <ShieldCheck className='w-5 h-5' />
                                            {certificationCount} Certification
                                        </span>
                                    )}
                                    {personalDetails?.work_year_experience && ["Individual"].includes(userProfile?.role) && (
                                        <span className='inline-flex items-center shadow-inner gap-2 bg-blue-100 border border-blue-300 text-blue-900 w-fit rounded-full py-0.5 px-4'>
                                            <BriefcaseBusiness className='w-5 h-5' />
                                            {personalDetails?.work_year_experience}+ Years Experience
                                        </span>
                                    )}

                                    {personalDetails?.job_title && ["Company"].includes(userProfile?.role) && (
                                        <span className='shadow-inner p-4 flex flex-col h-fit w-fit justify-center items-center gap-2 bg-purple-100 border border-purple-300 text-purple-900 rounded-xl'>
                                            <span className='text-6xl'>🧑🏻‍💻</span>
                                            <span>{personalDetails?.job_title}</span>
                                        </span>
                                    )}

                                    {certificationCount && ["Company"].includes(userProfile?.role) && (
                                        <span className='h-fit p-4 w-fit flex flex-col shadow-inner justify-center items-center gap-2 bg-amber-100 border border-amber-300 text-amber-900 rounded-xl'>
                                            <span className='text-6xl'>🏆</span>
                                            <span>{certificationCount} Certification</span>
                                        </span>
                                    )}

                                    {personalDetails?.country && ["Company"].includes(userProfile?.role) && (
                                        <span className='shadow-inner p-4 flex flex-col h-fit w-fit justify-center items-center gap-2 bg-blue-100 border border-blue-300 text-blue-900 rounded-xl'>
                                            <span className='text-6xl'>🌎</span>
                                            <span>{personalDetails?.country}</span>
                                        </span>
                                    )}

                                    {personalDetails?.work_year_experience && ["Company"].includes(userProfile?.role) && (
                                        <span className='shadow-inner p-4 flex flex-col h-fit w-fit justify-center items-center gap-2 bg-green-100 border border-green-300 text-green-900 rounded-xl'>
                                            <span className='text-6xl'>{personalDetails?.work_year_experience}+</span>
                                            <span>Years Experience</span>
                                        </span>
                                    )}
                                </div>
                            </div>

                            {["Company"].includes(userProfile?.role) && <>
                                <div className='flex flex-row items-center justify-start gap-2 w-fit'>
                                    <button className='bg-blue-200 hover:bg-blue-400 text-blue-700 hover:text-blue-50 duration-200 text-center rounded-lg p-2 px-4 inline-flex justify-center items-center gap-2'>
                                        <Phone className='animate-pulse' />
                                        Schedules DX Call
                                    </button>
                                    <button className='bg-blue-200 hover:bg-blue-400 text-blue-700 hover:text-blue-50 duration-200 text-center rounded-lg p-2 px-4 inline-flex justify-center items-center gap-2'>
                                        <VideoIcon />
                                        Schedules Inteview
                                    </button>
                                    <img src="/sumo_logo.svg" alt="sumo logo" className="h-8 w-auto" />
                                </div>
                            </>}

                            <div className='grid grid-cols-2 lg:grid-cols-4 w-full gap-2 lg:gap-4  items-start justify-between'>
                                {profileDetails?.map((item: any, index: any) => {
                                    return (
                                        <>
                                            {item?.value && item?.visible && (
                                                <>
                                                    <span key={index} className='inline-flex w-fit items-center gap-2 font-semibold'>
                                                        {item?.icon}{" "}{item?.label}
                                                    </span>
                                                    <span className='text-gray-800'>
                                                        {editable ? item?.value : obfuscateValue(item.label, item.value)}
                                                    </span>
                                                </>
                                            )}
                                        </>
                                    )
                                })}
                            </div>
                        </div>
                    }
                </div>
            </div >
            {editModal && (
                <Modal
                    header={"Edit Profile"}
                    setModal={setEditModal}
                    loading={loadingUI}
                    isFooter={true}
                    size="lg"
                    formRef={formRef}
                >
                    <DeveloperProfileDetailsForm
                        ref={formRef}
                        personalDetails={personalDetails}
                        updateDetails={updateDetails}
                        loading={loadingUI}
                        setLoading={setLoadingUI}
                        setEditModal={setEditModal}
                    />
                </Modal>
            )}
        </>
    )
}

export default DeveloperProfileDetails
