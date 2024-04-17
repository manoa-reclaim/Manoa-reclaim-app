import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Note from './Note';
import AddNote from '../pages/AddNote';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const Item = ({ item, notes }) => (
  <Card className="h-100">
    <Card.Header>
      <Image src={item.image} width={75} />
      <Card.Title>{item.firstName} {item.lastName}</Card.Title>
      <Card.Subtitle>{item.address}</Card.Subtitle>
    </Card.Header>
    <Card.Body>
      <Card.Text>{item.contact}</Card.Text>
      <Card.Text>{item.description}</Card.Text>
      <ListGroup variant="flush">
        {notes.map((note) => <Note key={note._id} note={note} />)}
      </ListGroup>
      <AddNote owner={item.owner} contactId={item._id} />
      <Link to={`/edit/${item._id}`}>Edit</Link>
    </Card.Body>
  </Card>
);

// Require a document to be passed to this component.
Item.propTypes = {
  item: PropTypes.shape({
    Date: PropTypes.number,
    Name: PropTypes.string,
    Place: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    _id: PropTypes.string,
    owner: PropTypes.string,
  }).isRequired,
  notes: PropTypes.arrayOf(PropTypes.shape({
    note: PropTypes.string,
    contactId: PropTypes.string,
    owner: PropTypes.string,
    createdAt: PropTypes.string,
    _id: PropTypes.string,
  })).isRequired,
};

export default Item;
