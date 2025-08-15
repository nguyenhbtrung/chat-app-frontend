import { Routes, Route } from 'react-router-dom';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import TestSocket from '../pages/TestSocket';
import { TestChat } from '../pages/TestChat';
import MainLayout from '../pages/MainLayout';
import Chats from '../pages/Chats';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<Chats />} />
                <Route path="addFriends" element={<div>Friends</div>} />
                <Route path="notifications" element={<div>notifications</div>} />
                <Route path=':otherUserId' element={<Chats />} />
                <Route path='friends/:otherUserId' element={<Chats tab={1} />} />
                <Route path="addFriends/:otherUserId" element={<div>Friends</div>} />
                <Route path="notifications/:otherUserId" element={<div>notifications</div>} />
            </Route>
            <Route path="/tsk" element={<TestSocket />} />
            <Route path="/tc" element={<TestChat />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<SignIn />} />
        </Routes>
    );
}
