import React, {Component} from 'react';
import Item from '../components/item';
import PropTypes from 'prop-types';
import {Container, Row, Col, Table} from 'reactstrap';
import AuthUserContext from '../components/AuthUserContext';
import firebase from '../firebase/firebase';
import * as routes from "../constants/routes";
import {Redirect} from 'react-router';
import withAuthorization from '../components/withAuthorization';


const authCondition = (authUser) => !!authUser;


class profile extends Component {

    constructor(props) {
        super(props);


        this._loadUserInfo = this._loadUserInfo.bind(this);

    }

    _loadUserInfo = () => {
        let user = firebase.auth().currentUser;
        let currentUID = null;

        if (user != null) {
            console.log("user is not null!");
            currentUID = user.uid;
            let infoToLoad = [];

            firebase.database().ref('users').on('value', (data) => {

                    data.forEach((item) => {
                        let uid = item.child('uid').val();
                        console.log("uid = " + uid);
                        if ( uid === currentUID) {
                            console.log("enter uid === currentUID");
                            let email = item.child('email').val();
                            let fname = item.child('fname').val();
                            let lname = item.child('lname').val();
                            let mobile = item.child('mobile').val();
                            let addresses = item.child('addresses').val();
                            let cart = item.child('cart').val();
                            let orders = item.child('orders').val();

                            infoToLoad = [
                                {key: "Email", value: email},
                                {key: "First Name", value: fname},
                                {key: "Last Name", value: lname},
                                {key: "Mobile", value: mobile},
                                ];

                            console.log("infoToLoad = " + infoToLoad);

                            return (
                                infoToLoad.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.key}</td>
                                        <td>{item.value}</td>
                                    </tr>
                                ))
                            );
                        }


                    });

                }, (error => {
                    console.log("loading users error! " + error);
                })
            );

        }




    };

    render() {



        return (
            <Container>
                <Row>
                    <Col xs={12}>
                        Profile! member!
                        <Table>
                            <tbody>
                            {this._loadUserInfo()}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default withAuthorization(authCondition)(profile);
