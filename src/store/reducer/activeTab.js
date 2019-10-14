import * as activeTab from '../actions/activeTab';

const initialState = {
    activeTab: 'Profile'
}

const activeTabs = (state = initialState, action) => {
  const { type } = action;

    if (type === activeTab.CHANGE_ACTIVE_TAB) {
        return {
            ...state,
            activeTab: action.activeTab
        }
    }
    return state;
}
export default activeTabs;