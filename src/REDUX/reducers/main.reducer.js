import { SET_SIDEBAR_TOGGLE, SET_MOBILE_TOGGLE, SET_INITIAL_DATA_DIALOG, SET_TABLE_CHANGED, SET_AREA, SET_FILTER_TABLE, SET_CURRENT_ID } from "../actions/main.actions";

let initialState = {
    sidebar: false,
    mobile: false,
    initialData: {},
    tableChanged: false,
    area: {},
    filterTable: {},
    currentID: '',
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
        case SET_TABLE_CHANGED:
            return {
                ...state, tableChanged: action.payload
            }
        case SET_AREA:
            return {
                ...state, area: action.payload
            }
        case SET_FILTER_TABLE:
            return {
                ...state, filterTable: action.payload
            }
        case SET_CURRENT_ID:
            return {
                ...state, currentID: action.payload
            }
        default:
            return state
    }
}

