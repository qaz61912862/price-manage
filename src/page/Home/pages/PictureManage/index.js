import React, { Component } from 'react'
import './index.less'
import { Row, Col, Select, Input, Button, Message } from 'antd'
import axios from '../../../../utils/request'
import { getAllBrand, addBrand } from '../../../../api/api'
const { Option } = Select


export default class PictureManage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [
        {
          name: 'A',
          id: 1,
          parent_id: 0,
          children: [
            {
              id: 2,
              parent_id: 1,
              name: '阿尔法',
              children: [
                {
                  id: 4,
                  parent_id: 2,
                  name: '阿尔法的儿子'
                }
              ]
            },
            {
              id: 3,
              parent_id: 1,
              name: '阿玛尼'
            }
          ]
        }
      ],
      letterArray: [],
      letter: '',
      letterInput: ''
    }
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
    let info = {
      parent_id: letter,
      name: letterInput
    }
    axios.post(addBrand, info).then((res) => {
      if (res.data.errno == 0) {
        Message.success(res.data.data.msg)
      }
    })
  }
  onChangeLetter = (value, e) => {
    // console.log(value)
    this.setState(() => {
      return {
        letter: e.key
      }
    })
  }
  onChangeLetterInput = ({target: {value}}) => {
    this.setState(() => {
      return {
        letterInput: value
      }
    })
  }
  render() {
    const { letterArray, letter, letterInput } = this.state
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
              showSearch
              style={{ width: 200 }}
              placeholder="选择品牌"
              optionFilterProp="children"
              onChange={this.onChangeLetter}
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {
                letterArray.map((item) => (
                  <Option value={item.id} key={item.id}>{item.name}</Option>
                ))
              }
            </Select>
          </Col>
          <Col span={8}>
            <Input placeholder="添加车型名称" onChange={this.onChangeLetterInput}/>
          </Col>
          <Col span={8}>
            <Button type="primary">添加车型</Button>
          </Col>
        </Row>
        <Row className="row-item">
          <Col span={8}>
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="选择车型"
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
        </Row>

      </div>
    )
  }
}
