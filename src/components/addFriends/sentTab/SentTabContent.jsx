import { Divider, List } from "@mui/material";
import SentTabsList from "./SentTabList";
import { useTranslation } from "react-i18next";
import { Close, PersonAddAlt1 } from "@mui/icons-material";

const SentTabContent = () => {
    const { t } = useTranslation('addFriends');

    const requestsSent = [
        { userId: 2, userName: "tokuda", displayName: "Tokuda", avatarUrl: null },
        { userId: 4, userName: "putin", displayName: "Putin", avatarUrl: null },
    ];

    const cancelledRequests = [
        { userId: 2, userName: "justin", displayName: "Justin Bieber", avatarUrl: null },
        { userId: 4, userName: "kara", displayName: "Kara", avatarUrl: null },
    ];

    return (
        <List sx={{ flex: 1, overflow: 'auto', p: 0 }}>
            <SentTabsList
                requests={requestsSent}
                title={t('addFriends.subTitle.requestsSent')}
                iconButton={<Close />}
                iconColor='text.secondary'
                buttonName={t('addFriends.button.cancelRequest')}
            />
            <Divider variant="middle" sx={{ my: 2, backgroundColor: '#e0e0e0' }} />
            <SentTabsList
                requests={cancelledRequests}
                title={t('addFriends.subTitle.cancelled')}
                iconButton={<PersonAddAlt1 />}
                iconColor='info.main'
                buttonName={t('addFriends.button.addFriend')}
            />
        </List>
    );
};

export default SentTabContent;