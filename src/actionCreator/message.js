export const updateMessage = (message) => (dispatch, getState) => {
    dispatch({
        type: 'UPDATE_MESSAGE',
        message
    })
}