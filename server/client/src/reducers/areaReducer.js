import { GET_AREAS } from '../actions/types'

const initialState = {
    areas: ''
};
  

export default function (state = initialState, action) {

    switch (action.type) {

        case GET_AREAS: 
        return {
            areas: action.payload
        }
        default: 
            return state

    }


} 