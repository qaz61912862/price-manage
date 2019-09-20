import { CHOOSE_SELECT, CANCEL_SELECT } from './actionTypes'


const defaultState = {
    chooseArray: []
}

export default (state=defaultState, action) => {
    switch(action.type) {
      case CHOOSE_SELECT:
        state.chooseArray.push(action.id)
        return {
          ...state,
          chooseArray: state.chooseArray
      }
      case CANCEL_SELECT:
        state.chooseArray.splice(state.chooseArray.findIndex((item) => {
          return item == action.id
        }), 1)
        return {
          ...state,
          chooseArray: state.chooseArray
      }
    }
    return state
}