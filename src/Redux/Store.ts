import { combineReducers, createStore } from "redux";
import { userReducer } from "./UserAppState";
import { loginReducer } from "./LoginAppState";
import { adminReducer } from "./AdminAppState";

//Multiple catsReducer
const reducers = combineReducers({
    loginReducer: loginReducer,
    adminReducer: adminReducer,
    userReducer: userReducer,
});
const store = createStore(reducers);

export default store;
