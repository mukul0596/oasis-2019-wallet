import * as monetary from '../actions/monetary';

const initialState = {
    
}

const monetaries = (state = initialState, action) => {
  const { type } = action;

    if (type === activeTab.) {
        return {
            ...state,
            activeTab: action.activeTab
        }
    }
    return state;
}
export default monetaries;