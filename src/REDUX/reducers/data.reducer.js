import { SET_APP_DATA, SET_COPY_PRODUCT_DATA } from '../actions/data.actions';

const initialState = {
    app_data: {},
    copy_product_data: {},
}


export default (state = initialState, action) => {
    switch (action.type) {
        case SET_APP_DATA:
            if (action.payload === 'reset') {
                return { ...state, app_data: {} }
            } else {
                return {
                    ...state,
                    app_data: { ...state.app_data, ...action.payload },
                }
            }
        default:
            return state
        case SET_COPY_PRODUCT_DATA:
            return {
                ...state,
                copy_product_data: { ...action.payload }
            }
    }
}
