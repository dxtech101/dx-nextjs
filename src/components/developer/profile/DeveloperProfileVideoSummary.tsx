import FileUpload from '@/components/FileUpload';
import Modal from '@/components/modal/Modal';
import Image from 'next/image';
import { useState } from 'react';

const DeveloperVideoProfile = ({ videoProfile }: any) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className='w-full h-fit p-8 flex flex-col lg:flex-row items-start md:items-center justify-between bg-pink-50 border border-pink-200 rounded-2xl relative'>
                {!videoProfile ? <>
                    <div className='w-full md:max-w-lg flex flex-col gap-4 items-start'>
                        <h1 className='font-bold text-3xl'>Your Video Profile</h1>
                        <p className='text-sm text-gray-800'>Showcase your personality and skills with a short video introduction. Upload your video profile to make a lasting impression!</p>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className='bg-gray-800 p-2 px-4 rounded-lg text-white'>
                            Edit Video Profile
                        </button>
                    </div>
                    <iframe
                        className='w-full h-full lg:h-80 lg:w-1/2 rounded-2xl'
                        src='https://www.youtube.com/embed/dQw4w9WgXcQ'
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
                >
                    <FileUpload uploadType="video" />
                </Modal>
            )}
        </>

    )
}

export default DeveloperVideoProfile
