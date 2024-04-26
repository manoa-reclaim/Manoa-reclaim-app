import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Col, Container, Row } from 'react-bootstrap';
import { Stuffs } from '../../api/stuff/Stuff';
import StuffItemAdmin from '../components/StuffItemAdmin';
import LoadingSpinner from '../components/LoadingSpinner';

/* Renders a table containing all of the Stuff documents. Use <StuffItemAdmin> to render each row. */
const ListStuffAdmin = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { lostItems, ready } = useTracker(() => {
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Stuffs.adminPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const items = Stuffs.collection.find({}).fetch();
    return {
      lostItems: items,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container id="list-lost-items-admin-page" className="py-3">
      <Row className="justify-content-center">
        <Col>
          <Col className="text-center"><h2>List Stuff (Admin)</h2></Col>
          <Row xs={1} md={2} lg={3} className="g-4">
            {lostItems.map((item) => (<Col key={item._id}><StuffItemAdmin stuff={item} /></Col>))}
          </Row>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListStuffAdmin;
