import { GET_ANUNCIO_BY_USER, LOADING_ANUNCIO_BY_USER } from '../actions/types'

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
        default: 
            return state
    }


} 