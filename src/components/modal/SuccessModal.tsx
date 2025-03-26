import { X } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

const SuccessModal = ({ email, type = "confimation", onClose }: any) => {
    const router = useRouter();

    const handleOpenMailbox = () => {
        const emailDomain = email.split('@')[1];

        const domainToUrlMap: Record<string, string> = {
            'gmail.com': 'https://mail.google.com/',
            'yahoo.com': 'https://mail.yahoo.com/',
            'outlook.com': 'https://outlook.live.com/mail/',
            'hotmail.com': 'https://outlook.live.com/mail/',
            'icloud.com': 'https://www.icloud.com/mail/',
        };

        if (domainToUrlMap[emailDomain]) {
            window.open(domainToUrlMap[emailDomain], '_blank');
        } else {
            window.open(`https://mail.google.com/`, '_blank');
        }
    };

    return (
        <div className='absolute top-0 left-0 z-20 w-full h-full bg-black bg-opacity-65 text-black flex justify-center items-center'>
            <div className='absolute bg-white z-20 rounded-2xl w-1/2 h-fit p-6 xl:h-60 flex flex-col xl:flex-row gap-6 justify-center items-center'>
                <img src='https://dx-assests.s3.amazonaws.com/assets/Mail.png' width={360} className='w-1/2' />
                <button
                    onClick={() => {
                        onClose && onClose()
                    }}
                >
                    <X className='w-5 h-5 text-black absolute right-2 top-2' strokeWidth={2} color='black' />
                </button>
                <div className='flex flex-col gap-4'>
                    <span>
                        <span className='text-2xl font-bold mt-4'>
                            Email sent successfully! 🎉
                        </span>
                        {type == "forget" ? <p>
                            We have sent you a password reset link on you mail <span className='font-bold text-gray-700'>{email}</span>
                        </p> : <p>
                            We have sent you a confirmation mail on your mail <span className='font-bold text-gray-700'>{email}</span>
                        </p>}
                    </span>
                    {/* <button
                        onClick={handleOpenMailbox}
                        className='relative inline-block py-3 px-4 text-sm font-semibold text-green-500 hover:text-green-50 bg-green-100 hover:bg-green-600 rounded-md transition duration-300'
                    >
                        Open Mail Box
                    </button> */}
                </div>
            </div>
        </div>
    )
}

export default SuccessModal
