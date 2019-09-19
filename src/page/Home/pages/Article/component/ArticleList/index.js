import React, { Component, Fragment } from 'react'
import './index.less'
import { List, Avatar, Icon } from 'antd';

export default class ArticleList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      articleList: [
        {
          id: 1,
          authorId: 3,
          author: 'Hanson',
          title: '生产车载显示器玻璃 旭硝子在中国建厂',
          content: 'xxx',
          avatar: '',
          article_img: '',
          createTime: 1412412412
        }

      ]
    }
  }
  render() {
    const { articleList } = this.state
    return (
      <Fragment>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: page => {
            console.log(page);
          },
          pageSize: 3,
        }}
        dataSource={articleList}
        footer={
          <div>
            <b>ant design</b> footer part
          </div>
        }
        renderItem={item => (
          <List.Item
            key={item.title}
            extra={
              <img
                width={272}
                alt="logo"
                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
              />
            }
          >
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={<a href="#">{item.title}</a>}
              description={item.createTime}
            />
            {item.content}
          </List.Item>
        )}
      />
      </Fragment>
    )
  }
}
