import React, {Component} from 'react';
import Home from '../screens/home';
import HomeCn from '../screens/home_cn';
import Wellness from '../screens/wellness';
import Baby from '../screens/baby';
import Beauty from '../screens/beauty';
import Makeup from '../screens/makeup';
import Category from '../screens/category';
import Profile from '../screens/profile';
import ShoppingCart from '../screens/shoppingCart';
import Signup from '../screens/signup';
import Signin from '../screens/signin';
import Admin from '../screens/admin';
import SearchResults from '../screens/searchresults';
import * as routes from '../constants/routes';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';import {Container} from 'reactstrap';

class main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isCn: this.props.lan
        };

        this._renderRoute = this._renderRoute.bind(this);
    }

    _renderRoute = () => {

        if (!this.props.lan) {
            return (
                <div>
                    <Route exact path={routes.LANDING} component={() => <Home />}/>
                    <Route path={routes.WELLNESS} component={() => <Wellness />}/>
                    <Route path={routes.BABY} component={() => <Baby/>}/>
                    <Route path={routes.BEAUTY} component={() => <Beauty/>}/>
                    <Route path={routes.CATEGORY} component={() => <Category/>}/>
                    <Route path={routes.PROFILE} component={() => <Profile/>}/>
                    <Route path={routes.SIGN_UP} component={() => <Signup/>}/>
                    <Route path={routes.SIGN_IN} component={() => <Signin/>}/>
                    <Route path={routes.ADMIN} component={() => <Admin/>}/>
                    <Route path={routes.SEARCH_RESULTS} render={() => <SearchResults keyword={null}/>}/>
                </div>
            )
        }else {
            return (
                <Router>
                    <Route exact path='/cn' component={HomeCn}/>
                    <Route path='/wellness' component={Wellness}/>
                    <Route path='/baby' component={Baby}/>
                    <Route path='/beauty' component={Beauty}/>
                    <Route path='/category' component={Category}/>
                    <Route path='/profile' component={Profile}/>
                    <Route path='/signup' component={Signup}/>
                    <Route path='/signin' component={Signin}/>
                    <Route path='/admin' component={Admin}/>
                    <Route path='/searchresults' render={() => <SearchResults keyword={null}/>}/>
                </Router>
            )
        }

    };

    render() {

        let authUser = this.props.authUser;

        console.log("render main.js with authUser = " + this.props.authUser);

        return (
            <div>
                <Route exact path={routes.LANDING} component={() => <Home/>}/>
                <Route path={routes.WELLNESS} component={() => <Wellness/>}/>
                <Route path={routes.BABY} component={() => <Baby/>}/>
                <Route path={routes.BEAUTY} component={() => <Beauty/>}/>
                <Route path={routes.CATEGORY} component={() => <Category/>}/>
                <Route path={routes.PROFILE} component={() => <Profile/>}/>
                <Route path={routes.SHOPPING_CART} component={() => <ShoppingCart/>}/>
                <Route path={routes.SIGN_UP} component={() => <Signup/>}/>
                <Route path={routes.SIGN_IN} component={() => <Signin/>}/>
                <Route path={routes.ADMIN} component={() => <Admin/>}/>
                <Route path={routes.SEARCH_RESULTS} render={() => <SearchResults keyword={null}/>}/>
            </div>

        );
    }
}

export default main;
