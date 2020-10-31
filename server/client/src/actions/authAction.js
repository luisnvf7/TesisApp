import axios from 'axios'

/* Tipos */
import { LOGIN_SUCCESS, LOGIN_FAIL } from '../actions/types'

import { returnErrors } from './errorActions'

export const login = async ( usuario, password ) => async dispatch => {

    try{
        /* Localhost:login */
        let res = await axios.post('/login', {usuario, password})
    
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })

    } catch (err) {

        dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'))
        dispatch({type: LOGIN_FAIL })

    }
}

export const register = async ({  }) => async dispatch => {



}

