import React from 'react';
import {Form, FormGroup, Label, Input, FormText} from 'reactstrap';
import firebase from "../firebase/firebase";
import {Table} from 'reactstrap';
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {Container, Row, Col} from 'reactstrap';
import { ProgressBar, Button } from 'react-bootstrap';
import './screenStyles.css';
import {Link} from 'react-router-dom';
import * as routes from "../constants/routes";


export default class shoppingCart extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            cart: null,
            toRenderCart: false,
            subtotal: 0,
            indexOfBProductToEdit: null,
        };

        this._loadItems = this._loadItems.bind(this);
        this._loadUserInfo = this._loadUserInfo.bind(this);
        this._renderItems = this._renderItems.bind(this);
        this._updateCart = this._updateCart.bind(this);
    }

    _loadUserInfo = () => {
        let user = firebase.auth().currentUser;
        if (user != null) {
            let currentUID = user.uid;
            this.setState({
                uid: currentUID
            });
        }

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
                })
            });
        }

    };

    _renderItems = () => {
        let cart = this.state.cart;

        return (
            cart.map((product, index) => (

                <tr key={index}>
                    <td>{product.pid}</td>
                    <td>{product.detail.pname}</td>
                    <td>{parseFloat(Math.round(product.detail.pprice * 100) / 100).toFixed(2)}</td>
                    <td>
                        <Button size={"sm"} color={"secondary"} onClick={this._decrement.bind(this, product)}>-</Button>
                        <span>&nbsp;&nbsp;</span>{product.count}<span>&nbsp;&nbsp;</span>
                        <Button size={"sm"} color={"secondary"} onClick={this._increment.bind(this, product)}>+</Button>
                        </td>
                    <td>{parseFloat(Math.round(product.detail.pprice * product.count * 100) / 100).toFixed(2)}</td>
                    <td><Button size={"sm"} color={"danger"}>Delete</Button></td>
                </tr>

            ))
        );


    };

    _decrement = (product) => {
        let cart = this.state.cart;
        let index = cart.indexOf(product);
        if (cart[index].count > 1) {
            cart[index].count --;
        } else {
            cart[index].count = 1;
        }

        this._updateCart();

        this.setState({
            cart: cart
        });
    };

    _increment = (product) => {
        let cart = this.state.cart;
        let index = cart.indexOf(product);
            cart[index].count ++;

        this._updateCart();

        this.setState({
            cart: cart
        });
    };

    _updateCart = () => {
        let uid = this.state.uid;
        let cart = this.state.cart;

        firebase.database().ref('users/' + uid + "/cart").set(cart).then(() => {
            // console.log('UPDATED one address!');
        }).catch(error => {
            console.log('shoppingCart.js updateCart: error = ' + error);
        });

    };

    componentDidMount() {
        this._loadItems();
        this._loadUserInfo();
    }


    render() {
        return (
            <Container>
                <Row>
                    <Col xs={12}>
                        <ProgressBar style={{height: "40px", fontSize: "15px"}}>
                            <ProgressBar bsStyle="success" now={25} key={1} label={"1. Your Bucket"}/>
                            <ProgressBar bsStyle="primary" now={25} key={2} label={"2. Delivery & Payment"}/>
                            <ProgressBar bsStyle="primary" now={25} key={3} label={"3. Review & Confirm"}/>
                            <ProgressBar bsStyle="primary" now={25} key={4} label={"4. All Done!"}/>
                        </ProgressBar>
                    </Col>
                </Row>
                <br/>
                <Row style={{backgroundColor: "lightgrey"}}>
                    <Col xs={12}>
                        <h5>Products in Shopping Cart</h5>
                    </Col>
                </Row>
                <Row style={{border: "1px solid lightgrey"}}>
                    <Col xs={12}>
                        <Table striped hover>
                            <thead>
                            <tr>
                                <th>PID</th>
                                <th>Product Name</th>
                                <th>Price(NZD)</th>
                                <th>Count</th>
                                <th>Subtotal(NZD)</th>
                                <th>Options</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.toRenderCart ? this._renderItems() : null}
                            </tbody>
                            <tfoot>
                            <tr>
                                <td colSpan={6} style={{fontWeight: "bold"}}>
                                    <div className={"text-left float-right"}>
                                        <div>{"Subtotal = NZD $"}
                                        {parseFloat(Math.round(this.state.subtotal * 100) / 100).toFixed(2)}
                                        {" / RMB ￥"}
                                        {parseFloat(Math.round(this.state.subtotal * 5 * 100) / 100).toFixed(2)}
                                        </div>
                                        <div>{"Product Weight: to be added"}</div>
                                    </div>

                                </td>
                            </tr>
                            </tfoot>

                        </Table>
                    </Col>
                </Row>
                <hr/>
                <Row>
                    <Col xs={12}>
                        <Link to={routes.DELIVERY_PAYMENT}><Button color={"primary"} className={"float-right"}>Check Out</Button></Link>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <h5 className={"float-left"}>You may also like:</h5>
                    </Col>
                </Row>
            </Container>
        );
    }

}