import React, {Component} from 'react';
import Item from '../components/item';
import PropTypes from 'prop-types';
import {Container, Row, Col, Table} from 'reactstrap';
import AuthUserContext from '../components/AuthUserContext';
import firebase from '../firebase/firebase';
import * as routes from "../constants/routes";
import {Redirect} from 'react-router';
import withAuthorization from '../components/withAuthorization';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {Button, Form, FormGroup, Label, Input, FormText, Badge} from 'reactstrap';
import {Link} from 'react-router-dom';


export default class editableModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: null,
            fname: null,
            lname: null,
            mobile: null,
            modal: true,

        };

        this._toggle = this._toggle.bind(this);
        this._handleChange = this._handleChange.bind(this);

    }

    _handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});

    };

    _toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    _handleSubmit = () => {
        this._toggle();
        let newUser = this.state.userData;
        let uid = newUser.uid;

        firebase.database().ref('user/' + uid).update(newUser).then(() => {
            console.log('UPDATED a user!');
        }).catch(error => {
            console.log('profile.js _editCustomerDetail: error = ' + error);
        });
    };

    render() {

        if (this.state.modal) {
            console.log("modal in modal = " + this.state.modal);
            return (
                <Modal isOpen={true} toggle={this._toggle} className={this.props.className} backdrop={false}>
                    <ModalHeader toggle={this._toggle}>Edit Profile</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this._handleSubmit}>
                            <FormGroup disabled>
                                <Label for="email">Email</Label>
                                <Input type="email" name="email" id="email" disabled
                                       value={this.state.email === null ? this.props.user.email : this.state.email}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="fname">First Name</Label>
                                <Input type="text" name="fname" id="fname"
                                       value={this.state.fname === null ? this.props.user.fname : this.state.fname}
                                       onChange={this._handleChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="lname">Last Name</Label>
                                <Input type="text" name="lname" id="lname"
                                       value={this.state.lname === null ? this.props.user.lname : this.state.lname}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="mobile">Mobile</Label>
                                <Input type="text" name="mobile" id="mobile"
                                       value={this.state.mobile === null ? this.props.user.mobile : this.state.mobile}
                                />
                            </FormGroup>

                            <Button color="primary" onClick={this._handleSubmit}>Save</Button>
                            <span>&nbsp;&nbsp;</span>
                            <Button color="secondary" onClick={this._toggle}>Cancel</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            );
        } else {
            console.log("enter second")
            return (
                <Modal isOpen={false}/>
            );
        }

    }
}