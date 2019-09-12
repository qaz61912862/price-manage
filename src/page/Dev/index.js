import React, { Component } from 'react'
import axios from '../../utils/request'


export default class Dev extends Component {
    componentDidMount() {
        axios.get('http://localhost:4000/api/car/list').then((res) => {
            
        })
    }
    render() {
        return (
            <div>
                我是接口文档
            </div>
        )
    }
}
