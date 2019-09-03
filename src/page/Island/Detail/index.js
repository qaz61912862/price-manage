import React, { Component } from 'react'

export default class Detail extends Component {
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
