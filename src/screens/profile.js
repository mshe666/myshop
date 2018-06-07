import React, { Component } from 'react';
import Item from '../components/item';
import PropTypes from 'prop-types';
import {Container, Row, Col} from 'reactstrap';
import AuthUserContext from '../components/AuthUserContext';
import firebase from '../firebase/firebase';
import * as routes from "../constants/routes";
import { Redirect } from 'react-router';


class profile extends Component {

    constructor(props) {
        super(props);

        this._checkAuth = this._checkAuth.bind(this);
    }


    _checkAuth = (authUser) => {

        let user = firebase.auth().currentUser;
        let name = "None";
        let email = "None";
        let photoUrl = "None";
        let emailVerified = "None";
        let uid = "None";

        if (user != null) {
            name = user.displayName;
            email = user.email;
            photoUrl = user.photoURL;
            emailVerified = user.emailVerified;
            uid = user.uid;
        }

        if (authUser) {
            console.log("this is an auth user!");

            return (
                <Container>
                    <Row>
                        <Col xs={12}>
                            Profile! member! {email} {uid}
                        </Col>
                    </Row>
                </Container>
            );
        } else {
            console.log("this is guest!");
            // alert("please sign in first!");
            return (
                <Redirect to={routes.SIGN_IN} />
            );
        }
    };


    render() {

        return (
            <AuthUserContext.Consumer>
                {this._checkAuth}
            </AuthUserContext.Consumer>
        );
    }
}

export default profile;
