import React, { Component, Fragment } from 'react'
import './index.less'
import { List, Avatar, Icon, Spin } from 'antd';
import { timestampToTime } from '../../../../../../utils/common'

export default class ArticleList extends Component {
  toggleCheck = (index) => {
    this.props.changeCheck(index)
    // console.log(this.props.articleList[index])
    // this.props.articleList[index].isCheck = !this.props.articleList[index].isCheck
  }
  render() {
    const { articleList, currentIndex, isFinsh } = this.props
    return (
      <Spin tip="Loading..." spinning={!isFinsh}>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: page => {
            console.log(page);
          },
          pageSize: 4,
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
              <img
                width={272}
                alt="logo"
                src={item.article_img}
              />
            }
          >
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={<a href="#">{item.title}</a>}
              description={`${item.author} 发布于 ${timestampToTime(item.createTime)}`}
            />
            {item.list_show_text}
            {
              currentIndex !== 0 && item.state == 0 && <div className="right-status check">审核中</div>
            }
            {
              currentIndex !== 0 && item.state == 1 && <div className="right-status send">已发布</div>
            }
            {
              currentIndex !== 0 && item.state == 2 && <div className="right-status fail">审核失败</div>
            }
            {
              currentIndex == 2 && (
                <div className="checkBox" onClick={(e) => {this.toggleCheck(index, e)}}>
                  {
                    item.isCheck && <Icon type="check" />
                  }
                </div>
              )
            }
          </List.Item>
        )}
      />
      </Spin>
    )
  }
}
