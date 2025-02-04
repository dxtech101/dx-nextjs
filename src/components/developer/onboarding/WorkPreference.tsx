import Dropdown from "@/components/Dropdown";
import ConfirmationModal from "@/components/modal/ConfirmationModal";
import { available_hours, prefered_hourly_rates } from "@/constants/data";
import { onBoardingHandleNext, onBoardingHandlePrevious } from "@/feature/reducers/userOnboarding";
import { handleFormDataChange } from "@/lib/helper";
import { WorkPreferencesService } from "@/lib/service/portfolio.service";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const WorkPreference = () => {
    const dispatch = useDispatch();
    const [openConfirmModal, setOpenConfirmModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<any>({
        preferred_hourly_rates: "",
        available_hours: ""
    });
    const [errors, setErrors] = useState({
        preferred_hourly_rates: "",
        available_hours: ""
    });

    const getWorkPerferenceDetails = async () => {
        try {
            setLoading(true);
            const contactWorkPreference = await WorkPreferencesService.getWorkPreference(contactSfid);
            console.log("contactWorkPreference::", contactWorkPreference[0].preferred_hourly_rates);
            
            setFormData({
                preferred_hourly_rates: contactWorkPreference[0].preferred_hourly_rates,
                available_hours: contactWorkPreference[0].available_hours
            });
        } catch (error) {
            console.error("Error fetching certifications:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getWorkPerferenceDetails();
    }, [])

    const contactSfid = useSelector((state: any) => state.userSalesforceID)

    const handleSubmit = async () => {
        const WorkPreferencesData = {
            "contact_sfid": contactSfid,
            "preferred_hourly_rates": formData.preferred_hourly_rates,
            "available_hours": formData.available_hours
        }
        setLoading(true);
        const response = await WorkPreferencesService.addWorkPreference(WorkPreferencesData);
        if (response) {
            setLoading(false);
            setOpenConfirmModal(true)
        }
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
                            onClick={handleSubmit}
                            disabled={loading}
                            className={`h-12 px-6 rounded-xl font-medium text-normal bg-blue-500 text-white`}>
                            Save & Next
                        </button>
                    </div>
                </div>
                <form className="my-6 flex flex-row gap-6">
                    <Dropdown
                        id="preferred_hourly_rates"
                        label={"Preferred Hourly Rates ($USD)"}
                        className="w-full flex-1"
                        defaultValue={formData.preferred_hourly_rates}
                        options={prefered_hourly_rates}
                        onChange={(value: any) => setFormData({ ...formData, preferred_hourly_rates: value })}
                    />
                    <Dropdown
                        id="available_hours"
                        label={"Available Hours / Week"}
                        className="w-full flex-1"
                        defaultValue={formData.available_hours}
                        options={available_hours}
                        onChange={(value: any) => setFormData({ ...formData, available_hours: value })}
                    />
                </form>
            </div >
            {openConfirmModal && (<ConfirmationModal setOpenConfirmModal={setOpenConfirmModal} />)}
        </>

    )
}

export default WorkPreference
