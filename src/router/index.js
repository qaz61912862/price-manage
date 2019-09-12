import React, { Component, Fragment } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import PrivateRoute from '../components/PrivateRoute'
import CarsList from '../page/Home/pages/CarsList'
import User from '../page/Home/pages/User'
import Article from '../page/Home/pages/Article'
import Video from '../page/Home/pages/Video'
import Picture from '../page/Home/pages/Picture'
import Main from '../components/Main'
import Login from '../page/Login'
import Register from '../page/Register'
import Dev from '../page/Dev'
import {connect} from 'react-redux'






class RouterPage extends Component {
    render() {
        const { loginStatus } = this.props
        return (
            <Fragment>
                <BrowserRouter>
                    <Switch>
                    
                        <Route path="/login" component={Login}></Route>
                        <Route path="/register" component={Register}></Route>
                        <Route path="/home" render={() => 
                            {
                                return loginStatus ? (
                                    <Main>
                                        <PrivateRoute path="/home/carsList" exact component={CarsList}></PrivateRoute>
                                        <PrivateRoute path="/home/user" exact component={User}></PrivateRoute>
                                        <PrivateRoute path="/home/article" exact component={Article}></PrivateRoute>
                                        <PrivateRoute path="/home/video" exact component={Video}></PrivateRoute>
                                        <PrivateRoute path="/home/picture" exact component={Picture}></PrivateRoute>
                                    </Main>
                                ) : (
                                    <Redirect to={{
                                        pathname: '/login',
                                    }}
                                    />
                                )
                            }
                            
                        }></Route>
                        <Route path="/dev" component={Dev}></Route>  
                        <Redirect from="/" to="/home" />
                        <Redirect from="*" to="/home" />
                    </Switch>
                </BrowserRouter>
            </Fragment>
        )
    }
}

const mapState = (state) => {
    return {
      loginStatus: state.login.status
    }
  }

export default connect(mapState, null)(RouterPage)