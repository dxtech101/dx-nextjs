'use client';

import { ArrowBigLeft, ArrowLeft, XCircle } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function GlobalError({ error, reset }: {
    error: Error & { digest?: string },
    reset: () => void,
}) {
    useEffect(() => {
        console.error('Caught by app/error.tsx:', error);
        // Optionally log to Sentry or a monitoring service here
    }, [error]);

    const router = useRouter();

    return (
        <html>
            <body>
                <div className='flex flex-col-reverse items-center justify-center h-screen w-screen'>
                    <div className='flex flex-col gap-3 items-center'>
                        <h1 className='text-4xl font-bold'>Something went wrong</h1>
                        <p className='text-md text-gray-800'>
                            We're sorry. We're having trouble loading this page.
                            Please try again later.
                        </p>
                        <a
                            href='/'
                            className='bg-blue-500 inline-flex items-center gap-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md text-center'>
                            <ArrowLeft /> Go Back
                        </a>
                    </div>
                    <Image src="/error.png" alt="404 Error" width={400} height={400} />
                </div>
            </body>
        </html>
    );
}
