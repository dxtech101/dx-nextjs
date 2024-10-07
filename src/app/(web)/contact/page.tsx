import React from 'react'

const page = () => {
    return (
        <section className="py-12 md:py-24 bg-neutral-50">
            <div className="container mx-auto px-4">
                <div className="mb-12 md:mb-24 text-center max-w-6xl mx-auto">
                    <h2 className="mb-16 font-semibold text-5xl sm:text-6xl md:text-9xl xl:text-8xl sm:max-w-xl md:max-w-4xl xl:max-w-6xl mx-auto text-black font-heading">Send a 💬 message or chat with us</h2>
                    <p className="font-semibold text-2xl text-neutral-600 tracking-tighter">Your journey to hire smart minded people starts here.</p>
                </div>
                <div className="flex flex-wrap -m-3">
                    <div className="w-full md:w-1/2 p-3">
                        <div className="h-full p-10 bg-white rounded-3xl border-2 border-neutral-100">
                            <div className="flex flex-col justify-between h-full">
                                <div className="mb-18 w-full">
                                    <h4 className="mb-2 font-semibold text-neutral-600 tracking-tight font-heading">Phone number</h4>
                                </div>
                                <div className="w-full">
                                    <h4 className="text-5xl font-medium tracking-tight font-heading">+41 337003 00</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 p-3">
                        <div className="h-full p-10 bg-white rounded-3xl border-2 border-neutral-100">
                            <div className="flex flex-col justify-between h-full">
                                <div className="mb-18 w-full">
                                    <h4 className="mb-2 font-semibold text-neutral-600 tracking-tight font-heading">Email</h4>
                                </div>
                                <div className="w-full">
                                    <h4 className="text-5xl font-medium tracking-tight font-heading">hi@contactmigra</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative w-full md:w-1/3 p-3">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3033.9071052738373!2d75.76365294024733!3d26.83782248397035!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db5007b289c23%3A0x11e08459910bd62b!2sVanshiv%20Tech!5e0!3m2!1sen!2sin!4v1728022803175!5m2!1sen!2sin"
                            width="600"
                            height="450"
                            className='w-full h-full rounded-3xl border-2 border-neutral-100'
                            loading="lazy">
                        </iframe>
                        <div className="absolute bottom-0 left-0 w-full p-8">
                            <div className="flex flex-col rounded-2xl border-2 border-neutral-200 justify-center items-start w-full p-5 font-semibold text-white bg-white">
                                <div className="mb-18 w-full">
                                    <h4 className="mb-2 font-semibold text-neutral-600 tracking-tight font-heading">Address</h4>
                                </div>
                                <div className="w-full">
                                    <h4 className="text-xl font-medium tracking-tight font-heading text-black">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, fugit.</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:flex-1 p-3">
                        <div className="h-full p-10 pb-16 bg-white rounded-3xl border-2 border-neutral-100">
                            <h4 className="mb-20 text-5xl font-medium tracking-tight font-heading text-black">Send a message</h4>
                            <form className="max-w-2xl mx-auto" action="#">
                                <div className="mb-4 border-t border-neutral-100">
                                    <div className="flex flex-wrap">
                                        <div className="w-full md:w-4/12">
                                            <div className="pt-4 md:pb-4 pr-20 border-r border-neutral-100">
                                                <p className="text-xl font-medium tracking-tight text-black">Full name</p>
                                            </div>
                                        </div>
                                        <div className="w-full md:flex-1">
                                            <div className="py-4 md:pl-8">
                                                <input className="block w-full text-xl text-neutral-600 font-medium placeholder-neutral-200 outline-none" type="text" name="name" placeholder="Full name" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-4 border-t border-neutral-100">
                                    <div className="flex flex-wrap">
                                        <div className="w-full md:w-4/12">
                                            <div className="pt-4 md:pb-4 pr-20 border-r border-neutral-100">
                                                <p className="text-xl font-medium tracking-tight text-black">Email</p>
                                            </div>
                                        </div>
                                        <div className="w-full md:flex-1">
                                            <div className="py-4 md:pl-8">
                                                <input className="block w-full text-xl text-neutral-600 font-medium placeholder-neutral-200 outline-none" type="text" name="email" placeholder="Email" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-6 border-t border-neutral-100">
                                    <div className="flex flex-wrap">
                                        <div className="w-full md:w-4/12">
                                            <div className="pt-4 md:pb-16 pr-20 border-r border-neutral-100">
                                                <p className="text-xl font-medium tracking-tight text-black">Message</p>
                                            </div>
                                        </div>
                                        <div className="w-full md:flex-1">
                                            <div className="pt-4 md:pl-8"><textarea className="block w-full text-xl text-neutral-600 font-medium placeholder-neutral-200 outline-none" name="name" rows={4} placeholder="Message"></textarea></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-wrap justify-between items-center -m-4">
                                    <div className="w-full md:flex-1 p-4">
                                        <label className="relative flex flex-wrap items-center gap-4">
                                            <input className="h-8 w-8 rounded-full" type="checkbox" name="field-checkbox" value="checkbox-value" />
                                            <span className="text-neutral-500 text-lg font-medium tracking-tight">I accept the terms and privacy policy.</span>
                                        </label>
                                    </div>
                                    <div className="w-full md:w-auto p-4">
                                        <button className="inline-flex justify-center items-center text-center h-16 p-5 font-semibold tracking-tight text-lg text-white bg-neutral-900 hover:bg-neutral-800 focus:bg-neutral-800 rounded-lg focus:ring-4 focus:ring-neutral-400 transition duration-200" type="submit">Send a message</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default page
