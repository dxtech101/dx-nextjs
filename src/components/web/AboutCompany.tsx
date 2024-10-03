import React from 'react'

const AboutCompany = () => {
    return (
        <section className="py-16">
            <div className="container px-4 mx-auto">
                <h1 className="text-5xl lg:text-7xl font-semibold mb-6 mt-14 max-w-lg lg:max-w-3xl">On a mission to make learning fun</h1>
                <p className="text-gray-600 text-lg mb-48 lg:mb-32 max-w-xl">Our aim is to infuse every educational experience with the essence of joy, making learning an immersive adventure that fuels curiosity and fosters growth.</p>
                <div className="relative mb-32 height-[800px]">
                   
                    <div className="w-full h-full absolute top-0 right-0 rounded-5xl bg-orange-50"></div>
                    <div className="w-full h-full absolute md:top-5 md:right-5 rounded-5xl bg-purple-900"></div>
                    <img className="w-full h-full absolute md:top-12 md:right-12 rounded-5xl object-cover" src="solstice-assets/images/about/picture6.png" alt="" />
                </div>
                <div className="flex flex-wrap mb-16 -mx-4">
                    <div className="w-full lg:w-1/2 p-4">
                        <h2 className="text-5xl font-semibold max-w-sm lg:max-w-lg">A company with values</h2>
                    </div>
                    <div className="w-full lg:w-1/2 p-4">
                        <p className="text-gray-600 text-lg">Diversity, inclusion, and belonging are fundamental to our success. We believe the best solutions occur when a plurality of backgrounds, experiences, and identities work together.</p>
                    </div>
                </div>
                <div className="flex flex-wrap mb-8 -mx-4">
                    <div className="w-full lg:w-1/2 p-4">
                        <div className="border border-gray-200 rounded-3xl p-8">
                            <div className="rounded-2xl bg-orange-500 w-14 h-14 flex items-center justify-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                    <path d="M11.0001 2.66663V29.3333H10.4134C5.56008 29.3333 2.66675 26.44 2.66675 21.5866V10.4133C2.66675 5.55996 5.56008 2.66663 10.4134 2.66663H11.0001Z" fill="white"></path>
                                    <path d="M28.8333 10.4133V14.5H13.5V3.16663H21.5867C23.9139 3.16663 25.7113 3.85839 26.9264 5.07351C28.1416 6.28864 28.8333 8.08606 28.8333 10.4133Z" fill="white" stroke="white"></path>
                                    <path d="M29.3333 17V21.5867C29.3333 26.44 26.44 29.3333 21.5867 29.3333H13V17H29.3333Z" fill="white"></path>
                                </svg>
                            </div>
                            <div className="flex mb-4">
                                <div className="w-0.5 h-6 bg-orange-500 transform -translate-x-8"></div>
                                <h2 className="text-2xl font-bold font-heading">Passion for Innovation</h2>
                            </div>
                            <p className="text-gray-600">We thrive on a relentless passion for innovation. We constantly challenge the status quo, seeking out creative solutions and pushing the boundaries of what's possible.</p>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 p-4">
                        <div className="border border-gray-200 rounded-3xl p-8">
                            <div className="rounded-2xl bg-orange-500 w-14 h-14 flex items-center justify-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                    <path d="M11.0001 2.66663V29.3333H10.4134C5.56008 29.3333 2.66675 26.44 2.66675 21.5866V10.4133C2.66675 5.55996 5.56008 2.66663 10.4134 2.66663H11.0001Z" fill="white"></path>
                                    <path d="M28.8333 10.4133V14.5H13.5V3.16663H21.5867C23.9139 3.16663 25.7113 3.85839 26.9264 5.07351C28.1416 6.28864 28.8333 8.08606 28.8333 10.4133Z" fill="white" stroke="white"></path>
                                    <path d="M29.3333 17V21.5867C29.3333 26.44 26.44 29.3333 21.5867 29.3333H13V17H29.3333Z" fill="white"></path>
                                </svg>
                            </div>
                            <div className="flex mb-4">
                                <div className="w-0.5 h-6 bg-orange-500 transform -translate-x-8"></div>
                                <h2 className="text-2xl font-bold font-heading">Collaborative Community</h2>
                            </div>
                            <p className="text-gray-600">We foster an inclusive and supportive environment where every voice is heard, and diverse perspectives contribute to our collective success. Together, we achieve more.</p>
                        </div>
                    </div>
                </div>
                
            </div>
        </section>
    )
}

export default AboutCompany
