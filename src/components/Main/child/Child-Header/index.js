import React, { Component } from 'react'
import { Button, Avatar } from 'antd'
import { connect } from 'react-redux'
import { logout } from '../../../../page/Login/store/actionCreators'
import { getMyInfo } from '../../../../api/api'
import axios from '../../../../utils/request'
import './index.less'
import { Link } from 'react-router-dom'

class ChildHeader extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userInfo: ''
        }
    }
    componentDidMount() {
        let userInfo = window.sessionStorage.getItem('user')
        if (userInfo) {
            this.setState(() => {
                return {
                    userInfo: JSON.parse(userInfo)
                }
            })
        } else {
            axios.get(getMyInfo).then((res) => {
                this.setState(() => {
                    return {
                        userInfo: res.data.data
                    }
                })
                window.sessionStorage.setItem('user', JSON.stringify(res.data.data))
            })
        }
    }
    
    toLogout = () => {
        const { getout } = this.props
        getout()
    }
    render() {
        const { username, avatar } = this.state.userInfo
        return (
            <div className="header-wrapper">
                <Button type="primary" shape="circle" icon="logout" onClick={this.toLogout}/>
                <Link to="/home/personalCenter">
                    <div className="user-info">
                        <div className="avatar">
                            {
                                avatar === '' || avatar === null || avatar === 'null' ? (
                                    <Avatar size={24} icon="user" />
                                ) : (
                                    <img className="avatar-img" src={avatar} alt=""/>
                                )
                            }
                        </div>
                        <div className="user-name">{username}</div>
                    </div>
                </Link>
            </div>
        )
    }
}
const mapDispatch = (dispatch) => {
    return {
        getout() {
            dispatch(logout())
        }
    }
}
export default connect(null, mapDispatch)(ChildHeader)