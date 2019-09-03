import React, { Component } from 'react'
import { Input, Button } from 'antd';
import './index.less'


export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
    }
    onChange = ({ target: { value } }) => {
        this.setState(() => {
            return {
                username: value
            }
        });
    };
    render() {
        const { username, password } = this.state;
        return (
            <div className="wrapper">
                <div className="wrapper-l">
                    <div className="login-title">Max汽车全鉴</div>
                    <Input value={username} onChange={this.onChange} placeholder="账号" className="input-item"/>
                    <Input type="password" placeholder="密码" className="input-item"/>
                    <Button type="primary" className="login-button">Sign In</Button>
                </div>
                <div className="wrapper-r">
                    <img src={require('../../images/login-bg2.jpg')} alt=""/>
                    <img src={require('../../images/login-bg.jpg')} alt=""/>
                </div>
            </div>
        )
    }
}
