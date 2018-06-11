import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {
    Nav,
    NavItem,
    NavLink,
    Button,
} from 'reactstrap';

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
    <Nav tabs>
        <NavItem>
            <NavLink href={routes.LANDING}>Home</NavLink>
        </NavItem>
        <NavItem>
            <NavLink href={routes.WELLNESS}>Wellness</NavLink>
        </NavItem>
        <NavItem>
            <NavLink href={routes.BABY}>Baby</NavLink>
        </NavItem>
        <NavItem>
            <NavLink href={routes.BEAUTY}>Beauty</NavLink>
        </NavItem>
        <NavItem>
            <NavLink href={routes.PROFILE}>Profile</NavLink>
        </NavItem>
        <NavItem>
            <NavLink href={routes.SIGN_UP}>Sign Up</NavLink>
        </NavItem>
        <NavItem>
            <NavLink href={routes.SIGN_IN}>Sign In</NavLink>
        </NavItem>
        <NavItem>
            <NavLink href={routes.ADMIN_HOME}>Admin</NavLink>
        </NavItem>
        <NavItem>
            <NavLink href={routes.SHOPPING_CART}><Button color="primary"><ShoppingCart/></Button></NavLink>
        </NavItem>
        <NavItem>
            <SignOutButton/>
        </NavItem>
    </Nav>


const Header_en = () =>
    <Nav tabs>
        <NavItem>
            <NavLink href={routes.LANDING}>Home</NavLink>
        </NavItem>
        <NavItem>
            <NavLink href={routes.WELLNESS}>Wellness</NavLink>
        </NavItem>
        <NavItem>
            <NavLink href={routes.BABY}>Baby</NavLink>
        </NavItem>
        <NavItem>
            <NavLink href={routes.BEAUTY}>Beauty</NavLink>
        </NavItem>
        <NavItem>
            <NavLink href={routes.SIGN_UP}>Sign Up</NavLink>
        </NavItem>
        <NavItem>
            <NavLink href={routes.SIGN_IN}>Sign In</NavLink>
        </NavItem>
        <NavItem>
            <SignOutButton/>
        </NavItem>
    </Nav>


export default header;