import Dropdown from "@/components/Dropdown";
import ConfirmationModal from "@/components/modal/ConfirmationModal";
import { onBoardingHandleNext, onBoardingHandlePrevious } from "@/feature/reducers/userOnboarding";
import { useState } from "react";
import { useDispatch } from "react-redux";

const TimePreference = () => {
    const dispatch = useDispatch();
    const [openConfirmModal, setOpenConfirmModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleNext = () => {
        dispatch(onBoardingHandleNext({ role: "developer", stepperId: 4 }))
    }

    const handlePrevious = () => {
        dispatch(onBoardingHandlePrevious({ role: "developer", stepperId: 4 }))
    }

    return (
        <>
            <div className='bg-[url(/additionalDetailsBG.webp)] bg-white bg-contain bg-no-repeat bg-bottom rounded-3xl border border-gray-300 overflow-clip w-full min-h-full relative px-5 lg:px-10'>
                <div className='w-full bg-white top-0 left-0 sticky py-6 flex flex-col gap-6 lg:flex-row justify-between items-start z-20 lg:items-center'>
                    <span>
                        <h1 className='text-start text-4xl md:text-5xl font-heading tracking-tight font-medium text-black'>
                            Complete your Profile
                        </h1>
                        <p className='pt-2 tracking-tight text-gray-600 max-w-sm inline-flex w-full'>
                            Enter the Core skills that you have
                        </p>
                    </span>
                    <div className='flex flex-row gap-4'>

                        <button
                            disabled={loading}
                            onClick={handlePrevious}
                            className={`h-12 px-6 rounded-xl font-normal text-normal ${loading
                                ? 'bg-gray-300 text-gray-100 cursor-not-allowed'
                                : 'bg-gray-200 text-gray-400'
                                }`}>
                            Previous
                        </button>
                        <button
                            onClick={() => setOpenConfirmModal(true)}
                            disabled={loading}
                            className={`h-12 px-6 rounded-xl font-medium text-normal ${loading
                                ? 'bg-blue-300 text-blue-100 cursor-not-allowed'
                                : 'bg-blue-500 text-white'
                                }`}>
                            Save & Next
                        </button>
                    </div>
                </div>
                <div className="my-6 flex flex-row gap-6">
                    <Dropdown
                        id="rates"
                        label={"Preferred Hourly Rates ($USD)"}
                        className="w-full flex-1"
                        options={[{ value: "$5-10/hr", label: "$5-10/hr" }, { value: "$10-20/hr", label: "$10-20/hr" }, { value: "$20-40/hr", label: "$20-40/hr" }, { value: "$40-60/hr", label: "$40-60/hr" }]}
                    />
                    <Dropdown
                        id="rates"
                        label={" Available Hours / Week"}
                        className="w-full flex-1"
                        options={[{ value: "0-5hrs", label: "0-5 hrs" }, { value: "5-10hrs", label: "5-10 hrs" }, { value: "10-20hrs", label: "10-20 hrs" }, { value: "20-40hrs", label: "20-40 hrs" }, { value: "40-60hrs", label: "40-60 hrs" }]}
                    />
                </div>
            </div >


            {openConfirmModal && (<ConfirmationModal setOpenConfirmModal={setOpenConfirmModal} />)}
        </>

    )
}

export default TimePreference
