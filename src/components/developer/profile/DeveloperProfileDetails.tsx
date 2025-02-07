"use client"
import Modal from '@/components/modal/Modal';
import { addUserProfile } from '@/feature/reducers/userProfile';
import { uploadProfilePicture } from '@/lib/service/user.service';
import { BriefcaseBusiness, CodeIcon, MailIcon, PencilIcon, Phone, PinIcon, ShieldCheck, Upload, X } from 'lucide-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const DeveloperProfileDetails = () => {
    const dispatch = useDispatch();
    const developerProfile = useSelector((state: any) => state.userProfile)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPicture, setSelectedPicture] = useState<any>(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [loading, setLoading] = useState(false);

    const uploadProfilePic = async (e: any) => {
        if (!selectedPicture) return;

        const formData = new FormData();
        formData.append("profile_picture", selectedPicture);
        try {
            setLoading(true);
            const { results } = await uploadProfilePicture(formData);
            if (results) {
                dispatch(addUserProfile(results));
                setIsModalOpen(false);
                setSelectedPicture(null);
                setPreviewUrl(null);
            }
        } catch (error) {
            console.error("Error uploading profile picture:", error);
        } finally {
            setLoading(false);
        }
    };


    const handleFileChange = (event: any) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedPicture(file);

            if (file.type.startsWith("image/")) {
                setPreviewUrl(URL.createObjectURL(file));
            }
        }
    };

    const removeSelectedPicture = () => {
        setSelectedPicture(null);
        setPreviewUrl(null);
    };

    return (
        <>
            <div className='relative w-full h-full bg-gray-50 rounded-2xl flex flex-col items-start justify-start gap-4 p-4 lg:p-6'>
                <div className="absolute top-4 right-4 group flex gap-2 items-center justify-center">
                    <button
                        className='bg-gray-200 border border-gray-300 flex flex-row items-center justify-center gap-2 rounded-full text-gray-900 py-2 px-4 text-sm font-bold group'
                    >
                        <PencilIcon className="w-5 h-5 cursor-pointer ml-2" />
                        <span className="overflow-hidden whitespace-nowrap transition-all duration-700 ease-in-out opacity-0 w-0 group-hover:w-auto group-hover:opacity-100">
                            Edit
                        </span>
                    </button>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className='bg-gray-200 border border-gray-300 flex flex-row items-center justify-center gap-2 rounded-full text-gray-900 py-2 px-4 text-sm font-bold group'
                    >
                        <Upload className="w-5 h-5" />
                        <span className="overflow-hidden whitespace-nowrap transition-all duration-700 ease-in-out opacity-0 w-0 group-hover:w-auto group-hover:opacity-100">
                            Upload
                        </span>
                    </button>
                </div>
                <div className='w-full h-full flex flex-col xl:flex-row items-center justify-between gap-6'>
                    <img
                        className="h-1/2 w-1/2 lg:h-1/6 lg:w-1/6 aspect-square rounded-full object-cover object-right relative"
                        src={developerProfile?.profile_picture || "https://www.tech101.in/wp-content/uploads/2018/07/blank-profile-picture.png"}
                        alt=""
                    />

                    <div className='w-full flex flex-col gap-6 justify-between h-full'>
                        <div className='flex flex-col gap-2'>
                            <span className='text-3xl lg:text-4xl font-bold capitalize'>{developerProfile.first_name} {developerProfile.last_name}</span>
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


                        <div className='grid grid-cols-2 w-full lg:w-3/4 gap-4 justify-between'>
                            <span className='inline-flex items-center gap-4'><MailIcon className='w-5 h-5 text-purple-900' /> Email</span>
                            <span>{developerProfile.email}</span>

                            <span className='inline-flex items-center gap-4'><Phone className='w-5 h-5 text-purple-900' /> Phone</span>
                            <span>+91-9876543210</span>

                            <span className='inline-flex items-center gap-4'><PinIcon className='w-5 h-5 text-purple-900' /> Address</span>
                            <span>123 Main Street, New York, NY 5010</span>
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
                    <div className="flex flex-col items-center justify-center w-full">
                        <label
                            htmlFor="dropzone-file"
                            className={`flex flex-col items-center justify-center w-full h-64  ${!selectedPicture && "border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"}`}
                        >
                            {selectedPicture ?
                                <>
                                    <div className="relative text-center">
                                        {previewUrl && selectedPicture.type.startsWith("image/") && (
                                            <img
                                                src={previewUrl}
                                                alt="Preview"
                                                className="max-h-64 rounded-lg"
                                            />
                                        )}
                                        <button
                                            onClick={removeSelectedPicture}
                                            className="absolute top-2 right-2 bg-gray-900 text-white rounded-full p-1"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>
                                </> : <>
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg
                                            className="w-8 h-8 mb-4 text-gray-500 "
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 20 16"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                            />
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500 ">
                                            <span className="font-semibold">Click to upload</span>{" "}
                                            or drag and drop
                                        </p>
                                        <p className="text-xs text-gray-500 ">
                                            SVG, PNG, JPG or GIF (MAX. 800x400px)
                                        </p>
                                    </div>
                                </>}
                            <input
                                id="dropzone-file"
                                type="file"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                        </label>
                        <button
                            disabled={!selectedPicture || loading}
                            onClick={uploadProfilePic}
                            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                        >
                            {loading ? "Loading..." : "Upload Profile Picture"}
                        </button>
                    </div>
                </Modal>
            )}
        </>
    )
}

export default DeveloperProfileDetails
