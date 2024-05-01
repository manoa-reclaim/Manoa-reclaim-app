import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Form, Button } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Stuffs } from '../../api/stuff/Stuff';
import StuffItem from '../components/StuffItem';
import LoadingSpinner from '../components/LoadingSpinner';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const ListLostItems = () => {
  const [nameSearchTerm, setNameSearchTerm] = useState('');
  const [dateSearchTerm, setDateSearchTerm] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);

  const { ready, stuffs } = useTracker(() => {
    const subscription = Meteor.subscribe(Stuffs.userPublicationName);
    const rdy = subscription.ready();

    const query = {};
    if (nameSearchTerm) {
      // Define search criteria for name
      const nameRegex = new RegExp(`^${nameSearchTerm}`, 'i'); // Start of string anchor (^)
      query.name = { $regex: nameRegex };
    }
    if (dateSearchTerm) {
      // Define search criteria for date
      const dateRegex = new RegExp(`^${dateSearchTerm}`, 'i'); // Start of string anchor (^)
      query.date = { $regex: dateRegex };
    }

    const options = {
      sort: { name: 1 }, // Sort by name in ascending order
    };

    const stuffItems = Stuffs.collection.find(query, options).fetch();
    return {
      stuffs: stuffItems,
      ready: rdy,
    };
  }, [nameSearchTerm, dateSearchTerm]);

  const handleFilterButtonClick = () => {
    setPanelOpen(!panelOpen);
  };

  return (
    ready ? (
      <Container id="list-lost-items-page" className="py-3">
        <Row className="justify-content-center">
          <Col>
            <Col className="text-center">
              <h2>User Items</h2>
              <Button variant="primary" onClick={handleFilterButtonClick}>Filter</Button>
              <div className={`collapse${panelOpen ? ' show' : ''}`}>
                <Form>
                  <Row className="mb-3">
                    <Col>
                      <Form.Control type="text" placeholder="Search by name" value={nameSearchTerm} onChange={(e) => setNameSearchTerm(e.target.value)} />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col>
                      <Form.Control type="text" placeholder="Search by date" value={dateSearchTerm} onChange={(e) => setDateSearchTerm(e.target.value)} />
                    </Col>
                  </Row>
                </Form>
              </div>
            </Col>
            <Row xs={1} md={2} lg={3} className="g-4">
              {stuffs.map((item) => (
                <Col key={item._id}>
                  <StuffItem stuff={item} />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    ) : <LoadingSpinner />
  );
};

export default ListLostItems;
