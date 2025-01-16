import { Loader2, LoaderIcon, Sparkle } from 'lucide-react'
import React from 'react'

const ResourseDataLoader = () => {
    return (
        <div className='flex flex-row items-center justify-center gap-2 w-full'>
            <Loader2 className='h-10 animate-spin' />
            Loading...
        </div>
    )
}

export default ResourseDataLoader
