import React, { Component } from 'react'
import './index.less'

export default class PictureList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      brandName: '',
      carName: ''
    }
  }
  setTitle = (brandName, carName) => {
    this.setState(() => {
      return {
        brandName,
        carName
      }
    })
  }
  handleList = () => {
    const { brandName, carName } = this.state
    const { pictureList } = this.props
    if (this.state.brandName === '') {
      return null
    }
    return (
      <div className="picture-list">
        <div className="picture-title">{brandName} {carName}</div>
          {
            pictureList.length > 0 ? (
              <div className="picture-box">
                {
                  pictureList.map((item, index) => {
                    return (
                      <div className="picture-item"  key={index}>
                        <img src={item}/>
                      </div>
                      
                    )
                  })
                }
              </div>
              
            ) : (
              <div className="null-tips">
                暂时没有图片哦~
              </div>
            )
          }
        
      </div>
    )
  }
  render() {
    return (
      this.handleList()
    )
  }
}
