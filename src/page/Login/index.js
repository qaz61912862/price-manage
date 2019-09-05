import React, { Component } from 'react'
import { Input, Button, message } from 'antd';
import { connect } from 'react-redux'
import { login } from './store/actionCreators'
import './index.less'


class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
    }
    onChangeUser = ({ target: { value } }) => {
        this.setState(() => {
            return {
                username: value
            }
        });
    }
    onChangePass = ({ target: { value } }) => {
        this.setState(() => {
            return {
                password: value
            }
        });
    }
    submitForm = () => {
        const { username, password } = this.state
        if (username === '') {
            message.info('请输入账号')
        } else if (password === '') {
            message.info('请输入密码')
        } else {
            let info = {
                username,
                password
            }
            this.props.login(info)
        }
    }
    render() {
        const { username, password } = this.state;
        return (
            <div className="wrapper">
                <div className="wrapper-l">
                    <div className="login-title">Max汽车全鉴</div>
                    <Input value={username} onChange={this.onChangeUser} placeholder="账号" className="input-item"/>
                    <Input value={password} onChange={this.onChangePass} type="password" placeholder="密码" className="input-item"/>
                    <Button type="primary" className="login-button" onClick={this.submitForm}>Sign In</Button>
                </div>
                <div className="wrapper-r">
                    <img src={require('../../images/login-bg2.jpg')} alt=""/>
                    <img src={require('../../images/login-bg.jpg')} alt=""/>
                </div>
            </div>
        )
    }
}
const mapState = (state) => {
    return {
        loginStatus: state.login.status
    }
}
const mapDispatch = (dispatch) => {
    return {
        login(val) {
            dispatch(login(val))
        }
    }
}
export default connect(mapState, mapDispatch)(Login)
