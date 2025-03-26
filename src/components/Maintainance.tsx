import React from 'react'

const Maintainance = () => {
    return (
        <div className='h-screen overflow-hidden flex flex-col lg:flex-row items-center justify-center'>
            <div className='w-full text-center'>
                <span className='text-4xl font-bold'>
                    The Website is under maintainance.
                </span>
            </div>
            <div className='w-full p-8'>
                <img src="https://dx-assests.s3.amazonaws.com/assets/maintainance.png" alt="maintainance" />
            </div>
        </div>
    )
}

export default Maintainance
