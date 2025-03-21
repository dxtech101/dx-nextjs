"use client"
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();
    return (
        <>
            <title>Join DX Platform</title>
            <div className="min-h-screen bg-white">
                {/* Hero Section */}
                <header className="relative overflow-hidden h-screen flex items-center bg-no-repeat bg-[url(https://dx-assests.s3.amazonaws.com/assets/marquee-legal-background-desktop.webp)]">
                    <div className="mx-auto container flex flex-col lg:flex-row items-center justify-evenly">
                        <div className="w-full">
                            <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
                                <div className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                                    <div className="text-center lg:text-left">
                                        <span className="text-2xl tracking-tight font-extrabold text-gray-900 sm:text-3xl md:text-4xl">D<span className='text-blue-800'>X</span> | Developer Exchange</span>
                                        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl mt-4">
                                            <span className="block">The Premier Salesforce</span>
                                            <span className="block text-blue-600">Talent Portal</span>
                                        </h1>
                                        <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                                            Connect directly with top companies. Say goodbye to low consulting firm rates and hello to higher pay, professional growth, and freedom.
                                        </p>
                                        <div className="mt-8 flex justify-center lg:justify-start gap-4">
                                            <button
                                                onClick={() => router.push("/signup")}
                                                className="rounded-md shadow px-8 py-3 bg-blue-600 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                                Create Your Profile
                                            </button>
                                            <button
                                                onClick={() => router.push("/")}
                                                className="rounded-md px-8 py-3 bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500">
                                                Learn More
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full mx-auto ">
                            <img
                                className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full mix-blend-multiply"
                                src="https://dx-assests.s3.amazonaws.com/assets/joindxHeroSection.webp"
                                alt="Salesforce professionals"
                            />
                        </div>
                    </div>
                </header>

                {/* Features Section */}
                <section id="features" className="py-12 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                                Why Join Developer Exchange?
                            </h2>
                            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
                                Elevate your Salesforce career with benefits designed for top professionals
                            </p>
                        </div>

                        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <div className="inline-flex items-center justify-center p-2 bg-blue-100 rounded-md">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 8V16M8 12H16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <h3 className="mt-4 text-lg font-medium text-gray-900">Maximize Your Earnings</h3>
                                <p className="mt-2 text-gray-600">Work directly with companies and skip the middleman. Enjoy higher hourly rates that reflect your skills.</p>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <div className="inline-flex items-center justify-center p-2 bg-blue-100 rounded-md">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M12 8V12L15 15" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <h3 className="mt-4 text-lg font-medium text-gray-900">Flexible Work, Full Freedom</h3>
                                <p className="mt-2 text-gray-600">Choose your projects, schedule, and working hours. Say goodbye to restrictive contracts.</p>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <div className="inline-flex items-center justify-center p-2 bg-blue-100 rounded-md">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M16 4H8V20H16V4Z" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M4 8H8" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M4 16H8" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M16 12H20" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <h3 className="mt-4 text-lg font-medium text-gray-900">Showcase Your Skills</h3>
                                <p className="mt-2 text-gray-600">Create a professional profile highlighting your certifications and experience to stand out to top companies.</p>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <div className="inline-flex items-center justify-center p-2 bg-blue-100 rounded-md">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <h3 className="mt-4 text-lg font-medium text-gray-900">Elite Talent Network</h3>
                                <p className="mt-2 text-gray-600">Join a community of top Salesforce professionals who prioritize collaboration and growth.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* How It Works Section */}
                <section id="how-it-works" className="py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                                How It Works
                            </h2>
                            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
                                Four simple steps to transform your Salesforce career
                            </p>
                        </div>

                        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <div className="relative">
                                <div className="flex items-center justify-center w-12 h-12 rounded-md bg-blue-600 text-white">
                                    1
                                </div>
                                <h3 className="mt-4 text-lg font-medium text-gray-900">Create Your Profile</h3>
                                <p className="mt-2 text-gray-600">Highlight your skills, certifications, and experience to stand out.</p>
                            </div>

                            <div className="relative">
                                <div className="flex items-center justify-center w-12 h-12 rounded-md bg-blue-600 text-white">
                                    2
                                </div>
                                <h3 className="mt-4 text-lg font-medium text-gray-900">Get Matched with Projects</h3>
                                <p className="mt-2 text-gray-600">We connect you with companies based on your expertise and preferences.</p>
                            </div>

                            <div className="relative">
                                <div className="flex items-center justify-center w-12 h-12 rounded-md bg-blue-600 text-white">
                                    3
                                </div>
                                <h3 className="mt-4 text-lg font-medium text-gray-900">Earn More Per Hour</h3>
                                <p className="mt-2 text-gray-600">Negotiate directly with companies to get the rates you deserve.</p>
                            </div>

                            <div className="relative">
                                <div className="flex items-center justify-center w-12 h-12 rounded-md bg-blue-600 text-white">
                                    4
                                </div>
                                <h3 className="mt-4 text-lg font-medium text-gray-900">Learn and Grow</h3>
                                <p className="mt-2 text-gray-600">Access exclusive training, webinars, and resources to advance your career.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section id="testimonials" className="py-16 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                                Hear from our members
                            </h2>
                            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
                                Success stories from Salesforce professionals who made the switch
                            </p>
                        </div>

                        <div className="mt-16 grid gap-8 md:grid-cols-3">
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <div className="flex items-center mb-4">
                                    <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="text-lg font-medium text-gray-900">Sarah Johnson</h4>
                                        <p className="text-gray-600">Senior Salesforce Developer</p>
                                    </div>
                                </div>
                                <p className="text-gray-600">"Since joining Developer Exchange, I've increased my hourly rate by 40% and work with clients I actually enjoy. The flexibility allows me to spend more time with my family while advancing my career."</p>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <div className="flex items-center mb-4">
                                    <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="text-lg font-medium text-gray-900">Michael Torres</h4>
                                        <p className="text-gray-600">Salesforce Architect</p>
                                    </div>
                                </div>
                                <p className="text-gray-600">"The quality of projects available through Developer Exchange is outstanding. I'm working on challenging enterprise implementations that have expanded my skill set and professional network tremendously."</p>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <div className="flex items-center mb-4">
                                    <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="text-lg font-medium text-gray-900">Priya Patel</h4>
                                        <p className="text-gray-600">Salesforce Consultant</p>
                                    </div>
                                </div>
                                <p className="text-gray-600">"After 5 years at a consulting firm, I took the leap to join Developer Exchange. Now I have complete control over my career path, work fewer hours, and make substantially more money."</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16 bg-blue-700">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                                Ready to transform your Salesforce career?
                            </h2>
                            <p className="mt-4 max-w-2xl text-xl text-blue-100 mx-auto">
                                Join Developer Exchange today and start working on your terms.
                            </p>
                            <div className="mt-8">
                                <button
                                    onClick={() => router.push("/signup")}
                                    className="bg-white text-blue-700 px-8 py-3 rounded-md font-medium hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-white"
                                >
                                    Create Your Profile
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Who Should Join Section */}
                <section className="py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div>
                            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                                Who Should Join?
                            </h2>
                            <p className="mt-4 text-lg text-gray-500">
                                Developer Exchange is the perfect platform for experienced Salesforce professionals looking to take control of their careers.
                            </p>
                            <div className="mt-8 space-y-4 lg:grid lg:grid-cols-2 lg:gap-8 items-center">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <h4 className="text-lg font-medium text-gray-900">Salesforce Developers</h4>
                                        <p className="mt-1 text-gray-500">With experience in Apex, Visualforce, Lightning Web Components, or integrations.</p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <h4 className="text-lg font-medium text-gray-900">Salesforce Consultants</h4>
                                        <p className="mt-1 text-gray-500">Looking to freelance and work directly with clients.</p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <h4 className="text-lg font-medium text-gray-900">Salesforce Administrators</h4>
                                        <p className="mt-1 text-gray-500">With advanced skills who want more flexibility and better compensation.</p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <h4 className="text-lg font-medium text-gray-900">Salesforce Architects</h4>
                                        <p className="mt-1 text-gray-500">Ready to leverage their expertise on challenging enterprise projects.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section id="faq" className="py-16 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                                Frequently Asked Questions
                            </h2>
                            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
                                Everything you need to know about Developer Exchange
                            </p>
                        </div>

                        <div className="mt-12 space-y-6 max-w-3xl mx-auto">
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-lg font-medium text-gray-900">How is Developer Exchange different from a recruiting agency?</h3>
                                <p className="mt-2 text-gray-600">Unlike recruiting agencies, we don't take a percentage of your earnings. You negotiate directly with companies and keep 100% of what you earn. We simply provide the platform to showcase your skills and connect with opportunities.</p>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-lg font-medium text-gray-900">What types of companies use Developer Exchange?</h3>
                                <p className="mt-2 text-gray-600">Our platform is used by companies of all sizes, from startups to Fortune 500 enterprises, who need skilled Salesforce professionals for projects of varying duration and complexity.</p>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-lg font-medium text-gray-900">Is there a minimum experience requirement?</h3>
                                <p className="mt-2 text-gray-600">While we welcome Salesforce professionals of all levels, most opportunities on our platform require at least 2 years of hands-on experience or relevant Salesforce certifications.</p>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-lg font-medium text-gray-900">How much can I expect to earn?</h3>
                                <p className="mt-2 text-gray-600">Earnings vary based on your skills, experience, and the specific projects you take on. However, our members typically earn 30-50% more than they would through traditional consulting firms.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>

    )
}
