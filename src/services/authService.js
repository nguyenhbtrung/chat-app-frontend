import api from "./api/axios.customize";

const url = '/api/auth'

export const login = (payload) => api.post(url + '/login', payload);

export const register = (payload) => api.post(url + '/register', payload);