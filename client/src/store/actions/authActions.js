import axios from "axios";
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
} from "../types/authType";

export const userRegister = (data) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        data,
        config
      );
      // console.log(response.data)
      localStorage.setItem("authToken", response.data.token);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: {
          message: "Register Success",
          token: response.data.token,
        },
      });
    } catch (error) {
      // console.log(error.response.data.errors)
      dispatch({
        type: REGISTER_FAIL,
        payload: {
          error: error.response.data.errors,
        },
      });
    }
  };
};

export const userLogin = (data) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        data,
        config
      );
      // console.log(response.data);
      localStorage.setItem("authToken", response.data.token);

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: {
          message: "Login Success",
          token: response.data.token,
        },
      });
    } catch (error) {
      console.log(error.response.data.errors[0].msg)
      dispatch({
        type: USER_LOGIN_FAIL,
        payload: {
          error: error.response.data.errors[0].msg,
        },
      });
    }
  };
};
