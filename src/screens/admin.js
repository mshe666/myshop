import React, {Component} from 'react';
import AdminHeader from '../components/adminHeader';
import {BrowserRouter} from 'react-router-dom';
import {Container} from 'reactstrap';
import AdminHome from '../screens/adminHome';
import AddProduct from "./addProduct";
import BrandAdmin from "./brandAdmin";
import CateAdmin from '../screens/cateAdmin';
import ProductAdmin from '../screens/productAdmin';
import {Route, Switch} from 'react-router';


class App extends Component {

    render() {

        return (
            <BrowserRouter>
                <Container xs={12}>
                    <AdminHeader/>
                    <Switch>
                        <Route path='/admin/home' component={AdminHome}/>
                        <Route path='/admin/brandadmin' component={BrandAdmin}/>
                        <Route path='/admin/cateadmin' component={CateAdmin}/>
                        <Route path='/admin/prodadmin' component={ProductAdmin}/>
                        <Route path='/admin/addproduct' component={AddProduct}/>
                    </Switch>
                </Container>

            </BrowserRouter>


        );
    }
}

export default App;
