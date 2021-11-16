import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';

class Header extends Component {

    render() {
        return (
            <div>
                <Navbar dark>
                    <div className="container">
                        <NavbarBrand href="/">Risotrante Con Fusion</NavbarBrand>
                    </div>
                </Navbar>
                <div className="p-5 mb-4 jumbotron rounded-3">
                    <div className="container-fluid py-5">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                                <h1> Ristorante Con Fusion</h1>
                                <p>We take inspiration from the World's best cuisines, and create a unique fusion experience. Our lipsmacking creations will tickle your culinary senses!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;