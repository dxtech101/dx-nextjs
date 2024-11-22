import { GET_USER_SALESFORCE_ID, SIGN_IN_ENDPOINT, TOKEN_VERIFICATION, USER_ONBOARDED } from "@/constants/api-routes";
import "@/lib/axios-configuration";
import axios from "axios";
import { setAuthenticationToken } from "../cookie";

export const tokenVerification = async (tokenVerificationData: any) => {
    try {
        const response = await axios.post(TOKEN_VERIFICATION, tokenVerificationData);
        return response.data;
    } catch (error: any) {
        throw error;
    }
}

export const developerSignIn = async(signInData: any) => {
    try {
        const response = await axios.post(SIGN_IN_ENDPOINT, signInData);
        setAuthenticationToken(response.data)
        return response.data;
    } catch (error: any) {
        throw error;
    }
}

export const getDeveloperSalesforceId = async(developerEmail:any) => {
    try {
        const response = await axios.post(GET_USER_SALESFORCE_ID, { email :developerEmail});
        return response.data;
    } catch (error: any) {
        throw error;
    }
}

export const userOnBoarded = async(id:any) => {
    try {
        const response = await axios.put(USER_ONBOARDED(id), {is_onboard : true});
        return response.data;
    } catch (error: any) {
        throw error;
    }
}