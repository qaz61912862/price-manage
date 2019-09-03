import { combineReducers } from "redux";
import homeReducer from '../page/Home/store/reducer'
export default combineReducers({
    home: homeReducer
})