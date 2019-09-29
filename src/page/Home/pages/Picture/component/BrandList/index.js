import React, { Component } from 'react'
import { Icon } from 'antd'
import './index.less'

export default class BrandList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentIndex: ''
    }
  }
  toggleOpen = (index) => {
    if (this.state.currentIndex === index) {
      return
    } else {
      this.props.alphaList.forEach((each) => {
        each.isOpen = false;
      })
      this.props.alphaList[index].isOpen = true
      this.setState(() => {
        return {
          currentIndex: index,
          alphaList: this.props.alphaList
        }
      })
      this.props.changeTopList(index)
    }
    
  }
  render() {
    const { alphaList, brandList } = this.props
    return (
      <div className="BrandList">
        {
          alphaList.map((item, index) => {
            if (item.isHaveBrand === 1) {
              return (
                <div className="list-item" key={index}>
                  <div onClick={(e) => this.toggleOpen(index, e)} className="list-title">{item.name}</div>
                  <div className={`list-content ${item.isOpen === false ? '' : 'open'}`}>
                    <ul>
                      {
                        brandList.map((item, index) => (
                          <li key={index}>
                            <Icon type="caret-right" />
                            <div className="brand-text">{item.name}</div>
                          </li>
                        ))
                      }
                    </ul>
                  </div>
                </div>
              )
            }
          })
        }
      </div>
    )
  }
}
