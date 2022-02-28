import axios from "axios";
export const SEARCH_PLOT_SUCCESS = 'SEARCH_PLOT_SUCCESS';
export const SEARCH_PLOT_ERROR='SEARCH_PLOT_ERROR';
export const SEARCH_PLOT_REQUEST='SEARCH_PLOT_REQUEST';

export function searchPlotRequest() {
    return {
        type: SEARCH_PLOT_REQUEST
    }
}
export function setSearchPlotSuccess(searchPlotName,searchPlotYear) {
      return function (dispatch) {
        return axios.get(`https://www.omdbapi.com/?t=${searchPlotName}&year=${searchPlotYear}&apikey=4a3b711b&plot=full`)
            .then(({data}) => {
            dispatch({type: SEARCH_PLOT_SUCCESS, payload: data});
        })
            .catch((error) => {
                dispatch({type: SEARCH_PLOT_ERROR, payload: error});
            })
    }
}
