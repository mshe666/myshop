import React from 'react';
import {Button, Form, FormGroup, Label, Input, FormText, Container, Row, Col} from 'reactstrap';
import firebase from "../firebase/firebase";

export default class addProduct extends React.Component {

    constructor(props) {
        super();
        this.state = {
            brands: [],
            categories: [],
            subCategories: [],
            pid: null,
            pname: null,
            pbrand: null,
            pcate: null,
            psubcate: null,
            pimage: null,
            pdes: null,
            pstore: null,
        };

        this._loadBrand = this._loadBrand.bind(this);
        this._loadCategories = this._loadCategories.bind(this);
        this._handleChange = this._handleChange.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
    }

    s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    };

    _generateUUID = () => {
        let uuid = this.s4() + '-' + this.s4() + '-' + this.s4();
        this.setState({uuid: uuid});

        return uuid;
    };

    _handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
        if (event.target.name === 'pcate') {
            this._loadSubcategories(event.target.value);
        }
    };

    _loadBrand = () => {
        firebase.database().ref('brands').on('value', (data) => {
                const brandList = [];

                data.forEach((item) => {
                    let brandName = item.child('brandName').val();
                    brandList.push(brandName);
                });

                this.setState({
                    brands: brandList
                });
            }, (error => {
                console.log("loading brands error! " + error);
            })
        );
    };

    _loadCategories = () => {
        firebase.database().ref('categories').on('value', (data) => {
                const cateList = [];

                data.forEach((item) => {
                    item.forEach((subitem) => {
                        let cateName = subitem.child('cateName').val();
                        if (!cateList.includes(cateName)) {
                            cateList.push(cateName);
                        }
                        // console.log("pushing " + cateName + " to cateList");
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

    _loadSubcategories = (cate) => {
        if (cate === null || cate === "select a category") {
            firebase.database().ref('categories').on('value', (data) => {
                    const subCateList = [];

                    data.forEach((item) => {
                        item.forEach((subitem) => {
                            let subCateName = subitem.child('subCateName').val();
                            subCateList.push(subCateName);
                            // console.log("pushing " + subCateName + " to subCateList");
                        })
                    });

                    this.setState({
                        subCategories: subCateList
                    });
                }, (error => {
                    console.log("loading subcategories error! " + error);
                })
            );
        }else {
            firebase.database().ref('categories/' + cate).on('value', (data) => {
                    const subCateList = [];

                    data.forEach((item) => {
                        let subCateName = item.child('subCateName').val();
                        subCateList.push(subCateName);
                        console.log("pushing " + subCateName + " to subCateList");
                    });

                    this.setState({
                        subCategories: subCateList
                    });
                }, (error => {
                    console.log("loading subcategories error! " + error);
                })
            );
        }
    };

    componentWillMount() {
        this._loadBrand();
        this._loadCategories();
        this._loadSubcategories(null);
    }

    _handleSubmit = () => {

        if (this.state.pname === null) {
            alert("Product name cannot be empty!");
        } else {
            let pid = this._generateUUID();
            this.setState({
                pid: pid
            });

            let product = {
                pid: pid,
                pname: this.state.pname,
                pbrand: this.state.pbrand === null ? "Unknown" : this.state.pbrand,
                pcate: this.state.pcate === null ? "Unknown" : this.state.pcate,
                psubcate: this.state.psubcate === null ? "Unknown" : this.state.psubcate,
                pimage: this.state.pimage,
                pdes: this.state.pdes === null ? "No Description" : this.state.pdes,
                pstore: this.state.pstore === null ? 0 : this.state.pstore,
            };

            firebase.database().ref('products/' + pid).set(product).then(() => {
                // alert('INSERTED! product=' + product);
            }).catch(error => {
                alert("Fail to ave a product! error = " + error);
            });

            console.log("finish inserting products and start to modify brands");
            let brandCate = "";
            firebase.database().ref('brands/' + product.pbrand).on('value', (data) => {
                    brandCate = data.child('brandCate').val() === null ? [] : data.child('brandCate').val();
                }
            );

            if (!brandCate.includes(product.pcate)) {
                brandCate.push(product.pcate);
                console.log("pushing " + product.pcate + " to " + brandCate);
            }

            let newBrand = {
                brandName: product.pbrand,
                brandCate: brandCate,
            };

            firebase.database().ref('brands/' + product.pbrand).update(newBrand).then(() => {
                // alert('UPDATED! product=' + product);
            }).catch(error => {
                alert("Fail to ave a product! error = " + error);
            });

            this.props.history.push('/admin/prodadmin');

        }
    };

    render() {
        return (
            <Container>
                <Row>
                    <Col xs={12}>
                        <div>
                            <Form onSubmit={this._handleSubmit}>
                                <FormGroup>
                                    <Label for="pname">Product Name</Label>
                                    <Input type="text" name="pname" id="pname" placeholder="enter product name"
                                           onChange={this._handleChange}/>
                                </FormGroup>

                                <FormGroup>
                                    <Label for="pbrand">Select Brand</Label>
                                    <Input type="select" name="pbrand" id="pbrand" onChange={this._handleChange}>
                                        <option key={"defaultBrand"}>{"select a brand"}</option>
                                        {this.state.brands.map((item, index) => (
                                            <option key={index}>{item}</option>
                                        ))}
                                    </Input>
                                </FormGroup>

                                <FormGroup>
                                    <Label for="pcate">Select Category</Label>
                                    <Input type="select" name="pcate" id="pcate" onChange={this._handleChange}>
                                        <option key={"defaultCate"}>{"select a category"}</option>
                                        {this.state.categories.map((item, index) => (
                                            <option key={index}>{item}</option>
                                        ))}
                                    </Input>
                                </FormGroup>

                                <FormGroup>
                                    <Label for="psubcate">Select Subcategory</Label>
                                    <Input type="select" name="psubcate" id="psubcate" onChange={this._handleChange}>
                                        <option key={"defaultCate"}>{"select a subcategory"}</option>
                                        {this.state.subCategories.map((item, index) => (
                                            <option key={index}>{item}</option>
                                        ))}
                                    </Input>
                                </FormGroup>

                                <FormGroup>
                                    <Label for="pstore">Store</Label>
                                    <Input type="number" name="pstore" id="pstore" placeholder="enter product store"
                                           onChange={this._handleChange}/>
                                </FormGroup>

                                <FormGroup>
                                    <Label for="pdes">Description</Label>
                                    <Input type="textarea" name="pdes" id="pdes" onChange={this._handleChange}/>
                                </FormGroup>

                                <FormGroup>
                                    <Label for="pimage">File</Label>
                                    <Input type="file" name="pimage" id="pimage" onChange={this._handleChange}/>
                                    <FormText color="muted">
                                        This is some placeholder block-level help text for the above input.
                                        It's a bit lighter and easily wraps to a new line.
                                    </FormText>
                                </FormGroup>

                                <Button>Submit</Button>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}