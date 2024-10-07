import { ArrowDown, ArrowRight } from 'lucide-react'
import React from 'react'

const StepperComponent = ({ active, title, step }: any) => {
    return (
        <div className={`flex items-center ${active ? "bg-black " : "bg-gray-200"} p-2 rounded-full`}>
            <div className={`inline-flex w-7 h-7 mr-2 justify-center items-center rounded-full border-2 ${active ? "bg-white text-black" : "bg-gray-400 text-white"} text-sm font-bold`}>
                {step}
            </div>
            <span className={`font-bold ${active ? "text-white" : "text-gray-400"}  mr-2`}>
                {title}
            </span>
        </div>
    )
}

const Stepper = () => {
    return (
        <section className="rounded-2xl h-full">
            <div className="container text-black h-full">
                <div className="flex flex-row gap-2 flex-wrap items-center justify-evenly h-full">
                    <StepperComponent active={true} title="Certification Details" step={1} />
                    <span className="my-4 md:my-0 md:mx-4 lg:mx-8">
                        <ArrowRight className="w-6 h-6" />
                    </span>
                    <StepperComponent active={false} title="Skills Details" step={2} />
                    <span className="my-4 md:my-0 md:mx-4 lg:mx-8">
                        <ArrowRight className="w-6 h-6" />
                    </span>
                    <StepperComponent active={false} title="Work Experience" step={3} />
                </div>
            </div>
        </section>
    )
}

export default Stepper
