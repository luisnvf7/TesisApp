import axios from "axios";

import { GET_ANUNCIO_BY_USER, LOADING_ANUNCIO_BY_USER } from "./types";

export const getAnuncioByUser = () => async (dispatch) => {

    console.log("ANUNCIOS USER")

    dispatch({type: LOADING_ANUNCIO_BY_USER })

    const resp = await axios.get('/personalposts')

    dispatch({type: GET_ANUNCIO_BY_USER, payload: resp.data.anuncios })

    console.log("LOS ANUNCIOS", resp)

}

