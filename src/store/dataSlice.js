import { createSlice } from "@reduxjs/toolkit";

import Api from "../Utils/api";

const dataSlice = createSlice({
  name: "data",
  initialState: {
    user: null,
  },
  reducers: {
    setUserData(state, actions) {
      state.user = actions.payload.user;
    },
  },
});

export const loadData = (token, setIsLoading, setAlert) => {
  return async (dispatch) => {
    try {
      const response = await fetch(Api.getDataApi, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      const responseData = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        return setAlert({
          message: responseData.message,
          isError: true,
        });
      }

      dispatch(
        dataActions.setUserData({
          user: responseData.user,
        })
      );
      setIsLoading(false);
      return;
    } catch {
      setIsLoading(false);
      setAlert({
        message: "An unknown error",
        isError: true,
      });
    }
  };
};

export const dataActions = dataSlice.actions;

export default dataSlice;
