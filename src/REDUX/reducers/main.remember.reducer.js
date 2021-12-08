import { SET_THEME_COLOR } from "../actions/main.actions";
import { SET_LANGUAGE } from "../actions/main.actions";

let rememberState = {
    theme: true,
    lang: 'he'
}

export default (state = rememberState, action) => {

    switch (action.type) {
        case SET_THEME_COLOR:
            return {
                ...state, theme: action.payload
            }
        case SET_LANGUAGE:
            return {
                ...state, lang: action.payload
            }
        default:
            return state
    }
}