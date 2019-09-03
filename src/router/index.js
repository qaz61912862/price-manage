import React, { Component, Fragment } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Home from '../page/Home'
import Login from '../page/Login'
import List from '../page/Island/List'
import Detail from '../page/Island/Detail'




export default class RouterPage extends Component {
    render() {
        return (
            <Fragment>
                <BrowserRouter>
                    <Switch>
                        <Route path="/" exact component={Home}></Route>
                        <Route path="/login" exact component={Login}></Route>
                        <Route render={() => (
                            <Switch>
                                <Route path="/island/list" component={List}></Route>
                                <Route path="/island/detail/:id" component={Detail}></Route>
                            </Switch>   
                        )} path="/island"></Route>
                        <Redirect from="*" to="/"/>
                    </Switch>
                </BrowserRouter>
            </Fragment>
        )
    }
}
