import { CHOOSE_SELECT, CANCEL_SELECT } from './actionTypes'


const defaultState = {
    chooseArray: [],
    allChooseArray: []
}

export default (state=defaultState, action) => {
    switch(action.type) {
      case CHOOSE_SELECT:
        if (action.currentIndex === 2) {
          state.chooseArray.push(action.id)
          return {
            ...state,
            chooseArray: state.chooseArray
          }
        } else if (action.currentIndex === 0) {
          state.allChooseArray.push(action.id)
          return {
            ...state,
            allChooseArray: state.allChooseArray
          }
        }
      case CANCEL_SELECT:
        if (action.currentIndex === 2) {
          state.chooseArray.splice(state.chooseArray.findIndex((item) => {
            return item === action.id
          }), 1)
          return {
            ...state,
            chooseArray: state.chooseArray
          }
        } else if (action.currentIndex === 0) {
          state.allChooseArray.splice(state.allChooseArray.findIndex((item) => {
            return item === action.id
          }), 1)
          return {
            ...state,
            allChooseArray: state.allChooseArray
          }
        }
    }
    return state
}