import { ChevronRight, FileUser, Zap } from 'lucide-react'
import React, { useState } from 'react'

const CompanyResourceRequest = () => {
  const [resource, setResource] = useState<any>([]);

  return (
    <div className='border border-gray-300 rounded-3xl flex-col p-6 gap-4 h-full w-full bg-white bg-no-repeat bg-contain bg-top'>
      <div className='flex flex-row items-center justify-between w-full'>
        <span className='inline-flex gap-2'>
          <FileUser className='w-6 h-6' />
          Resource Requests
        </span>
        <button className='text-blue-500 inline-flex items-center gap-1'>
          See all
          <ChevronRight className='w-4 h-4' />
        </button>
      </div>
      {resource.length > 0 ?
        <div className='grid auto-cols-auto grid-cols-2 w-full gap-4 mt-6'>

        </div>
        :
        <div className='flex flex-col items-center justify-center gap-4 p-5 h-full w-full'>
          <img className='h-20 object-cover z-0 opacity-100' src="/noRecordBG3.png" alt="" />
          <span className='top-10 left-0 text-black text-md font-medium z-20'>
            No Resources records found
          </span>
          <button className='mt-4 bg-blue-700 text-white px-4 py-2 rounded-lg'>
            Raise a Request
          </button>
        </div>
      }
    </div >
  )
}

export default CompanyResourceRequest
