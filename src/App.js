import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Auth/Login";
import MainPage from "./components/Main/MainPage";

const App = () => {
  const isAuthenticated = !!localStorage.getItem("token"); // Kiểm tra người dùng đã đăng nhập chưa

  return (
    <Router>
      <Routes>
        {/* Trang Đăng ký */}
        {/* <Route path="/register" element={<Register />} /> */}

        {/* Trang Đăng nhập */}
        <Route path="/login" element={<Login />} />

        {/* Trang chính */}
        <Route
          path="/"
          element={isAuthenticated ? <MainPage /> : <Navigate to="/login" />}
        />

        {/* Chuyển hướng mặc định */}
        <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} />} />
      </Routes>
    </Router>
  );
};

export default App;
