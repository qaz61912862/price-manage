import React, { Component, Fragment } from 'react'
import ManageButton from './component/ManageButton'
import ArticleList from './component/ArticleList'
import axios from '../../../../utils/request'
import { Button, message, Modal, Input } from 'antd'
import { connect } from 'react-redux'
import { pushChoose, cancelChoose } from './store/actionCreators'
import { getArticleList, getMyArticleList, getReadyArticleList, successCheck, failCheck } from '../../../../api/api'
import './index.less'
const { TextArea } = Input;

class Article extends Component {
    constructor(props) {
        super(props)
        this.state = {
            current: 1,
            currentAllPage: 1,
            showChoose: false,
            reason: '',
            visible: false,
            tabList: ['全部', '我的'],
            currentIndex: 0,
            total: '',
            articleList: [],
            allArticleList: [],
            allTotal: '',
            myArticleList: [],
            myTotal: '',
            readyArticleList: [],
            readyTotal: '',
            isAdmin: 0,
            isFinsh: false
        }
    }
    componentDidMount() {
        let info = {
            page: 1
        }
        axios.post(getArticleList, info).then(res => {
            if (res.data.errno === 0) {
                res.data.data.data.forEach(item => {
                    item.isCheck = false
                })
                this.setState(() => {
                    return {
                        allArticleList: res.data.data.data,
                        allTotal: res.data.data.total,
                        isAdmin: res.data.data.isAdmin,
                        isFinsh: true
                    }
                }, () => {
                    if (this.state.isAdmin === 1) {
                        this.state.tabList.push('待审核')
                        axios.post(getReadyArticleList, info).then((res) => {
                            res.data.data.data.forEach(item => {
                                item.isCheck = false
                            })
                            this.setState(() => {
                                return {
                                    readyArticleList: res.data.data.data,
                                    readyTotal: res.data.data.total
                                }
                            }, () => {
                                // console.log(this.state)
                            })
                        })
                    }
                    this.setState(() => {
                        return {
                            articleList: this.state.allArticleList,
                            total: this.state.allTotal
                        }
                    })
                })
            }
        })
        axios.post(getMyArticleList, info).then(res => {
            if (res.data.errno === 0) {
                this.setState(() => {
                    return {
                        myArticleList: res.data.data.data,
                        myTotal: res.data.data.total
                    }
                }, () => {
                    // console.log(this.state)
                })
            }
        })
        
    }
    changeTab = (index) => {
        // console.log(this.props.checkArray)
        if (this.state.currentIndex !== index && this.state.isFinsh)
        this.setState(() => {
            return {
                current: 1,
                isFinsh: false
            }
        })
        setTimeout(() => {
            this.setState(() => {
                return {
                    isFinsh: true
                }
            }, () => {
                this.setState(() => {
                    return {
                        currentIndex: index
                    }
                }, () => {
                    if (this.state.currentIndex === 0) {
                        this.setState(() => {
                            return {
                                articleList: this.state.allArticleList,
                                total: this.state.allTotal
                            }
                        })
                    } else if (this.state.currentIndex === 1) {
                        this.setState(() => {
                            return {
                                articleList: this.state.myArticleList,
                                total: this.state.myTotal
                            }
                        })
                    } else if (this.state.currentIndex === 2) {
                        this.setState(() => {
                            return {
                                articleList: this.state.readyArticleList,
                                total: this.state.readyTotal
                            }
                        })
                    }
                })
            })
        }, 1000)
    }
    changeAllPage = (page) => {
        this.setState(() => {
            return {
                currentAllPage: page
            }
        })
    }
    changeCheck = (index, currentIndex) => {
        let lengthIndex = 3 * (this.state.currentAllPage - 1) + index
        if (currentIndex === 2) {
            this.state.readyArticleList[lengthIndex].isCheck = !this.state.readyArticleList[lengthIndex].isCheck
            if (this.state.readyArticleList[lengthIndex].isCheck) {
                this.props.pushChoose(this.state.readyArticleList[lengthIndex].id, currentIndex)
            } else {
                this.props.cancelChoose(this.state.readyArticleList[lengthIndex].id, currentIndex)
            }
            this.setState(() => {
                return {
                    articleList: this.state.readyArticleList
                }
            })
        } else if (currentIndex === 0) {
            this.state.allArticleList[lengthIndex].isCheck = !this.state.allArticleList[lengthIndex].isCheck 
            if (this.state.allArticleList[lengthIndex].isCheck) {
                this.props.pushChoose(this.state.allArticleList[lengthIndex].id, currentIndex)
            } else {
                this.props.cancelChoose(this.state.allArticleList[lengthIndex].id, currentIndex)
            }
            this.setState(() => {
                return {
                    articleList: this.state.allArticleList
                }
            })        
        }
    }
    checkArticle = () => {
        if (this.props.checkArray.length === 0) {
            message.warning('请先选择文章')
            return
        }
        let info = {
            idArray: this.props.checkArray
        }
        axios.post(successCheck, info).then((res) => {
            if (res.data.errno === 0) {
                message.success('操作成功')
                setTimeout(() => {
                    this.props.history.go(0)
                }, 1500)
            } else {
                message.error('数据错误')
            }
        })
    }
    showBtns = () => {
        this.setState(() => {
            return {
                showChoose: true
            }
        })
    }
    hideModal = () => {
        this.setState({
            visible: false,
        });
    };
    rejectArticle = () => {
        if (this.props.checkArray.length === 0) {
            message.warning('请先选择文章')
            return
        }
        this.setState({
            visible: true
        });
    }
    confirmReason = () => {
        // console.log(this.state.reason)
        let info = {
            idArray: this.props.checkArray,
            reason: this.state.reason
        }
        axios.post(failCheck, info).then((res) => {
            if (res.data.errno === 0) {
                message.success('操作成功')
                setTimeout(() => {
                    this.props.history.go(0)
                }, 1500)
            } else {
                message.error('数据错误')
            }
        })
    }
    onChangeTextArea = ({ target: { value } }) => {
        this.setState({
            reason: value 
        });
    };
    pulltoTop = () => {
        console.log(this.props.allChooseArray)
    }
    deleteArticle = () => {
        console.log(this.props.allChooseArray)
    }
    render() {
        let { tabList, currentIndex, articleList, isFinsh, reason, isAdmin, showChoose, current } = this.state
        return (
            <div className="article">
                <Modal
                title="拒绝理由"
                visible={this.state.visible}
                onOk={this.confirmReason}
                onCancel={this.hideModal}
                okText="确认"
                cancelText="取消"
                >
                    <TextArea
                    autosize={{ minRows: 8, maxRows: 12 }}
                    value={reason}
                    onChange={this.onChangeTextArea}
                    ></TextArea>
                </Modal>
                <ManageButton pulltoTop={this.pulltoTop} deleteArticle={this.deleteArticle} showBtns={this.showBtns} currentIndex={currentIndex} isAdmin={isAdmin}/>
                <div className="main-box">
                    <div className="tab-box">
                        {
                            currentIndex === 2 && (
                            <Fragment>
                                <Button type="primary" className="check-btn" onClick={this.checkArticle}>通过审核</Button>
                                <Button type="warning" className="check-btn fail-btn" onClick={this.rejectArticle}>拒绝审核</Button>
                            </Fragment>
                            )
                        }
                        {
                            tabList.map((item, index) => (
                                <div onClick={(e) => this.changeTab(index, e)} className={`tab-item ${index === currentIndex ? 'active-tab' : ''}`} key={index}>{item}</div>
                            ))
                        }
                    </div>
                    <ArticleList current={current} changeAllPage={this.changeAllPage} showChoose={showChoose} isAdmin={isAdmin} changeCheck={this.changeCheck} isFinsh={isFinsh} articleList={articleList} currentIndex={currentIndex}/>
                </div>

            </div>
        )
    }
}

const mapState = (state) => {
    return {
        checkArray: state.checkbox.chooseArray,
        allChooseArray: state.checkbox.allChooseArray
    }
}

const mapDispatch = (dispatch) => {
    return {
        pushChoose(id, currentIndex) {
            dispatch(pushChoose(id, currentIndex))
        },
        cancelChoose(id, currentIndex) {
            dispatch(cancelChoose(id, currentIndex))
        }
    }
}

export default connect(mapState, mapDispatch)(Article)