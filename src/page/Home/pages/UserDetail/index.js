import React, { Component } from 'react'
import UserInfo from '../../../../components/UserInfo'
import axios from '../../../../utils/request'
import { getUserInfo, modifyOtherInfo } from '../../../../api/api'
import { message } from 'antd'


export default class UserDetail extends Component {
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
    let { username, realname, avatar, id } = this.state.userInfo
    if (username === '') {
      message.warning('请输入用户名')
    } else if (realname === '') {
        message.warning('请输入真实姓名')
    } else {
      let info = {
        id,
        avatar,
        username,
        realname
      }
      axios.post(modifyOtherInfo, info).then((res) => {
        if (res.data.errno == 0) {
          message.success('修改成功')
        } else {
          message.error(res.data.msg)
        }
      })
    }
  }
  init = () => {
    let info = {
      id: this.props.match.params.id
    }
    axios.post(getUserInfo, info).then((res) => {
      // console.log(res.data)
      if (res.data.errno == 0) {
        this.setState(() => {
          return {
            userInfo: res.data.data
          }
        })
      }
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
  render() {
    let { userInfo } = this.state
    return (
      <div>
        {
          this.props.id
        }
        <UserInfo 
        userInfo={userInfo} 
        submitModify={this.submitModify}
        handleChangeUser={this.handleChangeUser} 
        handleChangeReal={this.handleChangeReal}
        setImage={this.setImage}
        />
      </div>
    )
  }
}
