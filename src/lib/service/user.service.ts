import { FORGET_PASSWORD, GET_USER_SALESFORCE_ACCOUNT_ID, GET_USER_SALESFORCE_CONTACT_ID, PROFILE_UPDATE, PROFILE_UPLOAD, RESET_PASSWORD, SIGN_IN_ENDPOINT, TOKEN_VERIFICATION, USER_ONBOARDED, VERIFY_COMPANY_DEVELOPER } from "@/constants/api-routes";
import "@/lib/axios-configuration";
import axios from "axios";
import { setAuthenticationToken } from "../cookie";
import { th } from "framer-motion/client";

export const tokenVerification = async (tokenVerificationData: any) => {
    try {
        const response = await axios.post(TOKEN_VERIFICATION, tokenVerificationData);
        return response.data;
    } catch (error: any) {
        throw error;
    }
}

export const userSignIn = async (signInData: any) => {
    try {
        const response = await axios.post(SIGN_IN_ENDPOINT, signInData);
        setAuthenticationToken(response.data)
        return response.data;
    } catch (error: any) {
        throw error;
    }
}

export const getDeveloperSalesforceContactId = async (developerEmail: any) => {
    try {
        const response = await axios.post(GET_USER_SALESFORCE_CONTACT_ID, { email: developerEmail });
        return response.data;
    } catch (error: any) {
        throw error;
    }
}

export const getCompanySalesforceAccountId = async (companyEmail: any) => {
    try {
        const response = await axios.post(GET_USER_SALESFORCE_ACCOUNT_ID, { email: companyEmail });
        return response.data;
    } catch (error: any) {
        throw error;
    }
}

export const userOnBoarded = async (id: any) => {
    try {
        const response = await axios.put(USER_ONBOARDED(id), { is_onboard: true });
        return response.data;
    } catch (error: any) {
        throw error;
    }
}

export const uploadProfilePicture = async (formData: any) => {
    try {
        const response = await axios.post(PROFILE_UPLOAD, formData)
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const updateProfile = async (formData: any) => {
    try {
        const response = await axios.post(PROFILE_UPDATE, formData)
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const verifyCompanyDeveloper = async (developerEmail: any) => {
    try {
        const response = await axios.post(VERIFY_COMPANY_DEVELOPER, { email: developerEmail })
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const resetPassword = async (payload: any) => {
    try {
        const response = await axios.post(RESET_PASSWORD, payload)
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const forgetPassword = async (user_email: any) => {
    try {
        const response = await axios.post(FORGET_PASSWORD, { email: user_email })
        return response.data;
    } catch (error) {
        throw error;
    }
}