import React, { Component } from 'react'
import ManageButton from './component/ManageButton'
import ArticleList from './component/ArticleList'
import axios from '../../../../utils/request'
import { Button } from 'antd'
import { connect } from 'react-redux'
import { pushChoose, cancelChoose } from './store/actionCreators'
import { getArticleList, getMyArticleList, getReadyArticleList } from '../../../../api/api'
import './index.less'

class Article extends Component {
    constructor(props) {
        super(props)
        this.state = {
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
            if (res.data.errno == 0) {
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
                                console.log(this.state)
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
            if (res.data.errno == 0) {
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
        console.log(this.props.checkArray)
        if (this.state.currentIndex !== index && this.state.isFinsh)
        this.setState(() => {
            return {
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
                    if (this.state.currentIndex == 0) {
                        this.setState(() => {
                            return {
                                articleList: this.state.allArticleList,
                                total: this.state.allTotal
                            }
                        })
                    } else if (this.state.currentIndex == 1) {
                        this.setState(() => {
                            return {
                                articleList: this.state.myArticleList,
                                total: this.state.myTotal
                            }
                        })
                    } else if (this.state.currentIndex == 2) {
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
    changeCheck = (index) => {
        this.state.readyArticleList[index].isCheck = !this.state.readyArticleList[index].isCheck
        if (this.state.readyArticleList[index].isCheck) {
            this.props.pushChoose(this.state.readyArticleList[index].id)
        } else {
            this.props.cancelChoose(this.state.readyArticleList[index].id)
        }
        this.setState(() => {
            return {
                articleList: this.state.readyArticleList
            }
        })
    }
    checkArticle = () => {
        console.log(...this.props.checkArray)
    }
    render() {
        let { tabList, currentIndex, articleList, isFinsh } = this.state
        return (
            <div className="article">
                <ManageButton currentIndex={currentIndex}/>
                <div className="main-box">
                    <div className="tab-box">
                        {
                            currentIndex == 2 && (
                                <Button type="primary" className="check-btn" onClick={this.checkArticle}>审核</Button>
                            )
                        }
                        {
                            tabList.map((item, index) => (
                                <div onClick={(e) => this.changeTab(index, e)} className={`tab-item ${index === currentIndex ? 'active-tab' : ''}`} key={index}>{item}</div>
                            ))
                        }
                    </div>
                    <ArticleList changeCheck={this.changeCheck} isFinsh={isFinsh} articleList={articleList} currentIndex={currentIndex}/>
                </div>

            </div>
        )
    }
}

const mapState = (state) => {
    return {
        checkArray: state.checkbox.chooseArray
    }
}

const mapDispatch = (dispatch) => {
    return {
        pushChoose(id) {
            dispatch(pushChoose(id))
        },
        cancelChoose(id) {
            dispatch(cancelChoose(id))
        }
    }
}

export default connect(mapState, mapDispatch)(Article)