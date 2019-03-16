import React, { Component } from 'react'
import API from '../services/API'
import Container from '../components/Container'
import Row from '../components/Row'
import Col from '../components/Col'
import { Link } from "react-router-dom";

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
            .then(res => this.setState({result: res.data}))
            .catch(err => console.log(err))
    }
    
    componentDidUpdate(){
        console.log(this.state.result);
    }

    

    render() {
        return (
            <div>
            <Navbar />
                <Jumbotron></Jumbotron>
                <Container>
                    <Row>
                        <Col>
                            <CardWrapper title={'Saved Books'}>
                            {this.state.result.map(result => (
                                    <Card
                                        key={result._id}
                                        url={result.image ? result.image : "https://via.placeholder.com/128x124"}
                                        name={result.title}
                                        author={result.authors}
                                        infoLink={result.link}
                                        desc={result.description ? result.description : "No description"}
                                        id={result._id}
                                        leftButton={"View"}
                                        rightButton={"Delete"}
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



export default Books