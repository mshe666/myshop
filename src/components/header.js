import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {
    Navbar,
    Nav,
    NavItem,
    Button,
    Glyphicon
} from 'react-bootstrap';

import * as routes from '../constants/routes';
import AuthUserContext from './AuthUserContext';
import SignOutButton from './signoutButton';
import ShoppingCart from '@material-ui/icons/ShoppingCart';


const header = () =>
    <AuthUserContext.Consumer>
        {authUser => authUser
            ? <Header_en_onAuth/>
            : <Header_en/>
        }
    </AuthUserContext.Consumer>


const Header_en_onAuth = () =>
    <Navbar>
        <Nav bsStyle="tabs">
            <NavItem href={routes.LANDING}>
                Home
            </NavItem>
            <NavItem href={routes.WELLNESS}>
                Wellness
            </NavItem>
            <NavItem href={routes.BABY}>
                Baby
            </NavItem>
            <NavItem href={routes.BEAUTY}>
                Beauty
            </NavItem>
            <NavItem href={routes.PROFILE}>
                Profile
            </NavItem>
            <NavItem href={routes.ADMIN_HOME}>
                Admin
            </NavItem>
            <NavItem href={routes.SHOPPING_CART}>
                <Glyphicon glyph="shopping-cart" />
            </NavItem>
            <NavItem>
                <SignOutButton/>
            </NavItem>
        </Nav>
    </Navbar>


const Header_en = () =>
    <Navbar>
        <Nav bsStyle="tabs">
            <NavItem href={routes.LANDING}>
                Home
            </NavItem>
            <NavItem href={routes.WELLNESS}>
                Wellness
            </NavItem>
            <NavItem href={routes.BABY}>
                Baby
            </NavItem>
            <NavItem href={routes.BEAUTY}>
                Beauty
            </NavItem>
            <NavItem href={routes.SIGN_UP}>
                Sign Up
            </NavItem>
            <NavItem href={routes.SIGN_IN}>
                Sign In
            </NavItem>

        </Nav>
    </Navbar>


export default header;