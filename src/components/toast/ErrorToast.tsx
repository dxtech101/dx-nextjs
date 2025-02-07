import React from 'react'
import toast, { ErrorIcon } from 'react-hot-toast'

const ErrorToast = ({ t, message }: any) => {
    return (
        <div
            className={`${t.visible ? 'animate-enter' : 'animate-leave'
                } max-w-md w-full bg-red-100 shadow-sm rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
            <div className="flex-1 w-0 p-4">
                <div className="flex items-start">
                    <div className="flex-shrink-0 pt-0.5">
                        <ErrorIcon className="h-10 w-10 rounded-full" />
                    </div>
                    <div className="ml-3 flex-1">
                        <p className="text-sm font-medium text-gray-900">
                            {message || "An error occured"}
                        </p>
                    </div>
                </div>
            </div>
            <button
                onClick={() => toast.dismiss(t.id)}
                className="border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-bold text-red-600 hover:text-red-500 hover:bg-red-200"
            >
                Close
            </button>
        </div>
    )
}

export default ErrorToast
