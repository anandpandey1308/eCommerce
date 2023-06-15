import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Components/Home/HomePage";
import Login from "./Components/Login/Login";
import ForgetPassword from "./Components/RestPassword/ForgetPassword";
import ResetPassword from "./Components/RestPassword/ResetPassword";

const Pages = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/forgetPassword" element={<ForgetPassword />} />
      <Route path="/resetPassword" element={<ResetPassword />} />
    </Routes>
  );
};

export default Pages;
