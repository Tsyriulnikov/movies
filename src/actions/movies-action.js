import axios from "axios";

export const SET_SEARCH_VALUE_PAGE = 'SET_SEARCH_VALUE_PAGE';
export const HANDLE_SEARCH_INPUT_CHANGES = 'HANDLE_SEARCH_INPUT_CHANGES';
export const SEARCH_MOVIES_SUCCESS = 'SEARCH_MOVIES_SUCCESS';
export const SEARCH_MOVIES_ERROR = 'SEARCH_MOVIES_ERROR';
export const SEARCH_MOVIES_REQUEST = 'SEARCH_MOVIES_REQUEST';
export const SET_TOTAL_PAGES = 'SET_TOTAL_PAGES';
export const SET_ACTIVE_PAGE = 'SET_ACTIVE_PAGE';
export const SET_MODAL_IS_OPEN='SET_MODAL_IS_OPEN';
export const SET_MODAL_IS_CLOSE='SET_MODAL_IS_CLOSE';

export function setSearchValue(searchValue) {
    return {
        type: HANDLE_SEARCH_INPUT_CHANGES,
        payload: searchValue,
    }
}

export function searchMoviesRequest() {
    return {
        type: SEARCH_MOVIES_REQUEST
    }
}
export function setModalIsOpen() {
    return {
        type: SET_MODAL_IS_OPEN
    }
}
export function setModalIsClose() {
    return {
        type: SET_MODAL_IS_CLOSE
    }
}

export function setSearchMoviesSuccess(searchValue, activePage) {
    return function (dispatch) {
        return axios.get(`https://www.omdbapi.com/?s=${searchValue}&page=${activePage}&apikey=4a3b711b`).then(({data}) => {
            dispatch({type: SEARCH_MOVIES_SUCCESS, payload: data});
            dispatch({type: SET_TOTAL_PAGES, totalPages: Math.ceil(data.totalResults / 10)});
        })
            .catch((error) => {
                dispatch({type: SEARCH_MOVIES_ERROR, payload: error});
            })
    }
}


export function setActivePage(activePage) {
    return {
        type: SET_ACTIVE_PAGE,
        activePage: activePage
    }
}

