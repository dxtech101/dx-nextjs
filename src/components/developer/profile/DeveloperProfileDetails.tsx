"use client"
import FileUpload from '@/components/FileUpload';
import Modal from '@/components/modal/Modal';
import { addUserProfile } from '@/feature/reducers/userProfile';
import { uploadProfilePicture } from '@/lib/service/user.service';
import { BriefcaseBusiness, CakeIcon, CodeIcon, MailIcon, MapPin, MapPinned, PencilIcon, Phone, PinIcon, ShieldCheck, Upload, X } from 'lucide-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const DeveloperProfileDetails = ({ personalDetails }: any) => {
    const dispatch = useDispatch();
    console.log(personalDetails)

    const developerProfile = useSelector((state: any) => state.userProfile)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState<any>(null);

    const uploadProfilePic = async (e: any) => {
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append("profile_picture", selectedFile);
        try {
            setLoading(true);
            const { results } = await uploadProfilePicture(formData);
            if (results) {
                dispatch(addUserProfile(results));
                setIsModalOpen(false);
            }
        } catch (error) {
            console.error("Error uploading profile picture:", error);
        } finally {
            setLoading(false);
        }
    };

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
        value: personalDetails?.country || "N/A"
    }
    ]

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
                            className='rounded-full aspect-square object-cover object-right border border-gray-300 overflow-hidden'
                            src={developerProfile?.profile_picture || "https://www.tech101.in/wp-content/uploads/2018/07/blank-profile-picture.png"}
                            alt=""
                        />
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className='absolute bottom-0 left-1/2 -translate-x-1/2 bg-gray-200 w-full border border-gray-300 flex flex-row items-center justify-center gap-2 text-gray-900 p-2 pb-4 text-sm font-bold group'
                        >
                            <Upload className="w-5 h-5" />
                            <span className="transition-all duration-700 ease-in-out opacity-100">
                                Upload
                            </span>
                        </button>
                    </div>

                    <div className='w-full flex flex-col gap-6 justify-between h-full'>
                        <div className='flex flex-col gap-2'>
                            <span className='text-3xl lg:text-4xl font-bold capitalize'>{personalDetails?.name}</span>
                            <div className='flex flex-wrap gap-2 text-sm'>
                                <span className='shadow-inner inline-flex items-center gap-2 bg-purple-100 border border-purple-300 text-purple-900 w-fit rounded-full py-0.5 px-4'>
                                    <CodeIcon className='w-5 h-5' />
                                    Senior Developer
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
                                        <span className='inline-flex items-center gap-2 font-semibold'>
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
            {isModalOpen && (
                <Modal
                    header={"Upload Profile Picture"}
                    setModal={setIsModalOpen}
                    isFooter={false}
                >
                    <FileUpload
                        uploadType="image"
                        loading={loading}
                        handleUpload={uploadProfilePic}
                        onFileSelect={setSelectedFile}
                    />
                </Modal>
            )}
            {editModal && (
                <Modal
                    header={"Edit Profile"}
                    setModal={setEditModal}
                    isFooter={false}
                >

                </Modal>
            )}
        </>
    )
}

export default DeveloperProfileDetails
