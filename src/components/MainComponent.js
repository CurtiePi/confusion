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
import { addComment, fetchDishes, fetchComments, fetchPromos } from '../redux/ActionCreators.js';

const mapStateToProps = state => {
    return{
        dishes: state.dishes,
        comments: state.comments,
        leaders: state.leaders,
        promotions: state.promotions,
    }
}

const mapDispatchToProps = (dispatch) => ({
    addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
    fetchDishes: () => {dispatch(fetchDishes())},
    fetchComments: () => {dispatch(fetchComments())},
    fetchPromos: () => {dispatch(fetchPromos())},
});

class Main extends Component {

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
    }

    render() {
        return (
            <div>
                <Header />
                <Routes>
                    <Route path="/home" element={<HomeWrapperComponent dishes={this.props.dishes.dishes}
                        promotions={this.props.promotions.promotions}
                        leaders={this.props.leaders}
                        dishesLoading={this.props.dishes.isLoading}
                        dishesErrMess={this.props.dishes.errMess}
                        promosLoading={this.props.promotions.isLoading}
                        promosErrMess={this.props.promotions.errMess} /> }
                    />
                    <Route exact path="/menu" element={<Menu dishes={this.props.dishes} /> } />}
                    <Route exact path="/contactus" element={<Contact /> } />
                    <Route exact path="/aboutus" element={<About leaders={this.props.leaders} /> } />
                    <Route path="/menu/:dishId" element={<DishWrapperComponent dishes={this.props.dishes.dishes}
                        comments={this.props.comments.comments}
                        addComment={this.props.addComment}
                        dishesLoading={this.props.dishes.isLoading}
                        dishesErrMess={this.props.dishes.errMess} /> }
                        commentsErrMess={this.props.comments.errMess} /> }
                        />} 
                    />
                    <Route path="*" element={<HomeWrapperComponent dishes={this.props.dishes.dishes}
                        promotions={this.props.promotions.promotions}
                        leaders={this.props.leaders}
                        dishesLoading={this.props.dishes.isLoading}
                        dishesErrMess={this.props.dishes.errMess}
                        promosLoading={this.props.promotions.isLoading}
                        promosErrMess={this.props.promotions.errMess} 
                        />}
                    />
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
                    comments={props.comments.filter((comment) => comment.dishId === parseInt(dishId, 10))}
                    addComment={props.addComment}
                    isLoading={props.dishesLoading}
                    errMess={props.dishesErrMess}
                    commentsErrMess={props.commentsErrMess}
        />
    );
}

function HomeWrapperComponent(props) {
    return(
        <Home dish={props.dishes.filter((dish) => dish.featured)[0]}
              promotion={props.promotions.filter((promo) => promo.featured)[0]}
              leader={props.leaders.filter((leader) => leader.featured)[0]}
              dishesLoading={props.dishesLoading}
              dishesErrMessage={props.dishesErrMess}
              promosLoading={props.promosLoading}
              promosErrMessage={props.promosErrMess}
        />
    );
}
export default connect(mapStateToProps, mapDispatchToProps)(Main);
