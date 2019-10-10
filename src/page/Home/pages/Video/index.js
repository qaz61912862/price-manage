import React, { Component } from 'react'
import { Carousel } from 'antd';
import './index.less'

export default class Video extends Component {
    onChange = (a, b, c) => {
        console.log(a, b, c);
    }
    render() {
        return (
          <div className="video">
            <Carousel afterChange={this.onChange} autoplay="true">
              <div className="item-wrapper">
                <div className="wrapper-child">
                  <img src="https://www2.autoimg.cn/zxpt/g3/M07/6E/21/592x344_0_autohomecar__ChsEkV2MSKuAWZH_AAG3SOO9bC4353.jpg"/>
                </div>
                <div className="wrapper-child">
                  <img src="https://www2.autoimg.cn/zxpt/g3/M07/6E/21/592x344_0_autohomecar__ChsEkV2MSKuAWZH_AAG3SOO9bC4353.jpg"/>
                  <img src="https://www2.autoimg.cn/zxpt/g3/M07/6E/21/592x344_0_autohomecar__ChsEkV2MSKuAWZH_AAG3SOO9bC4353.jpg"/>
                  <img src="https://www2.autoimg.cn/zxpt/g3/M07/6E/21/592x344_0_autohomecar__ChsEkV2MSKuAWZH_AAG3SOO9bC4353.jpg"/>
                  <img src="https://www2.autoimg.cn/zxpt/g3/M07/6E/21/592x344_0_autohomecar__ChsEkV2MSKuAWZH_AAG3SOO9bC4353.jpg"/>
                  
                </div>
              </div>
              <div className="item-wrapper">
                <div className="wrapper-child">1</div>
                <div className="wrapper-child">2</div>
              </div>
              <div className="item-wrapper">
                <div className="wrapper-child">1</div>
                <div className="wrapper-child">2</div>
              </div>
              <div className="item-wrapper">
                <div className="wrapper-child">1</div>
                <div className="wrapper-child">2</div>
              </div>
            </Carousel>
          </div>
        )
    }
}
