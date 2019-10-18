export const updateMessage = (message) => (dispatch, getState) => {
    console.log('UPDATE MESSAGE')
    dispatch({
        type: 'UPDATE_MESSAGE',
        message
    })
}