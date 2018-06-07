import React from 'react';
import {Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap';
import firebase from "../firebase/firebase";
import {Table, Row} from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {Link} from 'react-router-dom';



export default class productAdmin extends React.Component {

    constructor(props) {
        super();
        this.state = {
            products: [],
            modal: false,
        };

        this._loadProducts = this._loadProducts.bind(this);
    }

    _loadProducts = () => {
        firebase.database().ref('products').on('value', (data) => {
                const productList = [];

                console.log("data in _loadProducts = " + data);

                data.forEach((item) => {

                    let product = {
                        pid: item.child('pid').val(),
                        pname: item.child('pname').val(),
                        pbrand: item.child('pbrand').val(),
                        pcate: item.child('pcate').val(),
                        psubcate: item.child('psubcate').val(),
                        pimage: item.child('pimage').val(),
                        pdes: item.child('pdes').val(),
                        pstore: item.child('pstore').val(),
                    };

                    productList.push(product);
                    // console.log("pushing " + product.pname + " to productList");
                });

                this.setState({
                    products: productList
                });
            }, (error => {
                console.log("loading products error! " + error);
            })
        );
    };

    componentWillMount() {
        this._loadProducts();
    }

    _handleDelete = (item) => {

        console.log("start to deleting " + item.pname);

        firebase.database().ref('products/' + item.pid).remove().then(() => {
            console.log('DELETED! product name = ' + item.pname);
        }).catch(error => {
            console.log(error);
        });


        let productList = this.state.products;
        const index = productList.indexOf(item);
        productList.splice(index, 1);
        this.setState({
            products: productList
        });
    };

    render() {
        return (
            <div>
                <Row>
                    <h3>Current Product List has {this.state.products.length} products</h3>
                    <span>&nbsp;&nbsp;</span>
                    <Link to={"/admin/addproduct"}>
                        <Button color={"danger"}>Add New</Button>
                    </Link>
                </Row>

                <Table>
                    <thead>
                    <tr>
                        <th>PID</th>
                        <th>Name</th>
                        <th>Brand</th>
                        <th>Category</th>
                        <th>Subcategory</th>
                        <th>Store</th>
                        <th>Image</th>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.products.map((item, index) => (
                        <tr key={index}>
                            <td>{item.pid}</td>
                            <td>{item.pname}</td>
                            <td>{item.pbrand}</td>
                            <td>{item.pcate}</td>
                            <td>{item.psubcate}</td>
                            <td>{item.pstore}</td>
                            <td>{item.pimage}</td>
                            <td>{item.pdes}</td>
                            <td><Button color={"info"}>Edit</Button></td>
                            <td><Button color={"danger"} onClick={this._handleDelete.bind(this, item)}>Delete</Button></td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
        );
    }
}