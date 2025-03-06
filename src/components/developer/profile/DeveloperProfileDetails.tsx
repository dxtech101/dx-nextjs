"use client"
import Modal from '@/components/modal/Modal';
import { addUserProfile } from '@/feature/reducers/userProfile';
import { uploadProfilePicture } from '@/lib/service/user.service';
import { BriefcaseBusiness, CakeIcon, CodeIcon, MailIcon, MapPinned, PencilIcon, Phone, PinIcon, ShieldCheck } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DeveloperProfileDetailsForm from './DeveloperProfileDetailsForm';

const DeveloperProfileDetails = ({ personalDetails, updateDetails }: any) => {
    const dispatch = useDispatch();
    const formRef = useRef<HTMLFormElement>(null)
    const userProfile = useSelector((state: any) => state.userProfile)
    const [editModal, setEditModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState<any>(null);

    useEffect(() => {
        if (!editModal) {
            updateDetails()
        }
    }, [editModal])

    const profileDetails = [{
        icon: <MailIcon className='w-5 h-5 text-purple-900' />,
        label: "Email",
        value: personalDetails?.email || "N/A"
    }, {
        icon: <Phone className='w-5 h-5 text-purple-900' />,
        label: "Phone",
        value: personalDetails?.phone || "N/A"
    }, {
        icon: <PinIcon className='w-5 h-5 text-purple-900' />,
        label: "Address",
        value: personalDetails?.address || "N/A"
    }, {
        icon: <MapPinned className='w-5 h-5 text-purple-900' />,
        label: "Country",
        value: personalDetails?.country || "N/A"
    }, {
        icon: <CakeIcon className='w-5 h-5 text-purple-900' />,
        label: "DOB",
        value: personalDetails?.birthdate || "N/A"
    }]

    return (
        <>
            <div className='relative w-full h-full bg-gray-50 rounded-2xl flex flex-col items-start justify-start gap-4 p-4 lg:p-6'>
                <div className="absolute top-4 right-4 group flex gap-2 items-center justify-center">
                    <button
                        onClick={() => setEditModal(true)}
                        className='bg-gray-200 border border-gray-300 flex flex-row items-center justify-center gap-2 rounded-full text-gray-900 py-2 px-4 text-sm font-bold group'
                    >
                        <PencilIcon className="w-5 h-5 cursor-pointer ml-2" />
                        <span className="overflow-hidden whitespace-nowrap transition-all duration-700 ease-in-out opacity-0 w-0 group-hover:w-auto group-hover:opacity-100">
                            Edit
                        </span>
                    </button>

                </div>
                <div className='w-full h-full flex flex-col xl:flex-row items-center justify-between gap-10'>
                    <div className="h-1/2 w-1/2 overflow-hidden lg:h-1/3 lg:w-1/3 relative rounded-full">
                        <img
                            className='rounded-full aspect-square object-cover object-center border border-gray-300 overflow-hidden'
                            src={userProfile?.profile_picture || "https://www.tech101.in/wp-content/uploads/2018/07/blank-profile-picture.png"}
                            alt=""
                        />
                    </div>

                    <div className='w-full flex flex-col gap-6 justify-between h-full'>
                        <div className='flex flex-col gap-2'>
                            <span className='text-3xl lg:text-4xl font-bold capitalize'>{personalDetails?.name}</span>
                            <div className='flex flex-wrap gap-2 text-sm'>
                                <span className='shadow-inner inline-flex items-center gap-2 bg-purple-100 border border-purple-300 text-purple-900 w-fit rounded-full py-0.5 px-4'>
                                    <CodeIcon className='w-5 h-5' />
                                    {personalDetails?.job_title}
                                </span>
                                <span className='inline-flex shadow-inner items-center gap-2 bg-amber-100 border border-amber-300 text-amber-900 w-fit rounded-full py-0.5 px-4'>
                                    <ShieldCheck className='w-5 h-5' />
                                    16 Certification
                                </span>
                                <span className='inline-flex items-center shadow-inner gap-2 bg-blue-100 border border-blue-300 text-blue-900 w-fit rounded-full py-0.5 px-4'>
                                    <BriefcaseBusiness className='w-5 h-5' />
                                    7+ Years Experience
                                </span>
                            </div>
                        </div>


                        <div className='grid grid-cols-2 lg:grid-cols-4 w-full gap-2 lg:gap-4 items-start justify-between'>
                            {profileDetails?.map((item: any, index: any) => {
                                return (
                                    <>
                                        <span key={index} className='inline-flex items-center gap-2 font-semibold'>
                                            {item?.icon}{item?.label}
                                        </span>
                                        <span className='text-gray-800'>{item?.value}</span>
                                    </>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div >
            {editModal && (
                <Modal
                    header={"Edit Profile"}
                    setModal={setEditModal}
                    loading={loading}
                    isFooter={true}
                    size="lg"
                    formRef={formRef}
                >
                    <DeveloperProfileDetailsForm
                        ref={formRef}
                        personalDetails={personalDetails}
                        loading={loading}
                        setLoading={setLoading}
                    />
                </Modal>
            )}
        </>
    )
}

export default DeveloperProfileDetails
