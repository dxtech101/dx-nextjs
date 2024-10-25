import { RESET_PASSWORD, TOKEN_VERIFICATION } from "@/constants/api-routes";
import axios from "axios";
import "@/lib/axios-configuration"

export const resetPassword = async (signupData: any) => {
    try {
        const response = await axios.post(RESET_PASSWORD, signupData);
        return response.data;
    } catch (error: any) {
        throw error;
    }
}

export const tokenVerification = async (tokenVerificationData: any) => {
    try {
        const response = await axios.post(TOKEN_VERIFICATION, tokenVerificationData);
        return response.data;
    } catch (error: any) {
        throw error;
    }
}
