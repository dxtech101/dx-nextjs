import React from 'react'

const AboutCompany = () => {
    return (
        <section className="py-16">
            <div className="container px-4 mx-auto">
                <h1 className="text-2xl lg:text-5xl font-semibold mb-6 mt-14 max-w-lg lg:max-w-3xl">About Developer Exchange (DX)                </h1>
                <p className="text-gray-600 text-lg mb-10 w-full">Developer Exchange (DX) is the premier talent marketplace exclusively for the Salesforce ecosystem, connecting companies and Salesforce partners with pre-vetted, top-tier developers, architects, and consultants. Unlike traditional freelance platforms, DX ensures that <strong>every professional is rigorously vetted by Certified Technical Architects (CTAs) and experienced Salesforce leaders</strong> —not just the top 2%, but every developer on our platform.</p>
                <div className="flex flex-wrap mb-8 -mx-4">
                    <div className="w-full lg:w-1/2 p-4">
                        <div className="border border-gray-200 rounded-3xl p-8">
                            <div className="rounded-2xl bg-blue-500 w-14 h-14 flex items-center justify-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                    <path d="M11.0001 2.66663V29.3333H10.4134C5.56008 29.3333 2.66675 26.44 2.66675 21.5866V10.4133C2.66675 5.55996 5.56008 2.66663 10.4134 2.66663H11.0001Z" fill="white"></path>
                                    <path d="M28.8333 10.4133V14.5H13.5V3.16663H21.5867C23.9139 3.16663 25.7113 3.85839 26.9264 5.07351C28.1416 6.28864 28.8333 8.08606 28.8333 10.4133Z" fill="white" stroke="white"></path>
                                    <path d="M29.3333 17V21.5867C29.3333 26.44 26.44 29.3333 21.5867 29.3333H13V17H29.3333Z" fill="white"></path>
                                </svg>
                            </div>
                            <div className="flex mb-4">
                                <div className="w-0.5 h-6 bg-blue-500 transform -translate-x-8"></div>
                                <h2 className="text-2xl font-bold font-heading">Flexible Talent Solutions</h2>
                            </div>
                            <p className="text-gray-600">With flexible hiring options, including freelance, nearshore, and offshore talent, DX enables businesses to scale their Salesforce projects efficiently while minimizing operational costs. Our streamlined platform eliminates the complexity of hiring by providing trusted, high-quality talent on demand.</p>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 p-4">
                        <div className="border border-gray-200 rounded-3xl p-8 h-full">
                            <div className="rounded-2xl bg-blue-500 w-14 h-14 flex items-center justify-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                    <path d="M11.0001 2.66663V29.3333H10.4134C5.56008 29.3333 2.66675 26.44 2.66675 21.5866V10.4133C2.66675 5.55996 5.56008 2.66663 10.4134 2.66663H11.0001Z" fill="white"></path>
                                    <path d="M28.8333 10.4133V14.5H13.5V3.16663H21.5867C23.9139 3.16663 25.7113 3.85839 26.9264 5.07351C28.1416 6.28864 28.8333 8.08606 28.8333 10.4133Z" fill="white" stroke="white"></path>
                                    <path d="M29.3333 17V21.5867C29.3333 26.44 26.44 29.3333 21.5867 29.3333H13V17H29.3333Z" fill="white"></path>
                                </svg>
                            </div>
                            <div className="flex mb-4">
                                <div className="w-0.5 h-6 bg-blue-500 transform -translate-x-8"></div>
                                <h2 className="text-2xl font-bold font-heading">Seamless Salesforce Hiring</h2>
                            </div>
                            <p className="text-gray-600">Whether you're a Salesforce partner looking to augment your team, an enterprise in need of specialized expertise, or a developer seeking premium opportunities, DX is your gateway to seamless, efficient, and reliable Salesforce hiring.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutCompany
