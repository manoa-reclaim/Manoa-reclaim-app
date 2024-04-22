import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import { LostItems } from '../../api/contact/LostItems';
import LostItem from '../components/LostItem';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const ListItemsAdmin = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, lostItems } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(LostItems.adminPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const Items = LostItems.collection.find({}).fetch();
    return {
      lostItems: Items,
      ready: rdy,
    };
  }, []);

  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col md={10}>
          <Col className="text-center">
            <h2>Lost Items</h2>
          </Col>
          <Row xs={1} md={2} lg={3} className="g-4">
            {lostItems.map((lostItem) => (<Col key={lostItem._id}><LostItem lostItem={lostItem} /></Col>))}
          </Row>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListItemsAdmin;
