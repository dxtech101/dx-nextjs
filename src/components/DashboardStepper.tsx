"use client"
import { onBoardingHandleNext, onBoardingHandlePrevious } from '@/feature/reducers/userOnboarding';
import { ArrowRight, Check } from 'lucide-react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const StepperComponent = ({ active, title, step, completed, stepData, onStepClick }: any) => {
    return (
        <button
            // onClick={() => onStepClick(stepData)}
            className={`flex items-center whitespace-nowrap ${active ? "bg-black" : completed ? "bg-green-100 border-2 border-green-500" : "bg-gray-200 border-2"} p-1 rounded-full`}
        >
            <div className={`inline-flex w-5 h-5 md:w-7 md:h-7 text-xs md:text-sm justify-center items-center rounded-full border-2 ${active ? "bg-white text-black mr-2" : completed ? "bg-green-300 border-green-400 mr-0 md:mr-2" : "bg-gray-400 text-white mr-0 md:mr-2"} text-sm font-bold`}>
                {completed ? <Check className="w-4 h-4" color='#166534' strokeWidth={4} /> : step}
            </div>
            <span className={`font-bold text-xs md:text-sm ${active ? "text-white" : completed ? "text-green-800 hidden md:block" : "text-gray-400 hidden md:block"} mr-2`}>
                {title}
            </span>
        </button>
    );
};


const DashboardStepper = ({ role, company_developer }: { role: "company" | "developer"; company_developer?: boolean }) => {
    const dispatch = useDispatch();
    const onboardingSteps: any = useSelector((state: any) => state.userOnboarding[`${role}Onboarding`]);
    const filteredSteps = company_developer ? onboardingSteps.slice(0, 3) : onboardingSteps;

    const handleStepClick = (stepData: any) => {
        const currentStep = onboardingSteps.find((step: any) => step.isActive);

        if (stepData.stepId > currentStep.stepId) {
            dispatch(onBoardingHandleNext({ role, stepperId: stepData.stepId - 1 }));
        } else if (stepData.stepId < currentStep.stepId) {
            dispatch(onBoardingHandlePrevious({ role, stepperId: stepData.stepId }));
        }
    };

    return (
        <section className="rounded-2xl w-full lg:w-fit h-full">
            <div className="container text-black h-full">
                <div className="flex flex-row gap-1 flex-wrap md:flex-nowrap items-center justify-evenly h-full">
                    {filteredSteps?.map((step: any, index: number) => (
                        <React.Fragment key={step.stepId}>
                            <StepperComponent
                                stepData={step}
                                active={step.isActive}
                                completed={step.isCompleted}
                                title={step.stepName}
                                step={step.stepId}
                                onStepClick={handleStepClick}
                            />
                            {index < filteredSteps.length - 1 && (
                                <span className="my-4 md:my-0 md:mx-4 lg:mx-6">
                                    <ArrowRight className="w-4 md:w-6" />
                                </span>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default DashboardStepper;
