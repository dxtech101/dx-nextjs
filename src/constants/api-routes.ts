// Base URLS
export const BASE_PROD = "https://dx-digital-94bdac14721f.herokuapp.com/";
export const BASE_STAGING = "https://dx-digital-94bdac14721f.herokuapp.com/";
export const BASE_LOCAL = "https://dx-digital-94bdac14721f.herokuapp.com/";

//USERS API's ENDPOINTS
export const SIGN_IN_ENDPOINT = "/users/sign-in/";
export const SIGN_UP_ENDPOINT = "/users/enroll-user/";
export const TOKEN_VERIFICATION = "/users/token-verification/";
export const USER_ONBOARDED = (id:any) => `/users/on-boarded/${id}`
export const GET_USER_SALESFORCE_ID = `/users/contact-salesforce-id/`

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
//

