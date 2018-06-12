import React, {Component} from 'react';
import {Container, Row, Col} from 'reactstrap';
import firebase from "../firebase/firebase";
import './item.css';
import {Panel, Button, Glyphicon} from 'react-bootstrap';

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
                <Button style={{float: "right"}}
                        onClick={this._addToCart.bind(this, this.props.uid, this.props.cart, this.props.item.pid, this.props.item)}>
                    <Glyphicon glyph="shopping-cart" /></Button>
            );
        } else {


            return (
                <Button  style={{float: "right"}}><Glyphicon glyph="bell" /></Button>
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
                    <Panel bsStyle="info">
                        <Panel.Heading>
                            <Panel.Title
                                componentClass="h3">{item.pname.length > 30 ? item.pname.substring(0, 27) + "..." : item.pname}</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body>
                            <img width="100%"
                                 src={item.pimage}
                                 alt="Card image cap"/>
                            <p style={{marginTop: "5px", color: "red"}}>{"NZD $"}{item.pprice}{" / RMB ￥"}{item.pprice * 5}</p>
                            <Button style={{float: "left"}}><Glyphicon glyph="heart" /></Button>
                            {this._checkStore(item)}
                        </Panel.Body>
                    </Panel>

                </div>
            </Col>
        );
    }
}

export default item;
