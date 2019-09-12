import React, { Component } from 'react'
import { Layout, Menu, Icon } from 'antd'
import { Link, NavLink } from 'react-router-dom'
const { SubMenu } = Menu;


export default class ChildMenu extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentIndex: '',
            currentGroup: '',
            routeArray: [
                {
                    route: '/home/carsList',
                    name: '汽车大全',
                    icon: 'read',
                    type: 1,
                    key:1
                },
                {
                    route: '/home/user',
                    name: '用户管理',
                    icon: 'user',
                    type: 1,
                    key:2

                },
                {
                    name: '素材管理',
                    icon: 'snippets',
                    type: 2,
                    key:3,
                    children: [
                        {
                            route: '/home/article',
                            name: '文章列表',
                            icon: 'article',
                            type: 1,
                            key: 4
                        },
                        {
                            route: '/home/picture',
                            name: '汽车图库',
                            icon: 'picture',
                            type: 1,
                            key: 5
                        },
                        {
                            route: '/home/video',
                            name: '视频社区',
                            icon: 'video',
                            type: 1,
                            key: 6
                        }
                    ]
                },
                {
                    route: '/dev',
                    name: '接口文档',
                    icon: 'apple',
                    type: 1,
                    key: 7
                }
            ]
        }
    }
    componentWillMount() {
        let { routeArray } = this.state
        for (let i = 0; i < routeArray.length - 1; i++) {
            if (routeArray[i].route == window.location.pathname) {
                console.log(i)
                this.setState(() => {
                    return {
                        currentGroup: `${i + 1}`,
                    }
                }, () => {
                    console.log(this.state)
                })
                

                break;
            } else {
                // console.log(i)
                if (routeArray[i].children) {
                    for (let j = 0; j < routeArray[i].children.length; j++) {
                        if (routeArray[i].children[j].route == window.location.pathname) {
                            console.log(i+1, routeArray[i].children[j].key)
                            this.setState(() => {
                                return {
                                    currentIndex: `${i + 1}`,
                                    currentGroup: `${routeArray[i].children[j].key}`
                                }
                            }, () => {
                                console.log(this.state)
                            })
                            
                            break;
                        }
                    }
                }
            }
        }
        // this.setState(() => {
        //     return {
        //         currentIndex: '2'
        //     }
        // })
    }
    render() {
        const { routeArray, currentIndex, currentGroup } = this.state
        console.log(window.location.pathname)
        return (
            <Menu defaultOpenKeys={[`${currentIndex}`]} defaultSelectedKeys={[`${currentGroup}`]} mode="inline">
                {
                    routeArray.map(item => {
                        if (item.type == 1) {
                            return (
                                <Menu.Item key={item.key}>
                                    <Icon type={item.icon}/>
                                    <Link to={item.route}>
                                        {item.name}
                                    </Link>
                                    
                                </Menu.Item>
                            )
                        } else {
                            return (
                                <SubMenu
                                key={item.key}
                                title={
                                    <span>
                                    <Icon type={item.icon} />
                                    <span>{item.name}</span>
                                    </span>
                                }
                                >
                                    {
                                        item.children.map(child => {
                                            return (
                                                <Menu.Item key={child.key}>
                                                    <Link to={child.route}>
                                                        {child.name}
                                                    </Link>
                                                </Menu.Item>
                                            )
                                        })
                                    }
                                </SubMenu>
                            )
                        }
                    })
                }
                
            </Menu>
        )
    }
}
