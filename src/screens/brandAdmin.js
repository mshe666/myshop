import React from 'react';
import {Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap';
import firebase from "../firebase/firebase";
import {Table, Row} from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';



export default class brandAdmin extends React.Component {

    constructor(props) {
        super();
        this.state = {
            brands: [],
            modal: false,
            newBrand: "",
        };

        this._toggle = this._toggle.bind(this);
        this._handleChange = this._handleChange.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
        this._loadBrands = this._loadBrands.bind(this);
    }

    _toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    _loadBrands = () => {
        firebase.database().ref('brands').on('value', (data) => {
                const brandList = [];

                console.log("data in _loadBrands = " + data);

                data.forEach((item) => {
                    let brandName = item.child('brandName').val();
                    let brandCate = item.child('brandCate').val() === null ? [] : item.child('brandCate').val();
                    brandList.push({brandName: brandName, brandCate: brandCate});
                    console.log("pushing " + brandName + " to brandList");
                });

                this.setState({
                    brands: brandList
                });
            }, (error => {
                console.log("loading brands error! " + error);
            })
        );
    };

    _handleChange = (event) => {
        this.setState({
            newBrand: event.target.value
        });
        console.log("newBrandName=" + this.state.newBrand);
    };

    _handleSubmit = () => {
        this._toggle();
        let newBrandName = this.state.newBrand;
        let brandObjet = {brandName: newBrandName, brandCate: []};
        console.log("newBrandName in _handlSubmit = " + newBrandName);


        firebase.database().ref('brands/' + newBrandName).set(brandObjet).then(() => {
            console.log('INSERTED a new brand!');
        }).catch(error => {
            console.log('abrandAdmin.js _handleSubmit: error = ' + error);
        });
    };

    _handleDelete = (item) => {

        console.log("start to deleting " + item);

        firebase.database().ref('brands/' + item).remove().then(() => {
            console.log('DELETED! brand name = ' + item);
        }).catch(error => {
            console.log(error);
        });


        let brandList = this.state.brands;
        const index = brandList.indexOf(item);
        brandList.splice(index, 1);
        this.setState({
            brands: brandList
        });
    };

    componentWillMount() {
        console.log("brandAdmin.hs componnent will mount!");
        this._loadBrands();
    }

    render() {
        return (
            <div>
                <Row>
                    <h3>Current Brand List has {this.state.brands.length} brands</h3>
                    <span>&nbsp;&nbsp;</span>
                    <Button color={"danger"} onClick={this._toggle}>Add New</Button>
                    <Modal isOpen={this.state.modal} toggle={this._toggle} className={this.props.className}>
                        <ModalHeader toggle={this._toggle}>Add New Brand</ModalHeader>
                        <ModalBody>
                            <Form onSubmit={this._handleSubmit}>
                                <FormGroup>
                                    <Label for="brandName">Brand Name</Label>
                                    <Input type="text" name="brandName" id="brandName"
                                           placeholder="enter brand name"
                                           onChange={this._handleChange}
                                    />
                                </FormGroup>

                                <Button color="primary" onClick={this._handleSubmit}>Submit</Button>
                                <span>&nbsp;&nbsp;</span>
                                <Button color="secondary" onClick={this._toggle}>Cancel</Button>
                            </Form>
                        </ModalBody>
                    </Modal>
                </Row>


                <Table>
                    <thead>
                    <tr>
                        <th>Brand Name</th>
                        <th>Categories</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.brands.map((item, index) => (
                        <tr key={index}>
                            <td>{item.brandName}</td>
                            <td>{item.brandCate.join(" | ")}</td>
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