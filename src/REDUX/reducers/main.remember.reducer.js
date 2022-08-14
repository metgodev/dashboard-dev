import {
    SET_THEME_COLOR,
    SET_LANGUAGE,
    SET_USER,
    SET_AREA,
    SET_TAGS_TABLE_PREFERENCES,
    SET_AUTHORITIES_TABLE_PREFERENCES,
    SET_BUSINESS_TABLE_PREFERENCES,
    SET_EVENTS_TABLE_PREFERENCES,
    SET_POINTS_TABLE_PREFERENCES,
    SET_TRACKS_TABLE_PREFERENCES
} from "../actions/main.actions";

let rememberState = {
    theme: true,
    lang: 'he',
    user: {},
    area: {},
    "tag-categoriesTablePreferences": [],
    authoritiesTablePreferences: [],
    businessTablePreferences: [],
    eventsTablePreferences: [],
    poisTablePreferences: [],
    tracksTablePreferences: [],
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
        case SET_AREA:
            return {
                ...state, area: action.payload
            }
        case SET_TAGS_TABLE_PREFERENCES:
            return {
                ...state, "tag-categoriesTablePreferences": action.payload
            }
        case SET_AUTHORITIES_TABLE_PREFERENCES:
            return {
                ...state, authoritiesTablePreferences: action.payload
            }
        case SET_BUSINESS_TABLE_PREFERENCES:
            return {
                ...state, businessTablePreferences: action.payload
            }
        case SET_EVENTS_TABLE_PREFERENCES:
            return {
                ...state, eventsTablePreferences: action.payload
            }
        case SET_POINTS_TABLE_PREFERENCES:
            return {
                ...state, poisTablePreferences: action.payload
            }
        case SET_TRACKS_TABLE_PREFERENCES:
            return {
                ...state, tracksTablePreferences: action.payload
            }
        default:
            return state
    }
}