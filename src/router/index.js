import React, { Component, Fragment } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import CarsList from '../page/Home/pages/CarsList'
import User from '../page/Home/pages/User'
import Main from '../components/Main'
import Login from '../page/Login'
import Dev from '../page/Dev'






export default class RouterPage extends Component {
    render() {
        return (
            <Fragment>
                <BrowserRouter>
                    <Switch>
                    
                        <Route path="/login" component={Login}></Route>
                        <Route path="/home" render={() => (
                            <Main>
                                <Route path="/home/carsList" exact component={CarsList}></Route>
                                <Route path="/home/user" exact component={User}></Route>
                            </Main>
                        )}></Route>
                        <Route path="/dev" component={Dev}></Route>  
                        <Redirect from="/" to="/home" />
                        <Redirect from="*" to="/home" />
                    </Switch>
                </BrowserRouter>
            </Fragment>
        )
    }
}
