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
import {Container, Row, Col} from 'reactstrap';

class adminHeader extends Component {

    render() {
        return (

            <Nav>
                <NavItem>
                    <NavLink href="/admin/home">Admin</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/admin/brandadmin">Brand Admin</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/admin/cateadmin">Category Admin</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/admin/prodadmin">Product Admin</NavLink>
                </NavItem>

            </Nav>
        );
    }
}

export default adminHeader;
