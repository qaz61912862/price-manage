import cookie from 'react-cookies'
import { LOG_IN, LOG_OUT } from './actionTypes'


const defaultState = {
    userId: cookie.load('userId') ? cookie.load('userId') : '',
    status: cookie.load('userId') ? true : false
}

export default (state=defaultState, action) => {
    switch(action.type) {
        case LOG_IN:
            cookie.save('userId', action.value.username)
            return {
                ...state,
                status: true,
                userId: action.value.username
            }
        case LOG_OUT:
            cookie.remove()
            return {
                ...state,
                status: false,
                userId: ''
            }
    }
    return state
}