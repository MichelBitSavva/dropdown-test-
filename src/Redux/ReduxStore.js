import {applyMiddleware, combineReducers, createStore} from "redux";
import startPage from "./Reducers/StartPage";
import thunkMiddleware from "redux-thunk";

let reducers = combineReducers({
    startPage: startPage
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;
export default store;