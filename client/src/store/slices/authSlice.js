import { BACKEND_URL } from "../../config";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";



const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    error: null,
    message: null,
    user: null,
    isAuthenticated: false,
  },
  reducers: {
    registerRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    registerSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
    },
    registerFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    otpVerificationRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    otpVerificationSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    otpVerificationFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    loginRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    loginFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    logoutRequest(state) {
      state.loading = true;
      state.message = null;
      state.error = null;
    },
    logoutSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
      state.isAuthenticated = false;
      state.user = null;
    },
    logoutFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    getUserRequest(state) {
      //GetUserRequest function
      state.loading = true;
      state.error = null;
      state.message = null;
    },

    getUserSuccess(state, action) {
      state.loading = false;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },

    getUserFailed(state) {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
    },

    forgotPasswordRequest(state,action) {
      //ForgotPasswordRequest function
      state.loading = true;
      state.error = null;
      state.message = null;
    },

    forgotPasswordSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },

    forgotPasswordFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    resetPasswordRequest(state) {
      //ResetPasswordRequest function
      state.loading = true;
      state.error = null;
      state.message = null;
    },

    resetPasswordSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },

    resetPasswordFailed(state,action) {
      state.loading = false;
      state.error = action.payload;
    },

    updatePasswordRequest(state) {
      //UpdatepasswordRequest function
      state.loading = true;
      state.error = null;
      state.message = null;
    },

    updatePasswordSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },

    updatePasswordFailed(state,action) {
      state.loading = false;
      state.error = action.payload;
    },

    verifyPasswordOtpRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    verifyPasswordOtpSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    verifyPasswordOtpFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    requestDeleteOtpRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    requestDeleteOtpSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    requestDeleteOtpFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteAccountRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deleteAccountSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
      state.isAuthenticated = false;
      state.user = null;
    },
    deleteAccountFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    resetAuthSlice(state) {
      state.error = null;
      state.loading = false;
      state.message = null;
      // state.user = state.user;
      // state.isAuthenticated = state.isAuthenticated;
    },
  },
});

export const resetAuthSlice = () => (dispatch) => {
  dispatch(authSlice.actions.resetAuthSlice());
};

export const register = (data) => async (dispatch) => {
  dispatch(authSlice.actions.registerRequest());
  await axios
    .post(`${BACKEND_URL}/api/v1/auth/register`, data, {
      //URL should be paste here.......
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      dispatch(authSlice.actions.registerSuccess(res.data));
    })
    .catch((error) => {
      dispatch(authSlice.actions.registerFailed(error.response?.data?.message || error.message));
    });
}; // Register function

export const adminRegister = (data) => async (dispatch) => {
  dispatch(authSlice.actions.registerRequest());
  await axios
    .post(`${BACKEND_URL}/api/v1/auth/admin/register`, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      dispatch(authSlice.actions.registerSuccess(res.data));
    })
    .catch((error) => {
      dispatch(authSlice.actions.registerFailed(error.response?.data?.message || error.message));
    });
}; // Admin Register function

