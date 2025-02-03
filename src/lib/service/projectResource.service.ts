import { ADD_CERTIFICATIONS_REQUIREMENT, ADD_PROJECT, ADD_RESOURCES_REQUEST, ADD_SKILL_REQUIRMENT, DELETE_CERTIFICATIONS_REQUIREMENT, DELETE_PROJECT, DELETE_RESOURCES_REQUEST, DELETE_SKILL_REQUIREMENT, EDIT_CERTIFICATIONS_REQUIREMENT, EDIT_PROJECT, EDIT_RESOURCES_REQUEST, EDIT_SKILL_REQUIREMENT, GET_ALL_PROJECTS, GET_ALL_RESOURCES_REQUEST, GET_CERTIFICATIONS_REQUIREMENT, GET_CERTIFICATIONS_REQUIREMENT_BY_RESOURCE_SIFD, GET_CERTIFICATIONS_REQUIREMENT_ID, GET_COMPANY_PROJECTS, GET_COMPANY_RESOURCES, GET_PROJECT, GET_PROJECT_SFID_BY_NAME, GET_RESOURCES_REQUEST, GET_SHORTLISTED_RESOURCES, GET_SKILL_REQUIREMENT, GET_SKILL_REQUIREMENT_BY_RESOURCE_SIFD, GET_SKILL_REQUIREMENT_ID, SHORTLIST_RESOURCE, UPDATE_SHORTLISTED_RESOURCES } from "@/constants/api-routes";
import "@/lib/axios-configuration";
import axios from "axios";

export const getAllProjects = async () => {
    try {
        const response = await axios.get(GET_ALL_PROJECTS);
        return response.data;
    } catch (error: any) {
        throw error;
    }
}

export const getProject = async (id: any) => {
    try {
        const response = await axios.get(GET_PROJECT(id));
        return response.data;
    } catch (error: any) {
        throw error;
    }
}

