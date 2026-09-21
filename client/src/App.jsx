import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import OTP from "./pages/OTP";
import Register from "./pages/Register";
import AdminRegister from "./pages/AdminRegister";
import ResetPassword from "./pages/ResetPassword";
import VerifyPasswordOTP from "./pages/VerifyPasswordOTP";
import { ToastContainer } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "./store/slices/authSlice";
import { fetchAllUsers } from "./store/slices/userSlice";
import { fetchAllBooks } from "./store/slices/bookSlice";
import {
  fetchAllBorrowedBooks,
  fetchUserBorrowedBooks,
} from "./store/slices/borrowSlice";

const App = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());

    if (isAuthenticated && user?.role === "Admin") {
      dispatch(fetchAllBooks());
      dispatch(fetchAllUsers());
      dispatch(fetchAllBorrowedBooks());
    }
    if (isAuthenticated && user?.role === "User") {
      dispatch(fetchAllBooks());
      dispatch(fetchUserBorrowedBooks());
    }
  }, [isAuthenticated, user?.role, dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin-register" element={<AdminRegister />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/otp-verification/:email" element={<OTP />} />
        <Route path="/password/otp-verify/:email" element={<VerifyPasswordOTP />} />
        <Route path="/password/reset/:email/:otp" element={<ResetPassword />} />
      </Routes>
      <ToastContainer theme="light" />
    </Router>
  );
};

export default App;
