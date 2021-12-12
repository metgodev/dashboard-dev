import { SET_SIDEBAR_TOGGLE, SET_MOBILE_TOGGLE } from "../actions/main.actions";

let initialState = {
    sidebar: false,
    mobile: false,
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
        default:
            return state
    }
}

