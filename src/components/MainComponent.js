import React, { Component } from 'react';
import Menu from './MenuComponent.js';
import Home from './HomeComponent.js';
import Contact from './ContactComponent.js';
import About from './AboutComponent.js';
import Header from './HeaderComponent.js';
import Footer from './FooterComponent.js';
import DishDetail from './DishDetailComponent.js';
import { Routes, Route, useParams } from 'react-router-dom';
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
                    <Route path="/home" element={<HomeWrapperComponent dishes={this.state.dishes}
                        promotions={this.state.promotions}
                        leaders={this.state.leaders} />} />
                    <Route exact path="/menu" element={<Menu dishes={this.state.dishes} /> } />}
                    <Route exact path="/contactus" element={<Contact /> } />
                    <Route exact path="/aboutus" element={<About leaders={this.state.leaders} /> } />
                    <Route path="/menu/:dishId" element={<DishWrapperComponent dishes={this.state.dishes} comments={this.state.comments} />}  />
                    <Route path="*" element={<HomeWrapperComponent dishes={this.state.dishes}
                        promotions={this.state.promotions}
                        leaders={this.state.leaders} />} />
                </Routes>
                <Footer />
            </div>
         );
    }
}

function DishWrapperComponent(props) {
    let { dishId } = useParams();
    return(
        <DishDetail dish={props.dishes.filter((dish) => dish.id === parseInt(dishId, 10))[0]}
                    comments={props.comments.filter((comment) => comment.dishId === parseInt(dishId, 10))} />
    );
}

function HomeWrapperComponent(props) {
    return(
        <Home dish={props.dishes.filter((dish) => dish.featured)[0]}
              promotion={props.promotions.filter((promo) => promo.featured)[0]}
              leader={props.leaders.filter((leader) => leader.featured)[0]} />
    );
}
export default Main;
