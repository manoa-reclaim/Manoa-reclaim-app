// In StuffItemAdmin.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { Bag } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

const StuffItemAdmin = ({ stuff }) => {
  const handleDelete = () => {
    Meteor.call('stuffs.remove', stuff._id, (error) => {
      if (error) {
        console.log(error.reason); // Handle error
      } else {
        console.log('Item deleted successfully');
        // Optionally, you can perform some action after deleting the item
      }
    });
  };

  return (
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
        <ul><Link to={`/edit/${stuff._id}`}>Edit Item</Link></ul>
        <ul><Button onClick={handleDelete}>Delete Item</Button></ul>
      </Card.Body>
    </Card>
  );
};

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
