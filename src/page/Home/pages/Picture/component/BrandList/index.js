import React, { Component } from 'react'
import { Icon } from 'antd'
import './index.less'

export default class BrandList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentIndex: '',
      currentChoose: '',
      currentChild: ''
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
          currentChoose: '',
          currentIndex: index,
          alphaList: this.props.alphaList
        }
      })
      this.props.changeTopList(index)
    }
    
  }
  toggleName = (index) => {
    if(this.state.currentChoose === index) {
      return
    } else {
      this.props.brandList.forEach((each) => {
        each.isChoose = false
      })
      this.props.brandList[index].isChoose = true
      this.setState(() => {
        return {
          currentChild: '',
          currentChoose: index,
          brandList: this.props.brandList
        }
      })
      this.props.changeChooseList(index)
    }
    
  }
  chooseChild = (index) => {
    this.setState(() => {
      return {
        currentChild: index
      }
    }, () => {
      this.props.getRightTitle(this.state.currentChoose, this.state.currentChild)
    })

  }
  judgeCaret = (item) => {
    if (item.isChoose) {
      return (
        <Icon type="caret-down" />
      )
    } else {
      return (
        <Icon type="caret-right" />
      )
    }
  }
  render() {
    const { alphaList, brandList, carList } = this.props
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
                          <li className="brand-li" key={index} onClick={(e) => this.toggleName(index, e)}>
                            <div style={{'display': 'flex'}}>
                              {
                                this.judgeCaret(item)
                              }
                              <div className={`brand-text ${item.isChoose ? 'active' : ''}`} >
                                {item.name}
                              </div>
                            </div>
                            {
                              this.state.currentChoose === index ? (
                                <div className="brand-detail">
                                  {
                                    carList.map((item, index) => (
                                      <div className={`brand-item ${this.state.currentChild === index ? 'active': ''}`} key={index} onClick={(e) => this.chooseChild(index)}>{item.name}</div>
                                    ))
                                  }
                                </div>
                              ) : null
                            }
                            
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
