import { SET_BUSINESS_DATA, SET_EVENT_DATA, SET_POINT_DATA, SET_MAP_DATA, SET_AREA_DATA } from '../actions/data.actions';

const initialState = {
    businessData: {},
    eventData: {},
    pointData: {},
    mapData: {},
    areaData: {},
}


export default (state = initialState, action) => {

    switch (action.type) {

        case SET_BUSINESS_DATA:
            return {
                ...state, businessData: action.payload
            }
        case SET_EVENT_DATA:
            return {
                ...state, eventData: action.payload
            }
        case SET_POINT_DATA:
            return {
                ...state, pointData: action.payload
            }
        case SET_MAP_DATA:
            return {
                ...state, mapData: action.payload
            }
        case SET_AREA_DATA:
            return {
                ...state, areaData: action.payload
            }
        default:
            return state
    }
}

