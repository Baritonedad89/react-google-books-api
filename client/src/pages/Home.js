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
        search: "",
        loading: false,
    };

    componentDidMount() {
        console.log('--component did mount')
        this.searchBooks("1984")
    }

    // componentDidUpdate() {
    //     console.log('--component did update')
    // }

    searchBooks = query => {
        this.setState({ loading: true })
        API
            .callGoogle(query)
            .then(res => this.setState({ loading: false, result: res.data }))
            .catch(err => console.log(err));
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
        this.searchBooks(this.state.search);
        console.log(this.state.search)
        this.setState({
            search: ""
        })
    };

    

    saveBook = (e) => {
        const thisCardsId = e.target.getAttribute('data-id');
        const newSavedBook = this.state.result
            .filter(result => result.id === thisCardsId)
            .map(book => {
                API.saveBook({
                    title: book.volumeInfo.title,
                    authors: book.volumeInfo.authors,
                    description: book.volumeInfo.description,
                    image: book.volumeInfo.imageLinks.smallThumbnail,
                    link: book.volumeInfo.infoLink,
                })
            })
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


                            <CardWrapper>
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