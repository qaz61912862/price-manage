import { ADD_TEST } from './actionTypes'

export const addTest = (val) => {
    return {
        type: ADD_TEST,
        value: val
    }
}