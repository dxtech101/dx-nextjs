"use client"
import { useState } from 'react'

const cbrdata = [
    {
        heading: "Salesforce Specialists",
        descrition: "Browse and book Salesforce Specialists through our site tailored to your project needs. We cover a range of Salesforce niche skills covering core platform, Mulesoft and Industry Cloud.",
    },
    {
        heading: "Flexible Resource Booking",
        descrition: "Easy to use and flexible booking platform allowing you to select your own resource for the timing that work for you.",
    },
    {
        heading: "Global Salesforce Talent",
        descrition: "We bring together developers from across companies and across the world giving you direct access to the world's largest Salesforce talent pool.",
    },
]

const TeamMemberCard = ({ name, position, image, socials }: any) => {
    return (
        <div className="w-full sm:w-1/2 lg:w-1/3 px-4">
            <div className="inline-block sm:block relative pr-10 sm:pr-0">
                <img className="block mb-4 w-full max-w-xs md:max-w-none h-96 lg:h-112 object-cover" src={image} alt="" />
                <div className="xl:flex items-start justify-between">
                    <div className="mb-6 xl:mb-0">
                        <h5 className="text-2xl font-semibold text-gray-900 mb-1">{name}</h5>
                        <span className="text-lg text-gray-500">{position}</span>
                    </div>
                    <div>
                        <a className="inline-flex mr-2 items-center justify-center w-8 h-8 rounded-full bg-orange-50 hover:bg-orange-100 transition duration-200" href="#">
                            <img src="saturn-assets/images/team/icon-facebook-black.svg" alt="" />
                        </a>
                        <a className="inline-flex mr-2 items-center justify-center w-8 h-8 rounded-full bg-orange-50 hover:bg-orange-100 transition duration-200" href="#">
                            <img src="saturn-assets/images/team/icon-instagram-black.svg" alt="" />
                        </a>
                        <a className="inline-flex mr-2 items-center justify-center w-8 h-8 rounded-full bg-orange-50 hover:bg-orange-100 transition duration-200" href="#">
                            <img src="saturn-assets/images/team/icon-linkedin-black.svg" alt="" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

const page = () => {
    const [selected, setSelected] = useState('developer')

    return (
        <>
            <div className="-z-20 relative h-dvh bg-center bg-[url('https://images.pexels.com/photos/1181438/pexels-photo-1181438.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')]">
                <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white from-1% -z-10'></div>
                <div className="max-w-4xl mx-auto text-center z-[100] pt-32">
                    <h1 className="font-heading text-5xl xs:text-6xl md:text-6xl font-bold text-gray-900 mb-8 sm:mb-14 z-20">
                        <span>Your dedicated platform for
                            <span className="font-serif italic">{" "}Salesforce{" "}</span>
                            resources.
                        </span>
                    </h1>
                </div>
            </div>
            <section className="py-20 mb-18 overflow-hidden">
                <div className="max-w-3xl mx-auto mb-16 text-center">
                    <h1 className="font-heading text-6xl font-bold text-gray-900 mb-4">
                        <span>Our Services</span>
                    </h1>
                    <p className="text-lg text-gray-500">We provide experienced advisors to help your company become more successful in the future.</p>
                </div>
                <div className="px-10 mx-auto">
                    <div className="flex flex-wrap items-stretch">
                        {cbrdata.map((item, ind) => (
                            <div className="w-full md:w-1/2 xl:w-1/3 p-5" key={ind}>
                                <div className="flex flex-col h-full p-10 border border-gray-900 rounded-3xl">
                                    <h2 className="font-heading mb-6 text-4xl text-black tracking-5xl">{item.heading}</h2>
                                    <p className="mb-24 text-lg text-black text-opacity-60">{item.descrition}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section className='mt-24 w-full flex flex-col items-center justify-center'>
                <div className='shadow-inner bg-black/10 my-10 flex flex-row w-full lg:w-3/4 justify-around text-black items-center h-16 p-2 rounded-xl gap-2'>
                    <button onClick={() => setSelected("developer")} className={`text-sm lg:text-base ${selected === "developer" ? "bg-white shadow-xl" : "bg-transparent text-slate-400 hover:text-slate-600 hover:bg-white/50"} relative  w-full h-full flex items-center justify-center gap-2 rounded-xl font-bold`}>
                        <img src="/developer.png" alt="Developer" width={100} height={100} className={`absolute bottom-full w-24 ${selected === "developer" ? "block animate-popup mb-3" : "hidden"} w-8 lg:w-32 flex items-center justify-center`} />
                        For Developers
                    </button>
                    <button onClick={() => setSelected("company")} className={`relative text-sm lg:text-base ${selected === "company" ? "bg-white shadow-xl" : "bg-transparent text-slate-400 hover:text-slate-600 hover:bg-white/50"} group w-full h-full flex items-center justify-center gap-2 rounded-xl font-bold`}>
                        <img src="/company.png" alt="Company" width={100} height={100} className={`absolute bottom-full w-24 ${selected === "company" ? "block animate-popup" : "hidden"} w-8 lg:w-32 flex items-center justify-center`} />
                        For Companies
                    </button>
                    <button onClick={() => setSelected("partnership")} className={`relative text-sm lg:text-base ${selected === "partnership" ? "bg-white shadow-xl" : "bg-transparent text-slate-400 hover:text-slate-600 hover:bg-white/50"} group w-full h-full flex items-center justify-center gap-2 rounded-xl font-bold`}>
                        <img src="/partnership.jpg" alt="Developer" width={100} height={100} className={`absolute mix-blend-multiply bottom-full w-24 ${selected === "partnership" ? "block animate-popup mb-3" : "hidden"} w-8 lg:w-32 flex items-center justify-center`} />
                        For Partnership
                    </button>
                </div>
                <section className="relative py-20 overflow-hidden w-full">
                    <img className="absolute left-0 top-0" src="https://static.shuffle.dev/components/preview/2f808e47-944e-42cf-b821-2358251e0600/assets/public/saturn-assets/images/features/star-left.png" alt="" />
                    <img className="absolute right-0 bottom-0" src="https://static.shuffle.dev/components/preview/2f808e47-944e-42cf-b821-2358251e0600/assets/public/saturn-assets/images/features/light-orange.png" alt="" />
                    <div className="relative container px-4 mx-auto">
                        <div className="max-w-5xl mx-auto">
                            <div className="flex flex-wrap -mx-4">
                                <div className="w-full lg:w-1/2 px-4 mb-14 lg:mb-0">
                                    <div className="max-w-md lg:max-w-lg mx-auto lg:mx-0">
                                        <h1 className="font-heading text-5xl xs:text-6xl font-bold text-gray-900 mb-6">
                                            <span>Why we are</span>
                                            <span className="font-serif italic">{" "}different{" "}</span>
                                            <span>from other startups</span>
                                        </h1>
                                        <div className="max-w-sm mb-10">
                                            <p className="text-gray-500">With us you can create a mobile app for your business in 2 weeks as well as create a website for your business in 2 days.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full lg:w-1/2 px-4">
                                    <div className="relative max-w-md lg:max-w-sm mx-auto lg:mr-0 rounded-xl">
                                        <img className="w-full rounded-xl" src="https://static.shuffle.dev/components/preview/2f808e47-944e-42cf-b821-2358251e0600/assets/public/saturn-assets/images/features/color-pastel-image.png" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
            <section className="relative py-20 md:py-24 overflow-hidden">
                <img className="absolute top-0 left-0" src="https://static.shuffle.dev/components/preview/2f808e47-944e-42cf-b821-2358251e0600/assets/public/saturn-assets/images/team/orange-light-left.png" alt="" />
                <div className="relative container px-4 mx-auto">
                    <div className="mx-auto max-w-7xl">
                        <h1 className="text-center font-heading text-6xl font-bold text-gray-900 mb-8">
                            <span>Meet our leadership team</span>
                        </h1>
                        <p className="text-center text-lg text-gray-500 mb-20">
                            We provide experienced advisors to help your company become more successful in the future.
                        </p>
                        <div className="flex flex-wrap -mx-4">
                            <TeamMemberCard
                                name="Bret Michaelson"
                                position="Founder & CEO"
                                image="https://static.shuffle.dev/components/preview/2f808e47-944e-42cf-b821-2358251e0600/assets/public/saturn-assets/images/team/large-photo-color2.png"
                                socials={[
                                    { name: "Facebook", url: "#" },
                                    { name: "Instagram", url: "#" },
                                    { name: "LinkedIn", url: "#" },
                                ]} />
                            <TeamMemberCard
                                name="Prachi Mistry"
                                position="Co-Founder & COO"
                                image="https://static.shuffle.dev/components/preview/2f808e47-944e-42cf-b821-2358251e0600/assets/public/saturn-assets/images/team/large-photo-color3.png"
                                socials={[
                                    { name: "Facebook", url: "#" },
                                    { name: "Instagram", url: "#" },
                                    { name: "LinkedIn", url: "#" },
                                ]} />
                            <TeamMemberCard
                                name="Mitesh Mistry"
                                position="Strategic Advisor"
                                image="https://static.shuffle.dev/components/preview/2f808e47-944e-42cf-b821-2358251e0600/assets/public/saturn-assets/images/team/large-photo-color1.png"
                                socials={[
                                    { name: "Facebook", url: "#" },
                                    { name: "Instagram", url: "#" },
                                    { name: "LinkedIn", url: "#" },
                                ]} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default page
