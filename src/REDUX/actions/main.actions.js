export const INITIAL = 'INITIAL';
export const SET_LANGUAGE = 'SET_LANGUAGE';
export const SET_THEME_COLOR = 'SET_THEME_COLOR';


export const set_theme_color = (value) => ({
    type: SET_THEME_COLOR,
    payload: value
})

export const set_language = (value) => ({
    type: SET_LANGUAGE,
    payload: value
})

