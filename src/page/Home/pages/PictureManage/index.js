import React, { Component } from 'react'
import './index.less'
import { Row, Col, Select, Input, Button, Message, Upload, Icon, Modal } from 'antd'
import axios from '../../../../utils/request'
import { getAllBrand, addBrand, getCorrespondingBrand, saveImageForCar, getImageList, updateImageForCar } from '../../../../api/api'
const { Option } = Select


export default class PictureManage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      uploadType: '',
      letterArray: [],
      letter: '',
      letterInput: '',
      correspondingArray: [],
      corresponding: '',
      carArray: [],
      carInput: '',
      carId: '',
      previewVisible: false,
      previewImage: '',
      fileList: [
        
      ]
    }
  }
  handleCancel = () => this.setState({ previewVisible: false })


  handleChange = ({ fileList }) => {
    this.setState({ fileList })
  }
  componentDidMount() {
    this.init()
  }
  init = () => {
    axios.get(getAllBrand).then((res) => {
      if (res.data.errno == 0) {
        this.setState(() => {
          return {
            letterArray: res.data.data
          }
        })
      }
    })
  }
  addBrand = () => {
    let { letter, letterInput } = this.state
    if (letter == '' || letterInput == '') {
      Message.warning('请输入完整信息')
      return;
    }
    let info = {
      parent_id: letter,
      name: letterInput,
      type: 2
    }
    axios.post(addBrand, info).then((res) => {
      if (res.data.errno == 0) {
        Message.success(res.data.data.msg)
      }
    })
  }
  addCar = () => {
    let { corresponding, carInput } = this.state
    if (corresponding == '' || carInput == '') {
      Message.warning('请输入完整信息')
      return;
    }
    let info = {
      parent_id: corresponding,
      name: carInput,
      type: 3
    }
    axios.post(addBrand, info).then((res) => {
      if (res.data.errno == 0) {
        Message.success(res.data.data.msg)
      }
    })
  }
  onChangeLetter = (value, e) => {
    // console.log(value)
    if (value !== undefined) {
      this.setState(() => {
        return {
          letter: e.key
        }
      }, () => {
        let info = {
          parent_id: this.state.letter,
          type: 2
        }
        axios.post(getCorrespondingBrand, info).then((res) => {
          this.setState(() => {
            return {
              correspondingArray: res.data.data
            }
          })
        })
      })
    }
    
  }
  onChangeCorresponding = (value, e) => {
    if (value !== undefined) {
      this.setState(() => {
        return {
          carArray: [],

          corresponding: e.key
        }
      }, () => {
        let info = {
          parent_id: this.state.corresponding,
          type: 3
        }
        axios.post(getCorrespondingBrand, info).then((res) => {
          this.setState(() => {
            return {
              carArray: res.data.data
            }
          })
        })
      })
    }
  }
  onChangeCar = (value, e) => {
    // console.log(value,e.key)
    this.setState(() => {
      return {
        carId: e.key
      }
    }, () => {
      let info = {
        parent_id: this.state.carId
      }
      // console.log(info)
      axios.post(getImageList, info).then((res) => {
        this.setState(() => {
          return {
            picList: res.data.data,
            fileList: []
          }
        }, () => {
          this.state.picList.forEach((item, index) => {
            let info = {
              uid: index,
              url: item
            }
            this.state.fileList.push(info)
          })
          this.setState(() => {
            return {
              fileList: this.state.fileList
            }
          }, () => {
            if (this.state.fileList.length > 0) {
              this.setState(() => {
                return {
                  uploadType: 'update'
                }
              })
            } else {
              this.setState(() => {
                return {
                  uploadType: 'create'
                }
              })
            }
          })
        })
      })
    })
  }
  onChangeLetterInput = ({target: {value}}) => {
    this.setState(() => {
      return {
        letterInput: value
      }
    })
  }
  onChangeCarInput = ({target: {value}}) => {
    this.setState(() => {
      return {
        carInput: value
      }
    })
  }
  savePhoto = () => {
    if (this.state.fileList.length == 0 || this.state.corresponding == '') {
      Message.warning('请填写完整信息')
      return;
    }
    // console.log(this.state.fileList)
    let array = []
    this.state.fileList.forEach((each) => {
      if(each.thumbUrl) {
        array.push(each.thumbUrl)
      } else if (each.url) {
        array.push(each.url)
      }
    })
    console.log(array)
    let info = {
      parent_id: this.state.carId,
      picture: JSON.stringify(array)
    }
    console.log(info)
    if (this.state.uploadType == 'update') {
      axios.post(updateImageForCar, info).then((res) => {
        if (res.data.errno == 0) {
          Message.success('修改成功')
          setTimeout(() => {
            this.props.history.go(0)
          }, 1500)
        }
      })
    } else {
      axios.post(saveImageForCar, info).then((res) => {
        if (res.data.errno == 0) {
          Message.success('添加成功')
          setTimeout(() => {
            this.props.history.go(0)
          }, 1500)
        }
      })
    }
  }
  render() {
    const { previewVisible, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { letterArray, letter, letterInput, correspondingArray, corresponding, carInput, carArray } = this.state
    return (
      <div className="PictureManage">
        <Row className="row-item">
          <Col span={8}>
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="选择首字母"
              optionFilterProp="children"
              onChange={this.onChangeLetter}
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {
                letterArray.map((item) => (
                  <Option value={item.name} key={item.id}>{item.name}</Option>
                ))
              }
            </Select>
          </Col>
          <Col span={8}>
            <Input value={letterInput} placeholder="添加品牌名称(中文)" onChange={this.onChangeLetterInput}/>
          </Col>
          <Col span={8}>
            <Button type="primary" onClick={this.addBrand}>添加品牌</Button>
          </Col>
        </Row>
        <Row className="row-item">
          <Col span={8}>
            <Select
              allowClear={true}
              disabled={letter == ''}
              showSearch
              style={{ width: 200 }}
              placeholder="选择品牌"
              optionFilterProp="children"
              onChange={this.onChangeCorresponding}
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {
                correspondingArray.map((item) => (
                  <Option value={item.id} key={item.id}>{item.name}</Option>
                ))
              }
            </Select>
          </Col>
          <Col span={8}>
            <Input value={carInput} placeholder="添加车型名称" onChange={this.onChangeCarInput}/>
          </Col>
          <Col span={8}>
            <Button type="primary" onClick={this.addCar}>添加车型</Button>
          </Col>
        </Row>
        <Row className="row-item">
          <Col span={8}>
            <Select
              allowClear={true}
              disabled={corresponding == ''}
              showSearch
              style={{ width: 200 }}
              placeholder="选择车型"
              optionFilterProp="children"
              onChange={this.onChangeCar}
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {
                carArray.map((item) => (
                  <Option value={item.name} key={item.id}>{item.name}</Option>
                ))
              }
            </Select>
          </Col>
        </Row>
        <Row className="row-item">
          <div className="clearfix">
            <Upload
              disabled={fileList.length == 4}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              fileList={fileList}
              onChange={this.handleChange}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
            </Modal>
          </div>
        </Row>
        <Button type="primary" className="save-btn" onClick={this.savePhoto}>保存</Button>

      </div>
    )
  }
}
