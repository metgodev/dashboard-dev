import { SET_SIDEBAR_TOGGLE, SET_MOBILE_TOGGLE, SET_INITIAL_DATA_DIALOG, SET_TABLE_CHANGED, SET_AREA, SET_FILTER_TABLE, SET_CURRENT_ID, SET_EDIT_TAB_DATA, SET_GALLERY_FIELDS } from "../actions/main.actions";

let initialState = {
    sidebar: false,
    mobile: false,
    initialData: {},
    tableChanged: false,
    area: {},
    filterTable: {},
    currentID: '',
    editTabData: {},
    galleryField: []
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
                ...state, tableChanged: action.payload + Math.random()
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
        case SET_EDIT_TAB_DATA:
            return {
                ...state, editTabData: action.payload
            }
        case SET_GALLERY_FIELDS:
            return {
                ...state, galleryField: action.payload
            }
        default:
            return state
    }
}

