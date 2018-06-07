import React from 'react';
import {Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap';
import firebase from "../firebase/firebase";
import {Table, Row} from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';



export default class cateAdmin extends React.Component {

    constructor(props) {
        super();
        this.state = {
            categories: [],
            modal: false,
            cateName: "",
            subCateName: "",
        };

        this._toggle = this._toggle.bind(this);
        this._handleChange = this._handleChange.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
        this._loadCategories = this._loadCategories.bind(this);
    }

    _toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    _loadCategories = () => {
        firebase.database().ref('categories').on('value', (data) => {
                const cateList = [];

                console.log("data in _loadCategories = " + data);

                data.forEach((item) => {
                    item.forEach((subitem) => {
                        let cateName = subitem.child('cateName').val();
                        let subCateName = subitem.child('subCateName').val();
                        cateList.push({cateName: cateName, subCateName: subCateName});
                        console.log("pushing " + cateName + "-" + subCateName + " to cateList");
                    })
                });

                this.setState({
                    categories: cateList
                });
            }, (error => {
                console.log("loading categories error! " + error);
            })
        );
    };

    _handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };


    _handleSubmit = () => {
        this._toggle();
        let newCateName = this.state.cateName;
        let newSubCateName = this.state.subCateName;
        let cateObject = {cateName: newCateName, subCateName: newSubCateName};
        console.log("newCateName in _handlSubmit = " + newCateName);


        firebase.database().ref('categories/' + newCateName + '/' + newSubCateName).set(cateObject).then(() => {
            console.log('INSERTED a new category!');
        }).catch(error => {
            console.log('cateAdmin.js _handleSubmit: error = ' + error);
        });
    };

    _handleDelete = (item) => {

        console.log("start to deleting " + item);

        firebase.database().ref('categories/' + item.cateName + '/' + item.subCateName).remove().then(() => {
            console.log('DELETED! category name = ' + item.cateName + "-" + item.subCateName);
        }).catch(error => {
            console.log(error);
        });


        let cateList = this.state.categories;
        const index = cateList.indexOf(item);
        cateList.splice(index, 1);
        this.setState({
            categories: cateList
        });
    };

    componentWillMount() {
        console.log("cateAdmin.hs componnent will mount!");
        this._loadCategories();
    }

    render() {
        return (
            <div>
                <Row>
                    <h3>Current Category List has {this.state.categories.length} categories</h3>
                    <span>&nbsp;&nbsp;</span>
                    <Button color={"danger"} onClick={this._toggle}>Add New</Button>
                    <Modal isOpen={this.state.modal} toggle={this._toggle} className={this.props.className}>
                        <ModalHeader toggle={this._toggle}>Add New Category</ModalHeader>
                        <ModalBody>
                            <Form onSubmit={this._handleSubmit}>
                                <FormGroup>
                                    <Label for="cateName">Category Name</Label>
                                    <Input type="text" name="cateName" id="cateName"
                                           placeholder="enter category name"
                                           onChange={this._handleChange}
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Label for="subCateName">Subcategory Name</Label>
                                    <Input type="text" name="subCateName" id="subCateName"
                                           placeholder="enter subcategory name"
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
                        <th>Category Name</th>
                        <th>Subcategory Name</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.categories.map((item, index) => (
                        <tr key={index}>
                            <td>{item.cateName}</td>
                            <td>{item.subCateName}</td>
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