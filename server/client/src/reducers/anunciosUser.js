import { GET_ANUNCIO_BY_USER, LOADING_ANUNCIO_BY_USER, DELETE_ANUNCIO_BY_ID } from '../actions/types'

const initialState = {
    userAnuncios: [],
    isLoading: false
};
  
export default function (state = initialState, action) {

    switch (action.type) {

        case GET_ANUNCIO_BY_USER: 
        return {
            userAnuncios: action.payload,
            isLoading: false
        }
        case LOADING_ANUNCIO_BY_USER:
            return {
                ...state,
                isLoading: true  
            }
        case DELETE_ANUNCIO_BY_ID:
            return {
                ...state,
                userAnuncios : state.userAnuncios.filter(v => v.anuncio_id !== action.payload )
            }
        default: 
            return state
    }


} 