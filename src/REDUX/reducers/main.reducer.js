import { SET_SIDEBAR_TOGGLE, SET_MOBILE_TOGGLE, SET_INITIAL_DATA_DIALOG, SET_BUSINESS_ADDED } from "../actions/main.actions";

let initialState = {
    sidebar: false,
    mobile: false,
    initialData: {},
    businessAdded: false,
}

export default (state = initialState, action) => {

    switch (action.type) {

        case SET_SIDEBAR_TOGGLE:
            return {
                ...state, sidebar: action.payload
            }
        case SET_MOBILE_TOGGLE:
            return {
                ...state, mobile: action.payload
            }
        case SET_INITIAL_DATA_DIALOG:
            return {
                ...state, initialData: action.payload
            }
        case SET_BUSINESS_ADDED:
            return {
                ...state, businessAdded: action.payload
            }
        default:
            return state
    }
}

