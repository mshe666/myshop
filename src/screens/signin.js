import React, {Component} from 'react';
import {Button, Form, FormGroup, Label, Input, FormText, Container, Row, Col} from 'reactstrap';
import firebase from "../firebase/firebase";
import * as routes from '../constants/routes';
import { Redirect } from 'react-router';


export default class signin extends React.Component {

    constructor(props) {
        super();

        this.state = {
            email: null,
            password: null,
            authUser: null,
            toHome: false,
        };

        this._handleChange = this._handleChange.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
        this._validateAccount = this._validateAccount.bind(this);
    }


    _handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };

    _handleSubmit = () => {
        let email = this.state.email;
        let password = this.state.password;

        this._validateAccount(email, password);
        alert("sign in successfully!");
        this.setState({
            toHome: true
        });

    };

    _validateAccount = (email, password) => {
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            let errorCode = error.code;
            let errorMessage = error.message;
            alert("validate account error = " + errorCode + "," + errorMessage);
            // ...
        });

    };


    render() {
        // let identifier = this.state.authUser === null ? "Null" : this.state.authUser.toJSON();

        // console.log("authUser = " + identifier);

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


                                    <br/>
                                    <Button onClick={this._handleSubmit}>Sign In</Button>
                                </FormGroup>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>

        );

    }
}
