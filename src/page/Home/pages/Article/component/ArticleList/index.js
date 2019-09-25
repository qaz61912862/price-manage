import React, { Component, Fragment } from 'react'
import './index.less'
import { Link } from 'react-router-dom'
import { List, Avatar, Icon, Spin } from 'antd';
import { timestampToTime } from '../../../../../../utils/common'

export default class ArticleList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      current: 1
    }
}
  toggleCheck = (index, currentIndex) => {
    this.props.changeCheck(index, currentIndex)
    // console.log(this.props.articleList[index])
    // this.props.articleList[index].isCheck = !this.props.articleList[index].isCheck
  }
  resetPage = () => {
    this.setState(() => {
      return {
        current: 1
      }
    })
  }
  render() {
    const { articleList, currentIndex, isFinsh, isAdmin, showChoose } = this.props
    const { current } = this.state
    return (
      <Spin tip="Loading..." spinning={!isFinsh}>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: page => {
            this.props.changeAllPage(page)
            this.setState(() => {
              return {
                current: page
              }
            })
          },
          pageSize: 3,
          current: current
        }}
        dataSource={articleList}
        footer={
          <div>
            <b>design by</b> Hanson
          </div>
        }
        renderItem={(item, index) => (
            <List.Item
            key={item.title}
            extra={
              item.article_img && <img
              width={272}
              alt="logo"
              src={item.article_img}
            />
            }
          >
            <List.Item.Meta
              avatar={(item.avatar === '' || item.avatar === 'null' || item.avatar === null) ? (<Avatar size={32} icon="user" />) : (<Avatar src={item.avatar} />)}
              title={<Link to={{
                pathname: `/home/articleDetail/${item.id}`
              }}>{item.title}</Link>}
              description={`${item.author} 发布于 ${timestampToTime(item.createTime)}`}
            />
            {item.list_show_text}
            {
              currentIndex !== 0 && item.state === 0 && <div className="right-status check">审核中</div>
            }
            {
              currentIndex !== 0 && item.state === 1 && <div className="right-status send">已发布</div>
            }
            {
              currentIndex !== 0 && item.state === 2 && (
                <Fragment>
                  <Link to={{
                    pathname: '/home/articleEdit',
                    search: `id=${item.id}`,
                  }}>
                    <div className="right-status edit-btn">重新编辑</div>
                  </Link>
                  <div className="right-status fail">审核失败</div>
                </Fragment>
              )
            }
            {
              ((isAdmin === 1 && currentIndex === 0 && showChoose) ||currentIndex === 2) && (
                <div className="checkBox" onClick={(e) => {this.toggleCheck(index, currentIndex, e)}}>
                  {
                    item.isCheck && <Icon type="check" />
                  }
                </div>
              )
            }
            {
              currentIndex === 1 && item.state === 2 && (
                <div className="reason">失败原因：{item.reason}</div>
              )
            }
          </List.Item>
        )}
      />
      </Spin>
    )
  }
}