export const getProjectSFIDbyName = async (projectName:any) => {
    try {
        const response = await axios.get(GET_PROJECT_SFID_BY_NAME(projectName));
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getCompanyProjects = async (account_id: any) => {
    try {
        const response = await axios.get(GET_COMPANY_PROJECTS(account_id));
        return response.data;
    } catch (error: any) {
        throw error;
    }
}

export const addProject = async (projectData: any) => {
    try {
        const response = await axios.post(ADD_PROJECT, projectData);
        return response.data;
    } catch (error: any) {
        throw error;
    }
}

export const editProject = async (sfid: any, projectData: any) => {
    try {
        const response = await axios.put(EDIT_PROJECT(sfid), projectData);
        return response.data;
    } catch (error: any) {
        throw error;
    }
}

export const deleteProject = async (sfid: any) => {
    try {
        const response = await axios.delete(DELETE_PROJECT(sfid));
        return response.data;
    } catch (error: any) {
        throw error;
    }
}

export const getAllResourceRequest = async () => {
    try {
        const response = await axios.get(GET_ALL_RESOURCES_REQUEST);
        return response.data;
    } catch (error: any) {
        throw error;
    }
}

export const getResourceRequest = async (sfid: any) => {
    try {
        const response = await axios.get(GET_RESOURCES_REQUEST(sfid));
        return response.data;
    } catch (error: any) {
        throw error;
    }
}   

export const getCompanyResources = async (account_id: any) => {
    try {
        const response = await axios.get(GET_COMPANY_RESOURCES(account_id));
        return response.data;
    } catch (error: any) {
        throw error;
    }
}

export const addResourceRequest = async (resourceRequestData: any) => {
    try {
        const response = await axios.post(ADD_RESOURCES_REQUEST, resourceRequestData);
        return response.data;
    } catch (error: any) {
        throw error;
    }
}

export const editResourceRequest = async (sfid: any, resourceRequestData: any) => {
    try {
        const response = await axios.put(EDIT_RESOURCES_REQUEST(sfid), resourceRequestData);
        return response.data;
    } catch (error: any) {
        throw error;
    }
}

export const deleteResourceRequest = async (sfid: any) => {
    try {
        const response = await axios.delete(DELETE_RESOURCES_REQUEST(sfid));
        return response.data;
    } catch (error: any) {
        throw error;
    }
}

export const addSkillRequirement = async (skillRequirementData: any) => {
    try {
        const response = await axios.post(ADD_SKILL_REQUIRMENT, skillRequirementData);
        return response.data;
    } catch (error: any) {
        throw error;
    }
}

export const getAllSkillRequirement = async () => {
    try {
        const response = await axios.get(GET_SKILL_REQUIREMENT);
        return response.data;
    } catch (error: any) {
        throw error;
    }
}

export const getSkillRequirement = async (sfid: any) => {
    try {
        const response = await axios.get(GET_SKILL_REQUIREMENT_ID(sfid));
        return response.data;
    } catch (error: any) {
        throw error;
    }
}

export const getSkillRequirementByResourceRequest = async (sfid: any) => {
    try {
        const response = await axios.get(GET_SKILL_REQUIREMENT_BY_RESOURCE_SIFD(sfid));
        return response.data;
    } catch (error: any) {
        throw error;
    }
}

export const editSkillRequirement = async (sfid: any, skillRequirementData: any) => {
    try {
        const response = await axios.put(EDIT_SKILL_REQUIREMENT(sfid), skillRequirementData);
        return response.data;
    } catch (error: any) {
        throw error;
    }
}

export const deleteSkillRequirement = async (sfid: string) => {
    try {
        const response = await axios.delete(DELETE_SKILL_REQUIREMENT(sfid));
        return response.data;
    } catch (error: any) {
        throw error;
    }
}

export const addCertificationsRequirement = async (certificationsRequirementData: any) => {
    try {
        const response = await axios.post(ADD_CERTIFICATIONS_REQUIREMENT, certificationsRequirementData);
        return response.data;
    } catch (error: any) {
        throw error;
    }
}

export const getAllCertificationsRequirement = async () => {
    try {
        const response = await axios.get(GET_CERTIFICATIONS_REQUIREMENT);
        return response.data;
    } catch (error: any) {
        throw error;
    }
} 

export const getCertificationsRequirementByResourceRequest = async (sfid: any) => {
    try {
        const response = await axios.get(GET_CERTIFICATIONS_REQUIREMENT_BY_RESOURCE_SIFD(sfid));
        return response.data;
    } catch (error: any) {
        throw error;
    }
}

export const getCertificationsRequirement = async (sfid: any) => {
    try {
        const response = await axios.get(GET_CERTIFICATIONS_REQUIREMENT_ID(sfid));
        return response.data;
    } catch (error: any) {
        throw error;
    }
}

export const editCertificationsRequirement = async (sfid: any, certificationsRequirementData: any) => {
    try {
        const response = await axios.put(EDIT_CERTIFICATIONS_REQUIREMENT(sfid), certificationsRequirementData);
        return response.data;
    } catch (error: any) {
        throw error;
    }
}

export const deleteCertificationsRequirement = async (sfid: string) => {
    try {
        const response = await axios.delete(DELETE_CERTIFICATIONS_REQUIREMENT(sfid));
        return response.data;
    } catch (error: any) {
        throw error;
    }
}

export const shortlistResourceRequest = async (shortlistResourceData: any) => {
    try {
        const response = await axios.post(SHORTLIST_RESOURCE, shortlistResourceData);
        return response.data;
    } catch (error: any) {
        throw error;
    }
}

export const getShortlistedResources = async (contactId: any) => {
    try {
        const response = await axios.get(GET_SHORTLISTED_RESOURCES(contactId));
        return response.data;
    } catch (error: any) {
        throw error;
    }
}

export const updateShortlistedResources = async (contactId: any) => {
    try {
        const response = await axios.put(UPDATE_SHORTLISTED_RESOURCES(contactId), {});
        return response.data;
    } catch (error: any) {
        throw error;
    }
}



