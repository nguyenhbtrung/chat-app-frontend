import api from './api';

export const getOnlineUsers = async (token) => {
    const response = await api.get('/users/online', {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const updateUserStatus = async (token, isOnline) => {
    const response = await api.post(
        '/users/update-status',
        { isOnline },
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
};