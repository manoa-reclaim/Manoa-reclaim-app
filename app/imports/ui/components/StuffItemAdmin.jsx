import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { Bag } from 'react-bootstrap-icons';

/** Renders a single row in the List Stuff (Admin) table. See pages/ListStuffAdmin.jsx. */
const StuffItemAdmin = ({ stuff }) => (
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
    </Card.Body>
  </Card>
);

// Require a document to be passed to this component.
StuffItemAdmin.propTypes = {
  stuff: PropTypes.shape({
    name: PropTypes.string,
    date: PropTypes.string,
    email: PropTypes.string,
    description: PropTypes.string,
    location: PropTypes.string,
    _id: PropTypes.string,
    owner: PropTypes.string,
  }).isRequired,
};

export default StuffItemAdmin;
