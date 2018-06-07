import React, {Component} from 'react';
import Item from '../components/item';
import {Container, Row, Col, Button} from 'reactstrap';
import firebase from '../firebase/firebase';
import './screenStyles.css';
import {
    InputGroup,
    InputGroupAddon,
    Input,
    Form,
    FormGroup,
    Label,
} from 'reactstrap';
import {ListGroup, ListGroupItem} from 'reactstrap';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import SearchIcon from '@material-ui/icons/Search';


class category extends Component {

    constructor(props) {
        super();
        this.state = {
            products: [],
            filteredProducts: [],
            isFilterOn: false,
            categories: [],
            brands: [],

        };
        this._renderProducts = this._renderProducts.bind(this);
        this._renderBrands = this._renderBrands.bind(this);
        this._loadCategories = this._loadCategories.bind(this);
        this._loadBrands = this._loadBrands.bind(this);
    }

    _loadProducts = () => {
        firebase.database().ref('products').on('value', (data) => {
                const productList = [];

                data.forEach((item) => {
                    let pid = item.child('pid').val();
                    let pname = item.child('pname').val();
                    let pbrand = item.child('pbrand').val();
                    let pcate = item.child('pcate').val();
                    let pimage = item.child('pimage').val();
                    let pdes = item.child('pdes').val();
                    let pstore = item.child('pstore').val();

                    if (item != null && pid != null && pname != null) {
                        productList.push({
                            pid: pid,
                            pname: pname,
                            pbrand: productList === null ? "Unkown" : pbrand,
                            pcate: pcate === null ? "Unknown" : pcate,
                            pimage: pimage === null ? "https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" : pimage,
                            pdes: pdes === null ? "No description" : pdes,
                            pstore: pstore === null ? 0 : pstore
                        })
                    }
                });

                this.setState({
                    products: productList
                });
            }, (error => {
                console.log("loading products error! " + error);
            })
        );
    };

    _loadCategories = () => {
        firebase.database().ref('categories').on('value', (data) => {
                const cateList = [];

                data.forEach((item) => {
                    let cateName = item.child('cateName').val();
                    cateList.push(cateName);
                });

                this.setState({
                    categories: cateList
                });
            }, (error => {
                console.log("loading categories error! " + error);
            })
        );
    };

    _loadBrands = () => {
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

    _handlerCategoryFilter = (cate) => {
        let filteredProductList = [];
        let unFilteredProductList = this.state.products;
        if (cate === null) {
            this.setState({
                filteredProducts: unFilteredProductList
            });

        } else if (this.state.categories.includes(cate)) {

            unFilteredProductList.forEach((item) => {
                let pcate = item.pcate;
                if (pcate === cate) {
                    filteredProductList.push(item)
                }
            });
            this.setState({
                filteredProducts: filteredProductList,
                isFilterOn: true,
            });
        } else {
            unFilteredProductList.forEach((item) => {
                let pcate = item.pcate;
                if (!this.state.categories.includes(pcate)) {
                    filteredProductList.push(item)
                }
            });
            this.setState({
                filteredProducts: filteredProductList,
                isFilterOn: true,
            });
        }

    };

    _handlerBrandFilter = (brand) => {
        let filteredProductList = [];
        let unFilteredProductList = this.state.products;

        if (brand === null) {
            this.setState({
                filteredProducts: this.state.products
            });

        } else if (this.state.brands.includes(brand)) {

            unFilteredProductList.forEach((item) => {
                let pbrand = item.pbrand;

                if (pbrand === brand) {
                    filteredProductList.push(item)
                }
            });

            this.setState({
                filteredProducts: filteredProductList,
                isFilterOn: true,
            });

        } else {
            unFilteredProductList.forEach((item) => {
                let pbrand = item.pbrand;
                if (!this.state.brands.includes(pbrand)) {
                    filteredProductList.push(item)
                }
            });
            this.setState({
                filteredProducts: filteredProductList,
                isFilterOn: true,
            });
        }

    };

    _renderProducts = () => {
        if (this.state.isFilterOn) {
            return (
                this.state.filteredProducts.map((item) => (
                    <Item item={item}/>
                ))
            );
        } else {
            return (
                this.state.products.map((item) => (
                    <Item item={item}/>
                ))
            );
        }
    };

    _renderBrands = () => {
        return (
            this.state.brands.map((item) => (
                <ListGroupItem>
                    <FormGroup check>
                        <Label check>
                            <Input type="checkbox"/>
                            {item}
                        </Label>
                    </FormGroup>
                </ListGroupItem>
            ))
        );
    };

    componentWillMount() {
        this._loadProducts();
        this._loadCategories();
        this._loadBrands();
    }

    render() {

        return (
            <Container>
                {/*banner and search bar*/}
                <Row className={"itemCenter"}>
                    <Col xs={12} md={8} lg={3}>
                        <img width="100%"
                             src={"http://via.placeholder.com/350x100"}
                             alt="Website logo"/>
                    </Col>
                    <Col xs={12} md={8} lg={6}>
                        <InputGroup>
                            <Input placeholder="Search My Shop"/>
                            <InputGroupAddon addonType="append"><Button
                                color="secondary"><SearchIcon/></Button></InputGroupAddon>
                        </InputGroup>
                    </Col>
                    <Col xs={12} md={8} lg={3}>
                        <img width="100%"
                             src={"http://via.placeholder.com/350x100"}
                             alt="Website logo"/>
                    </Col>
                </Row>
                <br/>
                {/*<Row>*/}
                    {/*<div className={"itemCenter"}>Select Category:&nbsp;</div>*/}
                    {/*<Button color={"success"} onClick={this._handlerCategoryFilter.bind(this, null)}>All</Button>*/}
                    {/*{this.state.categories.map((item, index) => (*/}
                        {/*<span>&nbsp;&nbsp;<Button color={"success"}*/}
                                                  {/*onClick={this._handlerCategoryFilter.bind(this, item)}>{item}</Button></span>*/}
                    {/*))}*/}
                    {/*<span>&nbsp;&nbsp;<Button color={"success"}*/}
                                              {/*onClick={this._handlerCategoryFilter.bind(this, 'others')}>Others</Button></span>*/}
                {/*</Row>*/}
                {/*<br/>*/}

                <Row>
                    {/*search or filter brand*/}
                    <Col xs={12} md={8} lg={3}>
                        <Breadcrumb tag="nav">
                            <BreadcrumbItem tag="a" href="#">Home</BreadcrumbItem>
                            <BreadcrumbItem tag="a" href="#">Library</BreadcrumbItem>
                            <BreadcrumbItem tag="a" href="#">Data</BreadcrumbItem>
                            <BreadcrumbItem active tag="span">Bootstrap</BreadcrumbItem>
                        </Breadcrumb>



                        <InputGroup>
                            <Input placeholder="Search Brand"/>
                            <InputGroupAddon addonType="append"><Button
                                color="secondary"><SearchIcon/></Button></InputGroupAddon>
                        </InputGroup>
                        <Form>
                            <ListGroup>
                                {this._renderBrands()}

                            </ListGroup>
                        </Form>
                    </Col>

                    {/*product list*/}
                    <Col xs={12} md={8} lg={9}>
                        <Row>
                            {this._renderProducts()}
                        </Row>
                    </Col>
                </Row>

            </Container>
        );
    }
}

export default category;
