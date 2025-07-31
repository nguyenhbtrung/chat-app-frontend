export const handleApiError = (error) => {
    if (error.response) {
        const message = error.response.data?.error?.message || 'Unknown server error';
        const status = error.response.status;

        return { status, message };
    } else if (error.request) {
        return { status: null, message: 'No response received from server' };
    } else {
        return { status: null, message: error.message };
    }
};

