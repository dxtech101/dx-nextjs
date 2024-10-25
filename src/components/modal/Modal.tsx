import { X } from 'lucide-react'
import React from 'react'

const Modal = ({
    header,
    setModal,
    onSubmit,
    children
}: any) => {
    return (
        <div className='absolute top-0 left-0 z-20 w-full h-full bg-black bg-opacity-65 text-black flex justify-center items-center'>
            <div className='bg-white rounded-2xl w-11/12 lg:w-1/2 flex flex-col justify-center items-start'>
                <div className='w-full flex flex-row justify-between items-center border-b border-0 p-4'>
                    <span className='font-bold text-xl'>
                        {header}
                    </span>
                    <button onClick={() => setModal(false)}>
                        <X className='w-8 h-8' strokeWidth={2} color='black' />
                    </button>
                </div>
                <div className='p-6 w-full overflow-y-auto max-h-[80vh]'>
                    {children}
                </div>
                <div className='w-full flex flex-row justify-end gap-4 items-center border-t border-0 p-4'>
                    <button
                        onClick={() => setModal(false)}
                        className='bg-gray-200 text-gray-400 text-bold font-bold h-12 px-6 rounded-xl'
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => onSubmit()}
                        className='bg-black text-bold text-white font-bold h-12 px-6 rounded-xl'
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Modal
