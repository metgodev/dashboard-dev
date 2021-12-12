export const SET_LANGUAGE = 'SET_LANGUAGE';
export const SET_THEME_COLOR = 'SET_THEME_COLOR';
export const SET_SIDEBAR_TOGGLE = 'SET_SIDEBAR_TOGGLE';
export const SET_MOBILE_TOGGLE = 'SET_MOBILE_TOGGLE';


export const set_theme_color = (value) => ({
    type: SET_THEME_COLOR,
    payload: value
})

export const set_language = (value) => ({
    type: SET_LANGUAGE,
    payload: value
})

export const set_sidebar_toggle = (value) => ({
    type: SET_SIDEBAR_TOGGLE,
    payload: value
})

export const set_mobile_toggle = (value) => ({
    type: SET_MOBILE_TOGGLE,
    payload: value
})

