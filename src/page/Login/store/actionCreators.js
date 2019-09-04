import { LOG_IN, LOG_OUT } from './actionTypes'

export const login = (val) => {
    return (dispatch) => {
        const action = {
            type: LOG_IN,
            value: val
        }
        dispatch(action)
    }
}

export const logout = () => {
    return {
        type: LOG_OUT
    }
}