import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';
import Header from "./components/header";
import * as routes from "./constants/routes";
import Home from './screens/home';
import Wellness from './screens/wellness';
import Baby from './screens/baby';
import Beauty from './screens/beauty';
import Category from './screens/category';
import Profile from './screens/profile';
import ShoppingCart from './screens/shoppingCart';
import DeliveryPayment from './screens/deliveryAndPayment';
import ReviewAndConfirmation from './screens/reviewAndConfirmation';
import Signup from './screens/signup';
import Signin from './screens/signin';
import Admin from './screens/admin';
import SearchResults from './screens/searchresults';
import Banner from './components/banner';
import withAuthentication from './components/withAuthentication';
import {Container, Row, Col, Button, ButtonGroup} from 'reactstrap';


const App = () =>
    <Router>
        <Container>
            <Header/>
            <Banner/>

            <hr/>

            <Route exact path={routes.LANDING} component={() => <Home/>}/>
            <Route path={routes.WELLNESS} component={() => <Wellness/>}/>
            <Route path={routes.BABY} component={() => <Baby/>}/>
            <Route path={routes.BEAUTY} component={() => <Beauty/>}/>
            <Route path={routes.CATEGORY} component={() => <Category/>}/>
            <Route path={routes.SHOPPING_CART} component={() => <ShoppingCart/>}/>
            <Route path={routes.DELIVERY_PAYMENT} component={() => <DeliveryPayment/>}/>
            <Route path={routes.REWVIEW_CONFIRM} component={() => <ReviewAndConfirmation/>}/>
            <Route path={routes.PROFILE} component={() => <Profile/>}/>
            <Route path={routes.SIGN_UP} component={() => <Signup/>}/>
            <Route path={routes.SIGN_IN} component={() => <Signin/>}/>
            <Route path={routes.ADMIN} component={() => <Admin/>}/>
            <Route path={routes.SEARCH_RESULTS} render={() => <SearchResults keyword={null}/>}/>


        </Container>
    </Router>

export default withAuthentication(App);