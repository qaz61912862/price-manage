import React, { Component } from 'react'
import axios from '../../../../utils/request'
import { getAllBrand, getCorrespondingBrand, getImageList } from '../../../../api/api'
import Alphabet from './component/Alphabet'
import BrandList from './component/BrandList'
import PictureList from './component/PictureList'

import './index.less'

export default class Picture extends Component {
  constructor(props) {
    super(props)
    this.state = {
      alphaList: [],
      brandList: [],
      carList: [],
      pictureList: []
    }
  }
  changeChooseList = (index) => {
    this.setState(() => {
      return {
        carList: []
      }
    })
    let info = {
      type: 3,
      parent_id: this.state.brandList[index].id
    }
    axios.post(getCorrespondingBrand, info).then((res) => {
      if (res.data.errno === 0) {
        this.setState(() => {
          return {
            carList: res.data.data
          }
        })
      }
    })
  }
  getAlphaChange = (index) => {
    this.refs.brandList.toggleOpen(index)
    // let parent_id = this.state.alphaList[index].id
  }
  getRightTitle = (parent, child) => {
    this.refs.pictureList.setTitle(this.state.brandList[parent].name, this.state.carList[child].name)
    let info = {
      parent_id: this.state.carList[child].id
    }
    axios.post(getImageList, info).then((res) => {
      if (res.data.errno === 0) {
        this.setState(() => {
          return {
            pictureList: res.data.data
          }
        })
      }
    })
  }
  getBrandList = (parent_id) => {
    let info = {
      parent_id,
      type: 2
    }
    axios.post(getCorrespondingBrand, info).then((res) => {
      this.setState(() => {
        return {
          brandList: res.data.data
        }
      })
    })
  }
  componentDidMount() {
    axios.get(getAllBrand).then((res) => {
        res.data.data.forEach((item) => {
          item.isOpen = false
        })
        this.setState(() => {
          return {
            alphaList: res.data.data
          }
        })
    })
  }
  changeTopList = (index) => {
    this.refs.alphabet.setCurrentIndex(index)
    let parent_id = this.state.alphaList[index].id
    this.getBrandList(parent_id)
  }
  render() {
    const { alphaList, brandList, carList, pictureList } = this.state
    return (
      <div>
        <div className="Picture">
          <div className="left-c">
            <Alphabet alphaList={alphaList} ref="alphabet" getAlphaChange={this.getAlphaChange}/>
            <BrandList carList={carList} alphaList={alphaList} brandList={brandList} ref="brandList" changeTopList={this.changeTopList} changeChooseList={this.changeChooseList} getRightTitle={this.getRightTitle}/>
          </div>
          <div className="right-c">
            <PictureList ref="pictureList" pictureList={pictureList}/>
          </div>
        </div>
      </div>
    )
  }
}
