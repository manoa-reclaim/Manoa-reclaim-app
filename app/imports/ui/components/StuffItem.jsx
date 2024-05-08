import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { Bag } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const StuffItem = ({ stuff }) => (
  <Card className="h-100">
    <Card.Header className="d-flex justify-content-center bg-dark">
      <Bag size={75} className="fs-5" />
    </Card.Header>
    <Card.Body>
      <Card.Title>{stuff.name}</Card.Title>
      <Card.Text>
        <ul>
          <li>Date found: {stuff.date}</li>
          <li>Location found: {stuff.location}</li>
          <li>Description: {stuff.description}</li>
        </ul>
      </Card.Text>
      <Link to={`/edit/${stuff._id}`}>Edit</Link>
    </Card.Body>
  </Card>
);

// Require a document to be passed to this component.
StuffItem.propTypes = {
  stuff: PropTypes.shape({
    name: PropTypes.string,
    date: PropTypes.string,
    email: PropTypes.string,
    description: PropTypes.string,
    location: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default StuffItem;
