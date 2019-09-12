import React, { Component } from 'react'
import { Icon, Button } from 'antd'
import { connect } from 'react-redux'
import { logout } from '../../../../page/Login/store/actionCreators'
import { getUserInfo } from '../../../../api/api'
import axios from '../../../../utils/request'
import './index.less'

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
            axios.get(getUserInfo).then((res) => {
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
            <div className="user-info">
                <div className="avatar">
                    {
                        
                    }
                    <Icon type="smile" theme="outlined" />
                </div>
                <div className="user-name">{username}</div>
                <Button type="primary" shape="circle" icon="logout" onClick={this.toLogout}/>
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