import React, { Component } from 'react'
import axios from '../../../../utils/request'
import { getCarsList } from '../../../../api/api'
import { Row, Col, message } from 'antd'
import './index.less'

export default class CarsList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            page: 1,
            carList: []
        }
    }
    componentDidMount() {
        let url = getCarsList + `?page=${this.state.page}`
        axios.get(url).then((res) => {
            if (res.data.errno == 0) {
                this.setState(() => {
                    return {
                        carList: [...this.state.carList, ...res.data.data]
                    }
                }, () => {
                    console.log(this.state)
                })
            } else {
                message.error('数据错误')
            }
        })
    }
    render() {
        let { carList } = this.state
        console.log(carList)
        return (
            <div className="main">
                <Row className="title-row">
                    <Col span={2}>品牌</Col>
                    <Col span={2}>生产企业</Col>
                    <Col span={2}>车型</Col>
                    <Col span={2}>年份</Col>
                    <Col span={4}>发动机(排量)</Col>
                    <Col span={2}>生产国家</Col>
                    <Col span={3}>资金类型</Col>
                    <Col span={2}>体型</Col>
                    <Col span={2}>发动机容量</Col>
                    <Col span={2}>变速箱</Col>
                </Row>
                {
                    carList.map((item, index) => (
                        <Row key={index}>
                            <Col span={2}>{item.MODEL_NAME}</Col>
                            <Col span={2}>{item.MAKE_NAME}</Col>
                            <Col span={2}>{item.MAKE_NAME}</Col>
                            <Col span={2}>{item.MAKE_NAME}</Col>
                            <Col span={4}>4</Col>
                            <Col span={2}>{item.MAKE_NAME}</Col>
                            <Col span={3}>3</Col>
                            <Col span={2}>{item.MAKE_NAME}</Col>
                            <Col span={2}>{item.MAKE_NAME}</Col>
                            <Col span={2}>{item.MAKE_NAME}</Col>
                        </Row>
                    ))
                }
            </div>
        )
    }
}
