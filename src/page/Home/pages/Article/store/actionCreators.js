import { CHOOSE_SELECT, CANCEL_SELECT } from './actionTypes'

export const pushChoose = (id) => {
  return dispatch => {
    const action = {
      type: CHOOSE_SELECT,
      id
    }
    dispatch(action)
  }
}

export const cancelChoose = (id) => {
  return dispatch => {
    const action = {
      type: CANCEL_SELECT,
      id
    }
    dispatch(action)
  }
}