import {
    HANDLE_SEARCH_INPUT_CHANGES,
    SET_SEARCH_VALUE_PAGE,
    SEARCH_MOVIES_SUCCESS,
    SEARCH_MOVIES_ERROR,
    SEARCH_MOVIES_REQUEST,
    SET_TOTAL_PAGES,
    SET_ACTIVE_PAGE,
    SET_MODAL_IS_OPEN,
    SET_MODAL_IS_CLOSE,
}
    from '../actions/movies-action'

const initialState = {
    searchValue: '',
    loading: false,
    movies: [],
    activePage: 1,
    totalPages: 0,
    error:null,
    modalIsOpen:false,

};

export function moviesReducer(state = initialState, action) {
    switch (action.type) {
        case HANDLE_SEARCH_INPUT_CHANGES:
            return {
                ...state,
                searchValue: action.payload
            };

        case SEARCH_MOVIES_SUCCESS:
            return {
                ...state,
                loading: false,
                movies: action.payload,
            };

        case SEARCH_MOVIES_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case SEARCH_MOVIES_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };

        case  SET_TOTAL_PAGES:
            return {
                ...state,
                totalPages: action.totalPages
            };


        case  SET_SEARCH_VALUE_PAGE:
            return {
                ...state,
                searchValuePage: action.searchValuePage
            };

        case  SET_ACTIVE_PAGE:
            return {
                ...state,
                activePage: action.activePage
            };

        case  SET_MODAL_IS_OPEN:
            return {
                ...state,
                modalIsOpen: true,
            };
        case  SET_MODAL_IS_CLOSE:
            return {
                ...state,
                modalIsOpen: false,
            };

        default:
            return state
    }
}