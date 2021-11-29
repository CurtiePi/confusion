import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, FormFeedback } from 'reactstrap';

class CommentForm extends Component {
    constructor(props) {
       super(props);

        this.state = {
            isModalOpen: false,
            touched: {
                author: false
            },
            errors: {
                author: ''
            }
        }

        this.toggleModal = this.toggleModal.bind(this);
        this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.validateUsername = this.validateUsername.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleCommentSubmit(event) {
        this.toggleModal();
        this.props.addComment(this.props.dishId, this.rating.value, this.author.value, this.comment.value);
        event.preventDefault();
    }

    handleBlur = (evt) => {
        const field = evt.target.name;
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        });

    }

    validateUsername = (evt) => {
        const field = evt.target.name;

        if (this.state.touched.author && evt.target.value.length < 3){
            console.log('Too short');
            this.setState({
                errors: {...this.state.errors, [field]: 'Your name should be >= 3 characters'}
            });
        }
        else if (this.state.touched.author && evt.target.value.length > 15){
            console.log('Too long');
            this.setState({
                errors: {...this.state.errors, [field]: 'Your Name should be <= 15 characters'}
            });
        }
        else {
            this.setState({
                errors: {...this.state.errors, [field]: ''}
            });
        }


    }

    render() {


        return (
            <div>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"></span>{' '}Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                        <ModalBody>
                            <Form onSubmit={this.handleCommentSubmit}>
                                <FormGroup>
                                    <Label htmlFor="rating">Rating</Label>
                                    <Input type="select" id="rating" name="rating"
                                        innerRef={(input) => this.rating = input }
                                    >
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="author">Your Name</Label>
                                    <Input type="text" id="author" name="author"
                                        innerRef={(input) => this.author = input }
                                        valid={this.state.errors.author === ''}
                                        invalid={this.state.errors.author !== ''}
                                        onBlur={(e) => {
                                                this.handleBlur(e);
                                                this.validateUsername(e);
                                            }
                                        }
                                        
                                    />
                                    <FormFeedback>{this.state.errors.author}</FormFeedback>
                                </FormGroup>
                                <FormGroup row> 
                                    <Label htmlFor="comment">Comment</Label>
                                        <Input type="textarea" name="comment"
                                            rows="8"
                                            innerRef={(input) => this.comment = input }
                                        />
                                </FormGroup>
                                <Button type="submit" value="submit" color="primary">Submit</Button>
                            </Form>
                        </ModalBody>
                </Modal>
            </div>
        );
    }

   
}

export default CommentForm;
