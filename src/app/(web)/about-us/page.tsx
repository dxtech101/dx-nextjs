"use client"
import AboutCompany from '@/components/web/AboutCompany'
import Link from 'next/link'
import { useState } from 'react'

const TeamMemberCard = ({ name, position, image, socials }: any) => {
    return (
        <div className="inline-block sm:block relative">
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
    )
}

const page = () => {
    const [selected, setSelected] = useState('developer')

    const values = [{
        icon: "🚀",
        label: "Excellence",
        description: "We uphold the highest standards by ensuring every developer is vetted by industry experts, delivering top - quality talent to our customers."
    },
    {
        icon: "🔍",
        label: "Transparency",
        description: "We believe in clear, straightforward hiring processes that remove complexity and build trust between companies and developers."
    },
    {
        icon: "🤝",
        label: "Community Driven",
        description: "We foster a strong network of Salesforce professionals through mentorship, knowledge - sharing, and career growth opportunities."
    },
    {
        icon: "🌍",
        label: "Flexibility & Accessibility",
        description: "We provide businesses with flexible hiring options, including freelance, nearshore, and offshore talent, making Salesforce expertise more accessible."
    },
    {
        icon: "💡",
        label: "Innovation",
        description: "We leverage cutting - edge technology and industry best practices to streamline talent acquisition and ensure faster, smarter hiring decisions."
    },
    {
        icon: "🙌",
        label: "Empowerment",
        description: "We empower Salesforce professionals by giving them access to high - quality opportunities, fair compensation, and career development."
    }]

    return (
        <>
            <div className="-z-20 relative h-dvh w-full -mt-1 bg-no-repeat bg-center bg-[url('https://dx-assests.s3.amazonaws.com/assets/about-us.jpeg')]">
                <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white from-10% -z-10'></div>
                <div className="max-w-4xl mx-auto text-center z-[100] pt-32">
                    <h1 className="font-heading text-4xl md:text-6xl font-bold text-gray-900 mb-8 sm:mb-14 z-20">
                        <span className='leading-snug'>
                            🚀 Build your{" "}
                            <span className='relative inline-flex flex-row items-baseline justify-end gap-4'>
                                <img src="/salesforce-no-type-logo.svg" alt="Salesforce" className='h-16 -z-10 hidden lg:block' />
                                Salesforce{" "}
                            </span>
                            dream team today with DX.
                        </span>
                    </h1>
                </div>
            </div>
            <AboutCompany />

            <section className='mt-0 w-full flex flex-col items-center justify-center'>
                <section className="relative py-20 w-full">
                    <img className="absolute right-0 -top-10 scale-x-[-1]" src="https://static.shuffle.dev/components/preview/2f808e47-944e-42cf-b821-2358251e0600/assets/public/saturn-assets/images/features/star-left.png" alt="" />
                    <div className="relative container px-4 mx-auto">
                        <div className="w-full mb-14 lg:mb-0">
                            <h1 className="font-heading text-2xl md:text-6xl font-bold text-gray-900 mb-6">
                                <span>Our Misson</span>
                            </h1>
                            <div className="max-w-4xl mb-10">
                                <p className="text-gray-500">At Developer Exchange (DX), our mission is to revolutionize the way companies and Salesforce partners connect with top-tier Salesforce talent. We provide a trusted, high-quality marketplace where every developer is rigorously vetted by Certified Technical Architects (CTAs) and experienced Salesforce leaders. Our goal is to simplify hiring, reduce costs, and accelerate project success by ensuring businesses have on-demand access to elite Salesforce professionals—anytime, anywhere.</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className='container mx-auto px-4'>
                    <div className="w-full mb-14 lg:mb-0">
                        <h1 className="font-heading text-2xl md:text-6xl font-bold text-gray-900 mb-6">
                            <span>Our Core Values</span>
                        </h1>
                        <div className="max-w-4xl mb-10">
                            <p className="text-gray-500">At Developer Exchange (DX), our mission is to revolutionize the way companies and Salesforce partners connect with top-tier Salesforce talent. We provide a trusted, high-quality marketplace where every developer is rigorously vetted by Certified Technical Architects (CTAs) and experienced Salesforce leaders. Our goal is to simplify hiring, reduce costs, and accelerate project success by ensuring businesses have on-demand access to elite Salesforce professionals—anytime, anywhere.</p>
                        </div>
                    </div>
                    <div className="mx-auto grid max-w-xl grid-cols-1 gap-8 lg:mx-auto lg:max-w-none lg:grid-cols-3">
                        {values.map((vl: any) => (
                            <div className="flex max-w-xl group flex-col items-start border border-black/10 justify-between p-4 px-6 rounded-3xl">
                                <div className="group relative">
                                    <h3 className="flex flex-col items-start gap-4 mt-3 text-xl font-semibold leading-6 text-black opacity-100">
                                        {vl?.icon}
                                        <div>
                                            <span className="absolute inset-0 font-extrabold" />
                                            {vl?.label}
                                        </div>
                                    </h3>
                                    <p className="mt-5 text-sm leading-6 text-gray-400">
                                        {vl?.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </section>
            <section className="relative py-20 md:py-24 overflow-hidden">
                <img className="absolute top-0 left-0" src="https://static.shuffle.dev/components/preview/2f808e47-944e-42cf-b821-2358251e0600/assets/public/saturn-assets/images/team/orange-light-left.png" alt="" />
                <div className="relative container px-4 mx-auto">
                    <div className="mx-auto max-w-7xl">
                        <h1 className="text-center font-heading text-4xl lg:text-6xl font-bold text-gray-900 mb-8">
                            <span>Meet our leadership team</span>
                        </h1>
                        <p className="text-center text-lg text-gray-500 mb-20">
                            We provide experienced advisors to help your company become more successful in the future.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-10">
                            <TeamMemberCard
                                name="Bret Michaelsen"
                                position="Founder & CEO"
                                image="https://dx-assests.s3.amazonaws.com/assets/bret.jpeg"
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
