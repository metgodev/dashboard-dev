import { SET_USER_DETAILS } from "../actions/user.actions";

const initialState = {
    userDetails: {},
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DETAILS:
            return {
                ...state, userDetails: action.payload
            }
        default:
            return state
    }
}