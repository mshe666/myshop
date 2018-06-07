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
import {Breadcrumb, BreadcrumbItem} from 'reactstrap';
import {Collapse, CardBody, Card, Badge} from 'reactstrap';
import SearchIcon from '@material-ui/icons/Search';


class wellness extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            categories: [],
            brands: [],
            cateCollapse: true,
            brandCollapse: true,
            subCateFilter: [],
            brandFilter: [],
            searchBrand: null,

        };
        this._renderProducts = this._renderProducts.bind(this);
        this._renderBrands = this._renderBrands.bind(this);
        this._renderSubcategories = this._renderSubcategories.bind(this);
        this._loadCategories = this._loadCategories.bind(this);
        this._loadBrands = this._loadBrands.bind(this);
        this._toggleCate = this._toggleCate.bind(this);
        this._toggleBrand = this._toggleBrand.bind(this);
        this._toggleBrand = this._toggleBrand.bind(this);
    }

    _loadProducts = () => {
        firebase.database().ref('products').on('value', (data) => {
                const productList = [];

                data.forEach((item) => {
                    let pid = item.child('pid').val();
                    let pname = item.child('pname').val();
                    let pbrand = item.child('pbrand').val();
                    let pcate = item.child('pcate').val();
                    let psubcate = item.child('psubcate').val();
                    let pimage = item.child('pimage').val();
                    let pdes = item.child('pdes').val();
                    let pstore = item.child('pstore').val();

                    if (item != null && pid != null && pname != null && pcate === "wellness") {
                        productList.push({
                            pid: pid,
                            pname: pname,
                            pbrand: productList === null ? "Unkown" : pbrand,
                            pcate: pcate === null ? "Unknown" : pcate,
                            psubcate: psubcate === null ? "Unknown" : psubcate,
                            pimage: pimage === null ? "https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" : pimage,
                            pdes: pdes === null ? "No description" : pdes,
                            pstore: pstore === null ? 0 : pstore
                        });
                        // console.log("pushing " + pname + " to products");
                    }
                });

                this.setState({
                    products: productList
                });

                // console.log("this.sate.products = " + this.state.products);

                return true;
            }, (error => {
                console.log("loading products error! " + error);
            })
        );
    };

    _loadCategories = () => {
        firebase.database().ref('categories/wellness').on('value', (data) => {
                const cateList = [];

                data.forEach((item) => {
                    let cateName = item.child('subCateName').val();
                    if (!cateList.includes(cateName)) {
                        cateList.push(cateName);
                        // console.log("pushing " + cateName + " to categories");
                    }
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
                    let brandCate = item.child('brandCate').val() === null ? [] : item.child('brandCate').val();
                    if (brandCate.includes("wellness")) {
                        brandList.push(brandName);
                    }
                });

                this.setState({
                    brands: brandList
                });
            }, (error => {
                console.log("loading brands error! " + error);
            })
        );
    };

    _handelSubCateFilter = (subCate, event) => {

        // console.log("enter sub filter!");
        let subCateFilter = this.state.subCateFilter;


        event.target.active = !event.target.active;

        if (event.target.active) {
            event.target.classList.add("subCateListItem");
            if (!subCateFilter.includes(subCate)) {
                subCateFilter.push(subCate);
            }
        } else {
            event.target.classList.remove("subCateListItem");
            let index = subCateFilter.indexOf(subCate);
            subCateFilter.splice(index, 1);
        }

        this.setState({
            subCateFilter: subCateFilter
        });

    };

    _handelBrandFilter = (brand, event) => {

        // console.log("enter brand filter!");
        let brandFilter = this.state.brandFilter;


        event.target.active = !event.target.active;

        if (event.target.active) {
            event.target.classList.add("subCateListItem");
            if (!brandFilter.includes(brand)) {
                brandFilter.push(brand);
            }
        } else {
            event.target.classList.remove("subCateListItem");
            let index = brandFilter.indexOf(brand);
            brandFilter.splice(index, 1);
        }

        this.setState({
            brandFilter: brandFilter
        });

    };

    _renderProducts = () => {
        let products = this.state.products;
        let productsToLoad = [];
        let subCateFilter = this.state.subCateFilter;
        let brandFilter = this.state.brandFilter;

        // console.log(subCateFilter, brandFilter);
        if (subCateFilter.length === 0 && brandFilter.length === 0) {
            // console.log("enter []");
            productsToLoad = products;
        }else {
            // console.log("enter not []");
            products.forEach((item) => {
                let psubcate = item.psubcate;
                let pbrand = item.pbrand;

                if (this.state.subCateFilter.includes(psubcate) || this.state.brandFilter.includes(pbrand)) {
                    productsToLoad.push(item);
                }
            });
        }


        return (
            productsToLoad.map((item, index) => (
                <Item key={index} item={item}/>
            ))
        )

    };

    _renderBrands = () => {

        if (this.state.searchBrand === null) {
            return (
                this.state.brands.map((item, index) => (
                    <ListGroupItem key={index}
                                   onClick={this._handelBrandFilter.bind(this, item)}
                                   style={{cursor: 'pointer', }}
                                   active={false}
                    >
                        {item}
                    </ListGroupItem>
                ))
            );
        } else {
            let filteredBrands = [];
            this.state.brands.forEach((item) => {
                if (item.toLowerCase().includes(this.state.searchBrand.toLowerCase())) {
                    filteredBrands.push(item);
                }
            });

            return (
                filteredBrands.map((item, index) => (
                    <ListGroupItem key={index}
                                   onClick={this._handelBrandFilter.bind(this, item)}
                                   style={{cursor: 'pointer', }}
                                   active={false}
                    >
                        {item}

                    </ListGroupItem>
                ))
            );
        }

    };

    _renderSubcategories = () => {
        return (
            this.state.categories.map((item, index) => (
                <ListGroupItem key={index}
                               onClick={this._handelSubCateFilter.bind(this, item)}
                               style={{cursor: 'pointer', }}
                               active={false}
                >
                    {item}

                </ListGroupItem>
            ))
        );
    };

    _toggleCate() {
        this.setState({cateCollapse: !this.state.cateCollapse});
    }

    _toggleBrand() {
        this.setState({brandCollapse: !this.state.brandCollapse});
    }

    _handleChange = (event) => {
        if (event.target.value === "") {
            this.setState({[event.target.name]: null});
        } else {
            this.setState({[event.target.name]: event.target.value});
        }
    };

    componentWillMount() {
        this._loadProducts();
        this._loadCategories();
        this._loadBrands();
    }

    render() {

        return (
            <Container>
                <Row>
                    <Col xs={12} md={8} lg={3}>
                        <Breadcrumb tag="nav">
                            <BreadcrumbItem tag="a" href="/">Home</BreadcrumbItem>
                            <BreadcrumbItem active tag="a" href="/wellness">Wellness</BreadcrumbItem>
                        </Breadcrumb>
                    </Col>
                    <Col xs={12} md={8} lg={9}>
                        {this.state.products.length} products found!
                    </Col>
                </Row>
                <Row>
                    {/*search or filter brand*/}
                    <Col xs={12} md={8} lg={3}>

                        <Button color="info" onClick={this._toggleCate} style={{width: '100%', marginBottom: '1rem'}}>
                            <span style={{float: 'left'}}>Wellness</span>
                            <span style={{float: 'right'}}>{this.state.cateCollapse ? "less" : "more"}</span>
                        </Button>

                        <Collapse isOpen={this.state.cateCollapse}>
                            <ListGroup>
                                {this._renderSubcategories()}

                            </ListGroup>
                        </Collapse>

                        <br/>

                        <Button color="info" onClick={this._toggleBrand} style={{width: '100%', marginBottom: '1rem'}}>
                            <span style={{float: 'left'}}>Brands</span>
                            <span style={{float: 'right'}}>{this.state.brandCollapse ? "less" : "more"}</span>
                        </Button>

                        <Collapse isOpen={this.state.brandCollapse}>

                            <InputGroup>
                                <Input type={"text"} name={"searchBrand"} placeholder="Search Brand" onChange={this._handleChange}/>
                                <InputGroupAddon addonType="append"><Button
                                    color="secondary"><SearchIcon/></Button></InputGroupAddon>
                            </InputGroup>

                            <br/>
                            <Form>
                                <ListGroup>
                                    {this._renderBrands()}
                                </ListGroup>
                            </Form>
                        </Collapse>


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

export default wellness;
