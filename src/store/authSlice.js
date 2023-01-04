import { createSlice } from "@reduxjs/toolkit";

import Api from "../Utils/api";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    userId: null,
    token: null,
    expiry: null,
  },
  reducers: {
    login(state, actions) {
      state.isAuthenticated = true;
      state.userId = actions.payload.userId;
      state.token = actions.payload.token;
      state.expiry = actions.payload.expiry;

      localStorage.setItem("userId", actions.payload.userId);
      localStorage.setItem("token", actions.payload.token);
      localStorage.setItem("expiry", actions.payload.expiry);
    },
    logout(state) {
      state.isAuthenticated = false;
      state.userId = null;
      state.token = null;
      state.expiry = null;

      localStorage.removeItem("userId");
      localStorage.removeItem("token");
      localStorage.removeItem("expiry");
    },
  },
});

export const signUp = (
  name,
  email,
  password,
  confirmPassword,
  setIsLoading,
  setAlert
) => {
  return async (dispatch) => {
    if (
      !isSignUpInputsAreValid(name, email, password, confirmPassword, setAlert)
    ) {
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(Api.signUpApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        setAlert({
          message: responseData.message,
          isError: true,
        });
        return;
      }

      setIsLoading(false);
      autoLogout(responseData.expiry, dispatch);
      const expiry = new Date(Date.now() + responseData.expiry);
      return dispatch(
        authActions.login({
          userId: responseData.userId,
          token: responseData.token,
          expiry: expiry.toISOString(),
        })
      );
    } catch (error) {
      setIsLoading(false);
      setAlert({
        message: "An error occured",
        isError: true,
      });
      return;
    }
  };
};

export const signIn = (email, password, setIsLoading, setAlert) => {
  return async (dispatch) => {
    if (!isSignInInputsAreValid(email, password, setAlert)) {
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(Api.signInApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        setAlert({
          message: responseData.message,
          isError: true,
        });
        return;
      }

      setIsLoading(false);
      autoLogout(responseData.expiry, dispatch);
      const expiry = new Date(Date.now() + responseData.expiry);
      return dispatch(
        authActions.login({
          userId: responseData.userId,
          token: responseData.token,
          expiry: expiry.toISOString(),
        })
      );
    } catch (error) {
      setIsLoading(false);
      setAlert({
        message: "An error occured",
        isError: true,
      });
      return;
    }
  };
};

export const autoLogin = () => {
  return (dispatch) => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    const expiry = localStorage.getItem("expiry");

    if (!userId || !token || !expiry) return;

    const currentTime = new Date(Date.now());
    const expiryTime = new Date(expiry);

    if (currentTime > expiryTime) return; //Expired token

    const remaingExpiryTime = expiryTime - currentTime; //milliseconds

    autoLogout(remaingExpiryTime, dispatch);
    return dispatch(
      authActions.login({
        userId: userId,
        token: token,
        expiry: expiry,
      })
    );
  };
};

const isSignUpInputsAreValid = (
  name,
  email,
  password,
  confirmPassword,
  setAlert
) => {
  if (!name || name.length < 3) {
    setAlert({
      message: "Name must have 3 characters",
      isError: true,
    });
    return false;
  }
  if (!email || !email.includes("@")) {
    setAlert({
      message: "Invalid email",
      isError: true,
    });
    return false;
  }
  if (!password || password.length < 8) {
    setAlert({
      message: "Name must be 8 characters long",
      isError: true,
    });
    return false;
  }
  if (password !== confirmPassword) {
    setAlert({
      message: "Password do not match",
      isError: true,
    });
    return false;
  }

  return true;
};

const isSignInInputsAreValid = (email, password, setAlert) => {
  if (!email || !email.includes("@")) {
    setAlert({
      message: "Invalid email",
      isError: true,
    });
    return false;
  }
  if (!password || password.length < 8) {
    setAlert({
      message: "Name must be 8 characters long",
      isError: true,
    });
    return false;
  }
  return true;
};

const autoLogout = (milliseconds, dispatch) => {
  setTimeout(() => {
    dispatch(authActions.logout());
  }, milliseconds);
};
export const authActions = authSlice.actions;

export default authSlice;
