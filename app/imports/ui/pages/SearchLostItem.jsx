import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Form, Row, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import StuffItem from '../components/StuffItem';
import LoadingSpinner from '../components/LoadingSpinner'; // Import LoadingSpinner component
import { Stuffs } from '../../api/stuff/Stuff';

const SearchLostItem = () => {
  const { ready, stuffs } = useTracker(() => {
    const subscription = Meteor.subscribe(Stuffs.userPublicationName);
    const rdy = subscription.ready();
    const stuffItems = Stuffs.collection.find({}).fetch();
    return {
      stuffs: stuffItems,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center">
            <h2>Search Lost Items</h2>
          </Col>
          <Form>
            <Form.Group controlId="description">
              <Form.Label>Description of Lost Item:</Form.Label>
              <Form.Control as="textarea" rows="3" />
            </Form.Group>
            <Form.Group controlId="image">
              <Form.Label>Insert Image (optional):</Form.Label>
              <Form.Control type="file" />
            </Form.Group>
          </Form>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Color</th>
                <th>Date Lost</th>
                <th>Description</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {stuffs.map((stuff) => <StuffItem key={stuff._id} stuff={stuff} />)}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default SearchLostItem;
