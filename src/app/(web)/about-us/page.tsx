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
                    <a className="inline-flex mr-2 items-center justify-center w-8 h-8 rounded-full bg-gray-50 hover:bg-gray-100 transition duration-200" href={socials[0]?.url} target="_blank" rel="noopener noreferrer">
                        <svg className="text-gray-800" width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M4.0898 11.8182V6.51068H5.90537L6.17776 4.44164H4.0898V3.12086C4.0898 2.52201 4.25864 2.1139 5.13515 2.1139L6.25125 2.11345V0.26283C6.05824 0.238228 5.39569 0.181824 4.62456 0.181824C3.01431 0.181824 1.9119 1.14588 1.9119 2.91594V4.44164H0.0908203V6.51068H1.9119V11.8182H4.0898Z" fill="currentColor"></path>
                        </svg>
                    </a>
                    <a className="inline-flex mr-2 items-center justify-center w-8 h-8 rounded-full bg-gray-50 hover:bg-gray-100 transition duration-200" href={socials[1]?.url} target="_blank" rel="noopener noreferrer">
                        <svg className="text-gray-800" width="13" height="11" viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12.5455 2.09728C12.0904 2.29892 11.6022 2.43566 11.0892 2.49671C11.613 2.18304 12.014 1.6855 12.204 1.09447C11.7127 1.38496 11.1703 1.59589 10.5924 1.71023C10.1296 1.21655 9.47138 0.909058 8.74128 0.909058C7.34059 0.909058 6.20489 2.04475 6.20489 3.44467C6.20489 3.64322 6.2273 3.83714 6.27057 4.02257C4.16298 3.91671 2.29411 2.90696 1.0433 1.37259C0.824652 1.74653 0.700269 2.18225 0.700269 2.64736C0.700269 3.52734 1.14837 4.30379 1.82825 4.75805C1.41259 4.74415 1.02166 4.62981 0.67942 4.43975V4.47142C0.67942 5.69983 1.55399 6.72504 2.71362 6.95837C2.50116 7.01554 2.27712 7.04722 2.04534 7.04722C1.88156 7.04722 1.72318 7.031 1.56788 7.00009C1.89081 8.00831 2.8272 8.74148 3.93663 8.76158C3.06902 9.44146 1.97504 9.84552 0.786814 9.84552C0.582087 9.84552 0.38043 9.83316 0.181885 9.81076C1.30445 10.5316 2.63716 10.9519 4.06952 10.9519C8.73514 10.9519 11.2854 7.0874 11.2854 3.73595L11.2769 3.4076C11.7752 3.05219 12.2063 2.60564 12.5455 2.09728Z" fill="currentColor"></path>
                        </svg>
                    </a>
                    <a className="inline-flex mr-2 items-center justify-center w-8 h-8 rounded-full bg-gray-50 hover:bg-gray-100 transition duration-200" href={socials[2]?.url} target="_blank" rel="noopener noreferrer">
                        <svg className="text-gray800" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.8 0H1.2C0.54 0 0 0.54 0 1.2V10.8C0 11.46 0.54 12 1.2 12H10.8C11.46 12 12 11.46 12 10.8V1.2C12 0.54 11.46 0 10.8 0ZM3.6 10.2H1.8V4.8H3.6V10.2ZM2.7 3.78C2.1 3.78 1.62 3.3 1.62 2.7C1.62 2.1 2.1 1.62 2.7 1.62C3.3 1.62 3.78 2.1 3.78 2.7C3.78 3.3 3.3 3.78 2.7 3.78ZM10.2 10.2H8.4V7.02C8.4 6.54002 7.98 6.12 7.5 6.12C7.02 6.12 6.6 6.54002 6.6 7.02V10.2H4.8V4.8H6.6V5.52C6.9 5.04 7.56 4.68 8.1 4.68C9.24 4.68 10.2 5.64 10.2 6.78V10.2Z" fill="currentColor"></path>
                        </svg>
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
                            <h1 className="font-heading text-4xl md:text-6xl font-bold text-gray-900 mb-6">
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
                        <h1 className="font-heading text-4xl md:text-6xl font-bold text-gray-900 mb-6">
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
                                    { name: "Twitter", url: "#" },
                                    { name: "LinkedIn", url: "https://www.linkedin.com/in/bamichaelsen/" },
                                ]} />
                            <TeamMemberCard
                                name="Prachi Mistry"
                                position="Co-Founder & COO"
                                image="https://static.shuffle.dev/components/preview/2f808e47-944e-42cf-b821-2358251e0600/assets/public/saturn-assets/images/team/large-photo-color3.png"
                                socials={[
                                    { name: "Facebook", url: "#" },
                                    { name: "Twitter", url: "#" },
                                    { name: "LinkedIn", url: "#" },
                                ]} />
                            <TeamMemberCard
                                name="Mitesh Mistry"
                                position="Strategic Advisor"
                                image="https://dx-assests.s3.amazonaws.com/assets/mitesh.jpeg"
                                socials={[
                                    { name: "Facebook", url: "#" },
                                    { name: "Twitter", url: "#" },
                                    { name: "LinkedIn", url: "https://www.linkedin.com/in/mitesh-mistry-3a288718/" },
                                ]} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default page
