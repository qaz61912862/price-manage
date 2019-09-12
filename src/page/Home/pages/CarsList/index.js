import React, { Component } from 'react'
import axios from '../../../../utils/request'

export default class CarsList extends Component {
    componentDidMount() {
        axios.get('http://localhost:4000/api/user/userInfo').then((res) => {
            console.log(res)
        })
    }
    render() {
        return (
            <div>
                carsList
            </div>
        )
    }
}
