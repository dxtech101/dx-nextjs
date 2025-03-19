import React from 'react'

const page = () => {
  const values = [{
    icon: "🚀",
    label: "On - Demand Talent",
    description: "Access pre-screened Salesforce developers, architects, and consultants for freelance, contract, or full-time engagements."
  },
  {
    icon: "🌍",
    label: "Nearshore & Offshore Hiring",
    description: "Reduce costs while maintaining quality with global talent options."
  },
  {
    icon: "💡",
    label: "Expertise Across the Ecosystem",
    description: "Developers skilled in Apex, LWC, CPQ, OmniStudio, Experience Cloud, Marketing Cloud, and more."
  }]
  return (
    <>
      <section className='h-screen flex flex-col lg:flex-row items-center justify-center'>
        <div className='flex flex-col items-start justify-center w-full'>
          <h1 className='text-center text-4xl lg:text-6xl font-bold text-gray-900 mb-8'>
            <span>Our Services</span>
          </h1>
          <p className='text-sm xl:text-lg text-gray-500 mb-20'>
            At Developer Exchange (DX), we provide comprehensive Salesforce development solutions tailored to businesses, ISVs, and Salesforce partners. Our platform connects companies with pre-vetted freelance Salesforce developers, while also offering expert PDO (Product Development Outsourcing) services and Managed Services through strategic partnerships with top offshore teams and ISVs
          </p>
        </div>
        <div className='flex flex-col items-start justify-center w-full'>
        </div>
      </section>
      <section className='flex flex-col xl:flex-row gap-4 items-center'>
        <div className="w-fit mb-10">
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-gray-900">
            <span>Hire Vetted Freelance Salesforce Developers</span>
          </h1>
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
      
    </>

  )
}

export default page
