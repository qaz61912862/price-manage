import React, { Component } from 'react'
import axios from '../../utils/request'
import JSONP from 'jsonp'


export default class Dev extends Component {
    componentDidMount() {
        // JSONP('http://172.17.13.8:9090/api/phone/sso', null, (err, data) => {
        //     console.log(err)
        //     console.log(data)
        // })
        axios.get('http://172.17.13.8:9090/api/phone/sso').then((res) => {
            console.log(res)
        }).catch((err) => {
            console.log(err)
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
