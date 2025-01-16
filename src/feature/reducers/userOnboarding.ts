import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  companyOnboarding: [
    { stepId: 1, stepName: "Create Projects", isActive: true, isCompleted: false },
    { stepId: 2, stepName: "Raise Resource Request", isActive: false, isCompleted: false },
    { stepId: 3, stepName: "Detailed View", isActive: false, isCompleted: false },
  ],
  developerOnboarding: [
    { stepId: 1, stepName: "Certifications", isActive: true, isCompleted: false },
    { stepId: 2, stepName: "Skills", isActive: false, isCompleted: false },
    { stepId: 3, stepName: "Work Experience", isActive: false, isCompleted: false },
    { stepId: 4, stepName: "Work Preferences", isActive: false, isCompleted: false },
  ],
};

const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    onBoardingHandleNext: (state, action) => {
      const { role, stepperId } = action.payload;
      const steps = state[`${role}Onboarding`]; 
      const currentStep = steps.find((step: any) => step.stepId === stepperId);

      if (currentStep) {
        currentStep.isActive = false;
        currentStep.isCompleted = true;
      }

      const nextStep = steps.find((step: any) => step.stepId === stepperId + 1);

      if (nextStep) {
        nextStep.isActive = true;
      }
    },
    onBoardingHandlePrevious: (state, action) => {
      const { role, stepperId } = action.payload;
      const steps = state[`${role}Onboarding`]; 
      const currentStep = steps.find((step: any) => step.stepId === stepperId);

      if (currentStep) {
        currentStep.isActive = false;
        currentStep.isCompleted = false;
      }

      const previousStep = steps.find((step: any) => step.stepId === stepperId - 1);

      if (previousStep) {
        previousStep.isActive = true;
        previousStep.isCompleted = false;
      }
    },
  },
});

export const { onBoardingHandleNext, onBoardingHandlePrevious } = onboardingSlice.actions;
export default onboardingSlice.reducer;
