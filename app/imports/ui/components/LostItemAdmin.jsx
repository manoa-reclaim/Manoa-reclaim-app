import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListItems.jsx. */
const LostItemAdmin = ({ lostItem }) => (
  <Card className="h-100">
    <Card.Header>
      <Image src={lostItem.image} width={75} />
      <Card.Title>{lostItem.itemName}</Card.Title>
      <Card.Subtitle>{lostItem.date} {lostItem.location}</Card.Subtitle>
    </Card.Header>
    <Card.Body>
      <Card.Text>{lostItem.description}</Card.Text>
      <footer className="blockquote-footer">{lostItem}</footer>
      <Link to={`/edit/${lostItem._id}`}>Edit</Link>
    </Card.Body>
  </Card>
);

// Require a document to be passed to this component.
LostItemAdmin.propTypes = {
  lostItem: PropTypes.shape({
    itemName: PropTypes.string,
    date: PropTypes.number,
    location: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    owner: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default LostItemAdmin;
