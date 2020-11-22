import axios from "axios";

import { GET_ANUNCIO_BY_USER, LOADING_ANUNCIO_BY_USER, DELETE_ANUNCIO_BY_ID } from "./types";

export const getAnuncioByUser = () => async (dispatch) => {

    console.log("ANUNCIOS USER")

    dispatch({type: LOADING_ANUNCIO_BY_USER })

    const resp = await axios.get('/personalposts')

    dispatch({type: GET_ANUNCIO_BY_USER, payload: resp.data.anuncios })

    console.log("LOS ANUNCIOS", resp)

}

export const deleteAnuncioById = (id) => async (dispatch) => {


    const resp = await axios.delete(`/personalposts/${id}`)

    dispatch({type: DELETE_ANUNCIO_BY_ID, payload: id})
    

}

