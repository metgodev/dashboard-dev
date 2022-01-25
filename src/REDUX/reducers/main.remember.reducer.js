import { SET_THEME_COLOR, SET_LANGUAGE, SET_USER } from "../actions/main.actions";

let rememberState = {
    theme: true,
    lang: 'he',
    user: {},
}

//initial remember 
let n = '@@remember-mainRememberReducer'
if (localStorage.getItem(n) === null) localStorage.setItem(n, JSON.stringify(rememberState))

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
        case SET_USER:
            return {
                ...state, user: action.payload
            }
        default:
            return state
    }
}