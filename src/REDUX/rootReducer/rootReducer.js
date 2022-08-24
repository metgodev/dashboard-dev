import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { rememberReducer, rememberEnhancer } from 'redux-remember';
import dataReducer from '../reducers/data.reducer';
import mainReducer from '../reducers/main.reducer';
import userReducer from '../reducers/user.reducer'
import mainRememberReducer from '../reducers/main.remember.reducer';


// reducx remeber 
const reducers = {
    dataReducer,
    mainReducer,
    userReducer,
    mainRememberReducer,
},
    rememberedKeys = ["mainRememberReducer"]; // 'mainReducer' will be forgotten, as it's not in this list

export const rootReducer = createStore(
    rememberReducer(combineReducers(reducers)),
    compose(
        applyMiddleware(),
        // ...
        rememberEnhancer(
            window.localStorage, // or your own custom storage driver
            rememberedKeys,
        )
    )
);


export default rootReducer;