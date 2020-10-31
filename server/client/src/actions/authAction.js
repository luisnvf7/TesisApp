import axios from "axios";

/* Tipos */
import { LOGIN_SUCCESS, LOGIN_FAIL, AUTH_ERROR } from "../actions/types";

import { returnErrors } from "./errorActions";

export const login = (username, password) => async (dispatch) => {
  let body = JSON.stringify({ username, password });

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    /* Localhost:login */
    let res = await axios.post("/login", body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, LOGIN_FAIL));
    dispatch({ type: AUTH_ERROR });
  }

};

export const register = async ({}) => async (dispatch) => {};
