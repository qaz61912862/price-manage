import React, { Component } from 'react'

export default class Detail extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        // console.log(this.props.match.params.id)
    }
    render() {
        const id = this.props.match.params.id
        return (
            <div>
                {id}
            </div>
        )
    }
}
