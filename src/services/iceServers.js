import api from "./api";

export const getIceServers = async () => {
    try {
        const response = await api.get("/ice-servers");
        return response.data;
    } catch (error) {
        console.error("Error fetching ICE servers:", error);
        return [];
    }
};
