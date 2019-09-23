import { CHOOSE_SELECT, CANCEL_SELECT } from './actionTypes'

export const pushChoose = (id, currentIndex) => {
  return dispatch => {
    const action = {
      type: CHOOSE_SELECT,
      id,
      currentIndex
    }
    dispatch(action)
  }
}

export const cancelChoose = (id, currentIndex) => {
  return dispatch => {
    const action = {
      type: CANCEL_SELECT,
      id,
      currentIndex
    }
    dispatch(action)
  }
}