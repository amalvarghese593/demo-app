import { API_REQUEST, LOGIN, LOGOUT } from "./actionTypes";
import Cookies from "js-cookie";
import { Dispatch } from "redux";
import showToast from "../utils/toast";

export const login = () => {
  return { type: LOGIN };
};
export const logout = () => {
  Cookies.remove("demo-app-token");
  return { type: LOGOUT };
};

export const registerUser =
  ({ name, email, password, onSuccess }: any) =>
  (dispatch: Dispatch) => {
    dispatch({
      type: API_REQUEST,
      payload: {
        method: "POST",
        url: "/auth/register",
        data: { name, email, password },
        onSuccess: (response: any) => {
          const { token } = response;
          Cookies.set("demo-app-token", token, { path: "/" });
          dispatch(login());
          showToast.success("User registered successfully");
          onSuccess();
        },
        onError: (error: any) => {
          const errorMessage =
            error?.response?.data?.message?.message || "An error occured";
          showToast.error(errorMessage);
        },
      },
    });
  };

export const loginUser =
  ({ email, password, onSuccess }: any) =>
  (dispatch: Dispatch) => {
    dispatch({
      type: API_REQUEST,
      payload: {
        method: "POST",
        url: "/auth/login",
        data: { email, password },
        onSuccess: (response: any) => {
          const { token } = response;
          Cookies.set("demo-app-token", token, { path: "/" });
          showToast.success("Login successfull");
          dispatch(login());
          onSuccess();
        },
        onError: (error: any) => {
          const errorMessage =
            error?.response?.data?.message?.message || "An error occured";
          showToast.error(errorMessage);
        },
      },
    });
  };

export const verifyToken =
  ({ onError }: any) =>
  (dispatch: Dispatch) => {
    const token = Cookies.get("demo-app-token");
    if (!token || token === "undefined") {
      dispatch(logout());
      return;
    }

    dispatch({
      type: API_REQUEST,
      payload: {
        method: "GET",
        url: "/auth/verify-token",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        onSuccess: (response: any) => {
          const { success } = response;
          if (success) dispatch(login());
        },
        onError: (error: any) => {
          const errorMessage =
            error?.response?.data?.message?.message || "An error occured";
          showToast.error(errorMessage);
        },
      },
    });
  };
