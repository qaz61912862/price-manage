import React, { Component } from 'react'
import { Layout, Menu, Icon } from 'antd'
import { Link } from 'react-router-dom'
const { SubMenu } = Menu;


export default class ChildMenu extends Component {
    render() {
        return (
            <Menu defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key="1">
                    <Icon type="read" />
                    <Link to="/home/carsList">
                        汽车大全
                    </Link>
                    
                </Menu.Item>
                <Menu.Item key="2">
                    <Icon type="user" />
                    <Link to="/home/user">
                        用户管理
                    </Link>
                </Menu.Item>
                <SubMenu
                key="sub1"
                title={
                    <span>
                    <Icon type="snippets" />
                    <span>素材管理</span>
                    </span>
                }
                >
                    <Menu.Item key="3">文章列表</Menu.Item>
                    <Menu.Item key="4">汽车图库</Menu.Item>
                    <Menu.Item key="5">视频社区</Menu.Item>
                </SubMenu>
                <Menu.Item key="6">
                    <Icon type="apple" />
                    <Link to="/dev">
                        接口文档
                    </Link>
                    
                </Menu.Item>
            </Menu>
        )
    }
}
