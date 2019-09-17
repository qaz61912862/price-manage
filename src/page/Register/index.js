import React, { Component } from 'react'
import { Input, Button, message } from 'antd';
import { CSSTransition } from 'react-transition-group'
import '../css-common/index.less'
import { register, checkUser } from '../../api/api'
import axios from '../../utils/request';



export default class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            realname: '',
        }
    }
    changeToLogin = () => {
        this.props.history.replace('/login')
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
    onChangeReal = ({ target: { value } }) => {
        this.setState(() => {
            return {
                realname: value
            }
        });
    }
    submitForm = () => {
        const { username, password, realname } = this.state
        if (username === '') {
            message.info('请输入账号')
        } else if (password === '') {
            message.info('请输入密码')
        } else if (realname === '') {
            message.info('请输入称呼')
        } else {
            let info = {
                username
            }
            axios.post(checkUser, info).then((res) => {
                if (res.data.errno === 0) {
                    let info2 = {
                        username,
                        password,
                        realname
                    }
                    axios.post(register, info2).then((res2) => {
                        if (res2.data.errno === 0) {
                            message.success('注册成功，即将跳转登录页面...')
                            setTimeout(() => {
                                this.props.history.replace('/login')
                            }, 2000)
                        }
                    })
                } else {
                    message.error(res.data.msg)
                }
            })
            
        }
    }
    render() {
        const { username, password, realname, showReg } = this.state;
        return (
            <div className="wrapper">
                <CSSTransition
                 in={!showReg}
                 timeout={1000}
                 classNames="fade"
                 appear={true}
                >
                <div className="wrapper-l">
                    <div className="main-title">Register</div>
                    <div className="login-title">Get a move on</div>
                    <Input value={username} onChange={this.onChangeUser} placeholder="注册账号" className="input-item"/>
                    <Input value={password} onChange={this.onChangePass} type="password" placeholder="注册密码" className="input-item"/>
                    <Input value={realname} onChange={this.onChangeReal} type="text" placeholder="怎么称呼您" className="input-item"/>
                    <Button type="primary" className="login-button" onClick={this.submitForm}>Confirm</Button>
                    <Button type="primary" className="login-button reg-button" onClick={this.changeToLogin}>Back to Login</Button>
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

