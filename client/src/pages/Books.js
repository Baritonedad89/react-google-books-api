import React, { Component } from 'react'
import API from '../services/API'
import Container from '../components/Container'
import Row from '../components/Row'
import Col from '../components/Col'
import { Link } from "react-router-dom";
import { Modal, Button } from 'react-materialize'
import Alert from '../components/Alert'
import Jumbotron from '../components/Jumbotron';
import Navbar from '../components/Navbar'
import CardWrapper from '../components/CardWrapper'
import Card from '../components/Card'


class Books extends Component {
    state = {
        result: [],
    }

    componentDidMount() {
        API
            .getBooks()
            .then(res => this.setState({ result: res.data }))
            .catch(err => console.log(err))
    }

    componentDidUpdate() {
        console.log(this.state.result);
    }

    deleteBook = e => {
        // get the id of the book when 'delete' is clicked 
        const thisCardsId = e.target.getAttribute('data-id');
        console.log(thisCardsId);

        // delete book with the given id 
        API.deleteBook(thisCardsId)
            .then(() => {
                console.log('book deleted')
                this.setState((state) => {
                    // find which book to remove from state by finding the book in the result array that matches the clicked book's id
                    const bookToRemove = state.result.find(book => book.id === thisCardsId);
                    // find the index of that book in the result array
                    const indexofBookToRemove = state.result.indexOf(bookToRemove);
                    // then delete that one item
                    state.result.splice(indexofBookToRemove, 1);
                    // update the state 
                    return {
                        result: state.result
                    }
                })
            })
            {window.$('#foo').modal('open')}
    }


    render() {
        return (
            <div>
                <Navbar />
                <Jumbotron></Jumbotron>
                <Container>
                    <Row>
                        <Col>
                            <CardWrapper count={this.state.result.length}  title={'Saved Books'} message={this.state.result == 0 ? 'No saved books!' : null}>
                                {this.state.result.map(result => (
                                    <Card
                                        key={result._id}
                                        url={result.image ? result.image : "https://via.placeholder.com/128x193.png/000000/FFFFFF?text=No+Picture!"}
                                        name={result.title}
                                        author={result.authors}
                                        infoLink={result.link}
                                        desc={result.description ? result.description : "No description"}
                                        id={result._id}
                                        handleBookDelete={this.deleteBook}
                                        leftButton={"View"}
                                        rightButton={"Delete"}
                                    />

                                ))}
                            </CardWrapper>
                            <Alert modalMessage={'Book deleted!'}/>
                        </Col>
                    </Row>

                </Container>
            </div>
        )
    }
}



export default Books