export const otpVerification = (email, otp) => async (dispatch) => {
  dispatch(authSlice.actions.otpVerificationRequest());
  await axios
    .post(
      `${BACKEND_URL}/api/v1/auth/verify-otp`,
      { email, otp },
      {
        //URL should be paste here.......
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
    .then((res) => {
      dispatch(authSlice.actions.otpVerificationSuccess(res.data));
    })
    .catch((error) => {
      dispatch(
        authSlice.actions.otpVerificationFailed(error.response?.data?.message || error.message),
      );
    });
}; // OTP_Verification function

export const login = (data) => async (dispatch) => {
  dispatch(authSlice.actions.loginRequest());
  console.log("Attempting to login to:", `${BACKEND_URL}/api/v1/auth/login`);
  await axios
    .post(`${BACKEND_URL}/api/v1/auth/login`, data, {
      //URL should be paste here.......
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      dispatch(authSlice.actions.loginSuccess(res.data));
    })
    .catch((error) => {
      dispatch(authSlice.actions.loginFailed(error.response?.data?.message || error.message));
    });
}; // Login function

export const logout = () => async (dispatch) => {
  dispatch(authSlice.actions.logoutRequest());
  await axios
    .get(`${BACKEND_URL}/api/v1/auth/logout`, {
      //URL should be paste here.......
      withCredentials: true,
    })
    .then((res) => {
      dispatch(authSlice.actions.logoutSuccess(res.data.message));
      dispatch(authSlice.actions.resetAuthSlice());
    })
    .catch((error) => {
      dispatch(authSlice.actions.logoutFailed(error.response?.data?.message || error.message));
    });
}; // Logout function

export const getUser = () => async (dispatch) => {
  dispatch(authSlice.actions.getUserRequest());
  await axios
    .get(`${BACKEND_URL}/api/v1/auth/me`, {
      withCredentials: true,
    })
    .then((res) => {
      dispatch(authSlice.actions.getUserSuccess(res.data));
    })
    .catch((error) => {
      dispatch(
        authSlice.actions.getUserFailed(
          error.response?.data?.message || "Something went wrong",
        ),
      );
    });
}; //Get User

export const forgotPassword = (email) => async (dispatch) => {
  dispatch(authSlice.actions.forgotPasswordRequest());
  await axios
    .post(
      `${BACKEND_URL}/api/v1/auth/password/forgot`,
      { email },
      {
        //URL should be paste here.......
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
    .then((res) => {
      dispatch(authSlice.actions.forgotPasswordSuccess(res.data.message));
    })
    .catch((error) => {
      dispatch(
        authSlice.actions.forgotPasswordFailed(error.response?.data?.message || error.message),
      );
    });
}; //Forgot Password

export const updatePassword = (data) => async (dispatch) => {
  dispatch(authSlice.actions.updatePasswordRequest());
  await axios
    .put(`${BACKEND_URL}/api/v1/auth/password/update`, data, {
      //URL should be paste here.......
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      dispatch(authSlice.actions.updatePasswordSuccess(res.data.message));
    })
    .catch((error) => {
      dispatch(
        authSlice.actions.updatePasswordFailed(error.response?.data?.message || error.message),
      );
    });
}; //update Password

export const resetPassword = (data) => async (dispatch) => {
  dispatch(authSlice.actions.resetPasswordRequest());
  await axios
    .put(`${BACKEND_URL}/api/v1/auth/password/reset`, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      dispatch(authSlice.actions.resetPasswordSuccess(res.data.message));
    })
    .catch((error) => {
      dispatch(
        authSlice.actions.resetPasswordFailed(error.response?.data?.message || error.message),
      );
    });
}; //reset Password

export const verifyPasswordOtp = (data) => async (dispatch) => {
  dispatch(authSlice.actions.verifyPasswordOtpRequest());
  await axios
    .post(`${BACKEND_URL}/api/v1/auth/password/verify-otp`, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      dispatch(authSlice.actions.verifyPasswordOtpSuccess(res.data.message));
    })
    .catch((error) => {
      dispatch(
        authSlice.actions.verifyPasswordOtpFailed(error.response?.data?.message || error.message),
      );
    });
};

export const requestDeleteAccountOtp = () => async (dispatch) => {
  dispatch(authSlice.actions.requestDeleteOtpRequest());
  await axios
    .post(
      `${BACKEND_URL}/api/v1/user/delete/request-otp`,
      {},
      {
        withCredentials: true,
      }
    )
    .then((res) => {
      dispatch(authSlice.actions.requestDeleteOtpSuccess(res.data.message));
    })
    .catch((error) => {
      dispatch(
        authSlice.actions.requestDeleteOtpFailed(error.response?.data?.message || error.message),
      );
    });
};

export const deleteAccount = (otp) => async (dispatch) => {
  dispatch(authSlice.actions.deleteAccountRequest());
  await axios
    .delete(`${BACKEND_URL}/api/v1/user/delete`, {
      data: { otp },
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      dispatch(authSlice.actions.deleteAccountSuccess(res.data.message));
    })
    .catch((error) => {
      dispatch(
        authSlice.actions.deleteAccountFailed(error.response?.data?.message || error.message),
      );
    });
};

export default authSlice.reducer;
