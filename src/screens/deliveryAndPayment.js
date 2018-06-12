import React from 'react';
import firebase from "../firebase/firebase";
import {Table} from 'reactstrap';
import {ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {Grid, Row, Col} from 'react-bootstrap';
import {
    ProgressBar,
    Button,
    Form,
    FormGroup,
    Label,
    FormControl,
    Radio,
    ControlLabel,
    Well,
    Panel,
    Modal,
    Alert,
    Image,
} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import * as routes from "../constants/routes";
import item from "../components/item";


export default class deliveryAndPayment extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            uid: null,
            orders: null,
            addresses: null,
            toRenderAddresses: false,
            subtotal: null,
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
        this._loadItems = this._loadItems.bind(this);
    }

    _loadUserInfo = () => {
        let user = firebase.auth().currentUser;
        if (user != null) {
            let currentUID = user.uid;
            firebase.database().ref('users/' + currentUID).on('value', (data) => {
                let addresses = data.child('addresses').val() === null ? [] : data.child('addresses').val();
                let orders = data.child('orders').val() === null ? [] : data.child('orders').val();

                this.setState({
                    uid: currentUID,
                    orders: orders,
                    addresses: addresses,
                    toRenderAddresses: true,

                });

                console.log("subtotal = " + subtotal);

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
        console.log(event.target.name, event.target.value);


    };

    _handelSelectAddress = (item) => {
        this.setState({
            addressToDisplay: item,
            addressFrom: null,
        });
    };

    _handleSelectDeliveryMethod = (method) => {
        this.setState({
            delivery: method,
        });

        console.log("delivery = " + this.state.delivery);
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
                <Col xs={6} key={index}>

                    <Panel bsStyle="info">
                        <Panel.Heading>
                            <Panel.Title className={"clearfix"}>
                                <span>
                                    {item.fname}
                                    <span>&nbsp;</span>
                                    {item.lname}
                                </span>
                                <span className={"pull-right"}>
                                    <Button size={"sm"} color={"primary"}
                                            onClick={this._handelSelectAddress.bind(this, item)}>Select</Button>

                                    <span>&nbsp;&nbsp;</span>

                                    <Button size={"sm"} color={"primary"}
                                            onClick={this._onClickEditAddress.bind(this, item)}>Edit</Button>
                                    <span>&nbsp;&nbsp;</span>
                                </span>


                            </Panel.Title>
                        </Panel.Heading>
                        <Panel.Body>
                            <p>{"Mobile:  "}{item.mobile}</p>
                            <p>{"Address:  "}{item.address}</p>


                            <Modal show={this.state.modalEditAdd} onHide={this._toggle.bind(this, 3)} backdrop={false}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Edit Address</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
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
                                </Modal.Body>
                            </Modal>
                        </Panel.Body>
                    </Panel>
                </Col>


            ))
        )

    };

    _loadItems = () => {
        let user = firebase.auth().currentUser;
        if (user != null) {
            let currentUID = user.uid;

            firebase.database().ref('users/' + currentUID).on('value', (data) => {
                let cart = data.child('cart').val() === null ? [] : data.child('cart').val();
                let subtotal = 0;
                cart.forEach((product) => {
                    subtotal += product.detail.pprice * product.count;
                });

                this.setState({
                    cart: cart,
                    toRenderCart: true,
                    subtotal: subtotal,
                });

            });
        }

    };

    _createOrder = () => {
        let orders = this.state.orders;

        let uid = this.state.uid;
        let products = this.state.cart;
        let subtotal = this.state.subtotal;
        let deliveryAddress = this.state.addressToDisplay;
        let deliveryMethod = this.state.delivery;
        let paymentOption = this.state.paymentOption;

        if (uid && products && subtotal && deliveryAddress && deliveryMethod && paymentOption) {
            let order = {
                uid: uid,
                products: products,
                subtotal: subtotal,
                deliveryAddress: deliveryAddress,
                deliveryMethod: deliveryMethod,
                paymentOption: paymentOption,
                orderTime: new Date(),
                paymentTime: null,
                status: 0,
            };

            console.log("order = " + order);

            orders.push(order);

            firebase.database().ref('users/' + uid + "/orders").set(orders).then(() => {
                // console.log('UPDATED one address!');
            }).catch(error => {
                console.log('deliveryAndPayment.js _createOrder: error = ' + error);
            });
        }

    };


    componentDidMount() {
        this._loadUserInfo();
        this._loadItems();
    }


    render() {
        return (
            <Grid>
                {/*progress bar*/}
                <Row>
                    <Col xs={12}>
                        <Button bsStyle={"success"} style={{width: "25%"}}>
                            <Link to={routes.SHOPPING_CART} style={{textDecoration: "none", color: "white"}}>1. Your
                                Bucket</Link>
                        </Button>
                        <Button bsStyle={"success"} style={{width: "25%"}}>2. Delivery & Payment</Button>
                        <Button style={{width: "25%"}}>3. Review & Confirm</Button>
                        <Button style={{width: "25%"}}>4. All Done!</Button>
                    </Col>
                </Row>
                <br/>
                {/*shipping detail*/}
                <Row style={{backgroundColor: "lightgrey"}}>
                    <Col xs={12}>
                        <h5>1. Shipping Detail</h5>
                    </Col>
                </Row>
                <br/>
                {/*shipping address*/}
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

                        <div style={{border: "1px solid lightgrey", padding: "10px"}}>
                            <p><b>First Name: </b>{this.state.addressToDisplay.fname}</p>
                            <p><b>Last Name: </b>{this.state.addressToDisplay.lname}</p>
                            <p><b>Mobile: </b>{this.state.addressToDisplay.mobile}</p>
                            <p><b>Address: </b>{this.state.addressToDisplay.address}</p>
                        </div>
                        <br/>

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

                {/*delivery method*/}
                <Row style={{backgroundColor: "lightgrey"}}>
                    <Col xs={12}>
                        <h5>2. Select Delivery Method</h5>
                    </Col>
                </Row>
                <br/>
                <Row style={{border: "1px solid lightgrey"}}>
                    <Col xs={12}>
                        <br/>

                        {this.state.subtotal >= 100 ?
                            <Alert bsStyle={"success"}>Your order qualifies for FREE premium shipping</Alert>
                            : this.state.subtotal >= 50 ?
                                <Alert bsStyle={"success"}>Your oder qualifies for FREE standard shipping</Alert>
                                : null}

                        <div>

                            {this.state.subtotal >= 100 ?
                                <Well>
                                    <div style={{display: "inline"}} className={"clearfix"}>
                                        <div style={{display: "inline-block"}}>
                                            <p>Premium Shipping</p>
                                            <p>5 - 7 business days. Shipping time may be delayed due to weather and
                                                other
                                                unpredicted reasons.</p>
                                        </div>
                                        <div style={{display: "inline-block", height: "auto"}} className={"pull-right"}>
                                            <b>FREE</b>
                                        </div>
                                    </div>

                                </Well>
                                : this.state.subtotal >= 50 ?
                                    <Well>
                                        <div style={{display: "inline"}} className={"clearfix"}>
                                            <div style={{display: "inline-block"}}>
                                                <p>Standard Shipping</p>
                                                <p>10 - 15 business days. Shipping time may be delayed due to weather
                                                    and other
                                                    unpredicted reasons.</p>
                                            </div>
                                            <div style={{display: "inline-block", height: "auto"}}
                                                 className={"pull-right"}>
                                                <b>FREE</b>
                                            </div>
                                        </div>

                                    </Well>
                                    : <div>
                                        <Well onClick={this._handleSelectDeliveryMethod.bind(this, "standard")}
                                              style={{cursor: "pointer"}}
                                              bsStyle={this.state.delivery === "standard" ? "success" : null}>
                                            <div style={{display: "inline"}} className={"clearfix"}>
                                                <div style={{display: "inline-block"}}>
                                                    <p>Standard Shipping</p>
                                                    <p>10 - 15 business days. Shipping time may be delayed due to
                                                        weather and other
                                                        unpredicted reasons.</p>
                                                </div>
                                                <div style={{display: "inline-block", height: "auto"}}
                                                     className={"pull-right"}>
                                                    <b>NZD $5.00</b>
                                                </div>
                                            </div>

                                        </Well>
                                        <Well onClick={this._handleSelectDeliveryMethod.bind(this, "premium")}
                                              style={{cursor: "pointer"}}>
                                            <div style={{display: "inline"}} className={"clearfix"}>
                                                <div style={{display: "inline-block"}}>
                                                    <p>Premium Shipping</p>
                                                    <p>5 - 7 business days. Shipping time may be delayed due to weather
                                                        and other
                                                        unpredicted reasons.</p>
                                                </div>
                                                <div style={{display: "inline-block", height: "auto"}}
                                                     className={"pull-right"}>
                                                    <b>NZD $12.00</b>
                                                </div>
                                            </div>

                                        </Well>
                                    </div>
                            }

                        </div>
                    </Col>
                </Row>

                <hr/>
                <Row style={{backgroundColor: "lightgrey"}}>
                    <Col xs={12}>
                        <h5>3. Choose Your Payment Option</h5>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col xs={4}>
                        <Radio name="paymentOption" value={"alipay"}
                               onChange={this._handleChange}>
                            <span>&nbsp;&nbsp;</span>
                            <Image src={routes.ALIPAY_LOGO} responsive={true} thumbnail={true} style={{height: "60px", width: "60px"}}/>
                        </Radio>
                    </Col>
                    <Col xs={4}>
                        <Radio name="paymentOption" value={"wechat"}
                               onChange={this._handleChange}>
                            <span>&nbsp;&nbsp;</span>
                            <Image src={routes.WECHATPAY_LOGO} responsive={true} thumbnail={true} style={{height: "60px", width: "60px"}}/>
                        </Radio>
                    </Col>

                    {/*<Col xs={2}/>*/}
                    {/*<Col xs={4}>*/}
                        {/*<Image src={routes.ALIPAY_QRCODE} responsive={true} thumbnail={true} />*/}
                    {/*</Col>*/}
                    {/*<Col xs={4}>*/}
                        {/*<Image src={routes.WECHATPAY_QRCODE} responsive={true} thumbnail={true} />*/}
                    {/*</Col>*/}
                    {/*<Col xs={2}/>*/}

                </Row>
                <Row>
                    <Col xs={12}>
                        <Button color={"primary"} className={"float-right"}>Proceed to Payment</Button>
                    </Col>
                </Row>
            </Grid>
        );
    }

}