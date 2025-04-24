"use client"

import { useRouter } from "next/navigation"
import { ArrowRight, Check, FileCode, Globe, Shield, Users } from "lucide-react"

import { Button } from "../../components/ui/Button"
import { Card, CardContent } from "../../components/ui/Card"

export default function Home() {
    const router = useRouter()

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <header className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-emerald-100 to-white py-16 md:py-24">
                <div className="mx-auto container px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center justify-center">
                        <div>
                            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white text-slate-800 mb-6 border border-emerald-600">
                                <Shield className="h-4 w-4 mr-2 text-emerald-600" />
                                Vetted by Certified Technical Architects
                            </div>
                            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-6">
                                <span className="block">Find Vetted Salesforce</span>
                                <span className="block text-emerald-600">Developers—Fast</span>
                            </h1>
                            <p className="text-lg md:text-xl text-slate-600 mb-8">
                                Power your Salesforce projects with pre-screened talent vetted by Certified Technical Architects (CTAs).
                                Connect with freelance, offshore, or nearshore Salesforce experts—ready to build, scale, and deliver.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button
                                    size="lg"
                                    className="bg-emerald-600 hover:bg-emerald-700 text-white"
                                    onClick={() => router.push("/signup?tab=company")}
                                >
                                    Schedule a Meeting
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="lg" onClick={() => router.push("/")}>
                                    Learn More
                                </Button>
                            </div>
                            <div>
                                <img src="./sumo_logo.svg" alt="sumo logo" className="h-10 w-auto mt-4" />
                            </div>
                        </div>
                        <div className="relative">
                            <div className="relative rounded-xl overflow-hidden">
                                <img
                                    src="./company-landing-logo.png"
                                    alt="Salesforce developers collaborating"
                                    className="w-full h-auto mix-blend-multiply"
                                />
                            </div>
                            <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-4 max-w-xs">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                                        <Check className="h-5 w-5 text-emerald-600" />
                                    </div>
                                    <p className="font-semibold text-slate-900">Quality Guaranteed</p>
                                </div>
                                <p className="text-sm text-slate-600">
                                    All developers are reviewed and approved by Salesforce Certified Technical Architects
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Why Choose DX Section */}
            <section className="py-16 md:py-24 bg-gray-50">
                <div className="mx-auto container px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Why Choose Developer Exchange?</h2>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                            Whether you're a Salesforce partner, enterprise customer, or ISV, we connect you with the right talent for
                            your needs.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <Card className="border-0 shadow-lg">
                            <CardContent className="pt-6">
                                <div className="h-12 w-12 rounded-lg bg-emerald-100 flex items-center justify-center mb-5">
                                    <Shield className="h-6 w-6 text-emerald-600" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">Quality Guaranteed</h3>
                                <p className="text-slate-600">
                                    All developers are reviewed and approved by Salesforce Certified Technical Architects (CTAs)—not just
                                    the top 2%, every single one.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-lg">
                            <CardContent className="pt-6">
                                <div className="h-12 w-12 rounded-lg bg-emerald-100 flex items-center justify-center mb-5">
                                    <Globe className="h-6 w-6 text-emerald-600" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">Offshore & Nearshore Teams</h3>
                                <p className="text-slate-600">
                                    DX will build and manage your offshore or nearshore Salesforce team, acting as your Employer of Record
                                    (EOR)—so you can focus on delivery.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-lg">
                            <CardContent className="pt-6">
                                <div className="h-12 w-12 rounded-lg bg-emerald-100 flex items-center justify-center mb-5">
                                    <Users className="h-6 w-6 text-emerald-600" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">Managed Service Teams</h3>
                                <p className="text-slate-600">
                                    DX helps you stand up full managed service teams—leveraging our certified partner network of trusted
                                    Salesforce ISVs and development firms.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-lg">
                            <CardContent className="pt-6">
                                <div className="h-12 w-12 rounded-lg bg-emerald-100 flex items-center justify-center mb-5">
                                    <FileCode className="h-6 w-6 text-emerald-600" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">End-to-End PDO Services</h3>
                                <p className="text-slate-600">
                                    From AppExchange apps to enterprise integrations, our platform supports co-development with
                                    experienced ISV and offshore partners.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Who We Work With Section */}
            <section className="py-16 md:py-24 bg-slate-50">
                <div className="mx-auto container px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Who We Work With</h2>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                            Our platform serves a variety of Salesforce ecosystem participants
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <Card className="border-0 shadow-lg">
                            <CardContent className="pt-6">
                                <h3 className="text-xl font-bold text-slate-900 mb-3">Salesforce Consulting Partners</h3>
                                <p className="text-slate-600">
                                    Needing scalable delivery resources to meet client demands and deadlines
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-lg">
                            <CardContent className="pt-6">
                                <h3 className="text-xl font-bold text-slate-900 mb-3">ISVs</h3>
                                <p className="text-slate-600">
                                    Building products and preparing for security review or AppExchange listing
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-lg">
                            <CardContent className="pt-6">
                                <h3 className="text-xl font-bold text-slate-900 mb-3">Enterprise Teams</h3>
                                <p className="text-slate-600">That need short-term project support or full offshore teams</p>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-lg">
                            <CardContent className="pt-6">
                                <h3 className="text-xl font-bold text-slate-900 mb-3">Managed Service Providers</h3>
                                <p className="text-slate-600">Looking to reduce cost with long-term augmentation</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Developer Expertise Section */}
            <section className="py-16 md:py-24 bg-white">
                <div className="mx-auto container px-4 sm:px-6 lg:px-8">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">Developer Expertise</h2>
                        <p className="text-lg text-slate-600 mb-8">
                            Our network includes specialists across the entire Salesforce ecosystem, ready to tackle your most
                            complex challenges.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-start">
                                <Check className="h-5 w-5 text-emerald-600 mt-1 mr-3 flex-shrink-0" />
                                <p className="text-slate-700">Apex, LWC, and Visualforce</p>
                            </div>
                            <div className="flex items-start">
                                <Check className="h-5 w-5 text-emerald-600 mt-1 mr-3 flex-shrink-0" />
                                <p className="text-slate-700">Salesforce CPQ, Service Cloud, Sales Cloud</p>
                            </div>
                            <div className="flex items-start">
                                <Check className="h-5 w-5 text-emerald-600 mt-1 mr-3 flex-shrink-0" />
                                <p className="text-slate-700">Marketing Cloud & Pardot</p>
                            </div>
                            <div className="flex items-start">
                                <Check className="h-5 w-5 text-emerald-600 mt-1 mr-3 flex-shrink-0" />
                                <p className="text-slate-700">Experience Cloud, OmniStudio, Field Service</p>
                            </div>
                            <div className="flex items-start">
                                <Check className="h-5 w-5 text-emerald-600 mt-1 mr-3 flex-shrink-0" />
                                <p className="text-slate-700">DevOps tools (Gearset, Copado)</p>
                            </div>
                            <div className="flex items-start">
                                <Check className="h-5 w-5 text-emerald-600 mt-1 mr-3 flex-shrink-0" />
                                <p className="text-slate-700">Integration specialists</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Expand Without Overhead Section */}
            <section className="py-16 md:py-24 bg-slate-50">
                <div className="mx-auto container px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="order-2 lg:order-1">
                            <div className="relative">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white p-6 rounded-lg shadow-lg">
                                        <Globe className="h-8 w-8 text-emerald-600 mb-4" />
                                        <h4 className="font-bold text-slate-900 mb-2">LATAM</h4>
                                        <p className="text-sm text-slate-600">Mexico, Brazil, Argentina, Colombia</p>
                                    </div>
                                    <div className="bg-white p-6 rounded-lg shadow-lg">
                                        <Globe className="h-8 w-8 text-emerald-600 mb-4" />
                                        <h4 className="font-bold text-slate-900 mb-2">Eastern Europe</h4>
                                        <p className="text-sm text-slate-600">Poland, Romania, Ukraine, Bulgaria</p>
                                    </div>
                                    <div className="bg-white p-6 rounded-lg shadow-lg">
                                        <Globe className="h-8 w-8 text-emerald-600 mb-4" />
                                        <h4 className="font-bold text-slate-900 mb-2">India</h4>
                                        <p className="text-sm text-slate-600">Bangalore, Hyderabad, Mumbai, Delhi</p>
                                    </div>
                                    <div className="bg-white p-6 rounded-lg shadow-lg">
                                        <Globe className="h-8 w-8 text-emerald-600 mb-4" />
                                        <h4 className="font-bold text-slate-900 mb-2">Southeast Asia</h4>
                                        <p className="text-sm text-slate-600">Philippines, Vietnam, Malaysia</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="order-1 lg:order-2">
                            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">Expand Without the Overhead</h2>
                            <p className="text-lg text-slate-600 mb-8">
                                Let DX handle the complexities of global team building while you focus on delivery. Whether it's one
                                developer or a dedicated team, we help you scale quickly and compliantly.
                            </p>

                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <Check className="h-5 w-5 text-emerald-600 mt-1 mr-3 flex-shrink-0" />
                                    <p className="text-slate-700">Local compliance & labor laws</p>
                                </div>
                                <div className="flex items-start">
                                    <Check className="h-5 w-5 text-emerald-600 mt-1 mr-3 flex-shrink-0" />
                                    <p className="text-slate-700">Payroll, benefits, and HR</p>
                                </div>
                                <div className="flex items-start">
                                    <Check className="h-5 w-5 text-emerald-600 mt-1 mr-3 flex-shrink-0" />
                                    <p className="text-slate-700">Team sourcing, onboarding & performance tracking</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-16 md:py-24 bg-white">
                <div className="mx-auto container px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">What Our Partners Say</h2>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                            Hear from companies that have transformed their Salesforce delivery with DX
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <Card className="border-0 shadow-lg">
                            <CardContent className="pt-6">
                                <div className="flex flex-col h-full">
                                    <div className="mb-6">
                                        <div className="flex space-x-1">
                                            {[...Array(5)].map((_, i) => (
                                                <svg key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-slate-700 text-lg italic mb-6 flex-grow">
                                        "DX saved us months of recruiting time and delivered talent that exceeded our expectations. We were
                                        able to scale our team quickly to meet client demands."
                                    </p>
                                    <div className="flex items-center">
                                        <div className="h-12 w-12 rounded-full bg-slate-200 flex items-center justify-center mr-4">
                                            <Users className="h-6 w-6 text-slate-600" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-900">VP Delivery</p>
                                            <p className="text-slate-600">Salesforce Partner</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-lg">
                            <CardContent className="pt-6">
                                <div className="flex flex-col h-full">
                                    <div className="mb-6">
                                        <div className="flex space-x-1">
                                            {[...Array(5)].map((_, i) => (
                                                <svg key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-slate-700 text-lg italic mb-6 flex-grow">
                                        "The fact that every developer is vetted by a CTA gave us total confidence in quality from day one.
                                        Our offshore team has become an integral part of our delivery model."
                                    </p>
                                    <div className="flex items-center">
                                        <div className="h-12 w-12 rounded-full bg-slate-200 flex items-center justify-center mr-4">
                                            <Users className="h-6 w-6 text-slate-600" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-900">Director</p>
                                            <p className="text-slate-600">Enterprise CRM Programs</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 md:py-24 bg-emerald-600">
                <div className="mx-auto container px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
                            Ready to Build Your Salesforce Team?
                        </h2>
                        <p className="text-xl text-emerald-100 max-w-3xl mx-auto mb-8">
                            Let's talk about your current needs and how DX can support your growth.
                        </p>
                        <div className="flex flex-row gap-6 items-center justify-center">
                            <Button
                                size="lg"
                                className="bg-white text-emerald-600 hover:bg-emerald-50"
                                onClick={() => router.push("/signup?tab=company")}
                            >
                                Schedule a Meeting
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                            <img src="./sumo_logo.svg" alt="sumo logo" className="h-10 w-auto" />
                        </div>
                        <p className="text-emerald-100 mt-4">
                            One of our Salesforce experts will connect with you to walk through the process and match you with the
                            right talent.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    )
}
