import React, { Component } from 'react'
import { Upload, Icon, Row, Col, Avatar, Input, Button, message } from 'antd'
import { getUserInfo, modifyUserInfo } from '../../../../api/api'
import axios from '../../../../utils/request'
import './index.less'

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}
  
function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}

export default class PersonalCenter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isModify: false,
            loading: false,
            userInfo: null
        }
    }
    componentDidMount() {
        this.init()
    }
    init = () => {
        axios.get(getUserInfo).then((res) => {
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
    handleChangeUser = ({ target: { value } }) => {
        this.setState(() => {
            return {
                userInfo : {
                    ...this.state.userInfo,
                    username: value
                }
            }
        })
    }
    handleChangeReal = ({ target: { value } }) => {
        this.setState(() => {
            return {
                userInfo : {
                    ...this.state.userInfo,
                    realname: value
                }
            }
        })
    }
    submitModify = () => {
        let { username, realname, avatar } = this.state.userInfo
        if (username == '') {
            message.warning('请输入用户名')
        } else if (realname == '') {
            message.warning('请输入真实姓名')
        } else {
            let info = {
                username: username,
                avatar: avatar,
                realname: realname
            }
            axios.post(modifyUserInfo, info).then((res2) => {
                if (res2.data.errno == 0) {
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
            this.setState(() => {
                return {
                    imageUrl,
                    loading: false,
                    userInfo: {
                        ...this.state.userInfo,
                        avatar: imageUrl
                    }
                }
            }),
          );
        }
      };
    render() {
        const { userInfo } = this.state
        const uploadButton = (
            <div>
              <Icon type={this.state.loading ? 'loading' : 'plus'} />
              <div className="ant-upload-text">Upload</div>
            </div>
        );
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
                            userInfo.avatar == '' ? (
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
