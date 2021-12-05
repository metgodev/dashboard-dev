import { INITIAL } from "../actions/main.actions";

let initialState = {
    initial: false,
}

export default (state = initialState, action) => {

    switch (action.type) {

        case INITIAL:
            return {
                ...state, initial: action.payload
            }
        default:
            return state
    }
}