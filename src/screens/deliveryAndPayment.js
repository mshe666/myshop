import React from 'react';
import firebase from "../firebase/firebase";
import {Table} from 'reactstrap';
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {Container, Row, Col} from 'reactstrap';
import {ProgressBar, Button, Form, FormGroup, Label, FormControl, Radio, ControlLabel} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import * as routes from "../constants/routes";
import item from "../components/item";
import {
    Card, CardText, CardBody, CardHeader,
} from 'reactstrap';

export default class deliveryAndPayment extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            uid: null,
            addresses: null,
            toRenderAddresses: false,
            indexOfAddToEdit: null,
            modalEditAdd: false,
            newAddress: {},
            addressToDisplay: {},
        };

        this._loadUserInfo = this._loadUserInfo.bind(this);
        this._renderAddresses = this._renderAddresses.bind(this);
        this._handleChange = this._handleChange.bind(this);
        this._handelAddressChange = this._handelAddressChange.bind(this);
        this._addNewAddress = this._addNewAddress.bind(this);
        this._editAddress = this._editAddress.bind(this);
    }

    _loadUserInfo = () => {
        let user = firebase.auth().currentUser;
        if (user != null) {
            let currentUID = user.uid;
            firebase.database().ref('users/' + currentUID).on('value', (data) => {
                let addresses = data.child('addresses').val() === null ? [] : data.child('addresses').val();

                this.setState({
                    uid: currentUID,
                    addresses: addresses,
                    toRenderAddresses: true,

                });

            });
        }

    };

    _onClickEditAddress = (item) => {

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

    _editAddress = () => {
        this._toggle(3);

        let uid = this.state.uid;
        let address = this.state.newAddress;
        let addressToEdit = {
            fname: address.fname_edit,
            lname: address.lname_edit,
            mobile: address.mobile_edit,
            address: address.address_edit
        };

        let currentAddresses = this.state.addresses;


        currentAddresses[this.state.indexOfAddToEdit] = addressToEdit;

        firebase.database().ref('users/' + uid + "/addresses").update(currentAddresses).then(() => {
            // console.log('UPDATED one address!');
        }).catch(error => {
            console.log('profile.js _editAddress: error = ' + error);
        });
    };

    _handelAddressChange = (event) => {

        let statusCopy = Object.assign({}, this.state);
        let inputName = event.target.name;
        let inputValue = event.target.value;

        statusCopy.newAddress[inputName] = inputValue;
        this.setState({statusCopy});

    };

    _handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
        console.log(event.target.name, event.target.value, event.target.checked);
        console.log(this.state.addressToDisplay)

    };

    _handelSelectAddress = (item) => {
        this.setState({
            addressToDisplay: item,
            addressFrom: null,
        });
    };

    _addNewAddress = () => {

        let uid = this.state.uid;
        let address = this.state.newAddress;

        if (address.fname_add && address.lname_add && address.mobile_add && address.address_add) {
            let addressToAdd = {
                fname: address.fname_add,
                lname: address.lname_add,
                mobile: address.mobile_add,
                address: address.address_add
            };

            let currentAddresses = this.state.addresses;
            console.log("before", currentAddresses);
            currentAddresses.push(addressToAdd);
            console.log("after", currentAddresses);

            firebase.database().ref('users/' + uid + "/addresses").set(currentAddresses).then(() => {
                console.log('UPDATED addresses!');
                this.setState({
                    newAddress: {},
                    addressFrom: null,
                    addressToDisplay: addressToAdd,
                });
            }).catch(error => {
                console.log('profile.js _addNewAddress: error = ' + error);
            });

        } else {

            alert("Address information cannot be empty!");

        }

    };

    _toggle = (modalNo) => {

        if (modalNo === 3) {
            this.setState({
                modalEditAdd: !this.state.modalEditAdd
            });
        }

    };

    _renderAddresses = () => {

        return (
            this.state.addresses.map((item, index) => (
                <Col xs={6}>
                    <Card>
                        <CardHeader tag="h8">{item.fname}<span>&nbsp;</span>{item.lname}
                            <Button style={{float: "right"}} size={"sm"} color={"primary"}
                                    onClick={this._handelSelectAddress.bind(this, item)}>Select</Button>
                            <span style={{float: "right"}}>&nbsp;&nbsp;</span>

                            <Button style={{float: "right"}} size={"sm"} color={"primary"}
                                    onClick={this._onClickEditAddress.bind(this, item)}>Edit</Button>
                            <span style={{float: "right"}}>&nbsp;&nbsp;</span>
                        </CardHeader>
                        <CardBody className={"text-left"}>
                            <CardText>{"Mobile:  "}{item.mobile}</CardText>
                            <CardText>{"Address:  "}{item.address}</CardText>


                            <Modal isOpen={this.state.modalEditAdd} toggle={this._toggle.bind(this, 3)}
                                   className={this.props.className} backdrop={false}>
                                <ModalHeader toggle={this._toggle.bind(this, 3)}>Edit Address</ModalHeader>
                                <ModalBody>
                                    <Form>
                                        <FormGroup>
                                            <ControlLabel>First Name</ControlLabel>
                                            <FormControl type="text" name="fname_edit" id="fname_edit"
                                                         value={this.state.newAddress.fname_edit}
                                                         onChange={this._handelAddressChange}
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <ControlLabel>Last Name</ControlLabel>
                                            <FormControl type="text" name="lname_edit" id="lname_edit"
                                                         value={this.state.newAddress.lname_edit}
                                                         onChange={this._handelAddressChange}
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <ControlLabel>Mobile</ControlLabel>
                                            <FormControl type="text" name="mobile_edit" id="mobile_edit"
                                                         value={this.state.newAddress.mobile_edit}
                                                         onChange={this._handelAddressChange}
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <ControlLabel>Address</ControlLabel>
                                            <FormControl type="text" name="address_edit" id="address_edit"
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
                        </CardBody>

                    </Card>
                </Col>


            ))
        )

    };


    componentDidMount() {
        this._loadUserInfo();
    }


    render() {
        return (
            <Container>
                <Row>
                    <Col xs={12}>
                        <ProgressBar style={{height: "40px", fontSize: "15px"}}>
                            <ProgressBar bsStyle="success" now={25} key={1} label={<Link to={routes.SHOPPING_CART}
                                                                                         style={{
                                                                                             textDecoration: "none",
                                                                                             color: "white"
                                                                                         }}>1. Your Bucket</Link>}/>
                            <ProgressBar bsStyle="success" now={25} key={2} label={"2. Delivery & Payment"}/>
                            <ProgressBar now={25} key={3} label={"3. Review & Confirm"}/>
                            <ProgressBar now={25} key={4} label={"4. All Done!"}/>
                        </ProgressBar>
                    </Col>
                </Row>
                <br/>
                <Row style={{backgroundColor: "lightgrey"}}>
                    <Col xs={12}>
                        <h5>Shipping Detail</h5>
                    </Col>
                </Row>
                <br/>
                <Row style={{border: "1px solid lightgrey"}}>
                    <Col xs={3}>
                        <Radio name="addressFrom" value={"fromCurrentAddresses"}
                               onChange={this._handleChange}>
                            <span>&nbsp;&nbsp;</span>
                            {"Select from Current Addresses"}
                        </Radio>
                        <Radio name="addressFrom" value={"useNew"}
                               onChange={this._handleChange}>
                            <span>&nbsp;&nbsp;</span>
                            {"Use New"}
                        </Radio>

                        <div style={{border: "1px solid lightgrey"}}>
                            <p>First Name: {this.state.addressToDisplay.fname}</p>
                            <p>Lat Name: {this.state.addressToDisplay.lname}</p>
                            <p>Mobile: {this.state.addressToDisplay.mobile}</p>
                            <p>Address: {this.state.addressToDisplay.address}</p>
                        </div>

                    </Col>
                    <Col xs={9}>
                        <Row>
                            {this.state.toRenderAddresses && this.state.addressFrom === "fromCurrentAddresses" ?
                                this._renderAddresses() : null}

                            {this.state.addressFrom === "useNew" ?
                                (<Col xs={12}>
                                    <Form>
                                        <FormGroup>
                                            <ControlLabel>First Name</ControlLabel>
                                            <FormControl type="text" name="fname_add" id="fname_add"
                                                         value={this.state.newAddress.fname_add}
                                                         onChange={this._handelAddressChange}
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <ControlLabel>Last Name</ControlLabel>
                                            <FormControl type="text" name="lname_add" id="lname_add"
                                                         value={this.state.newAddress.lname_add}
                                                         onChange={this._handelAddressChange}
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <ControlLabel>Mobile</ControlLabel>
                                            <FormControl type="text" name="mobile_add" id="mobile_add"
                                                         value={this.state.newAddress.mobile_add}
                                                         onChange={this._handelAddressChange}
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <ControlLabel>Address</ControlLabel>
                                            <FormControl type="text" name="address_add" id="address_add"
                                                         value={this.state.newAddress.address_add}
                                                         onChange={this._handelAddressChange}
                                            />
                                        </FormGroup>

                                        <Button color="primary" onClick={this._addNewAddress}>Save</Button>
                                        <span>&nbsp;&nbsp;</span>
                                        <Button color="secondary" onClick={this._toggle.bind(this, 2)}>Cancel</Button>
                                    </Form>
                                </Col>) : null}
                        </Row>


                    </Col>
                </Row>


                <hr/>
                <Row>
                    <Col xs={12}>
                        <h5>Select Delivery Method</h5>
                    </Col>
                </Row>

                <hr/>
                <Row>
                    <Col xs={12}>
                        <h5>Choose Your Payment Option</h5>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <Button color={"primary"} className={"float-right"}>Proceed to Payment</Button>
                    </Col>
                </Row>
            </Container>
        );
    }

}