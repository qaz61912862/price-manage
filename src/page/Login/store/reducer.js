import cookie from 'react-cookies'
import { LOG_IN, LOG_OUT } from './actionTypes'


const defaultState = {
    user: cookie.load('user') ? cookie.load('user') : '',
    status: cookie.load('user') ? true : false
}

export default (state=defaultState, action) => {
    switch(action.type) {
        case LOG_IN:
            cookie.save('user', action.username)
            return {
                ...state,
                status: true,
                user: action.username
            }
        case LOG_OUT:
            cookie.remove('user')
            window.sessionStorage.clear()
            return {
                ...state,
                status: false
            }
            
    }
    return state
}