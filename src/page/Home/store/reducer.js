import { ADD_TEST } from './actionTypes'

const defaultState = {
    test: '123'
}

export default (state=defaultState, action) => {
    // console.log(action)
    switch(action.type) {
        case ADD_TEST:
            return {
                ...state,
                test: state.test += action.value
            }
    }
    return state
}