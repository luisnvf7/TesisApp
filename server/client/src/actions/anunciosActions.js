import axios from "axios";

import { GET_ANUNCIOS, LOADING_ANUNCIOS } from "./types";

export const getAnuncios = () => async (dispatch) => {

    dispatch({type: LOADING_ANUNCIOS })

    const resp = await axios.get('/anunciosnegocios')

    dispatch({type: GET_ANUNCIOS, payload: resp.data.anuncios })

    console.log("LOS ANUNCIOS", resp)

}

