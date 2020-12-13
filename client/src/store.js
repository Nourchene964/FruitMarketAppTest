import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

/**
 * Cart function
 * @param state
 * @param action
 * @returns {*}
 */


/**
 * Logger middleware
 * @param store
 * @returns {function(*): function(*=): *}
 */
const logger = (store) => (next) => (action) => {
    // console.log("dispatching", action);
    let result = next(action);
    // console.log("next state", store.getState());
    return result;
};

export default createStore(combineReducers({
   
}), applyMiddleware(logger, thunk));

