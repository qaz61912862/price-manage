import React, { Component } from 'react'
import axios from '../../../../utils/request'
import { getCarsList, getMakeName, getVehicleClass, getTransmission } from '../../../../api/api'
import { Row, Col, message, Pagination, Select, Button, Spin } from 'antd'
import './index.less'
const { Option } = Select;

export default class CarsList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isFinish: false,
            page: 1,
            carList: [],
            total: null,
            makeName: '',
            vechicleClass: '',
            transMission: '',
            nameList: [
                {
                    MAKE_NAME: '全部'
                }
            ],
            vehicleList: [
                {
                    VEHICLE_CLASS: '全部'
                }
            ],
            missionList: [
                {
                    TRANSMISSION: '全部'
                }
            ]
        }
    }
    componentDidMount() {
        this.init()
        this.initSelectList()
    }
    initSelectList = () => {
        let p1 = new Promise((resolve, reject) => {
            axios.get(getMakeName).then((result) => {
                resolve(result)
            })
        })
        let p2 = new Promise((resolve, reject) => {
            axios.get(getVehicleClass).then((result) => {
                resolve(result)
            })
        })
        let p3 = new Promise((resolve, reject) => {
            axios.get(getTransmission).then((result) => {
                resolve(result)
            })
        })
        Promise.all([p1, p2, p3]).then((res) => {
            this.setState(() => {
                return {
                    nameList: [...this.state.nameList, ...res[0].data.data],
                    vehicleList: [...this.state.vehicleList, ...res[1].data.data],
                    missionList: [...this.state.missionList, ...res[2].data.data]
                }
            })
        })
    }
    changePage = (page) => {
        this.setState(() => {
            return {
                page: page
            }
        }, () => {
            this.checkData()
        })

    }
    init = () => {
        let info = {
            page: this.state.page
        }
        axios.post(getCarsList, info).then((res) => {
            if (res.data.errno === 0) {
                this.setState(() => {
                    return {
                        carList: res.data.data.data,
                        total: res.data.data.total,
                        isFinish: true
                    }
                }, () => {
                    // console.log(this.state)
                })
            } else {
                message.error('数据错误')
            }
        })
    }
    onChangeName = (value) => {
        this.setState(() => {
            return {
                makeName: value
            }
        })
    }
    onChangeVehicle = (value) => {
        this.setState(() => {
            return {
                vechicleClass: value
            }
        })
    }
    onChangeMission = (value) => {
        this.setState(() => {
            return {
                transMission: value
            }
        })
    }
    confirmFilter = () => {
        this.setState(() => {
            return {
                page: 1
            }
        }, () => {
            this.checkData()
        })
    }
    checkData = () => {
        let { makeName, vechicleClass, transMission } = this.state
        let info = {
            MAKE_NAME: makeName == '全部' ? '' : makeName,
            VEHICLE_CLASS: vechicleClass == '全部' ? '' : vechicleClass,
            TRANSMISSION: transMission == '全部' ? '' : transMission,
            page: this.state.page
        }
        axios.post(getCarsList, info).then((res) => {
            this.setState(() => {
                return {
                    carList: res.data.data.data,
                    total: res.data.data.total
                }
            })
        })
    }
    render() {
        let { isFinish, carList, total, nameList, vehicleList, missionList, makeName, vechicleClass, transMission } = this.state
        return (
            <Spin tip="Loading..." spinning={!isFinish}>
            <div className="main2">
            
                <div className="filter-box">
                    <Row>
                        <Col span={8}>
                        <Select
                            showSearch
                            placeholder="选择品牌"
                            optionFilterProp="children"
                            onChange={this.onChangeName}
                            filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {
                                nameList.map((item, index) => (
                                    <Option key={index} value={item.MAKE_NAME}>{item.MAKE_NAME}</Option>
                                ))
                            }
                        </Select>
                        </Col>
                        <Col span={8}>
                        <Select
                            showSearch
                            placeholder="选择体型"
                            optionFilterProp="children"
                            onChange={this.onChangeVehicle}
                            filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {
                                vehicleList.map((item, index) => (
                                    <Option key={index} value={item.VEHICLE_CLASS}>{item.VEHICLE_CLASS}</Option>
                                ))
                            }
                        </Select>
                        </Col>
                        <Col span={8}>
                        <Select
                            showSearch
                            placeholder="选择变速箱"
                            optionFilterProp="children"
                            onChange={this.onChangeMission}
                            filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {
                                missionList.map((item, index) => (
                                    <Option key={index} value={item.TRANSMISSION}>{item.TRANSMISSION}</Option>
                                ))
                            }
                        </Select>
                    
                        </Col>
                        <Button type="primary" onClick={this.confirmFilter}>确定</Button>
                    </Row>
                </div>
                
                    {
                        carList.length > 0 && (
                            <Row className="title-row">
                                <Col span={2} className={(makeName !== '' && makeName !== '全部') ? 'active-col' : ''}>品牌</Col>
                                <Col span={2}>生产企业</Col>
                                <Col span={2}>车型</Col>
                                <Col span={2}>年份</Col>
                                <Col span={4}>发动机(排量)</Col>
                                <Col span={2}>生产国家</Col>
                                <Col span={3}>资金类型</Col>
                                <Col span={2} className={(vechicleClass !== '' && vechicleClass !== '全部') ? 'active-col' : ''}>体型</Col>
                                <Col span={2}>发动机容量</Col>
                                <Col span={2} className={(transMission !== '' && transMission !== '全部') ? 'active-col' : ''}>变速箱</Col>
                            </Row>
                        )
                    }
                    {
                        carList.map((item, index) => (
                            <Row key={index}>
                                <Col span={2}>{item.MAKE_NAME}</Col>
                                <Col span={2}>{item.MODEL_SERIES}</Col>
                                <Col span={2}>{item.MODEL_NAME}</Col>
                                <Col span={2}>{item.TYPE_SERIES}</Col>
                                <Col span={4}>{item.TYPE_NAME}</Col>
                                <Col span={2}>{item.COUNTRY}</Col>
                                <Col span={3}>{item.TECHNOLOGY}</Col>
                                <Col span={2}>{item.VEHICLE_CLASS}</Col>
                                <Col span={2}>{item.ENGINE_CAPACITY}</Col>
                                <Col span={2}>{item.TRANSMISSION}</Col>
                            </Row>
                        ))
                    }
                    {
                        carList.length > 0 && isFinish && <Pagination simple current={this.state.page} defaultCurrent={1} total={total} onChange={this.changePage}/>
                    }
                    {
                        carList.length == 0 && isFinish && (
                            <div className="no-data">
                                <svg t="1568710424968" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4022" width="200" height="200"><path d="M898.023 0H120.54a56.288 56.288 0 0 0-56.288 56.288v535.123c0 30.959 25.33 56.289 56.288 56.289h42.28a60.126 60.126 0 0 0 14.264 23.027 13.113 13.113 0 0 0 6.397 3.71c70.488 18.23 87.95 41 92.108 52.898 4.67 13.24 4.35 21.108 4.158 24.306-0.704 0.96-0.96 271.783-0.96 271.783h30.255s-0.64-260.333-0.128-270.76c-1.023-20.596-6.716-33.9-6.716-33.9-13.624-31.023-46.886-52.899-107.971-69.337-5.117-6.077-6.653-11.066-6.653-15.032v-0.064c0-5.437 3.39-10.874 9.595-15.543l0.512-0.384a44.775 44.775 0 0 1 7.356-4.413c2.558-1.28 5.565-2.24 8.507-3.326 4.733-1.088 13.113-2.623 26.673-2.623 23.603 0 51.171 4.605 81.746 13.688 5.117 2.303 10.298 4.542 15.351 7.292a244.343 244.343 0 0 1 24.307 14.84l1.727 1.023c103.11 72.471 91.596 108.995 91.66 108.995a13.56 13.56 0 0 0 11.897 19.829 13.432 13.432 0 0 0 11.962-7.164c4.221-8.06 18.293-48.485-67.29-118.653h238.65c-85.457 70.104-71.385 110.465-67.163 118.46a14.136 14.136 0 0 0 12.409 7.485c1.919 0 4.03-0.512 6.013-1.535a13.049 13.049 0 0 0 5.756-17.846c-0.064-0.384-12.28-36.972 91.469-109.699a233.469 233.469 0 0 1 41.449-23.219c30.574-8.955 58.079-13.624 81.554-13.624 13.496 0 21.94 1.535 26.545 2.687 2.942 1.023 6.076 2.046 8.571 3.39 0.512 0.32 0.96 0.447 1.471 0.64 2.239 1.279 4.414 2.558 6.205 3.837l0.32 0.256c6.076 4.733 9.53 10.106 9.594 15.607l0.128 0.128a24.178 24.178 0 0 1-6.652 14.968c-61.086 16.438-97.162 39.85-107.204 69.72-3.198 10.043-4.094 12.665-5.5 37.1 2.046 5.245 3.39 267.177 3.39 267.177h26.097l-1.472-271.719c0.64-14.84 3.199-23.986 3.199-23.986 3.965-11.962 21.364-34.86 92.3-53.282a13.432 13.432 0 0 0 6.268-3.71 60.126 60.126 0 0 0 14.392-23.091 56.288 56.288 0 0 0 55.01-56.289V56.288A56.416 56.416 0 0 0 898.085 0M207.34 258.798H327.4c5.118 17.91 13.69 63.197-6.651 120.38l-1.408 3.966c-9.786 27.377-22.067 61.47 5.117 131.83 16.631 42.984 6.397 67.482-0.575 77.845h0.064l-3.582-1.408a213.704 213.704 0 0 0-46.374-11.897c-1.28-0.192-2.559-0.384-3.838-0.448a186.327 186.327 0 0 0-19.957-1.279l-4.35 0.128a136.243 136.243 0 0 0-15.607 1.151l-3.965 0.448c-1.024 0.192-1.92 0.448-3.007 0.576 4.734-22.324 7.868-55.393-6.844-77.46-15.735-23.795-19.445-97.098-0.256-152.363 8.316-23.667-1.599-66.778-8.699-91.469m530.198 256.304c27.185-70.488 14.904-104.58 5.117-131.958l-1.471-3.837c-20.277-57.312-11.577-102.599-6.524-120.38h119.996c-7.1 24.562-17.014 67.61-8.699 91.468 19.061 55.393 15.48 128.696-0.32 152.426-14.711 22.068-11.513 55.137-6.844 77.397l-3.198-0.512-2.687-0.256a169.12 169.12 0 0 0-17.526-1.343l-2.366-0.128a201.103 201.103 0 0 0-74.902 15.031c-7.036-10.362-17.27-34.924-0.64-77.908m189.781 76.31a29.423 29.423 0 0 1-28.144 29.295 44.391 44.391 0 0 0-8.699-14.84l-1.79-1.79-0.64-0.64a58.015 58.015 0 0 0-6.717-5.885l-2.366-1.791a75.03 75.03 0 0 0-6.141-3.838l-2.623-1.727-0.959-0.384s-0.128 0-0.128-0.128c-5.117-17.27-12.729-54.497-0.96-72.151 22.516-33.837 24.051-116.159 3.327-176.157-5.565-16.183 3.134-55.905 11.321-82.642h5.31a13.496 13.496 0 0 0 0-27.056H713.358a13.432 13.432 0 1 0-6.14 25.393c-6.013 24.05-12.538 71.576 8.634 131.063l1.408 4.03c8.763 24.37 18.677 52.002-4.798 113.024-19.189 49.508-9.21 81.682 1.024 98.952-8.955 4.734-18.038 10.234-27.185 16.439H376.076l-2.686-1.6a266.538 266.538 0 0 0-24.818-15.03c10.234-17.271 20.213-49.509 1.023-98.89-23.602-60.893-13.688-88.525-4.925-112.896l1.535-4.157c21.108-59.487 14.648-106.884 8.635-130.999a13.432 13.432 0 0 0-6.076-25.393H174.142a13.496 13.496 0 1 0 0 26.993h5.245c8.187 26.864 16.887 66.522 11.322 82.641-20.405 58.847-18.806 142.832 3.326 176.157 11.705 17.59 4.158 54.881-0.96 72.215-0.255 0.192-0.767 0.256-1.023 0.448l-2.942 1.791a87.823 87.823 0 0 0-5.757 3.582l-2.623 1.919a54.114 54.114 0 0 0-6.396 5.629l-0.896 0.895c-0.575 0.576-1.279 1.088-1.79 1.663-1.6 1.92-2.943 3.966-4.286 5.949l-0.064 0.192a41.64 41.64 0 0 0-4.35 8.827h-42.28a29.296 29.296 0 0 1-29.295-29.296V56.096c0-16.118 13.112-29.295 29.295-29.295h777.483c16.119 0 29.295 13.177 29.295 29.295l-0.128 535.315M480.722 195.986a13.496 13.496 0 0 0-13.497-13.433c-45.734 0-84.432-28.272-103.11-41.896a119.229 119.229 0 0 0-10.042-6.908 13.56 13.56 0 0 0-13.752 23.283c1.79 1.087 4.477 3.006 7.803 5.565 20.98 15.287 64.54 47.013 118.973 47.013a13.688 13.688 0 0 0 13.625-13.624m193.299-62.237c-2.239 1.407-5.629 3.838-9.979 6.908-18.613 13.624-57.311 41.832-103.11 41.832a13.496 13.496 0 1 0 0 26.993c54.434 0 97.993-31.726 118.974-47.013 3.39-2.431 6.012-4.478 7.931-5.565a13.432 13.432 0 1 0-13.816-23.155m-68.442 366.578l-90.765-40.81a13.24 13.24 0 0 0-11.641 0.32l-80.275 40.681a13.432 13.432 0 0 0-5.949 18.166 13.56 13.56 0 0 0 18.166 5.949l74.518-37.739 84.88 37.995a13.368 13.368 0 0 0 17.847-6.716 13.496 13.496 0 0 0-6.78-17.846" p-id="4023"></path></svg>
                                <p>没有数据了...</p>
                            </div>
                        )
                    }
            </div>
            </Spin>

        )
    }
}
