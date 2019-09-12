import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addTest } from './store/actionCreators'
import axios from '../../utils/request'

class Home extends Component {
    
    render() {
        return (
            <div>
                {this.props.test}
                <button onClick={(e) => this.testClick(123,e)}>click</button>
            </div>
        )
    }
    testClick(val) {
        console.log(val)
        this.props.addTest2(val)
    }
}
const mapState = (state) => {
    return {
        test: state.home.test
    }
}
const mapDispatch = (dispatch) => {
    return {
        addTest2(val) {
            dispatch(addTest(val))
        }
    }
}

export default connect(mapState, mapDispatch)(Home)