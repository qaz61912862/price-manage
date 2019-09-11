import React, { Component, Fragment } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import CarsList from '../page/Home/pages/CarsList'
import User from '../page/Home/pages/User'
import Article from '../page/Home/pages/Article'
import Video from '../page/Home/pages/Video'
import Picture from '../page/Home/pages/Picture'
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
                                <Route path="/home/article" exact component={Article}></Route>
                                <Route path="/home/video" exact component={Video}></Route>
                                <Route path="/home/picture" exact component={Picture}></Route>
                            </Main>
                        )}></Route>
<<<<<<< HEAD
                        <Route path="/dev" component={Dev}></Route>  
                        <Redirect from="/" to="/home" />
                        <Redirect from="*" to="/home" />
=======
                        <Route path="/dev" component={Dev}></Route>   
                        <Redirect from="/" to="/home"/>
                        <Redirect from="*" to="/home"/>
>>>>>>> 9197ec99c1ba127ee4309ae786df447e943a9f48
                    </Switch>
                </BrowserRouter>
            </Fragment>
        )
    }
}
