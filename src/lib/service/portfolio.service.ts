import { ADD_WORK_EXPERIENCE, ADD_WORK_PREFERENCE, ASSIGN_CERTIFICATION, ASSIGN_SKILLS, DELETE_ASSIGNED_CERTIFICATION, DELETE_ASSIGNED_SKILL, DELETE_WORK_EXPERIENCE, DELETE_WORK_PREFERENCE, EDIT_WORK_EXPERIENCE, EDIT_WORK_PREFERENCE, GET_ALL_ASSIGNED_CERTIFICATION, GET_ALL_ASSIGNED_SKILLS, GET_ALL_SALESFORCE_CERTIFICATIONS, GET_ALL_SALESFORCE_SKILLS, GET_EXPERIENCE_SUMMARY, GET_SKILLS_RELATED_DEVELOPERS, GET_WORK_EXPERIENCE, GET_WORK_PREFERENCE, USER_PORTFOLIO } from "@/constants/api-routes";
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

export const getUserPortfolio = async (sfid: string) => {
    try {
        const response = await axios.get(USER_PORTFOLIO(sfid));
        return response.data;
    } catch (error: any) {
        throw error;
    }
}

export const getSkillsRelatedDevelopers = async (skills: string) => {
    try {
        const response = await axios.get(GET_SKILLS_RELATED_DEVELOPERS(skills));
        return response.data;
    } catch (error: any) {
        throw error;
    }
}

export const getExperienceSummary = async (account_id: any) => {
    try {
        const response = await axios.post(GET_EXPERIENCE_SUMMARY(account_id));
        return response.data;
    } catch (error: any) {
        throw error;
    }
}

export const CertificationsService = {
    getAllAssignedCertifications: async (contact_id: any) => {
        try {
            const response = await axios.get(GET_ALL_ASSIGNED_CERTIFICATION(contact_id));
            return response.data;
        } catch (error: any) {
            throw error;
        }
    }, 
    assignCertification:  async (assignCertificationData: any) => {
        try {
            const response = await axios.post(ASSIGN_CERTIFICATION, assignCertificationData);
            return response.data;
        } catch (error: any) {
            throw error;
        }
    }, 
    deleteAssignedCertifications: async (sfid: string) => {
        try {
            const response = await axios.delete(DELETE_ASSIGNED_CERTIFICATION(sfid));
            return response.data;
        } catch (error: any) {
            throw error;
        }
    }
}

export const SkillsService = {
    getAllAssignedSkills : async (contact_id: any) => {
        try {
            const response = await axios.get(GET_ALL_ASSIGNED_SKILLS(contact_id));
            return response.data;
        } catch (error: any) {
            throw error;
        }
    },
    assignSkills : async (assignSkillsData: any) => {
        try {
            const response = await axios.post(ASSIGN_SKILLS, assignSkillsData);
            return response.data;
        } catch (error: any) {
            throw error;
        }
    },
    deleteAssignedSkills : async (sfid: string) => {
        try {
            const response = await axios.delete(DELETE_ASSIGNED_SKILL(sfid));
            return response.data;
        } catch (error: any) {
            throw error;
        }
    }
}

export const WorkExperienceService = {
    getWorkExperience: async (id:any) => {
        try {
            const response = await axios.get(GET_WORK_EXPERIENCE(id));
            return response.data;
        } catch (error: any) {
            throw error;
        }
    },
    updateWorkExperience : async (sfid:any,workExperienceData: any) => {
        try {
            const response = await axios.put(EDIT_WORK_EXPERIENCE(sfid), workExperienceData);
            return response.data;
        } catch (error: any) {
            throw error;
        }
    },
    addWorkExperience : async (workExperienceData: any) => {
        try {
            const response = await axios.post(ADD_WORK_EXPERIENCE, workExperienceData);
            return response.data;
        } catch (error: any) {
            throw error;
        }
    },
    deleteWorkExperience : async (sfid: string) => {
        try {
            const response = await axios.delete(DELETE_WORK_EXPERIENCE(sfid));
            return response.data;
        } catch (error: any) {
            throw error;
        }
    }
}

export const WorkPreferencesService = {
    getWorkPreference: async (contact_id: any) => {
        try {
            const response = await axios.get(GET_WORK_PREFERENCE(contact_id));
            return response.data;
        } catch (error: any) {
            throw error;
        }
    },
    addWorkPreference: async (workPreferenceData: any) => {
        try {
            const response = await axios.post(ADD_WORK_PREFERENCE, workPreferenceData);
            return response.data;
        } catch (error: any) {
            throw error;
        }
    },
    editWorkPreference: async (sfid: any, workPreferenceData: any) => {
        try {
            const response = await axios.put(EDIT_WORK_PREFERENCE(sfid), workPreferenceData);
            return response.data;
        } catch (error: any) {
            throw error;
        }
    },
    deleteWorkPreference: async (sfid: string) => {
        try {
            const response = await axios.delete(DELETE_WORK_PREFERENCE(sfid));
            return response.data;
        } catch (error: any) {
            throw error;
        }  
    }
}
