import React, { Component } from 'react'
import { Button, Row, Icon } from 'antd';
import './index.less'
import { CSSTransition } from 'react-transition-group'
import { Link } from 'react-router-dom'

export default class ManageButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showManageGroup: false
    }
  }
  goGroup = () => {
    this.setState(() => {
      return {
        showManageGroup: true
      }
    }, () => {
      this.props.showBtns()
    })
  }
  goBack = () => {
    this.setState(() => {
      return {
        showManageGroup: false
      }
    })
  }
  render() {
    let { showManageGroup } = this.state
    let { isAdmin, currentIndex } = this.props
    return (
      <div>
        <Row>
            {
              currentIndex === 0 && isAdmin === 1 && !showManageGroup && (
                <CSSTransition
              in={!showManageGroup}
              timeout={2000}
              classNames='fade'
              appear={true}
            >
            <Button className="manage" type="primary" onClick={this.goGroup}>管理</Button>                
            </CSSTransition>
              )
            }
            {
              showManageGroup && (
                <CSSTransition
              in={showManageGroup}
              timeout={2000}
              classNames='fade'
              appear={true}
            >
                <div className="btn-group">
                <Icon type="arrow-left" onClick={this.goBack}/>
                <Button className="manage" type="primary" onClick={this.props.pulltoTop}>置顶</Button>
                <Button className="manage delete" type="danger" onClick={this.props.deleteArticle}>删除</Button>

                </div>
                </CSSTransition>
              )
            }
            <Link to="/home/articleEdit">
              <Button className="manage create" type="primary">发表新文章</Button> 
            </Link>
        </Row>
      </div>
    )
  }
}
