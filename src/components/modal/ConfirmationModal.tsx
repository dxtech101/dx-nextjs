import { resetOnboarding } from '@/feature/reducers/userOnboarding';
import { addUserProfile } from '@/feature/reducers/userProfile';
import { userOnBoarded } from '@/lib/service/user.service';
import { LoaderCircle, X } from 'lucide-react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const ConfirmationModal = ({ setOpenConfirmModal }: any) => {
    const [loading, setLoading] = useState(false);
    const userProfile = useSelector((state: any) => state.userProfile);
    const dispatch = useDispatch();

    const onClickHandler = async () => {
        setLoading(true);
        try {
            const { results } = await userOnBoarded(userProfile.id);
            if (results) {
                dispatch(addUserProfile(results));
                dispatch(resetOnboarding({ role: "developer" }))
                setOpenConfirmModal(false);
            }
        } catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div className='absolute top-0 left-0 z-20 w-full h-full bg-black bg-opacity-65 text-black flex justify-center items-center'>
            <div className='absolute bg-white z-20 rounded-2xl w-1/2 h-fit p-6 xl:h-60 flex flex-col xl:flex-row gap-6 justify-center items-center'>
                <img src='https://dx-assests.s3.amazonaws.com/assets/confim.png' width={360} className='w-1/2 bottom-0' />
                <button onClick={() => setOpenConfirmModal(false)} className='absolute right-2 top-2'>
                    {!loading && <X className='w-5 h-5 text-black absolute right-2 top-2' strokeWidth={2} color='black' />}
                </button>
                <div className='flex flex-col gap-4'>
                    <span>
                        <span className='text-2xl font-bold mt-4'>
                            You have successfully completed the onboarding!
                        </span>
                        <p className='text-gray-700 text-sm mt-2'>
                            Please click on the button below to continue.
                        </p>
                    </span>
                    <button
                        disabled={loading}
                        onClick={onClickHandler}
                        className={`relative inline-flex items-center justify-center py-3 px-4 text-sm font-semibold text-red-500 bg-red-100 ${!loading ? "hover:bg-red-600 hover:text-red-50" : ""}  rounded-md transition duration-300`}
                    >
                        {loading ? <> <LoaderCircle className="animate-spin h-6 w-auto mr-2" />Loading...</> : "Continue"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationModal
