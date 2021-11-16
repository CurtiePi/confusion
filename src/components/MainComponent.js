import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Menu from './MenuComponent.js';
import Home from './HomeComponent.js';
import Header from './HeaderComponent.js';
import Footer from './FooterComponent.js';
import DishDetail from './DishDetailComponent.js';
import { Routes, Route } from 'react-router-dom';
import { DISHES } from '../shared/dishes';

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dishes: DISHES,
            selectedDish: null
        };
    }

    onDishSelected(dishId) {
        this.setState({selectedDish: dishId});
    }

    render() {
        return (
            <div>
                <Header />
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route exact path="/menu" element={<Menu dishes={this.state.dishes} /> } />}
                    <Route path="*" element={<Home />} />
                </Routes>
                <Footer />
            </div>
         );
    }
}

export default Main;
