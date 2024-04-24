import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <Container id="landing-page" fluid className="py-3">
    <Row className="align-middle text-center">
      <Col sm={8} className="d-flex flex-column justify-content-center">
        <h1>Welcome to Manoa Reclaim</h1>
        <p>Work in Progress!</p>
      </Col>
    </Row>
    <Row>
      <Col sm={8} className="py-3 text-center">
        <p>Found something someone may have lost? Make sure to drop it off at the Hamilton Library!</p>
        <p>Help us get it back to the correct owner!</p>
      </Col>
      <Col>
        <Image src="" width="150px" alt="Card Example" />
      </Col>
    </Row>
    <Row className="align-middle text-center">
      <Col sm={4}>
        <Image src="/images/sign-in.png" width="200px" alt="log in or sign up page image" />
      </Col>
      <Col sm={8} className="py-3 text-center">
        <p> You can log in from right up button or crick <a href="/signin">here</a></p>
        <p>If you are first time to visit, please sign up from  right up button or crick <a href="/signup">here</a></p>
        <p>If you&apos;d like to learn more about how to use it, please visit <a href="https://manoa-reclaim.github.io/">our homepage</a>.</p>
      </Col>
    </Row>
  </Container>
);

export default Landing;
