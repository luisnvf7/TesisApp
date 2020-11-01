import axios from "axios";

/* Tipos */
import { LOGIN_SUCCESS, LOGIN_FAIL, AUTH_ERROR, USER_LOADING } from "../actions/types";

import { returnErrors } from "./errorActions";


/*** Funcion que realizara el login en comunicacion con el reducer */
export const login = (username, password, history) => async (dispatch) => {
  
  let body = JSON.stringify({ username, password });

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {

    dispatch({type: USER_LOADING})

    let res = await axios.post("/login", body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    history.push('/home')

  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, LOGIN_FAIL));
    dispatch({ type: AUTH_ERROR });
  }

};

export const register = async ({}) => async (dispatch) => {};
