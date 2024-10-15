"use client"
import Dropdown from '@/components/Dropdown'
import InputArea from '@/components/InputArea'
import InputDate from '@/components/InputDate'
import InputField from '@/components/InputField'
import Modal from '@/components/Modal'
import { onBoardingHandlePrevious } from '@/feature/developerOnboardingStepper/developerOnboarding'
import React from 'react'
import { useDispatch } from 'react-redux'

const WorkExperience = () => {
    const [experience, setExperience] = React.useState<any>([])
    const [addWork, setAddWork] = React.useState<any>(false)
    const options = [
        { value: 'salesforce_platform', label: 'Salesforce Platform' },
        { value: 'sales_cloud', label: 'Sales Cloud' },
        { value: 'service_cloud', label: 'Service Cloud' },
        { value: 'experience_cloud', label: 'Experience Cloud' },
        { value: 'marketing_cloud', label: 'Marketing Cloud' },
        { value: 'b2b_commerce_cloud', label: 'B2B Commerce Cloud' },
        { value: 'b2c_commerce_cloud', label: 'B2C Commerce Cloud' },
        { value: 'cpq', label: 'CPQ' },
    ];
    const dispatch = useDispatch();
    const handlePrevious = () => {
        dispatch(onBoardingHandlePrevious({ stepperId: 3 }))
    }

    return (
        <>
            <div className='rounded-2xl w-full h-full relative px-10'>
                <div className='w-full bg-white border-b border-gray-200 top-0 left-0 sticky py-6 flex flex-row justify-between items-center'>
                    <span>
                        <h1 className='text-start text-3xl font-bold text-black'>
                            Work Experience Details
                        </h1>
                        <p className='pt-2 text-gray-400'>
                            Enter the Core skills that you have
                        </p>
                    </span>
                    <div className='flex flex-row gap-4 py-6'>
                        <button onClick={() => handlePrevious()} className='bg-gray-200 text-gray-400 text-bold font-bold h-12 px-6 rounded-xl'>Previous</button>
                        <button className='bg-blue-500 text-bold text-white font-bold h-12 px-6 rounded-xl'>Save & Next</button>
                    </div>
                </div>
                {experience.length > 0 ? (
                    <div className='my-6'>
                        <div className='flex flex-row w-full items-start gap-4'>
                            <div className='w-1/6'>
                                <span className='bg-gray-200 w-12 h-12 rounded-full font-bold place-content-center '>
                                    1
                                </span>
                            </div>
                            <div className='w-5/6 h-screen border-l-2 border-gray-200 place-content-start p-6'>
                                <label htmlFor=""></label>
                                <InputField placeHolder="Enter your work experience" className="w-3/4" />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='absolute bottom-0 left-0 w-full h-3/4 flex items-start pt-20 justify-center'>
                        <div className='flex flex-col gap-4 text-start z-10'>
                            <span className='uppercase font-extrabold text-4xl text-slate-300 '>
                                Add your work experience
                            </span>
                            <button
                                onClick={() => setAddWork(true)}
                                className='bg-blue-500 text-bold text-white font-medium h-12 px-6 rounded-xl'
                            >
                                Add Experience
                            </button>
                        </div>
                        <img src="/skillsBG1.webp" alt="bgImage" className='absolute bottom-0 left-0 w-full h-3/4 object-content z-0' />
                    </div>
                )}
            </div>
            {addWork && (
                <Modal
                    header={"Add Work Experience"}
                    setModal={setAddWork}
                >
                    <div className='w-full flex flex-col gap-4'>
                        <div className='flex flex-row w-full gap-6'>
                            <InputField
                                label={"Company Name"}
                                className=" w-full"
                                isRequired={true}
                            />
                            <InputField label={"Your Role"} className="w-full" />
                        </div>
                        <div className='flex flex-row w-full gap-6'>
                            <InputArea label={"Description"} className="w-full" cols={20} />
                        </div>
                        <div className='flex flex-row w-full gap-6'>
                            <InputDate label={"Start Date"} className=" w-full" />
                            <InputDate label={"End Date"} className="w-full" />
                        </div>
                        <div className='flex flex-col w-full gap-4 mt-2'>
                            <Dropdown label={"Salesforce Technologies"} className="w-full" options={options} />
                            <Dropdown label={"Industry"} className="w-full" options={options} />
                        </div>
                    </div>
                </Modal>
            )}
        </>
    )

}

export default WorkExperience
