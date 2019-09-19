import React, { Component } from 'react'
import { Input } from 'antd';
import './index.less'

export default class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: ''
    }
  }
  pressEnter = () => {
    // console.log(this.state.inputValue)
    this.props.beginSearch(this.state.inputValue)
  }
  changeInput = ({ target: { value } }) => {

    this.setState(() => {
      return {
        inputValue: value
      }
    })
  }
  render() {
    return (
      <div className="search">
        <Input 
        placeholder="搜索真实姓名, Enter确定" 
        onPressEnter={this.pressEnter}
        onChange={this.changeInput}
        />
      </div>
    )
  }
}
