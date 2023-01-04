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
  setIsLoading
) => {
  return async (dispatch) => {
    if (!isSignUpInputsAreValid(name, email, password, confirmPassword)) {
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

      if (!response.ok) {
        setIsLoading(false);
        console.log("error response not ok");
        return;
      }

      const responseData = await response.json();

      setIsLoading(false);
      return dispatch(
        authActions.login({
          userId: responseData.userId,
          token: responseData.token,
          expiry: responseData.expiry,
        })
      );
    } catch (error) {
      setIsLoading(false);
      console.log("error");
      return;
    }
  };
};

export const signIn = (
  email,
  password,

  setIsLoading
) => {
  return async (dispatch) => {
    if (!isSignInInputsAreValid(email, password)) {
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

      if (!response.ok) {
        setIsLoading(false);
        console.log("error response not ok");
        return;
      }

      const responseData = await response.json();

      console.log(responseData);

      setIsLoading(false);
      return dispatch(
        authActions.login({
          userId: responseData.userId,
          token: responseData.token,
          expiry: responseData.expiry,
        })
      );
    } catch (error) {
      setIsLoading(false);
      console.log("error");
      return;
    }
  };
};

const isSignUpInputsAreValid = (name, email, password, confirmPassword) => {
  if (!name || name.length < 3) {
    console.log("Name must have 3 characters");
    return false;
  }
  if (!email || !email.includes("@")) {
    console.log("Invalid email");
    return false;
  }
  if (!password || password.length < 8) {
    console.log("Name must be 8 characters long");
    return false;
  }
  if (password !== confirmPassword) {
    console.log("Password do not match");
    return false;
  }

  return true;
};

const isSignInInputsAreValid = (email, password) => {
  if (!email || !email.includes("@")) {
    console.log("Invalid email");
    return false;
  }
  if (!password || password.length < 8) {
    console.log("Name must be 8 characters long");
    return false;
  }
  return true;
};
export const authActions = authSlice.actions;

export default authSlice;
