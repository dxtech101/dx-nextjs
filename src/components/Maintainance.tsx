import React from 'react'

const Maintainance = () => {
    return (
        <>
            <span className='text-xl font-extrabold absolute top-0 left-0 p-4'>D<span className='text-blue-800'>X</span> | Developer Exchange</span>
            <div className='relative h-screen overflow-hidden flex flex-col lg:flex-row items-center justify-center container mx-auto p-8'>
                <div className='w-full text-center max-w-2xl'>
                    <div className='max-w-xl mx-auto text-start'>
                        <h2 className='text-4xl lg:text-6xl font-bold my-4 mt-8'>
                            The Website is under maintainance 🚧
                        </h2>
                        <p className='text-gray-700'>
                            We're making some updates to improve your experience! Our team is working hard behind the scenes, and we’ll be back soon with something better. Stay tuned! 🚀
                        </p>
                    </div>
                </div>
                <div className='w-full p-8'>
                    <img src="https://dx-assests.s3.amazonaws.com/assets/maintainance.png" alt="maintainance" />
                </div>
            </div>
        </>
    )
}

export default Maintainance
