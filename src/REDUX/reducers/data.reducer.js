import { SET_APP_DATA } from '../actions/data.actions';

const initialState = {
    app_data: {},
}


export default (state = initialState, action) => {
    switch (action.type) {
        case SET_APP_DATA:
            console.log(action.payload, state)
            return {
                ...state,
                app_data: { ...state.app_data, ...action.payload },
            }
        default:
            return state
    }
}
