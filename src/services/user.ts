import axios from "axios";

const BASE_URL = 'http://localhost:5000';

export function signup(data: any) {
    delete data.confirmPassword;
    const response = axios.post(`${BASE_URL}/signup`, data);
    return response;
}

export function signIn(data: any) {
    const response = axios.post(`${BASE_URL}/signin`, data);
    return response;
}