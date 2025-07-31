import api from "./api/api";

const url = '/api/auth'

export const login = (payload) => api.post(url + '/login', payload);

export const register = (payload) => api.post(url + '/register', payload);