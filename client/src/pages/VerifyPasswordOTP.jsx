import React, { useState } from "react";
import logo from "../assets/black-logo.png";
import logo_with_title from "../assets/white-logo.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { verifyPasswordOtp, resetAuthSlice } from "../store/slices/authSlice";
import { useEffect } from "react";

const VerifyPasswordOTP = () => {
  const { email } = useParams();
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (message === "OTP verified successfully.") {
      toast.success(message);
      dispatch(resetAuthSlice());
      navigate(`/password/reset/${email}/${otp}`);
    }
    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
  }, [message, error, dispatch, navigate, email, otp]);

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (!otp || otp.length !== 5) {
      toast.error("Please enter a valid 5-digit OTP");
      return;
    }
    dispatch(verifyPasswordOtp({ email, otp }));
  };

  return (
    <>
      <div className="flex flex-col justify-center md:flex-row h-screen">
        <div className="hidden w-full md:w-1/2 bg-black text-white md:flex flex-col items-center justify-center p-8 rounded-br-[80px] rounded-tr-[80px]">
          <div className="text-center h=[450px]">
            <div className="flex justify-center mb-12">
              <img
                src={logo_with_title}
                alt="logo"
                className="mb-12 h-44 w-auto"
              />
            </div>
            <h3 className="text-gray-300 mb-12 max-w-[320px] mx-auto text-3xl font-medium leading-10">
              "Check your email for the OTP code"
            </h3>
          </div>
        </div>
        {/*RIGHT SIDE*/}
        <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8 relative">
          <Link
            to={"/"}
            className="border-2 border-black rounded-3xl font-bold w-52 py-2 px-4 fixed top-10 -left-28 hover:bg-black hover:text-white transition duration-300 text-end z-10"
          >
            Back to Home
          </Link>
          <div className="w-full max-w-sm">
            <div className="flex justify-center mb-12">
              <div className="rounded-full flex items-center justufy-center">
                <img src={logo} alt="logo" className="h-24  w-auto" />
              </div>
            </div>
            <h1 className="text-4xl font-medium text-center mb-5 overflow-hidden">
              Verify OTP
            </h1>
            <p className="text-gray-500 text-center mb-12">
              Enter the 5-digit code sent to {email}
            </p>
            <form onSubmit={handleVerifyOtp}>
              <div className="mb-4">
                <input
                  type="number"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="5-Digit OTP"
                  className="w-full px-4 py-3 border border-black rounded-md focus:outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="border-2 mt-5 border-black w-full font-semibold bg-black text-white py-2 rounded-lg hover:bg-white hover:text-black transition disabled:opacity-50"
              >
                {loading ? "VERIFYING..." : "VERIFY OTP"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyPasswordOTP;
