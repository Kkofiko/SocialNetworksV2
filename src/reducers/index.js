import { combineReducers } from "redux";
import ConnectionsReducer from './ConnectionsReducer'


export default combineReducers({
    connections: ConnectionsReducer
})