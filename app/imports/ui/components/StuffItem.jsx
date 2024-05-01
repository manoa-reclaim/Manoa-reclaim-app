import React from 'react';
import PropTypes from 'prop-types';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const StuffItem = ({ stuff }) => {
  let displayLocation = stuff.location;
  try {
    // Attempt to parse the location string as JSON
    const locationObj = JSON.parse(stuff.location);
    if (locationObj.lat && locationObj.lng) {
      // If parsing is successful and lat/lng are found, format the display location
      displayLocation = `Lat: ${locationObj.lat.toFixed(3)}, Lng: ${locationObj.lng.toFixed(3)}`;
    }
  } catch (e) {
    // If there's an error in parsing, assume it's a regular string
    displayLocation = stuff.location;
  }

  return (
    <tr>
      <td>{stuff.name}</td>
      <td>{stuff.date}</td>
      <td>{stuff.email}</td>
      <td>{stuff.description}</td>
      <td>{displayLocation}</td>
    </tr>
  );
};

// Require a document to be passed to this component.
StuffItem.propTypes = {
  stuff: PropTypes.shape({
    name: PropTypes.string,
    date: PropTypes.string,
    email: PropTypes.string,
    description: PropTypes.string,
    location: PropTypes.string, // location is treated as a string, but can contain JSON data
    _id: PropTypes.string,
  }).isRequired,
};

export default StuffItem;
