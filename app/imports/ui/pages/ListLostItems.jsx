import React, { useState, useRef, useEffect } from 'react';
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
  const [collapseOpen, setCollapseOpen] = useState(false);

  const inputRef = useRef(null); // Ref for the input field

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

  useEffect(() => {
    // Refocus on the input field after updating the search term
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [nameSearchTerm, dateSearchTerm]); // Run this effect whenever the search terms change

  const handleFilterButtonClick = () => {
    setCollapseOpen(!collapseOpen);
  };

  return (
    ready ? (
      <Container id="list-lost-items-page" className="py-3">
        <Row className="justify-content-center">
          <Col>
            <Col className="text-center">
              <h2>User Items</h2>
              <Button variant="primary" style={{ backgroundColor: '#1D7B60', borderColor: '#1D7B60', color: '#000000' }} onClick={handleFilterButtonClick}>Filter</Button>
              <div className={`collapse${collapseOpen ? ' show' : ''}`}>
                <Form>
                  <Row className="mb-3">
                    <Col>
                      <Form.Control
                        type="text"
                        placeholder="Search by name"
                        value={nameSearchTerm}
                        onChange={(e) => setNameSearchTerm(e.target.value)}
                        ref={inputRef} // Assign the ref to the input field
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col>
                      <Form.Control
                        type="text"
                        placeholder="Search by date"
                        value={dateSearchTerm}
                        onChange={(e) => setDateSearchTerm(e.target.value)}
                      />
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
