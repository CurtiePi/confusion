import React, { Component } from 'react';
import Menu from './MenuComponent.js';
import Home from './HomeComponent.js';
import Contact from './ContactComponent.js';
import About from './AboutComponent.js';
import Header from './HeaderComponent.js';
import Footer from './FooterComponent.js';
import DishDetail from './DishDetailComponent.js';
import { Routes, Route, useParams } from 'react-router-dom';
import { connect } from 'react-redux';


const mapStateToProps = state => {
    return{
        dishes: state.dishes,
        comments: state.comments,
        leaders: state.leaders,
        promotions: state.promotions,
    }
}

class Main extends Component {

    render() {
        return (
            <div>
                <Header />
                <Routes>
                    <Route path="/home" element={<HomeWrapperComponent dishes={this.props.dishes}
                        promotions={this.props.promotions}
                        leaders={this.props.leaders} />} />
                    <Route exact path="/menu" element={<Menu dishes={this.props.dishes} /> } />}
                    <Route exact path="/contactus" element={<Contact /> } />
                    <Route exact path="/aboutus" element={<About leaders={this.props.leaders} /> } />
                    <Route path="/menu/:dishId" element={<DishWrapperComponent dishes={this.props.dishes} comments={this.props.comments} />}  />
                    <Route path="*" element={<HomeWrapperComponent dishes={this.props.dishes}
                        promotions={this.props.promotions}
                        leaders={this.props.leaders} />} />
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
export default connect(mapStateToProps)(Main);
