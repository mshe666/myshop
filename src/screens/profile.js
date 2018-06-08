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
import EditableModal from '../components/editableModal';




const authCondition = (authUser) => !!authUser;


class profile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            infoToLoad: [],
            modalEditInfo: false,
            modalAddNewAdd: false,
            modalEditAdd: false,
            indexOfAddToEdit: null,
            toRenderTable: false,
            toRenderAddresses: false,
            currentUID: null,
            email: null,
            fname: null,
            lname: null,
            mobile: null,
            addresses: [],
            cart: [],
            orders: [],
            newAddress: {},

        };


        this._loadUserInfo = this._loadUserInfo.bind(this);
        this._renderInfo = this._renderInfo.bind(this);
        // this._toggle = this._toggle.bind(this);
        this._handleChange = this._handleChange.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
        this._addNewAddress = this._addNewAddress.bind(this);
        this._editAddress = this._editAddress.bind(this);
        this._handelAddressChange = this._handelAddressChange.bind(this);

    }

    _loadUserInfo = () => {
        let user = firebase.auth().currentUser;
        let currentUID = user.uid;
        let infoToLoad = [];
        firebase.database().ref('users/' + currentUID).on('value', (data) => {
                let uid = data.child('uid').val();
                // console.log("uid = " + uid);
                let email = data.child('email').val() === null ? "" : data.child('email').val();
                let fname = data.child('fname').val() === null ? "" : data.child('fname').val();
                let lname = data.child('lname').val() === null ? "" : data.child('lname').val();
                let mobile = data.child('mobile').val() === null ? "" : data.child('mobile').val();
                let addresses = data.child('addresses').val() === null ? [] : data.child('addresses').val();
                let cart = data.child('cart').val() === null ? [] : data.child('cart').val();
                let orders = data.child('orders').val() === null ? [] : data.child('orders').val();

                let user = {
                    uid: currentUID,
                    email: email,
                    fname: fname,
                    lname: lname,
                    mobile: mobile,
                    addresses: addresses,
                    cart: cart,
                    orders: orders,
                };

                infoToLoad = [
                    {key: "Email", value: email},
                    {key: "First Name", value: fname},
                    {key: "Last Name", value: lname},
                    {key: "Mobile", value: mobile},
                ];
                // console.log("infoToLoad = " + infoToLoad);

                this.setState({
                    infoToLoad: infoToLoad,
                    currentUID: currentUID,
                    email: email,
                    fname: fname,
                    lname: lname,
                    mobile: mobile,
                    addresses: addresses,
                    cart: cart,
                    orders: orders,
                    toRenderTable: true,
                    toRenderAddresses: true
                })
            });

    };

    _toggle = (modalNo) => {
        if (modalNo === 1) {
            this.setState({
                modalEditInfo: !this.state.modalEditInfo
            });
        } else if (modalNo === 2) {
            this.setState({
                modalAddNewAdd: !this.state.modalAddNewAdd
            });
        } else if (modalNo === 3) {
            this.setState({
                modalEditAdd: !this.state.modalEditAdd
            });
        }

    };

    _handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});

    };

    _handelAddressChange = (event) => {

        let statusCopy = Object.assign({}, this.state);
        let inputName = event.target.name;
        let inputValue = event.target.value;

        statusCopy.newAddress[inputName] = inputValue;
        this.setState({statusCopy});

        // console.log(this.state.newAddress);

    };

    _onClickEditAddress = (item) => {

        // console.log("index in onClick = " + this.state.addresses.indexOf(item));

        this.setState({
            indexOfAddToEdit: this.state.addresses.indexOf(item)
        });

        let itemToEdit = {
            fname_edit: item.fname,
            lname_edit: item.lname,
            mobile_edit: item.mobile,
            address_edit: item.address,
        };

        let newAddress = Object.assign({}, this.state.newAddress);    //creating copy of object
        newAddress = itemToEdit;                        //updating value
        this.setState({newAddress});

        this._toggle(3);

    };

    _handleSubmit = () => {
        this._toggle(1);
        let uid = this.state.currentUID;

        let newUser = {
            uid: this.state.currentUID,
            email: this.state.email,
            fname: this.state.fname,
            lname: this.state.lname,
            mobile: this.state.mobile,
            addresses: this.state.addresses,
            cart: this.state.cart,
            orders: this.state.orders,
        };

        firebase.database().ref('users/' + uid).update(newUser).then(() => {
            console.log('UPDATED a user!');
        }).catch(error => {
            console.log('profile.js _handleSubmit: error = ' + error);
        });
    };

    _renderInfo = () => {

        return (
            this.state.infoToLoad.map((item, index) => (
                <tr key={index}>
                    <td>{item.key}</td>
                    <td>{item.value}{"       "}
                        {item.key === "Email" ? null : <Button style={{float: "right"}} size={"sm"} color={"primary"} onClick={this._toggle.bind(this, 1)}>edit</Button>}
                    </td>

                    <Modal isOpen={this.state.modalEditInfo} toggle={this._toggle.bind(this, 1)} className={this.props.className} backdrop={false}>
                        <ModalHeader toggle={this._toggle.bind(this, 1)}>Edit Profile</ModalHeader>
                        <ModalBody>
                            <Form onSubmit={this._handleSubmit}>
                                <FormGroup disabled>
                                    <Label for="email">Email</Label>
                                    <Input type="email" name="email" id="email" disabled
                                           value={this.state.email}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="fname">First Name</Label>
                                    <Input type="text" name="fname" id="fname"
                                           value={this.state.fname}
                                           onChange={this._handleChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="lname">Last Name</Label>
                                    <Input type="text" name="lname" id="lname"
                                           value={this.state.lname}
                                           onChange={this._handleChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="mobile">Mobile</Label>
                                    <Input type="text" name="mobile" id="mobile"
                                           value={this.state.mobile}
                                           onChange={this._handleChange}
                                    />
                                </FormGroup>

                                <Button color="primary" onClick={this._handleSubmit}>Save</Button>
                                <span>&nbsp;&nbsp;</span>
                                <Button color="secondary" onClick={this._toggle.bind(this, 1)}>Cancel</Button>
                            </Form>
                        </ModalBody>
                    </Modal>
                </tr>
            ))
        )
    };

    _renderAdd = () => {

        return (
            this.state.addresses.map((item, index) => (
                <tr key={index}>
                    <td>{this.state.addresses.indexOf(item) + 1}</td>
                    <td>{item.fname}</td>
                    <td>{item.lname}</td>
                    <td>{item.mobile}</td>
                    <td>{item.address}
                        <Button style={{float: "right"}} size={"sm"} color={"primary"}
                                onClick={this._onClickEditAddress.bind(this, item)}>edit</Button>
                    </td>
                    <Modal isOpen={this.state.modalEditAdd} toggle={this._toggle.bind(this, 3)} className={this.props.className} backdrop={false}>
                        <ModalHeader toggle={this._toggle.bind(this, 3)}>Edit Address</ModalHeader>
                        <ModalBody>
                            <Form>
                                <FormGroup>
                                    <Label for="fname_edit">First Name</Label>
                                    <Input type="text" name="fname_edit" id="fname_edit"
                                           value={this.state.newAddress.fname_edit}
                                           onChange={this._handelAddressChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="lname_edit">Last Name</Label>
                                    <Input type="text" name="lname_edit" id="lname_edit"
                                           value={this.state.newAddress.lname_edit}
                                           onChange={this._handelAddressChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="mobile_edit">Mobile</Label>
                                    <Input type="text" name="mobile_edit" id="mobile_edit"
                                           value={this.state.newAddress.mobile_edit}
                                           onChange={this._handelAddressChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="address_edit">Address</Label>
                                    <Input type="text" name="address_edit" id="address_edit"
                                           value={this.state.newAddress.address_edit}
                                           onChange={this._handelAddressChange}
                                    />
                                </FormGroup>

                                <Button color="primary" onClick={this._editAddress.bind(this)}>Save</Button>
                                <span>&nbsp;&nbsp;</span>
                                <Button color="secondary" onClick={this._toggle.bind(this, 3)}>Cancel</Button>
                            </Form>
                        </ModalBody>
                    </Modal>
                </tr>
            ))
        )

    };

    _addNewAddress = () => {

        this._toggle(2);

        let uid = this.state.currentUID;
        let address = this.state.newAddress;
        let addressToAdd = {
            fname: address.fname_add,
            lname: address.lname_add,
            mobile: address.mobile_add,
            address: address.address_add
        };

        let currentAddresses = this.state.addresses;
        currentAddresses.push(addressToAdd);

        firebase.database().ref('users/' + uid + "/addresses").update(currentAddresses).then(() => {
            console.log('UPDATED addresses!');
        }).catch(error => {
            console.log('profile.js _addNewAddress: error = ' + error);
        });


    };

    _editAddress = () => {
        this._toggle(3);

        let uid = this.state.currentUID;
        let address = this.state.newAddress;
        let addressToEdit = {
            fname: address.fname_edit,
            lname: address.lname_edit,
            mobile: address.mobile_edit,
            address: address.address_edit
        };

        let currentAddresses = this.state.addresses;

        // console.log("index = " + this.state.indexOfAddToEdit);

        currentAddresses[this.state.indexOfAddToEdit] = addressToEdit;

        // console.log("after edit " + currentAddresses[this.state.indexOfAddToEdit].fname);

        firebase.database().ref('users/' + uid + "/addresses").update(currentAddresses).then(() => {
            // console.log('UPDATED one address!');
        }).catch(error => {
            console.log('profile.js _editAddress: error = ' + error);
        });
    };

    componentDidMount() {
        this._loadUserInfo();

    }


    render() {

        return (
            <Container>
                <Row>
                    <h5>Customer Detail</h5>
                </Row>
                <Row>
                    <Col xs={12}>
                        <Table>
                            <tbody>
                            {this.state.toRenderTable ? this._renderInfo() : null}
                            </tbody>
                        </Table>
                        <hr/>
                    </Col>
                </Row>
                <Row>
                    <h5>Address</h5>
                    <span>&nbsp;&nbsp;</span>
                    <Button size={'sm'} color={"primary"} onClick={this._toggle.bind(this, 2)}>Add New</Button>
                    <Modal isOpen={this.state.modalAddNewAdd} toggle={this._toggle.bind(this, 2)} className={this.props.className} backdrop={false}>
                        <ModalHeader toggle={this._toggle.bind(this, 2)}>Add New Address</ModalHeader>
                        <ModalBody>
                            <Form>
                                <FormGroup>
                                    <Label for="fname_add">First Name</Label>
                                    <Input type="text" name="fname_add" id="fname_add"
                                           value={this.state.newAddress.fname_add}
                                           onChange={this._handelAddressChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="lname_add">Last Name</Label>
                                    <Input type="text" name="lname_add" id="lname_add"
                                           value={this.state.newAddress.lname_add}
                                           onChange={this._handelAddressChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="mobile_add">Mobile</Label>
                                    <Input type="text" name="mobile_add" id="mobile_add"
                                           value={this.state.newAddress.mobile_add}
                                           onChange={this._handelAddressChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="address_add">Address</Label>
                                    <Input type="text" name="address_add" id="address_add"
                                           value={this.state.newAddress.address_add}
                                           onChange={this._handelAddressChange}
                                    />
                                </FormGroup>

                                <Button color="primary" onClick={this._addNewAddress}>Save</Button>
                                <span>&nbsp;&nbsp;</span>
                                <Button color="secondary" onClick={this._toggle.bind(this, 2)}>Cancel</Button>
                            </Form>
                        </ModalBody>
                    </Modal>
                </Row>
                <Row>
                    <Col xs={12}>
                        <Table>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Mobile</th>
                                <th>Address</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.toRenderAddresses ? this._renderAdd() : null}
                            </tbody>
                        </Table>
                        <hr/>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default withAuthorization(authCondition)(profile);
