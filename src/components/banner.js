import React, {Component} from 'react';
import {Container, Row, Col, Button, ButtonGroup} from 'reactstrap';
import {
    InputGroup,
    FormGroup,
    FormControl,
} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {Route, Switch} from 'react-router';
import SearchIcon from '@material-ui/icons/Search';
import SearchResults from "../screens/searchresults";
import * as routes from '../constants/routes';



export default class banner extends Component {

    constructor(props) {
        super(props);

        this.state = {
            searchMyshop: null,
        };

        this._handleChange = this._handleChange.bind(this);
        this._handleSearch = this._handleSearch.bind(this);
    }

    _handleChange = (event) => {
        if (event.target.value === "") {
            this.setState({[event.target.name]: null});
        } else {
            this.setState({[event.target.name]: event.target.value});
        }


    };

    _handleSearch = () => {
        this.props.push('/searchresults');

    };


    render() {
        let keyword = this.state.searchMyshop;

        return (
            <Container>
                <Row className={"itemCenter"}>
                    <Col xs={12} md={8} lg={3}>
                        <img width={"100%"}
                             src={routes.LOGO_2}
                             alt="Website logo"/>
                    </Col>
                    <Col xs={12} md={8} lg={6}>
                        <FormGroup>
                            <InputGroup>
                                <FormControl type="text" name={"searchMyshop"} placeholder={"Search My Shop"}/>
                                <InputGroup.Addon>
                                    <Link to={'/searchresults'}>
                                        <SearchIcon style={{height: "10%"}}/>
                                    </Link>
                                </InputGroup.Addon>
                            </InputGroup>
                        </FormGroup>
                    </Col>
                    <Col xs={12} md={8} lg={3}>
                        <img width="100%"
                             src={routes.LOGO_2}
                             alt="Website logo"/>
                    </Col>
                </Row>
            </Container>
        );
    }
}