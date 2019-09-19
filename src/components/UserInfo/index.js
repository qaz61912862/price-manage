import React, { Component } from 'react'
import { Upload, Row, Col, Avatar, Input, Button, message } from 'antd'
import { getUserInfo, modifyUserInfo } from '../../api/api'
import { getBase64, beforeUpload } from '../../utils/upload'
import axios from '../../utils/request'
import './index.less'

export default class UserInfo extends Component {
  constructor(props) {
      super(props)
      this.state = {
          isModify: false,
          loading: false,
          userInfo: null
      }
  }
  handleChangeUser = ({ target: { value } }) => {
      this.props.handleChangeUser(value)
  }
  handleChangeReal = ({ target: { value } }) => {
      this.props.handleChangeReal(value)
  }
  submitModify = () => {
    this.props.submitModify()

  }
  handleChangeImg = info => {
      if (info.file.status === 'uploading') {
        message.warning('上传中...请稍后')
        this.setState({ loading: true });
        return;
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        message.success('上传成功')
        getBase64(info.file.originFileObj, imageUrl =>
          this.props.setImage(imageUrl)
        );
      }
    };
  render() {
      const { userInfo } = this.props
      return userInfo ? (
          <div>
              <div className="top-avatar-banner">
              
                  <div className="user-avatar">
                  <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  beforeUpload={beforeUpload}
                  onChange={this.handleChangeImg}
                  >
                      {
                          (userInfo.avatar === '' || userInfo.avatar == null || userInfo.avatar == 'null') ? (
                              <Avatar size={64} icon="user" />
                          ) : (
                              <img src={userInfo.avatar}/>
                          )
                      }
                  </Upload>
                  </div>

              </div>
              <div className="main">
                  <Row>
                      <Col span={8}>
                          <Input addonBefore="UserName" value={userInfo.username} onChange={this.handleChangeUser}/>
                      </Col>
                      <Col span={8} offset={8}>
                          <Input addonBefore="RealName" value={userInfo.realname} onChange={this.handleChangeReal}/>
                         
                      </Col>
                  </Row>
                  <Row>
                      <Button className="modify-btn" type="primary" onClick={this.submitModify}>Modify</Button>
                  </Row>
              </div>
          </div>
      ) : null
  }
}