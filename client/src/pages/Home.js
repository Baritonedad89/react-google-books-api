import React, { Component } from 'react'
import API from '../services/API'

import Navbar from '../components/Navbar'
import Container from '../components/Container'
import Row from '../components/Row'
import Jumbotron from '../components/Jumbotron';
import Col from '../components/Col'
import Searchbar from '../components/Searchbar'
import Card from '../components/Card'
import CardWrapper from '../components/CardWrapper'



class Home extends Component {
    state = {
        result: [],
        // dbSavedBooks: [],
        search: "",
        loading: false,

    };



    searchBooks = query => {
        // start UI spinner
        this.setState({ loading: true, result: [] })

        // make a call to google books api
        API
            .callGoogle(query)
            .then(books => {
                // if the response is > 0
                if (books.data.length > 0) {
                    // stop the UI spinner
                    this.setState({ loading: false });
                    console.log(books.data)

                    // make a call to my database and retrieve all books stored 
                    API.getBooks({})
                        .then(dbBooks => {
                            // empty array to hold all of the books 
                            const dbBooksIds = [];
                            // iterate over stored books and push book ids to empty array 
                            dbBooks.data.forEach(book => {
                                dbBooksIds.push(book.bookId)
                            });
                            // filter all of the stored books and return books where stored book id doesn't match id coming from google api call 
                            const filteredBooks = books.data.filter(book => !dbBooksIds.includes(book.id));

                            //  set new state for result
                            this.setState({
                                result: filteredBooks
                            })


                        })
                    // .catch(err => {
                    //     console.log(err)
                    // })
                } else {
                    this.setState({
                        books: []
                    });
                }
            })
    }

    handleInputChange = e => {
        const value = e.target.value;
        // const name = e.target.name;
        this.setState({
            search: value
        });
    };

    // When the form is submitted, search the OMDB API for the value of `this.state.search`
    handleFormSubmit = e => {
        e.preventDefault();
        // run google call with search parameter 
        this.searchBooks(this.state.search);
        console.log(this.state.search)
        this.setState({
            search: ""
        })
    };



    saveBook = (e) => {
        // get the id of the book when 'save' is clicked 
        const thisCardsId = e.target.getAttribute('data-id');
        console.log(thisCardsId)

        const newSavedBook = this.state.result
        // filter this.state.result to return books where the id is the same as the book clicked 
        newSavedBook
            .filter(result => result.id === thisCardsId)
            // then map over book and create a new object to send to the database 
            .map(book => {
                const newBook = {
                    bookId: book.id,
                    title: book.volumeInfo.title,
                    authors: book.volumeInfo.authors,
                    description: book.volumeInfo.description,
                    image: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.smallThumbnail : null,
                    link: book.volumeInfo.infoLink
                }
                // save book then remove from the result state
                API.saveBook(newBook)
                    .then(() => {
                        this.setState((state) => {
                            // find which book to remove by finding the book in the result array that matches the clicked book
                            const bookToRemove = state.result.find(book => book.id === newBook.bookId);
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
            });
    }


    render() {
        if (this.state.loading) {
            return (
                <div>
                    <Navbar />
                    <Jumbotron>
                        <Searchbar />
                    </Jumbotron>
                    <div className="row">
                        <div className="col l12 center align">
                            <div class="preloader-wrapper big active">
                                <div class="spinner-layer spinner-blue-only">
                                    <div class="circle-clipper left">
                                        <div class="circle"></div>
                                    </div><div class="gap-patch">
                                        <div class="circle"></div>
                                    </div><div class="circle-clipper right">
                                        <div class="circle"></div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>
            )


        }
        // else 
        return (

            <div>
                <Navbar />
                <Jumbotron>
                    <Searchbar
                        value={this.state.search}
                        handleInputChange={this.handleInputChange}
                        handleFormSubmit={this.handleFormSubmit}
                    />

                </Jumbotron>

                <Container>
                    <Row>
                        <Col>


                            <CardWrapper title={'Results'}>



                                {this.state.result.map(result => (
                                    <Card
                                        key={result.id}
                                        url={result.volumeInfo.imageLinks ? result.volumeInfo.imageLinks.smallThumbnail : "https://via.placeholder.com/128x124"}
                                        name={result.volumeInfo.title}
                                        author={result.volumeInfo.authors}
                                        infoLink={result.volumeInfo.infoLink}
                                        desc={result.volumeInfo.description ? result.volumeInfo.description : "No description"}
                                        handleBookSave={this.saveBook}
                                        id={result.id}
                                        leftButton={"View"}
                                        rightButton={"Save"}
                                    />

                                ))}


                            </CardWrapper>



                        </Col>
                    </Row>
                </Container>
            </div>


        )
    }
}






export default Home