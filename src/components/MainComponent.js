import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Menu from './MenuComponent.js';
import Home from './HomeComponent.js';
import Contact from './ContactComponent.js';
import Header from './HeaderComponent.js';
import Footer from './FooterComponent.js';
import DishDetail from './DishDetailComponent.js';
import { Routes, Route } from 'react-router-dom';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { LEADERS } from '../shared/leaders';
import { PROMOTIONS } from '../shared/promotions';

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dishes: DISHES,
            comments: COMMENTS,
            leaders: LEADERS,
            promotions: PROMOTIONS,
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
                    <Route path="/home" element={<Home dish={this.state.dishes.filter((dish) => dish.featured)[0]}
                        promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
                        leader={this.state.leaders.filter((leader) => leader.featured)[0]} />} />
                    <Route exact path="/menu" element={<Menu dishes={this.state.dishes} /> } />}
                    <Route exact path="/contactus" element={<Contact /> } />}
                    <Route path="*" element={<Home dish={this.state.dishes.filter((dish) => dish.featured)[0]}
                        promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
                        leader={this.state.leaders.filter((leader) => leader.featured)[0]} />} />
                </Routes>
                <Footer />
            </div>
         );
    }
}

export default Main;
