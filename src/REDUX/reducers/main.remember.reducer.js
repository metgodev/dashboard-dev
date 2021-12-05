import { SET_THEME_COLOR } from "../actions/main.actions";

let rememberState = {
    theme: true,
}

export default (state = rememberState, action) => {

    switch (action.type) {
        case SET_THEME_COLOR:
            return {
                ...state, theme: action.payload
            }
        default:
            return state
    }
}