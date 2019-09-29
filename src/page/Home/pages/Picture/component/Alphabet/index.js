import React, { Component } from 'react'
import './index.less'

export default class Alphabet extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentIndex: ''
    }
  }
  setCurrentIndex = (index) => {
    this.setState(() => {
      return {
        currentIndex: index
      }
    })
  }
  changeAlpha = (index) => {
    if (this.state.currentIndex === index) {
      return
    }
    this.setState(() => {
      return {
        currentIndex: index
      }
    }, () => {
      this.props.getAlphaChange(index)
    })
  }
  render() {
    const { currentIndex } = this.state
    const { alphaList } = this.props
    return (
      <div className="Alphabet">
        <ul className="alpha-ul">
          {
            alphaList.map((item, index) => (
              <li onClick={(e) => this.changeAlpha(index, e)} className={`alpha-item ${item.isHaveBrand === 0 ? 'disabled' : ''} ${currentIndex === index ? 'active' : ''}`} key={index}>{item.name}</li>
            ))
          }
          <div className="clear"></div>
        </ul>
      </div>
    )
  }
}
