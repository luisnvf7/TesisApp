import axios from "axios";

import { GET_ANUNCIO_BY_USER, LOADING_ANUNCIO_BY_USER, DELETE_ANUNCIO_BY_ID, UPDATE_ANUNCIO_BY_ID } from "./types";

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

export const updateAnuncioById = (id) => async (dispatch) => {

    console.log("EL ANUNCIO", id)

    const resp = await axios.put(`/personalposts/${id}`)

    // /* Deberia de traerme el post actualizado */

    // dispatch({type: UPDATE_ANUNCIO_BY_ID, payload: id})

}

