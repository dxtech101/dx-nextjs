import Link from 'next/link'
import React from 'react'

const Herosection = () => {
    return (
        <section className="relative">
            <div className="overflow-hidden pt-16 h-screen">
                <div className="relative container px-4 mx-auto">
                    <div className="flex flex-wrap -m-8">
                        <div className="w-full md:w-1/2 lg:w-4/12 xl:w-6/12 p-8">
                            <h1 className="mb-9 text-6xl md:text-8xl lg:text-7xl font-bold font-heading md:max-w-7xl leading-none text-black">Hire smart minded people</h1>
                            <div>
                                <p className="mb-9 text-xl text-gray-900 font-medium md:max-w-sm">Get the best-in-className group mentoring plans and professional benefits for your team</p>
                                <div className="mb-12 md:inline-block">
                                    <button className="py-4 px-6 w-full text-white font-semibold border border-indigo-700 rounded-xl focus:ring focus:ring-indigo-300 bg-indigo-600 hover:bg-indigo-700 transition ease-in-out duration-200" type="button">Try 14 Days Free Trial</button>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 lg:w-8/12 xl:w-8/12 xl:absolute xl:right-0 xl:-bottom-32 p-8">
                            <div className="flex flex-wrap justify-center items-center lg:justify-end -m-3">
                                <div className="w-auto lg:w-1/3 xl:pt-28 p-3">
                                    <div className="flex flex-wrap justify-end">
                                        <div className="w-auto">
                                            <img className="mx-auto rounded-3xl " src="/herosection1.png" alt="" />
                                        </div>
                                    </div>
                                </div>
                                <div className="w-auto lg:w-1/3 p-3">
                                    <div className="flex flex-wrap justify-center -m-3">
                                        <div className="w-auto p-3">
                                            <Link href="#">
                                                <img className="mx-auto rounded-3xl" src="/herosection2.png" alt="" />
                                            </Link>
                                        </div>
                                        <div className="w-auto p-3">
                                            <img className="mx-auto " src="https://static.shuffle.dev/components/preview/238eb578-e531-4cf4-a658-a1ff13c9b896/assets/public/flaro-assets/images/headers/people2.png" alt="" />
                                        </div>
                                    </div>
                                </div>
                                <div className="w-auto lg:w-1/3 p-3">
                                    <div className="flex flex-wrap">
                                        <div className="w-auto">
                                            <img className="mx-auto " src="https://static.shuffle.dev/components/preview/238eb578-e531-4cf4-a658-a1ff13c9b896/assets/public/flaro-assets/images/headers/people3.png" alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Herosection
