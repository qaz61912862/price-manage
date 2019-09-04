import { combineReducers } from "redux";
import homeReducer from '../page/Home/store/reducer'
import loginReducer from '../page/Login/store/reducer'

export default combineReducers({
    home: homeReducer,
    login: loginReducer
})