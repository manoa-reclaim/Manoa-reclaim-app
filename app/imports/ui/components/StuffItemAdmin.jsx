import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { Bag } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

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
          <li>Location found: {stuff.location && stuff.location.latitude && stuff.location.longitude ? (
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${stuff.location.latitude},${stuff.location.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              ({stuff.location.latitude.toFixed(6)}, {stuff.location.longitude.toFixed(6)})
            </a>
          ) : 'Not specified'}
          </li>
          <li>Description: {stuff.description}</li>
        </ul>
      </Card.Text>
      <Link to={`/edit/${stuff._id}`}>Edit</Link>
    </Card.Body>
  </Card>
);

StuffItemAdmin.propTypes = {
  stuff: PropTypes.shape({
    name: PropTypes.string,
    date: PropTypes.string,
    email: PropTypes.string,
    description: PropTypes.string,
    location: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
    }),
    _id: PropTypes.string,
    owner: PropTypes.string,
  }).isRequired,
};

export default StuffItemAdmin;
