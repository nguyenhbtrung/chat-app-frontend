import { ACCESS_TOKEN_KEY_NAME } from "../constants";
import api from "./api/axios.customize";

const url = '/api/auth'

export const login = (payload) => api.post(url + '/login', payload);

export const register = (payload) => api.post(url + '/register', payload);

export const saveAccessToken = (token) => localStorage.setItem(ACCESS_TOKEN_KEY_NAME, token);

export const removeAccessToken = () => localStorage.removeItem(ACCESS_TOKEN_KEY_NAME); 