import React, { Component, Fragment } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import PrivateRoute from '../components/PrivateRoute'
import PersonalCenter from '../page/Home/pages/PersonalCenter'
import CarsList from '../page/Home/pages/CarsList'
import User from '../page/Home/pages/User'
import UserDetail from '../page/Home/pages/UserDetail'
import Article from '../page/Home/pages/Article'
import ArticleEdit from '../page/Home/pages/ArticleEdit'
import ArticleDetail from '../page/Home/pages/ArticleDetail'
import Video from '../page/Home/pages/Video'
import Picture from '../page/Home/pages/Picture'
import Main from '../components/Main'
import Login from '../page/Login'
import Register from '../page/Register'
import PictureManage from '../page/Home/pages/PictureManage'
import Dev from '../page/Dev'
import AllView from '../page/AllView'
import NotFound from '../components/NotFound'
import {connect} from 'react-redux'






class RouterPage extends Component {
    render() {
        const { loginStatus } = this.props
        return (
            <Fragment>
                <BrowserRouter>
                    <Switch>
                        <Redirect exact from="/" to="/home/carsList" />
                        <Route path="/login" component={Login}></Route>
                        <Route path="/register" component={Register}></Route>
                        <Route path="/home" render={() => 
                            {
                                return loginStatus ? (
                                    <Main>
                                        <Switch>
                                            <PrivateRoute exact path="/home/carsList" component={CarsList}></PrivateRoute>
                                            <PrivateRoute exact path="/home/user" component={User}></PrivateRoute>
                                            <PrivateRoute exact path="/home/userDetail/:id" component={UserDetail}></PrivateRoute>
                                            <PrivateRoute exact path="/home/article" component={Article}></PrivateRoute>
                                            <PrivateRoute exact path="/home/articleEdit" component={ArticleEdit}></PrivateRoute>
                                            <PrivateRoute exact path="/home/video" component={Video}></PrivateRoute>
                                            <PrivateRoute exact path="/home/picture" component={Picture}></PrivateRoute>
                                            <PrivateRoute exact path="/home/pictureManage" component={PictureManage}></PrivateRoute>                                            
                                            
                                            <PrivateRoute exact path="/home/personalCenter" component={PersonalCenter}></PrivateRoute>
                                            <PrivateRoute exact path="/home/articleDetail/:article_id" component={ArticleDetail}></PrivateRoute>
                                            <Route component={NotFound} />
                                        </Switch> 
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
                        <Route path="/allView" component={AllView}></Route> 
                        <Route component={NotFound}/>
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