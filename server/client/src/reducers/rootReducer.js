import { combineReducers } from 'redux'
import errorReducer from './errorReducer'
import authReducer from './authReducer'
import rubroReducer from './rubroReducer'
import areaReducer from './areaReducer'

export default combineReducers({
    error: errorReducer,
    auth: authReducer,
    rubros: rubroReducer,
    areas: areaReducer
})

