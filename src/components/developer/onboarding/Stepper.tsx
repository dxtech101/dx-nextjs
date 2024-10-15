"use client"
import { ArrowRight, Check } from 'lucide-react'
import { useSelector } from 'react-redux'

const StepperComponent = (
    {
        active,
        title,
        step,
        completed
    }: any) => {
    return (
        <div className={`flex items-center ${active ? "bg-black" : completed ? "bg-green-100 border-2 border-green-500" : "bg-gray-200"} p-2 rounded-full`}>
            <div className={`inline-flex w-7 h-7 mr-2 justify-center items-center rounded-full border-2 ${active ? "bg-white text-black" : completed ? "bg-green-300 border-green-400" : "bg-gray-400 text-white"} text-sm font-bold`}>
                {completed ? <Check className="w-4 h-4" color='#166534' strokeWidth={4} /> : step}
            </div>
            <span className={`font-bold ${active ? "text-white" : completed ? "text-green-800" : "text-gray-400"}  mr-2`}>
                {title}
            </span>
        </div>
    )
}

const Stepper = () => {
    const developerOnboarding = useSelector((state: any) => state.developerOnboarding)
    console.log("developerOnboarding::", developerOnboarding)

    return (
        <section className="rounded-2xl h-full">
            <div className="container text-black h-full">
                <div className="flex flex-row gap-2 flex-wrap items-center justify-evenly h-full">
                    <StepperComponent
                        active={developerOnboarding[0].isActive}
                        completed={developerOnboarding[0].isCompleted}
                        title="Certification Details"
                        step={1}
                    />
                    <span className="my-4 md:my-0 md:mx-4 lg:mx-8">
                        <ArrowRight className="w-6 h-6" />
                    </span>
                    <StepperComponent
                        active={developerOnboarding[1].isActive}
                        completed={developerOnboarding[1].isCompleted}
                        title="Skills Details"
                        step={2}
                    />
                    <span className="my-4 md:my-0 md:mx-4 lg:mx-8">
                        <ArrowRight className="w-6 h-6" />
                    </span>
                    <StepperComponent
                        active={developerOnboarding[2].isActive}
                        completed={developerOnboarding[2].isCompleted}
                        title="Work Experience"
                        step={3}
                    />
                </div>
            </div>
        </section>
    )
}

export default Stepper
