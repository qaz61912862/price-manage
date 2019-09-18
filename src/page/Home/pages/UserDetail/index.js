import React, { Component } from 'react'
import UserInfo from '../../../../components/UserInfo'
import axios from '../../../../utils/request'
import { getUserInfo } from '../../../../api/api'


export default class UserDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userInfo: null
    }
  }
  componentDidMount() {
    this.init()
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
  render() {
    let { userInfo } = this.state
    return (
      <div>
        {
          this.props.id
        }
        <UserInfo userInfo={userInfo}/>
      </div>
    )
  }
}
