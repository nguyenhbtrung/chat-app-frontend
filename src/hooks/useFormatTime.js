import { useTranslation } from "react-i18next";

const useFormatTime = () => {
    const { t } = useTranslation('time');

    return (isoTime) => {
        const date = new Date(isoTime);
        const now = new Date();

        const diffMs = now - date;
        const diffMin = Math.floor(diffMs / 60000);
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const diffMonths = Math.floor(diffDays / 30);
        const diffYears = Math.floor(diffDays / 365);

        if (diffMin < 60) return t("time.minute", { count: diffMin });

        if (diffDays === 0) {
            const diffHour = Math.floor(diffMin / 60);
            return t("time.hour", { count: diffHour });
        }

        if (diffDays === 1) return t("time.yesterday");

        if (diffDays < 30) return t("time.day", { count: diffDays });

        if (diffMonths < 12) return t("time.month", { count: diffMonths });

        return t("time.year", { count: diffYears });
    };
};

export default useFormatTime;
