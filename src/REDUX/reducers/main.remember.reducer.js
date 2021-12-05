import { INITIAL } from "../actions/main.actions";

let rememberState = {
    initial: undefined,
}

export default (state = rememberState, action) => {

    switch (action.type) {
        case INITIAL:
            return {
                ...state, initial: action.payload
            }
        default:
            return state
    }
}