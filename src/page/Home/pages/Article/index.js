import React, { Component } from 'react'
import ManageButton from './component/ManageButton'
import ArticleList from './component/ArticleList'
import './index.less'

export default class Article extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tabList: ['全部', '我发表的'],
            currentIndex: 0
        }
    }
    changeTab = (index) => {
        if (this.state.currentIndex !== index)
        this.setState(() => {
            return {
                currentIndex: index
            }
        })
    }
    render() {
        let { tabList, currentIndex } = this.state
        return (
            <div className="article">
                <ManageButton />
                <div className="main-box">
                    <div className="tab-box">
                        {
                            tabList.map((item, index) => (
                                <div onClick={(e) => this.changeTab(index, e)} className={`tab-item ${index === currentIndex ? 'active-tab' : ''}`} key={index}>{item}</div>
                            ))
                        }
                    </div>
                    <ArticleList />
                </div>

            </div>
        )
    }
}
