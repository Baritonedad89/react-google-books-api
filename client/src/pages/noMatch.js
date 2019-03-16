import React from "react";
import Navbar from '../components/Navbar'
import Container from '../components/Container'
import Row from '../components/Row'
import Jumbotron from '../components/Jumbotron';
import Col from '../components/Col'

function NoMatch() {
  return (
<div>
            <Navbar />
                <Jumbotron>

                <h1>404 Page Not Found</h1>
            <h1>
              <span role="img" aria-label="Face With Rolling Eyes Emoji">
                🙄
              </span>
            </h1>
                </Jumbotron>
                <Container>
                    <Row>
                        <Col>
                            
                        </Col>
                    </Row>

                </Container>
            </div>

  );
}

export default NoMatch;