export const INITIAL = 'INITIAL';
export const SET_THEME_COLOR = 'SET_THEME_COLOR';


export const set_theme_color = (value) => ({
    type: SET_THEME_COLOR,
    payload: value
})

export const set_initial = (value) => ({
    type: INITIAL,
    payload: value
})

