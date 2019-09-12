import React, { Component } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux'

class PrivateRoute extends Component {
  render() {
    const { component: Component, loginStatus, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={(props) =>  {
          return loginStatus ? (
            <Component {...props} />
          ) : (
            <Redirect to={{
              pathname: '/login',
              state: {
                from: props.location
              }
            }}
            />
          )
        }}
      >
      </Route>
    )
  }
}

const mapState = (state) => {
  return {
    loginStatus: state.login.status
  }
}

export default connect(mapState, null)(PrivateRoute)