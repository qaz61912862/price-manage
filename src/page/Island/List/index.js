import React, { Component } from 'react'

export default class List extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [
                {
                    name: '要爱岛',
                    id: 1
                },
                {
                    name: '格格岛',
                    id: 2
                }
            ]
        }
    }
    render() {
        return (
            <div>
                <ul>
                    {
                        this.state.list.map((item, index) => {
                            return (<li key={index}>{item.name}</li>)
                        })
                    }
                </ul>
            </div>
        )
    }
}
