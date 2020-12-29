import {FETCH_CONNECTIONS, GET_PROCESSED_CONNECTIONS} from '../actions'

let initialState = {rawData: null, processed_data: null}

export default function(state = initialState, action) {
    switch(action.type) {
        case FETCH_CONNECTIONS:
            return ({...state, rawData: action.payload.rawData})
        case GET_PROCESSED_CONNECTIONS:
            return ({...state, processed_data: action.payload.processed_data})
        default:
            return state;
    }
}