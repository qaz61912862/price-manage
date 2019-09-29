import React, { Component } from 'react'
import axios from '../../../../utils/request'
import { getAllBrand, getCorrespondingBrand } from '../../../../api/api'
import Alphabet from './component/Alphabet'
import BrandList from './component/BrandList'
import './index.less'

export default class Picture extends Component {
  constructor(props) {
    super(props)
    this.state = {
      alphaList: [],
      brandList: []
    }
  }
  getAlphaChange = (index) => {
    this.refs.brandList.toggleOpen(index)
    let parent_id = this.state.alphaList[index].id
    // this.getBrandList(parent_id)
    console.log(parent_id)
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
    const { alphaList, brandList } = this.state
    return (
      <div>
        <div className="Picture">
          <div className="left-c">
            <Alphabet alphaList={alphaList} ref="alphabet" getAlphaChange={this.getAlphaChange}/>
            <BrandList alphaList={alphaList} brandList={brandList} ref="brandList" changeTopList={this.changeTopList}/>
          </div>
          <div className="right-c">right</div>
        </div>
      </div>
    )
  }
}
