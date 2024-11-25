"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState: any = [
  {stepId: 1, stepName: "Certifications", isActive: true, isCompleted: false},
  {stepId: 2, stepName: "Skills", isActive: false, isCompleted: false},
  {stepId: 3, stepName: "Work Experience", isActive: false, isCompleted: false},
];

const developerOnboardingSlice = createSlice({
  name: "DeveloperOnboarding",
  initialState,
  reducers: {
    onBoardingHandleNext: (state, action) => {
      const { stepperId } = action.payload;
      
      const currentStep = state.find((step: any) => step.stepId === stepperId);
      
      if (currentStep) {
        currentStep.isActive = false;
        currentStep.isCompleted = true;
      }
      
      const nextStep = state.find((step: any) => step.stepId === (stepperId + 1));
      
      if (nextStep) {
        nextStep.isActive = true;
      }
    },
    onBoardingHandlePrevious: (state, action) => {
      const { stepperId } = action.payload;
      
      const currentStep = state.find((step: any) => step.stepId === stepperId);
      
      if (currentStep) {
        currentStep.isActive = false;
        currentStep.isCompleted = false;
      }
      
      const previousStep = state.find((step: any) => step.stepId === (stepperId - 1));
      
      if (previousStep) {
        previousStep.isActive = true;
        previousStep.isCompleted = false;
      }
    },
  },
});

export const { onBoardingHandleNext, onBoardingHandlePrevious } = developerOnboardingSlice.actions;
export default developerOnboardingSlice.reducer;
