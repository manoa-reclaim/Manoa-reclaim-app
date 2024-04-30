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
  const { ready } = useTracker(() => {
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Stuffs.adminPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const lostItems = Stuffs.collection.find({}).fetch();
    return {
      stuffs: lostItems,
      ready: rdy,
    };
  }, []);
  // DELETE THIS LIST LATER
  const itemList = [
    { name: 'Basket', date: '4/22', email: 'john@foo.com', description: 'woven basket', location: 'other', owner: 'john@foo.com' },
    { name: 'Boogie Board', date: '3/12', email: 'john@foo.com', description: 'big boogie board', location: 'Campus Center', owner: 'admin@foo.com' },
    { name: 'Macbook Air', date: '4/06', email: 'ksutton2@hawaii.edu', description: 'Space Grey model, no case or cover. Wallpaper is a picture of a beach', location: 'Hamilton Library', owner: 'admin@foo.com' },
    { name: 'Sony Headphones', date: '3/12', email: 'ksutton2@hawaii.edu', description: 'Black WH-1000XM4', location: 'POST', owner: 'admin@foo.com' },
  ];
  return (ready ? (
    <Container id="list-lost-items-admin-page" className="py-3">
      <Row className="justify-content-center">
        <Col>
          <Col className="text-center"><h2>All Items</h2></Col>
          <Row xs={1} md={2} lg={3} className="g-4">
            {itemList.map((item, index) => (<Col key={index}><StuffItemAdmin stuff={item} /></Col>))}
          </Row>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListStuffAdmin;
