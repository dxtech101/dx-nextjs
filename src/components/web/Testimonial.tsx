"use client"
import React, { useState } from 'react'

const Testimonial = () => {
    const [current, setCurrent] = useState(0);

    return (
        <section className="relative py-20 lg:py-32 overflow-hidden">
            <img className="absolute top-0 left-0" src="https://static.shuffle.dev/components/preview/2f808e47-944e-42cf-b821-2358251e0600/assets/public/saturn-assets/images/testimonials/blue-light.png" alt="" />
            <img className="absolute bottom-0 right-0" src="https://static.shuffle.dev/components/preview/2f808e47-944e-42cf-b821-2358251e0600/assets/public/saturn-assets/images/testimonials/orange-light.png" alt="" />
            <div className="relative container px-4 mx-auto">
                <div className="max-w-lg lg:max-w-7xl mx-auto">
                    <div className="flex flex-wrap -mx-4 mb-20 items-center">
                        <div className="w-full lg:w-1/2 px-4 mb-8 lg:mb-0">
                            <div className="max-w-md xl:max-w-xl">
                                <h1 className="font-heading text-4xl xs:text-6xl font-bold text-gray-900">
                                    <span>Our</span>
                                    <span className="font-serif italic">{" "}happy</span> <br />
                                    <span>clients say about us</span>
                                </h1>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2 px-4">
                            <div className="max-w-md lg:ml-auto">
                                <p className="text-gray-500">
                                    Risus viverra justo sagittis vestibulum metus. Massa lacinia eros posuere cursus sed vestibulum massa gravida. Turpis volutpat faucibus hac sed suspendisse convallis vestibulum massa.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap -mx-4 items-center">
                        <div className="w-full lg:w-1/2 px-4 mb-8 lg:mb-0">
                            <div className="lg:max-w-md xl:max-w-lg">
                                <img className="block w-full" src="https://static.shuffle.dev/components/preview/2f808e47-944e-42cf-b821-2358251e0600/assets/public/saturn-assets/images/testimonials/men-photo.png" alt="" />
                            </div>
                        </div>

                        <div className="w-full lg:w-1/2 px-4">
                            <div className="max-w-lg">
                                <img className="block mb-8" src="https://static.shuffle.dev/components/preview/2f808e47-944e-42cf-b821-2358251e0600/assets/public/saturn-assets/images/testimonials/quote.svg" alt="" />

                                {current === 0 && (
                                    <div>
                                        <p className="text-2xl font-semibold text-gray-900 mb-5">
                                            They are able to help a startup like mine scale and are very responsive to all our unique needs”
                                        </p>
                                        <span className="block text-gray-900 font-semibold mb-1">— Yacob Sudarmaji</span>
                                        <span className="block text-gray-500 mb-10">Product Manager, XYZ Tech</span>
                                    </div>
                                )}

                                {current === 1 && (
                                    <div>
                                        <p className="text-2xl font-semibold text-gray-900 mb-5">
                                            The best solution for anyone who wants to work a flexible schedule but still earn a full-time income”
                                        </p>
                                        <span className="block text-gray-900 font-semibold mb-1">— Darren Dunlap</span>
                                        <span className="block text-gray-500 mb-10">Founder of Saturn</span>
                                    </div>
                                )}

                                {current === 2 && (
                                    <div>
                                        <p className="text-2xl font-semibold text-gray-900 mb-5">
                                            Saturn has proven to be a reliable partner for scaling our business. Their responsiveness to our startup's unique needs has been crucial in navigating challenges and achieving success”
                                        </p>
                                        <span className="block text-gray-900 font-semibold mb-1">— John Doe</span>
                                        <span className="block text-gray-500 mb-10">CTO of Coca Soft</span>
                                    </div>
                                )}

                                {current === 3 && (
                                    <div>
                                        <p className="text-2xl font-semibold text-gray-900 mb-5">
                                            Saturn has been an exceptional growth partner for our agency. Their ability to assist our startup in scaling and their responsiveness to our specific needs have been invaluable”
                                        </p>
                                        <span className="block text-gray-900 font-semibold mb-1">— David P. Pry</span>
                                        <span className="block text-gray-500 mb-10">CEO of Sans Design</span>
                                    </div>
                                )}

                                <div>
                                    <div
                                        onClick={() => setCurrent(0)}
                                        className={`inline-block mr-3 w-3 h-3 rounded-full cursor-pointer ${current === 0 ? 'bg-orange-900' : 'bg-gray-200'
                                            }`}
                                    ></div>
                                    <div
                                        onClick={() => setCurrent(1)}
                                        className={`inline-block mr-3 w-3 h-3 rounded-full cursor-pointer ${current === 1 ? 'bg-orange-900' : 'bg-gray-200'
                                            }`}
                                    ></div>
                                    <div
                                        onClick={() => setCurrent(2)}
                                        className={`inline-block mr-3 w-3 h-3 rounded-full cursor-pointer ${current === 2 ? 'bg-orange-900' : 'bg-gray-200'
                                            }`}
                                    ></div>
                                    <div
                                        onClick={() => setCurrent(3)}
                                        className={`inline-block mr-3 w-3 h-3 rounded-full cursor-pointer ${current === 3 ? 'bg-orange-900' : 'bg-gray-200'
                                            }`}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Testimonial
