import React, { Component, Fragment } from 'react'
import { getArticleDetail } from '../../../../api/api'
import axios from '../../../../utils/request'
import { Avatar } from 'antd'
import { timestampToTime } from '../../../../utils/common'
import NotFound from '../../../../components/NotFound'
import './index.less'

export default class ArticleDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      detail: '',
      isFinish: false
    }
  }
  componentDidMount() {
    let info = {
      id: this.props.match.params.article_id
    }
    axios.post(getArticleDetail, info).then((res) => {
      this.setState({
        isFinish: true
      })
      if (res.data.errno == 0) {
        this.setState(() => {
          return {
            detail: res.data.data
          }
        })
      }
    })
  }
  render() {
    const { detail, isFinish } = this.state
    return (
      <Fragment>
        {
          isFinish && (
            detail !== '' ? ((
              <div className="acticleDetail">
                <h1 className="article-title">{detail.title}</h1>
                <div className="article-info">
                  {
                    detail.avatar === '' || detail.avatar === null || detail.avatar === 'null' ? (
                      <Avatar size={40} icon="user"/>
                    ) : (
                      <Avatar src={detail.avatar} size={40}/>
                    )
                  }
                  <p className="author">{detail.author}</p>
                  <p className="author">{timestampToTime(detail.createTime)}</p>
                </div>
                <div className="article-content" dangerouslySetInnerHTML={{ __html: detail.content }} >
                </div>
              </div>
            )) : (
              <NotFound />
            )
          )
        }
      </Fragment>
    )
  }
}
