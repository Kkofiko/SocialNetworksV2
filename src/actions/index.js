export const FETCH_CONNECTIONS = "fetch_connections";
export const GET_PROCESSED_CONNECTIONS = "get_processed_connections";

export function fetchConnections(callback) {
    return async function(dispatch) {
        const rawData = await fetch("erdesAdj.js");
        const jsondata = await rawData.json();
        dispatch({type: FETCH_CONNECTIONS, payload: {rawData: jsondata}});
        callback(jsondata);
    }
}

export function setProcessedConnections(processed) {
    return (dispatch) => {
        dispatch({type: GET_PROCESSED_CONNECTIONS, payload: {processed_data: processed}});
    }
}