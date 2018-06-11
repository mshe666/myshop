import React, {Component} from 'react';
import {
    Card, CardText, CardBody, CardHeader,
    CardTitle, CardSubtitle, Button,
} from 'reactstrap';
import {Container, Row, Col} from 'reactstrap';
import firebase from "../firebase/firebase";
import './item.css';

class item extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cart: null
        };

    }


    _checkStore = (item) => {
        if (item.pstore > 0) {

            return (
                <Button color={"danger"} onClick={this._addToCart.bind(this, this.props.uid, this.props.cart, this.props.item.pid, this.props.item)}>Add to Cart</Button>
            );
        } else {


            return (
                <Button color={"secondary"}>WaitList</Button>
            );
        }
    };

    _addToCart = (uid, cart, itemID, item) => {
        this.props.addToCart(uid, cart, itemID, item);
    };


    render() {

        const item = this.props.item;

        return (

            <Col xs={12} md={8} lg={4}>
                <div>
                    <Card>
                        <CardHeader tag="h8">{item.pname.length > 25 ? item.pname.substring(0, 22) + "..." : item.pname}</CardHeader>
                        {/*<CardBody className={"text-left"}>*/}
                            {/*/!*<CardTitle>{item.pname}</CardTitle>*!/*/}
                            {/*<CardSubtitle>{item.pbrand} | {item.psubcate}</CardSubtitle>*/}
                        {/*</CardBody>*/}
                        <img width="100%"
                             src={item.pimage}
                             alt="Card image cap"/>
                        <CardBody className={"text-left"}>
                            <CardText className={"item_price text-left"}>{"NZD $"}{item.pprice}{" / RMB ￥"}{item.pprice * 5}</CardText>
                            <Button color={"info"}>WishList</Button>
                            <span>&nbsp;&nbsp;</span>
                            {this._checkStore(item)}
                        </CardBody>
                    </Card>

                </div>
            </Col>
        );
    }
}

export default item;
