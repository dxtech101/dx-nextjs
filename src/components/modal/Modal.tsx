import { Loader, X } from 'lucide-react'
import React from 'react'

const Modal = ({
    header,
    setModal,
    onSubmit,
    children,
    loading,
    size = "sm",
    ristricted = false,
    isFooter = true
}: any) => {
    
    return (
        <div className='absolute top-0 left-0 z-50 w-full h-full bg-black bg-opacity-65 text-black flex justify-center items-center'>
            <div className={`bg-white rounded-2xl w-11/12 lg:w-${size === "xl" ? "11/12" : size === "lg" ? "h-1/5" : "1/2"} flex flex-col justify-center items-start`}>
                <div className='w-full flex flex-row justify-between items-center border-b border-0 p-4'>
                    <span className='font-bold text-xl'>
                        {header}
                    </span>
                    {(!loading || ristricted) && (
                        <button onClick={() => setModal(false)}>
                            <X className='w-8 h-8' strokeWidth={2} color='black' />
                        </button>
                    )}
                </div>
                <div className='relative p-3 lg:p-6 w-full overflow-y-auto max-h-[80vh]'>
                    {children}
                </div>
                {isFooter && (
                    <div className='w-full flex flex-row justify-end gap-4 items-center border-t border-0 p-4'>
                        <button
                            onClick={() => setModal(false)}
                            className='bg-gray-200 text-gray-400 text-bold font-bold h-12 px-6 rounded-xl'
                        >
                            Cancel
                        </button>
                        <button
                            type='submit'
                            onClick={onSubmit}
                            className='bg-black text-bold text-white font-bold h-12 px-6 rounded-xl'
                        >
                            Save
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Modal
