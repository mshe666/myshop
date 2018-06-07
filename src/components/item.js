import React, {Component} from 'react';
import {
    Card, CardText, CardBody,
    CardTitle, CardSubtitle, Button,
} from 'reactstrap';
import {Container, Row, Col} from 'reactstrap';

class item extends Component {

    constructor(props) {
        super(props);
    }


    _checkStore = (pstore) => {
        if (pstore > 0) {
            return (
                <Button color={"danger"}>Add to Cart</Button>
            );
        } else {
            return (
                <Button color={"secondary"}>WaitList</Button>
            );
        }
    };

    render() {

        const item = this.props.item;

        return (

            <Col xs={12} md={8} lg={4}>
                <div>
                    <Card>
                        <CardBody>
                            <CardTitle>{item.pname}</CardTitle>
                            <CardSubtitle>{item.pbrand} | {item.psubcate}</CardSubtitle>
                        </CardBody>
                        <img width="100%"
                             src={item.pimage}
                             alt="Card image cap"/>
                        <CardBody>
                            <CardText>{item.pdes}</CardText>
                            <Button color={"info"}>WishList</Button>
                            <span>&nbsp;&nbsp;</span>
                            {this._checkStore(item.pstore)}
                        </CardBody>
                    </Card>

                </div>
            </Col>
        );
    }
}

export default item;
