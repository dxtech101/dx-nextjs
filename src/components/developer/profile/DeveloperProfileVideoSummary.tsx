"use client"
import FileUpload from '@/components/FileUpload';
import Modal from '@/components/modal/Modal';
import { addUserProfile, updateUserIntroVideo } from '@/feature/reducers/userProfile';
import { updateProfile } from '@/lib/service/user.service';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const DeveloperVideoProfile = ({ editable = true }) => {
    const dispatch = useDispatch();
    const userProfile = useSelector((state: any) => state.userProfile)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    console.log(userProfile)
    

    const handleUploadVideo = async (file: any) => {
        const profileUpdateData = new FormData();

        profileUpdateData.append("intro_video", selectedFile);
        setLoading(true);
        try {
            const { results } = await updateProfile(profileUpdateData);
            if (results) {
                dispatch(updateUserIntroVideo(results.user.intro_video));
                setIsModalOpen(false);
            }
        } catch (error) {
            console.error("Error uploading profile picture:", error);
        } finally {
            setLoading(false);
        }
    }

    if (!editable && !userProfile?.intro_video) {
        return <></>
    }

    return (
        <>
            <div className='w-full h-fit p-8 flex flex-col lg:flex-row items-start md:items-center justify-between bg-pink-50 border border-pink-200 rounded-2xl relative'>
                {userProfile?.intro_video ? <>
                    <div className='w-full xl:max-w-lg flex flex-col mb-6 gap-4 items-start'>
                        <h1 className='font-bold text-3xl'>Your Video Profile</h1>
                        <p className='text-sm text-gray-800'>Showcase your personality and skills with a short video introduction. Upload your video profile to make a lasting impression!</p>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className='bg-gray-800 p-2 px-4 rounded-lg text-white'>
                            Edit Video Profile
                        </button>
                    </div>
                    <iframe
                        className='w-full h-80 lg:h-80 lg:w-1/2 rounded-2xl'
                        src={userProfile?.intro_video}
                        title='YouTube video player'
                        frameBorder='0'
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                    />
                </> : <>
                    <div className='w-full md:max-w-lg flex flex-col gap-2 items-start'>
                        <h1 className='font-bold text-3xl'>Upload Your Video Profile</h1>
                        <p className='text-sm text-gray-800'>Showcase your personality and skills with a short video introduction. Upload your video profile to make a lasting impression!</p>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className='bg-gray-800 p-2 px-4 rounded-lg text-white'>
                            Upload Video Profile
                        </button>
                    </div>
                    <img src='/video.svg' alt='video' className='lg:absolute h-60 bottom-0 right-20 object-cover' />
                </>}
            </div>
            {isModalOpen && (
                <Modal
                    header={"Upload Video Profile"}
                    setModal={setIsModalOpen}
                    isFooter={false}
                    loading={loading}
                >
                    <FileUpload
                        uploadType={"video"}
                        submitButton={true}
                        loading={loading}
                        onFileSelect={setSelectedFile}
                        submitButtonLabel={"Upload Video Profile"}
                        handleUpload={handleUploadVideo}
                    />
                </Modal>
            )}
        </>

    )
}

export default DeveloperVideoProfile
