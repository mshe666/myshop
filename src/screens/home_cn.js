import React, { Component } from 'react';
import Item from '../components/item';
import PropTypes from 'prop-types';
import {Container, Row, Col} from 'reactstrap';

class home_cn extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <Container>
                <Row>
                    <Col xs={12}>
                        欢迎光临!
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default home_cn;
