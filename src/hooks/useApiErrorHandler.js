import { toast } from "react-toastify";
import axios from "axios";
import { useTranslation } from "react-i18next";

export const useApiErrorHandler = () => {
    const { t } = useTranslation('api');

    const handleApiError = (error) => {
        let code = 'UNKNOWN_ERROR';
        if (axios.isAxiosError(error)) {
            if (error.response) {
                code = error.response.data?.error?.code || 'INTERNAL_ERROR';
            } else if (error.request) {
                code = 'NETWORK_ERROR';
            }
        }
        toast.error(t(`api.${code}`, { defaultValue: t('api.UNKNOWN_ERROR') }));
    };

    return { handleApiError };
};
