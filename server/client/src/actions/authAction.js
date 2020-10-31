import axios from 'axios'

import { returnErros } from './errorActions'

export const login = async ({ email, password }) => async dispatch => {

    let resp = await axios.post('/login', {email, password})

}