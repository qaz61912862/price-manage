import React, { Component } from 'react'
import axios from '../../../../utils/request'
import { getAllBrand } from '../../../../api/api'

export default class Picture extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [
                {
                    id: 1,
                    name: 'xxx',
                    children: [
                        {
                            child_id: 1,
                            child_name: 'yyy',
                            array: [
                                {
                                    xxx_id: 1
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    }
    componentDidMount() {
        axios.get(getAllBrand).then((res) => {
            console.log(res)
        })
    }
    render() {
        return (
            <div>
                Picture
            </div>
        )
    }
}
