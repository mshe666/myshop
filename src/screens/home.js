import React, {Component} from 'react';
import Item from '../components/item';
import PropTypes from 'prop-types';
import {Container, Row, Col} from 'reactstrap';
import AuthUserContext from '../components/AuthUserContext';
import firebase from '../firebase/firebase';
import {Jumbotron, Button, Carousel} from 'react-bootstrap';


class home extends Component {

    constructor(props) {
        super(props);

        this._renderContent = this._renderContent.bind(this);
        this._renderJumbotron = this._renderJumbotron.bind(this);
        this._renderCarousel = this._renderCarousel.bind(this);
    }

    _renderContent = (authUser) => {

        let user = firebase.auth().currentUser;
        let name = "None";
        let email = "None";
        let photoUrl = "None";
        let emailVerified = "None";
        let uid = "None";

        if (user != null) {
            name = user.displayName;
            email = user.email;
            photoUrl = user.photoURL;
            emailVerified = user.emailVerified;
            uid = user.uid;
        }

        if (authUser) {
            return (
                <Container>
                    <Row>
                        <Col xs={12}>
                            Welcome! member! {email} {uid}
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            {this._renderJumbotron()}
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            {this._renderCarousel()}
                        </Col>
                    </Row>
                </Container>
            );
        } else {
            return (
                <Container>
                    <Row>
                        <Col xs={12}>
                            Welcome! guest!
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            {this._renderJumbotron()}
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            {this._renderCarousel()}
                        </Col>
                    </Row>
                </Container>
            );
        }
    };

    _renderJumbotron = (authUsr) => {
        if (authUsr) {
            return (
                <Jumbotron>
                    <h1>Hello, world!</h1>
                    <p>
                        This is a simple hero unit, a simple jumbotron-style component for calling
                        extra attention to featured content or information.
                    </p>
                    <p>
                        <Button bsStyle="primary">Learn more</Button>
                    </p>
                </Jumbotron>
            );
        } else {
            return (
                <Jumbotron>
                    <h1>Hello, world!</h1>
                    <p>
                        This is a simple hero unit, a simple jumbotron-style component for calling
                        extra attention to featured content or information.
                    </p>
                    <p>
                        <Button bsStyle="primary">Learn more</Button>
                    </p>
                </Jumbotron>
            );
        }
    };

    _renderCarousel = (authUser) => {
        if (authUser) {
            return (
                <Carousel>
                    <Carousel.Item>
                        <img width={350} height={150} alt="350x150" src="http://via.placeholder.com/350x150" />
                        <Carousel.Caption>
                            <h3>First slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img width={350} height={150} alt="350x150" src="http://via.placeholder.com/350x150" />
                        <Carousel.Caption>
                            <h3>Second slide label</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img width={350} height={150} alt="350x150" src="http://via.placeholder.com/350x150" />
                        <Carousel.Caption>
                            <h3>Third slide label</h3>
                            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            );
        } else {
            return (
                <Carousel>
                    <Carousel.Item>
                        <img width={350} height={150} alt="350x150" src="http://via.placeholder.com/350x150" />
                        <Carousel.Caption>
                            <h3>First slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img width={350} height={150} alt="350x150" src="http://via.placeholder.com/350x150" />
                        <Carousel.Caption>
                            <h3>Second slide label</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img width={350} height={150} alt="350x150" src="http://via.placeholder.com/350x150" />
                        <Carousel.Caption>
                            <h3>Third slide label</h3>
                            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            );
        }
    }


    render() {

        return (
            <AuthUserContext.Consumer>

                {this._renderContent}

            </AuthUserContext.Consumer>


        );
    }
}

export default home;
