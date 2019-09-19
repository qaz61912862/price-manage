import React, { Component, Fragment } from 'react'
import { getUserList, delUser, searchUser } from '../../../../api/api'
import './index.less'
import Search from './component/Search'
import { Row, Col, message, Pagination, Button } from 'antd'
import axios from '../../../../utils/request'

export default class User extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showPage: true,
            isAdmin: 0,
            isFinish: false,
            total: 0,
            current: 1,
            page: 1
        }
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
    checkData = () => {
        let info = {
            page: this.state.page
        }
        axios.post(getUserList, info).then((res) => {
            this.setState(() => {
                return {
                    userList: res.data.data.data,
                    total: res.data.data.total
                }
            })
        })
    }
    goDetail = (id) => {
        this.props.history.push(`/home/userDetail/${id}`)
    }
    delUser = (id) => {
        let info = {
            id
        }
        axios.post(delUser, info).then((res) => {
            if (res.data.errno == 0) {
                message.success('删除成功');
                this.setState(() => {
                    return {
                        page: 1
                    }
                }, () => {
                    this.init()
                })
            } else {
                message.error(res.data.msg)
            }
        })
    }
    beginSearch = (key) => {
        let info = {
            key
        }
        if (key == '') {
            this.setState({
                showPage: true,
                current: 1,
                page: 1
            })
        } else {
            this.setState({
                showPage: false
            })
        }
        axios.post(searchUser, info).then((res) => {
            if (res.data.errno === 0) {
                this.setState(() => {
                    return {
                        userList: res.data.data
                    }
                })
            }
        })
    }
    init = () => {
        axios.post(getUserList, {
            page: 1
        }).then((res) => {
            if (res.data.errno === -1) {
                this.setState(() => {
                    return {
                        isFinish: true,
                        isAdmin: 0
                    }
                })
            } else {
                this.setState(() => {
                    return {
                        isFinish: true,
                        userList: res.data.data.data,
                        isAdmin: 1,
                        total: res.data.data.total
                    }
                })
            }
        })
    }
    componentDidMount() {
        this.init()
    }
    render() {
        const { isAdmin, isFinish, userList, total, showPage } = this.state
        return (
            <div className="user">
                {
                    isFinish && isAdmin === 1 && (
                        <Fragment>
                        <Search beginSearch={this.beginSearch}/>
                        <Row className="title-row">
                            <Col span={6}>头像</Col>
                            <Col span={6}>用户名</Col>
                            <Col span={6}>真实姓名</Col>
                            <Col span={6}>操作</Col>
                        </Row>
                        {
                            userList.map((item, index) => (
                                <Row key={index}>
                                    <Col span={6}>
                                        {
                                            (item.avatar === '' || item.avatar === null || item.avatar === 'null') ? (
                                                <img src={require('../../../../images/default.png')}/>
                                            ) : (
                                                <img src={item.avatar}/>
                                            )
                                        }
                                        
                                    </Col>
                                    <Col span={6}>{item.username}</Col>
                                    <Col span={6}>{item.realname}</Col>
                                    <Col span={6}>
                                        <Button type="primary" onClick={(e) => this.goDetail(item.id, e)}>编辑</Button>
                                        <Button type="danger" onClick={(e) => this.delUser(item.id, e)}>删除</Button>
                                    </Col>
                                </Row>
                            ))
                        }
                        </Fragment>
                    )
                }
                {
                    showPage && userList && isFinish && <Pagination defaultPageSize={10} simple current={this.state.page} defaultCurrent={1} total={total} onChange={this.changePage}/>
                }
                {
                    isFinish && isAdmin === 0 && (
                        <div>
                            <svg t="1568778294788" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1921" width="200" height="200"><path d="M150.87616 151.48487111c99.63975111-99.47932445 219.64686222-149.35950222 360.06115555-149.35950222s260.42140445 49.88017778 360.06001778 149.35950222C970.47665778 251.12462222 1020.35683555 371.13173333 1020.35683555 511.54488889c0 140.53376-49.88017778 260.54087111-149.35950222 360.06001778-99.63975111 99.47932445-219.64686222 149.35950222-360.06001778 149.35950222S250.51591111 971.08650667 150.87616 871.60604445C51.39683555 772.12672 1.51665778 652.07978667 1.51665778 511.54602667c-0.03982222-140.41429333 49.84035555-260.42140445 149.35950222-360.06115556z m360.02133333-107.70659556c-84.82360889 0-163.29728 20.76672-235.18094222 62.41962667-71.8848 41.53344-128.59278222 98.36202667-170.12622222 170.12622223-41.65290667 71.8848-62.41962667 150.23786667-62.41962667 235.18094222 0 128.95232 45.76597333 239.17454222 137.17959111 330.58816 91.41248 91.53308445 201.59601778 137.17959111 330.58816 137.17959111s239.17454222-45.64650667 330.58816-137.17959111c91.53308445-91.41248 137.17959111-201.59601778 137.17959112-330.58816s-45.80807111-239.13472-137.22055112-330.5472c-91.29301333-91.53308445-201.59601778-137.17959111-330.58816-137.17959112z" p-id="1922"></path><path d="M751.10968889 618.32192h-16.50574222v-25.13578667c0.23893333-7.31818667 0.23893333-45.22097778-23.14808889-69.36348444-13.12540445-13.64195555-31.22176-20.44359111-53.61322667-20.44359111h-0.23893333c-2.10830222-0.23893333-4.4544-0.3584-6.91996445-0.3584-10.89763555 0-31.45955555 2.46556445-47.80600888 18.81201777-15.35203555 15.47150222-23.14808889 39.49454222-23.02862223 71.4706489v25.01745777h-14.75584c-11.89205333 0-21.31854222 8.78933333-21.31854222 20.08519111v114.58446222c0 11.13656889 9.30702222 19.92590222 21.31854222 19.92590223H751.14951111c11.89205333 0 21.03978667-8.78933333 21.03978667-19.92590223V638.40597333c-0.03982222-11.29472-9.30702222-20.08519111-21.07960889-20.08405333z m-53.13649778-25.25639111v25.25525333h-78.03335111v-25.01745777c0-33.92625778 13.3632-52.02261333 38.53994667-52.14208h0.75548444c10.77816889 0 19.09077333 3.22104889 25.53400889 9.90321777 14.03904 14.63751111 13.20391111 40.88832 13.20391111 42.00106667z" p-id="1923"></path><path d="M603.19630222 458.79409778c19.56750222-14.59655111 27.60248889-18.33528889 27.60248889-45.93777778s-22.78968889-27.60248889-22.78968889-27.60248889 0 0.75548445-8.03384889-44.70442666c-7.91438222-44.22656-51.02819555-91.27822222-121.86282666-94.02254223v-0.23893333c-0.99441778 0-1.98883555 0.11946667-3.10272 0.11946666s-2.22776889-0.11946667-3.45998222-0.11946666v0.23893333c-61.56743111 3.10272-106.03406222 50.03377778-113.82897778 94.02254223-8.19313778 45.45991111-8.19313778 44.70442667-8.19313778 44.70442666s-22.78968889 0-22.78968889 27.60248889 8.03384889 37.38624 27.60248889 52.02261333c19.56750222 14.59655111 13.76142222 46.21539555 43.82947556 73.93735112 16.10752 14.87530667 27.60248889 26.01073778 27.60248888 47.20981333 0 21.03978667-11.41418667 26.01073778-22.78968888 32.45397333-11.41418667 6.56270222-87.81824 27.60248889-123.6127289 52.02261334-35.79562667 24.42012445-34.20387555 37.42606222-34.20387555 58.46584888 0 35.79562667 45.57937778 40.60728889 45.57937778 40.60728889h191.34577777s24.02304 0.63601778 24.02304-22.90915555l0.75548445-115.30012445c-0.51996445-110.52714667 28.95189333-150.65770667 96.32654222-172.57244444z" p-id="1924"></path></svg>
                            <p>你暂时没有查看的权限噢~</p>
                        </div>
                    )
                }
            </div>
        )
    }
}
