import React, {Component} from 'react';
import {Button, Form, FormGroup, Label, Input, FormText, Container, Row, Col} from 'reactstrap';
import firebase from "../firebase/firebase";
import * as routes from "../constants/routes";
import { Redirect } from 'react-router';


export default class signup extends React.Component {

    constructor(props) {
        super();

        this.state = {
            email: null,
            password: null,
            cPassword: null,
            toHome: false,
        };

        this._handleChange = this._handleChange.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
        this._createAccount = this._createAccount.bind(this);
        this._createUserInDB = this._createUserInDB.bind(this);
    }


    _handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };

    _handleSubmit = () => {
        let email = this.state.email;
        let password = this.state.password;
        let cPassword = this.state.cPassword;

        if (password != cPassword) {
            alert("Two passwords are different!");
        } else {
            this._createAccount(email, password);
            this.setState({
                toHome: true
            });
            // alert("sign up successfully!");
            // this._createUserInDB();


        }

    };

    componentDidMount() {
        firebase.auth().onAuthStateChanged(authUser => {
            authUser
                ? this._createUserInDB()
                : null;
        });
    }



    _createUserInDB = () => {

        let currentUser = firebase.auth().currentUser;
        let email = currentUser.email;
        let uid = currentUser.uid;

        let user = {uid: uid, email: email}

        // alert("user email = " + email);s
        //
        firebase.database().ref('users/' + uid).set(user).then(() => {
            console.log('INSERTED a new user!');
        }).catch(error => {
            console.log('signup.js _editCustomerDetail: error = ' + error);
        });
    };

    _createAccount = (email, password) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            let errorCode = error.code;
            let errorMessage = error.message;
            alert("create account error = " + errorCode + "," + errorMessage);
            // ...
        });
    };


    render() {
        if (this.state.toHome) {
            return <Redirect to={routes.LANDING} />
        }

        return (
            <Container>
                <Row>
                    <Col xs={6}>
                        <div>
                            <div>
                                {/*<FormGroup>*/}
                                    {/*{this._verifyRecaptcha()}*/}
                                {/*</FormGroup>*/}
                                <FormGroup>
                                    {/*<Label for="mobile">Mobile Number</Label>*/}
                                    {/*<span>&nbsp;&nbsp;</span>*/}
                                    {/*<Input type="select" name="prefix" id="prefix" onChange={this._handleChange}>*/}
                                        {/*<option key={"defaultPrefix"}>{"select prefix"}</option>*/}
                                        {/*<option key={"cn"}>{"+86"}</option>*/}
                                        {/*<option key={"nz"}>{"+64"}</option>*/}

                                    {/*</Input>*/}

                                    <Label for="mobile">Email</Label>
                                    <span>&nbsp;&nbsp;</span>
                                    <Input type="email" name="email" id="email" onChange={this._handleChange} />

                                    <Label for="password">Password</Label>
                                    <Input type="password" name="password" id="password" placeholder="enter password" onChange={this._handleChange}/>

                                    <Label for="cPassword">Confirm Password</Label>
                                    <Input type="password" name="cPassword" id="cPassword" placeholder="enter password again" onChange={this._handleChange}/>

                                    <br/>
                                    <Button onClick={this._handleSubmit}>Sign Up</Button>
                                </FormGroup>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>

        );

    }
}
