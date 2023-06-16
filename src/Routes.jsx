import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Components/Home/HomePage";
import Login from "./Components/Login/Login";
import LoginViaOTP from "./Components/Login/LoginViaOtp";
import OtpVerification from "./Components/Login/OTPVerification";
import ForgetPassword from "./Components/RestPassword/ForgetPassword";
import ResetPassword from "./Components/RestPassword/ResetPassword";

const Pages = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/forgetPassword" element={<ForgetPassword />} />
      <Route path="/resetPassword" element={<ResetPassword />} />
      <Route path="/login-otp" element={<LoginViaOTP />} />
      <Route path="/verify-otp" element={<OtpVerification />} />
    </Routes>
  );
};

export default Pages;
