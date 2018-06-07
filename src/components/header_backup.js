import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';
import {
    InputGroup,
    InputGroupAddon,
    Input,
    Form,
    FormGroup,
    Label,
} from 'reactstrap';
import {Route, Switch} from 'react-router';
import {Container, Row, Col, Button, ButtonGroup} from 'reactstrap';
import SearchIcon from '@material-ui/icons/Search';
import AddProduct from "../screens/addProduct";
import CateAdmin from "../screens/cateAdmin";
import AdminHome from "../screens/adminHome";
import BrandAdmin from "../screens/brandAdmin";
import ProductAdmin from "../screens/productAdmin";
import SearchResults from "../screens/searchresults";
import * as routes from '../constants/routes';
import AuthUserContext from './AuthUserContext';
import SignOutButton from './signoutButton';


const Header_en_onAuth = (
    <Nav tabs>
        <NavItem>
            <NavLink href={routes.LANDING}>Home</NavLink>
        </NavItem>
        <NavItem>
            <NavLink href={routes.WELLNESS}>Wellness</NavLink>
        </NavItem>
        <NavItem>
            <NavLink href={routes.BABY}>Baby</NavLink>
        </NavItem>
        <NavItem>
            <NavLink href={routes.BEAUTY}>Beauty</NavLink>
        </NavItem>
        <NavItem>
            <NavLink href={routes.PROFILE}>Profile</NavLink>
        </NavItem>
        <NavItem>
            <NavLink href={routes.SIGN_UP}>Sign Up</NavLink>
        </NavItem>
        <NavItem>
            <NavLink href={routes.SIGN_IN}>Sign In</NavLink>
        </NavItem>
        <NavItem>
            <NavLink href={routes.ADMIN_HOME}>Admin</NavLink>
        </NavItem>
        <NavItem>
            <SignOutButton/>
        </NavItem>
    </Nav>
);


const Header_en = (
    <Nav tabs>
        <NavItem>
            <NavLink href={routes.LANDING}>Home</NavLink>
        </NavItem>
        <NavItem>
            <NavLink href={routes.WELLNESS}>Wellness</NavLink>
        </NavItem>
        <NavItem>
            <NavLink href={routes.BABY}>Baby</NavLink>
        </NavItem>
        <NavItem>
            <NavLink href={routes.BEAUTY}>Beauty</NavLink>
        </NavItem>
        <NavItem>
            <NavLink href={routes.SIGN_UP}>Sign Up</NavLink>
        </NavItem>
        <NavItem>
            <NavLink href={routes.SIGN_IN}>Sign In</NavLink>
        </NavItem>
        <NavItem>
            <SignOutButton/>
        </NavItem>
    </Nav>
);


const Header_cn = () =>
    <Nav tabs>
        <NavItem>
            <NavLink href="/cn">首页</NavLink>
        </NavItem>
        <NavItem>
            <NavLink href="/wellness">保健品</NavLink>
        </NavItem>
        <NavItem>
            <NavLink href="/baby">婴儿用品</NavLink>
        </NavItem>
        <NavItem>
            <NavLink href="/beauty">美妆</NavLink>
        </NavItem>
        <NavItem>
            <NavLink href="/category">目录</NavLink>
        </NavItem>
        <NavItem>
            <NavLink href="/profile">用户中心</NavLink>
        </NavItem>
        <NavItem>
            <NavLink href="/signup">注册</NavLink>
        </NavItem>
        <NavItem>
            <NavLink href="/signin">登录</NavLink>
        </NavItem>
        <NavItem>
            <NavLink href="/admin/home">管理员入口</NavLink>
        </NavItem>
    </Nav>


class header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            searchMyshop: null,
            isCn: this.props.lan
        };

        this._handleChange = this._handleChange.bind(this);
        this._handleSearch = this._handleSearch.bind(this);
        this._renderNav = this._renderNav.bind(this);
    }

    _renderNav = () => {
        if (!this.props.lan) {
            if (this.props.authUser != null) {
                return (
                    Header_en_onAuth
                );
            } else {
                return (
                    Header_en
                );
            }
        } else {
            return (
                Header_cn
            );
        }
    };


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

        // console.log("render header.js with isCn = " + this.props.lan);
        let keyword = this.state.searchMyshop;

        let authUser = this.props.authUser;
        console.log("render header.js with authUser = " + authUser);



        return (


            <Container>
                {/*header*/}
                <Row>
                    <Col xs={12}>
                        <AuthUserContext.Consumer>
                            {this._renderNav}
                        </AuthUserContext.Consumer>
                    </Col>

                </Row>

                {/*banner and search bar*/}
                <Row className={"itemCenter"}>
                    <Col xs={12} md={8} lg={3}>
                        <img width="100%"
                             src={"http://via.placeholder.com/350x100"}
                             alt="Website logo"/>
                    </Col>
                    <Col xs={12} md={8} lg={6}>
                        <InputGroup>
                            <Input type={"text"} name={"searchMyshop"} placeholder="Search My Shop"
                                   onChange={this._handleChange}/>

                            <InputGroupAddon addonType="append">
                                <Link to={'/searchresults'}>
                                    <Button color="secondary"><SearchIcon/></Button>
                                </Link>
                            </InputGroupAddon>
                        </InputGroup>
                    </Col>
                    <Col xs={12} md={8} lg={3}>
                        <img width="100%"
                             src={"http://via.placeholder.com/350x100"}
                             alt="Website logo"/>
                    </Col>
                </Row>
                <hr/>

                <Switch>
                    <Route path='/searchresults' render={() => <SearchResults keyword={keyword}/>}/>
                </Switch>

            </Container>

        );
    }
}

export default header;
