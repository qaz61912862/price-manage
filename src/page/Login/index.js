import React, { Component } from 'react'
import { Input, Button, message } from 'antd';
import { connect } from 'react-redux'
import { login } from './store/actionCreators'
import { CSSTransition } from 'react-transition-group'
import '../css-common/index.less'
import { Redirect } from 'react-router-dom'



class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            showReg: false
        }
    }
    changeToReg = () => {
        this.props.history.push('/register')
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
        const { username, password, showReg } = this.state;
        if (this.props.loginStatus) {
            if (this.props.location.state) {
                let url = `${this.props.location.state.from.pathname}`
                return (
                    <Redirect to={url} />
                )
            }
            return (
                <Redirect to={'/home/carsList'} />
            )
        }
        return (
            <div className="wrapper">
                <CSSTransition
                 in={!showReg}
                 timeout={1000}
                 classNames="fade"
                 appear={true}
                >
                <div className="wrapper-l">
                    <div className="main-title">Login</div>
                    <div className="login-title">Great minds think alike</div>
                    <Input ref="element" value={username} onChange={this.onChangeUser} placeholder="账号" className="input-item"/>
                    <Input value={password} onChange={this.onChangePass} type="password" placeholder="密码" className="input-item"/>
                    <Button type="primary" className="login-button" onClick={this.submitForm}>Login</Button>
                    <Button type="primary" className="login-button reg-button" onClick={this.changeToReg}>Register</Button>
                </div>
                </CSSTransition>
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
export default connect(mapState, mapDispatch)(Register)
