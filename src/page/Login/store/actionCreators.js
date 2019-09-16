import { LOG_IN, LOG_OUT } from './actionTypes'
import { login as loginApi, logout as logoutApi } from '../../../api/api'
import { message } from 'antd';
import axios from '../../../utils/request'

export const login = (val) => {
    return (dispatch) => {
        // console.log(dispatch)
        const action = {
            type: LOG_IN,
            username: val.username,
            password: val.password
        }
        // console.log(action)
        let info = {
            username: val.username,
            password: val.password
        }
        axios.post(loginApi, info).then((res) => {
            if (res.data.errno == 0) {
                dispatch(action)  
                // console.log(action)
            } else {
                message.error(res.data.msg)
            }
        })
        // console.log(action)
        // dispatch(action)
    }
}

export const logout = () => {
    return (dispatch) => {
        const action = {
            type: LOG_OUT
        }
        axios.get(logoutApi).then((res) => {
            console.log(res)
            if (res.data.errno == 0) {
                message.success('退出成功')
                dispatch(action)
            } else {
                message.error('出错啦...')
            }
        })
    }
    // return {
    //     type: LOG_OUT
    // }
}