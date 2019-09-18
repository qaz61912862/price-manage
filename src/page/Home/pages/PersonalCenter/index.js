import React, { Component } from 'react'
import UserInfo from '../../../../components/UserInfo'
import { getMyInfo, modifyUserInfo } from '../../../../api/api'
import { message } from 'antd'
import axios from '../../../../utils/request'

export default class PersonalCenter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userInfo: null,
            isModify: false
        }
    }
    componentDidMount() {
        this.init()
    }
    submitModify = () => {
        let { username, realname, avatar } = this.state.userInfo
        if (username === '') {
            message.warning('请输入用户名')
        } else if (realname === '') {
            message.warning('请输入真实姓名')
        } else {
            let info = {
                username: username,
                avatar: avatar,
                realname: realname
            }
            axios.post(modifyUserInfo, info).then((res2) => {
                if (res2.data.errno === 0) {
                    message.success('修改成功')
                    window.sessionStorage.clear();
                    this.setState({
                        isModify: true
                    })
                    this.init()
                    
                } else {
                    message.error('修改失败')
                }
            })
         }
    }
    init = () => {
        axios.get(getMyInfo).then((res) => {
            this.setState(() => {
                return {
                    userInfo: res.data.data
                }
            }, () => {
                if (this.state.isModify) {
                    window.sessionStorage.setItem('user', JSON.stringify(this.state.userInfo))
                    this.setState(() => {
                        return {
                            isModify: false
                        }
                    }, () => {
                        setTimeout(() => {
                            this.props.history.go(0)
                        }, 1500)
                    })
                }
            })
        })
    }
    handleChangeUser = (value) => {
        this.setState(() => {
            return {
                userInfo : {
                    ...this.state.userInfo,
                    username: value
                }
            }
        })
    }
    handleChangeReal = (value) => {
        this.setState(() => {
            return {
                userInfo : {
                    ...this.state.userInfo,
                    realname: value
                }
            }
        })
    }
    setImage = (imageUrl) => {
        this.setState(() => {
            return {
                imageUrl,
                loading: false,
                userInfo: {
                    ...this.state.userInfo,
                    avatar: imageUrl
                }
            }
        })
    }
    submitModify = () => {
        let { username, realname, avatar } = this.state.userInfo
        if (username === '') {
            message.warning('请输入用户名')
        } else if (realname === '') {
            message.warning('请输入真实姓名')
        } else {
            let info = {
                username: username,
                avatar: avatar,
                realname: realname
            }
            axios.post(modifyUserInfo, info).then((res2) => {
                if (res2.data.errno === 0) {
                    message.success('修改成功')
                    window.sessionStorage.clear();
                    this.setState({
                        isModify: true
                    })
                    this.init()
                    
                } else {
                    message.error('修改失败')
                }
            })
         }
    }
    render() {
        const { userInfo } = this.state
        return (
            <div>
                <UserInfo 
                userInfo={userInfo} 
                handleChangeUser={this.handleChangeUser} 
                handleChangeReal={this.handleChangeReal}
                submitModify={this.submitModify}
                setImage={this.setImage}
                />
            </div>
        )
    }
}
