import { GET_ALL_DEVELOPER_ASSESSMENT_QUESTIONS, GET_DEVELOPER_ASSESSMENT_QUESTIONS_ANSWERS, SUBMIT_DEVELOPER_ASSESSMENT_ANSWERS } from "@/constants/api-routes";
import axios from "axios";

interface answerDataType {
    developer_id: string;
    question_id: string;
    answer: string;
}

export const getAllQuestions = async () => {
    try {
        const response = await axios.get(GET_ALL_DEVELOPER_ASSESSMENT_QUESTIONS);
        return response.data;
    } catch (error: any) {
        throw error;
    }
}

export const getAnswer = async (developerId:string,questionId: string) => {
    try {
        const response = await axios.get(GET_DEVELOPER_ASSESSMENT_QUESTIONS_ANSWERS(developerId,questionId));
        return response.data;
    } catch (error: any) {
        throw error;
    }   
}

export const submitAnswer = async (answerData: answerDataType) => {
    try {
        const response = await axios.post(SUBMIT_DEVELOPER_ASSESSMENT_ANSWERS,answerData);
        return response.data;
    } catch (error: any) {
        throw error;
    }      
}