import {SEARCH_PLOT_ERROR, SEARCH_PLOT_SUCCESS,SEARCH_PLOT_REQUEST} from "../actions/plot-action";

const initialState = {
    plot: [],
    loading: false,
    error: null,
};

export function plotReducer(state = initialState, action) {
    switch (action.type) {
        case SEARCH_PLOT_REQUEST:
            return {
                ...state,
                plot:[],
                loading: true,
                error: null
            };
        case SEARCH_PLOT_SUCCESS:
            return {
                ...state,
                loading: false,
                plot: action.payload,
            };
        case SEARCH_PLOT_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state
    }
}