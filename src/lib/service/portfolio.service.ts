import { ADD_WORK_EXPERIENCE, ASSIGN_CERTIFICATION, ASSIGN_SKILLS, DELETE_ASSIGNED_CERTIFICATION, DELETE_ASSIGNED_SKILL, DELETE_WORK_EXPERIENCE, EDIT_WORK_EXPERIENCE, GET_ALL_ASSIGNED_CERTIFICATION, GET_ALL_ASSIGNED_SKILLS, GET_ALL_SALESFORCE_CERTIFICATIONS, GET_ALL_SALESFORCE_SKILLS, GET_WORK_EXPERIENCE, USER_PORTFOLIO } from "@/constants/api-routes";
import "@/lib/axios-configuration";
import axios from "axios";

export const getAllSalesforceCertifications = async () => {
    try {
        const response = await axios.get(GET_ALL_SALESFORCE_CERTIFICATIONS);
        return response.data;
    } catch (error: any) {
        throw error;
    }
}

export const getAllSalesforceSkills = async () => {
    try {
        const response = await axios.get(GET_ALL_SALESFORCE_SKILLS);
        return response.data;
    } catch (error: any) {
        throw error;
    }
}

export const getAllAssignedCertifications = async (contact_id: any) => {
    try {
        const response = await axios.get(GET_ALL_ASSIGNED_CERTIFICATION(contact_id));
        return response.data;
    } catch (error: any) {
        throw error;
    }
}

export const getAllAssignedSkills = async (contact_id: any) => {
    try {
        const response = await axios.get(GET_ALL_ASSIGNED_SKILLS(contact_id));
        return response.data;
    } catch (error: any) {
        throw error;
    }
}

export const getWorkExperience = async (id:any) => {
    try {
        const response = await axios.get(GET_WORK_EXPERIENCE(id));
        return response.data;
    } catch (error: any) {
        throw error;
    }
}


export const assignCertification = async (assignCertificationData: any) => {
    try {
        const response = await axios.post(ASSIGN_CERTIFICATION, assignCertificationData);
        return response.data;
    } catch (error: any) {
        throw error;
    }
}

export const assignSkills = async (assignSkillsData: any) => {
    try {
        const response = await axios.post(ASSIGN_SKILLS, assignSkillsData);
        return response.data;
    } catch (error: any) {
        throw error;
    }
}

export const updateWorkExperience = async (sfid:any,workExperienceData: any) => {
    try {
        const response = await axios.put(EDIT_WORK_EXPERIENCE(sfid), workExperienceData);
        return response.data;
    } catch (error: any) {
        throw error;
    }
}

export const addWorkExperience = async (workExperienceData: any) => {
    try {
        const response = await axios.post(ADD_WORK_EXPERIENCE, workExperienceData);
        return response.data;
    } catch (error: any) {
        throw error;
    }
}

export const deleteAssignedCertifications = async (sfid: string) => {
    try {
        const response = await axios.delete(DELETE_ASSIGNED_CERTIFICATION(sfid));
        return response.data;
    } catch (error: any) {
        throw error;
    }
}

export const deleteAssignedSkills = async (sfid: string) => {
    try {
        const response = await axios.delete(DELETE_ASSIGNED_SKILL(sfid));
        return response.data;
    } catch (error: any) {
        throw error;
    }
}

export const deleteWorkExperience = async (sfid: string) => {
    try {
        const response = await axios.delete(DELETE_WORK_EXPERIENCE(sfid));
        return response.data;
    } catch (error: any) {
        throw error;
    }
}

export const getUserPortfolio = async (sfid: string) => {
    try {
        const response = await axios.get(USER_PORTFOLIO(sfid));
        return response.data;
    } catch (error: any) {
        throw error;
    }
}
