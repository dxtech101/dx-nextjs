// pages/index.js
"use client"
import Head from 'next/head';
import { useState } from 'react';

export default function DetailsSection() {
    const [activeTab, setActiveTab] = useState('isv');

    return (
        <div className="min-h-screen">
            <Head>
                <title>DX - Salesforce PDO Services</title>
                <meta name="description" content="Professional Salesforce PDO Services" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="my-20 bg-gray-50">
                <div className='container mx-auto px-4 py-10 flex flex-col lg:flex-row justify-between gap-6'>
                    <nav className="z-10 mt-10">
                        <div className="flex flex-col gap-4 justify-center items-center pb-4">
                            <button
                                className={`px-6 py-2 mx-2 rounded-full font-medium border-2 transition ${activeTab === 'isv'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 hover:bg-gray-200'
                                    }`}
                                onClick={() => setActiveTab('isv')}
                            >
                                Product Development Outsourcing
                            </button>
                            <button
                                className={`px-6 py-2 mx-2 rounded-full font-medium border-2 transition ${activeTab === 'offshore'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 hover:bg-gray-200'
                                    }`}
                                onClick={() => setActiveTab('offshore')}
                            >
                                Offshore & ISV Partner Development
                            </button>
                        </div>
                    </nav>
                    <div className="container mx-auto px-4">
                        {activeTab === 'isv' && (
                            <section>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <ServiceCard
                                        title="ISV App Development"
                                        description="From idea to AppExchange launch, we help ISVs build secure, scalable Salesforce applications."
                                        icon="📱"
                                    />
                                    <ServiceCard
                                        title="CTO-Led Architecture & Compliance"
                                        description="Backed by Salesforce Certified Technical Architects (CTAs) to ensure best practices, security, and scalability."
                                        icon="🏗️"
                                    />
                                    <ServiceCard
                                        title="AppExchange Readiness & Security Review"
                                        description="Navigate Salesforce's listing, compliance, and security processes with expert guidance."
                                        icon="🔒"
                                    />
                                </div>
                            </section>
                        )}

                        {activeTab === 'offshore' && (
                            <section>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <ServiceCard
                                        title="Scalable Offshore Resources"
                                        description="Work with trusted ISV and offshore partners to augment your development team."
                                        icon="🌐"
                                    />
                                    <ServiceCard
                                        title="Integrated Collaboration"
                                        description="We manage seamless joint development efforts, ensuring high-quality deliverables."
                                        icon="🤝"
                                    />
                                    <ServiceCard
                                        title="Salesforce DevOps & Managed Services"
                                        description="Long-term support for ongoing enhancements, integrations, and maintenance."
                                        icon="⚙️"
                                    />
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            </main>

            <section className='flex flex-col lg:flex-row container mx-auto pb-10'>
                <h2 className="text-3xl font-bold text-center text-blue-800 my-12">Why Choose DX?</h2>
                <div className="max-w-3xl mx-auto bg-white rounded-xl overflow-hidden">
                    <div className="p-8">
                        <div className="flex items-start mb-6">
                            <div className="bg-green-100 p-3 rounded-full text-green-500 mr-4">✓</div>
                            <div>
                                <h3 className="font-bold text-xl mb-2">Developers Vetted by CTAs & Architects</h3>
                                <p className="text-gray-600">Not just the top 2%—every developer meets elite standards.</p>
                            </div>
                        </div>
                        <div className="flex items-start mb-6">
                            <div className="bg-green-100 p-3 rounded-full text-green-500 mr-4">✓</div>
                            <div>
                                <h3 className="font-bold text-xl mb-2">Flexible Engagement Models</h3>
                                <p className="text-gray-600">Hire freelance, contract, or full-time resources based on your needs.</p>
                            </div>
                        </div>
                        <div className="flex items-start mb-6">
                            <div className="bg-green-100 p-3 rounded-full text-green-500 mr-4">✓</div>
                            <div>
                                <h3 className="font-bold text-xl mb-2">Global Reach, Local Expertise</h3>
                                <p className="text-gray-600">Nearshore & offshore options to balance cost, skill, and time zone alignment.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-blue-800 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-6">Empower your Salesforce projects with DX today!</h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto">Contact us to discuss your hiring or development needs.</p>
                    <button className="bg-white text-blue-800 px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
                        Get Started Today
                    </button>
                </div>
            </section>
        </div>
    );
}

// Component for service cards
const ServiceCard = ({ title, description, icon }: any) => {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition transform ">
            <div className="p-6">
                <div className="text-4xl mb-4">{icon}</div>
                <h3 className="text-xl font-bold text-blue-800 mb-3">{title}</h3>
                <p className="text-gray-600">{description}</p>
            </div>
        </div>
    );
};