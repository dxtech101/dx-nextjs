// Base URLS
export const BASE_PROD = "https://dx-digital-94bdac14721f.herokuapp.com/";
export const BASE_STAGING = "https://dx-digital-94bdac14721f.herokuapp.com/";
export const BASE_LOCAL = "https://dx-digital-94bdac14721f.herokuapp.com/";

//USERS API's ENDPOINTS
export const SIGN_IN_ENDPOINT = "/users/sign-in/";
export const SIGN_UP_ENDPOINT = "/users/enroll-user/";
export const TOKEN_VERIFICATION = "/users/token-verification/";
export const USER_ONBOARDED = (id:any) => `/users/on-boarded/${id}`
export const GET_USER_SALESFORCE_CONTACT_ID = `/users/contact-salesforce-id/`
export const GET_USER_SALESFORCE_ACCOUNT_ID= `/users/account-salesforce-id/`

//DEVELOPER ONBOARDING API's ENDPOINTS
export const USER_PORTFOLIO = (sfid:any) => `portfolio/detailed-contact-view/${sfid}`
// Certifications
export const GET_ALL_SALESFORCE_CERTIFICATIONS = "/portfolio/certifications/";
export const ASSIGN_CERTIFICATION = "/portfolio/assign-certification/";
export const GET_ALL_ASSIGNED_CERTIFICATION = (contact_id:any) => `portfolio/view-assign-certification/${contact_id}`
export const DELETE_ASSIGNED_CERTIFICATION = (sfid:any) => `/portfolio/delete-user-assign-certification/${sfid}`

// Skills
export const GET_ALL_SALESFORCE_SKILLS = "/portfolio/skills/";
export const ASSIGN_SKILLS = "/portfolio/assign-skills/";
export const GET_ALL_ASSIGNED_SKILLS = (contact_id:any) => `portfolio/view-assign-skills/${contact_id}`
export const DELETE_ASSIGNED_SKILL = (sfid:any) => `/portfolio/delete-user-assign-skills/${sfid}`

// Work Experience
export const GET_WORK_EXPERIENCE = (contact_id:any) => `/portfolio/view-contact-work-experience/${contact_id}`;
export const ADD_WORK_EXPERIENCE = "/portfolio/add-contact-work-experience/ ";
export const EDIT_WORK_EXPERIENCE = (sfid:any) => `/portfolio/update-work-experience/${sfid}`;
export const DELETE_WORK_EXPERIENCE = (sfid:any) => `/portfolio/delete-work-experience/${sfid}`;

//Work Preference
export const GET_WORK_PREFERENCE = (contact_id:any) => `/portfolio/work-preferences/?contact_sfid=${contact_id}`;
export const ADD_WORK_PREFERENCE = "/portfolio/work-preferences/";
export const EDIT_WORK_PREFERENCE = (sfid:any) => `/portfolio/work-preferences/${sfid}`;
export const DELETE_WORK_PREFERENCE = (sfid:any) => `/portfolio/work-preferences/${sfid}`;
//

// COMPANY API'S ENDPOINTS
// Projects
export const GET_ALL_PROJECTS = `/project_resource/get-projects/`;
export const GET_PROJECT_SFID_BY_NAME = (projectName:any) => `project_resource/get-sfid-project-name/${projectName}`
export const GET_COMPANY_PROJECTS = (accountId:any) => `project_resource/get-company-projects/${accountId}`;
export const GET_PROJECT = (id:any) => `/project_resource/get-projects-by-sfid/?id=${id}`;
export const ADD_PROJECT = "/project_resource/create-projects/";
export const EDIT_PROJECT = (id:any) => `/project_resource/update-projects/${id}`;
export const DELETE_PROJECT = (sfid:any) => `/project_resource/delete-projects/${sfid}`;

// Resources Request
export const GET_ALL_RESOURCES_REQUEST = `/project_resource/view-resource-request/`;
export const GET_COMPANY_RESOURCES = (accountId:any) => `/project_resource/get-company-request-resource/${accountId}`;
export const GET_RESOURCES_REQUEST = (sfid:any) => `/project_resource/view-resource-request-by-sfid/?id=${sfid}`;
export const ADD_RESOURCES_REQUEST = "/project_resource/resource-request/";
export const EDIT_RESOURCES_REQUEST = (id:any) => `/project_resource/update-resource-request/${id}`;
export const DELETE_RESOURCES_REQUEST = (id:any) => `/project_resource/delete-resource-request/${id}`;

// Skill Requirements
export const ADD_SKILL_REQUIRMENT = "/project_resource/create-skill-requirements/";
export const GET_SKILL_REQUIREMENT = "/project_resource/view-skill-requirements/";
export const GET_SKILL_REQUIREMENT_ID = (sfid:any) => `/project_resource/view-skill-requirements-by-sfid/${sfid}`;
export const GET_SKILL_REQUIREMENT_BY_RESOURCE_SIFD = (sfid:any) => `/project_resource/get-skill-requirements-by-resource-request-sfid/${sfid}`;
export const EDIT_SKILL_REQUIREMENT = (sfid:any) => `/project_resource/update-skill-requirements/${sfid}`;
export const DELETE_SKILL_REQUIREMENT = (sfid:any) => `/project_resource/delete-skill-requirements/${sfid}`;

//Certifications Requirements
export const ADD_CERTIFICATIONS_REQUIREMENT = "/project_resource/create-certifications-requirements/";
export const GET_CERTIFICATIONS_REQUIREMENT = "/project_resource/view-certifications-requirements/";
export const GET_CERTIFICATIONS_REQUIREMENT_BY_RESOURCE_SIFD = (sfid:any) => `/project_resource/get-certifications-requirements-by-resource-request-sfid/${sfid}`;
export const GET_CERTIFICATIONS_REQUIREMENT_ID = (sfid:any) => `/project_resource/view-certifications-requirements-by-sfid/${sfid}`;
export const EDIT_CERTIFICATIONS_REQUIREMENT = (sfid:any) => `/project_resource/update-certifications-requirements/${sfid}`;        
export const DELETE_CERTIFICATIONS_REQUIREMENT = (sfid:any) => `/project_resource/delete-certifications-requirements/${sfid}`;

//Developer Search
export const GET_SKILLS_RELATED_DEVELOPERS = (skills:any) => `/portfolio/skills-related-developer-list/?skill_name=${skills}`;
export const SHORTLIST_RESOURCE = `/project_resource/shortlisted-resources/ `;
export const GET_SHORTLISTED_RESOURCES = (contactId:any) => `/project_resource/check-shortlisted-resources/?contact_id=${contactId}`;
export const UPDATE_SHORTLISTED_RESOURCES = (contactId:any) => `/project_resource/update-shortlisted-resources/${contactId}`;   
//
