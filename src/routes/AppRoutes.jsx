import { Routes, Route } from 'react-router-dom';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import TestSocket from '../pages/TestSocket';
import { TestChat } from '../pages/TestChat';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<TestSocket />} />
            <Route path="/test" element={<TestChat />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<SignIn />} />
        </Routes>
    );
}
