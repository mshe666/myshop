import React, { Component } from 'react';
import Item from '../components/item';
import PropTypes from 'prop-types';
import {Container, Row, Col} from 'reactstrap';
import AuthUserContext from '../components/AuthUserContext';
import firebase from '../firebase/firebase';



class home extends Component {

    constructor(props) {
        super(props);

        this._renderContent = this._renderContent.bind(this);
    }

    _renderContent = (authUser) => {

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
            return (
                <Container>
                    <Row>
                        <Col xs={12}>
                            Welcome! member! {email} {uid}
                        </Col>
                    </Row>
                </Container>
            );
        } else {
            return (
                <Container>
                    <Row>
                        <Col xs={12}>
                            Welcome! guest!
                        </Col>
                    </Row>
                </Container>
            );
        }
    };


    render() {

        return (
            <AuthUserContext.Consumer>
                {this._renderContent}
            </AuthUserContext.Consumer>


        );
    }
}

export default home;
