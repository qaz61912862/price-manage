import React, { Component } from 'react'
import axios from 'axios'


export default class Dev extends Component {
    componentDidMount() {
        axios.get('http://localhost:8000/api/car/carList').then((res) => {
            
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
