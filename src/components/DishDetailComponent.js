import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import CommentForm from './CommentFormComponent.js';

function RenderDish({ dish }) {
    return(
        <div className="col-12 col-md-5 m-1">
            <Card>
                <CardImg width="100%" src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </div>
    );
};


function RenderComments({ comments }) {
    const formatDate = (dateStr) =>  {
        const options = {
            year: 'numeric',
            month: 'short',
            day: '2-digit'
        };
        let dateObj = new Date(Date.parse(dateStr));
        return new Intl.DateTimeFormat('en-US', options).format(dateObj);
    };

    if (comments !== null) {
        const commentItems = comments.map((dishComment) => {
            return(
                <li key={dishComment.id} className="mb-4">
                    {dishComment.rating} stars - {dishComment.comment}
                    <br />-- {dishComment.author} {formatDate(dishComment.date)}
                </li>
            )});

        return (
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        {commentItems}
                    </ul>
                    <CommentForm />
                </div>
        );
    }
    else {
        return(
            <div>
                <CommentForm />
            </div>
        );
    }
};

const DishDetail = (props) => {
        if (props.dish !== undefined){
            return (
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <RenderDish dish={props.dish} />
                        <RenderComments comments={props.comments} />
                    </div>
                </div>
            );
        } else {
            return(<div></div>);
        }
}

export default DishDetail;
