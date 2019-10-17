import * as loader from '../store/actions/loader';

export const showLoader = () => (dispatch, getState) => {
    dispatch({
        type: loader.SHOW_LOADER
    })
}

export const hideLoader = () => (dispatch, getState) => {
    dispatch({
        type: loader.HIDE_LOADER
    })
}