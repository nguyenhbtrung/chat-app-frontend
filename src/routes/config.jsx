import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import TestSocket from '../pages/TestSocket';
import { TestChat } from '../pages/TestChat';
import Chats from '../pages/Chats';
import AddFriend from '../pages/AddFriend';

export const routeConfig = {
    main: [
        { path: '', element: <Chats /> },
        { path: 'friends', element: <Chats tab={1} /> },
        {
            path: 'addFriends',
            element: <AddFriend />,
            children: [
                { path: 'sent', element: <AddFriend tab={1} /> },
                { path: 'received', element: <AddFriend tab={2} /> },
            ],
        },
        { path: 'notifications', element: <div>notifications</div> },
    ],
    extra: [
        { path: '/tsk', element: <TestSocket /> },
        { path: '/tc', element: <TestChat /> },
        { path: '/signin', element: <SignIn /> },
        { path: '/signup', element: <SignUp /> },
        { path: '*', element: <SignIn /> },
    ],
};