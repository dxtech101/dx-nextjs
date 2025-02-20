import { X } from 'lucide-react';

const Modal = ({
    header,
    setModal,
    children,
    loading,
    classname,
    size = "sm",
    ristricted = false,
    isFooter = true,
    submitButtonText,
    onSubmit,
    formRef
}: any) => {
    console.log(formRef);

    return (
        <div
            onClick={() => setModal(false)}
            className={`absolute top-0 left-0 z-50 w-full h-full bg-black bg-opacity-65 text-black flex justify-center items-center ${classname}`}>
            <div
                onClick={(e) => e.stopPropagation()}
                className={`bg-white rounded-2xl w-11/12 lg:w-${size === "xl" ? "11/12" : size === "lg" ? "h-1/5" : "1/2"} flex flex-col justify-center items-start`}>
                {header && (
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
                )}
                <div className='relative p-3 lg:p-6 w-full overflow-y-auto max-h-[75vh]'>
                    {children}
                </div>
                {isFooter && (
                    <div className='w-full flex flex-row justify-end gap-4 items-center border-t border-0 p-4'>
                        <button
                            disabled={loading}
                            onClick={() => setModal(false)}
                            className='bg-gray-200 text-gray-400 text-bold font-bold h-12 px-6 rounded-xl'
                        >
                            Cancel
                        </button>
                        <button
                            type='submit'
                            onClick={(e) => {
                                e.preventDefault()
                                if (formRef) {
                                    formRef?.current?.requestSubmit()
                                } else {
                                    onSubmit()
                                }
                            }}
                            disabled={loading}
                            className='bg-black text-bold text-white font-bold h-12 px-6 rounded-xl'
                        >
                            {loading ? "Loading..." : submitButtonText || "Save"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Modal
