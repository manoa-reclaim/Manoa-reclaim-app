import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useParams } from 'react-router';
import SimpleSchema from 'simpl-schema';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Stuffs } from '../../api/stuff/Stuff';
import LoadingSpinner from '../components/LoadingSpinner';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 21.2969, // Default latitude
  lng: -157.8171, // Default longitude
};

const formSchema = new SimpleSchema({
  name: String,
  email: String,
  description: String,
  image: {
    type: String,
    optional: true,
  },
  month: {
    type: String,
    allowedValues: [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ],
  },
  day: {
    type: String,
    allowedValues: Array.from({ length: 31 }, (_, i) => (i + 1).toString()),
  },
  year: {
    type: String,
    allowedValues: Array.from({ length: 11 }, (_, i) => (i + 2020).toString()),
  },
  location: {
    type: Object,
    optional: true,
  },
  'location.latitude': {
    type: Number,
    optional: true,
  },
  'location.longitude': {
    type: Number,
    optional: true,
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

const EditStuff = () => {
  const { _id } = useParams();
  const { doc, ready } = useTracker(() => {
    const subscription = Meteor.subscribe(Stuffs.adminPublicationName);
    const rdy = subscription.ready();
    const document = Stuffs.collection.findOne(_id);
    return { doc: document, ready: rdy };
  }, [_id]);

  const [defaultValues, setDefaultValues] = useState(null);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    if (doc) {
      const date = new Date(doc.date || Date.now());
      const month = date.toLocaleString('default', { month: 'long' });
      const day = date.getDate().toString();
      const year = date.getFullYear().toString();
      setDefaultValues({
        ...doc,
        month,
        day,
        year,
      });
      if (doc.location) {
        setMarker({ lat: doc.location.latitude, lng: doc.location.longitude });
      }
    }
  }, [doc]);

  const handleMapClick = (event) => {
    const newMarker = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setMarker(newMarker);
  };

  const handleSubmit = (data) => {
    const { name, email, description, image, month, day, year } = data;
    const date = `${month} ${day}, ${year}`;
    const locationData = marker ? { latitude: marker.lat, longitude: marker.lng } : {};
    Stuffs.collection.update(_id, {
      $set: { name, email, description, image, date, location: locationData },
    }, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Your item has been updated successfully', 'success');
      }
    });
  };

  return ready ? (
    <Container id="edit-lost-items-page" className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Edit Lost Item</h2></Col>
          <AutoForm schema={bridge} onSubmit={handleSubmit} model={defaultValues}>
            <Form.Group controlId="name">
              <TextField name="name" />
            </Form.Group>
            <Form.Group controlId="email">
              <TextField name="email" />
            </Form.Group>
            <Form.Group controlId="description">
              <TextField name="description" />
            </Form.Group>
            <Form.Group controlId="date">
              <Form.Label>Date you lost your item:</Form.Label>
              <Row>
                <Col>
                  <SelectField name="month" />
                </Col>
                <Col>
                  <SelectField name="day" />
                </Col>
                <Col>
                  <SelectField name="year" />
                </Col>
              </Row>
            </Form.Group>
            <Row className="mb-3">
              <LoadScript googleMapsApiKey="AIzaSyCOZT1jHy1kPTxmuBnc28qSGPIuVkECwgg">
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={marker || center}
                  zoom={16}
                  onClick={handleMapClick}
                >
                  {marker && <Marker position={marker} />}
                </GoogleMap>
              </LoadScript>
            </Row>
            <Row>
              <Col>
                <SubmitField value="Submit" />
              </Col>
            </Row>
            <ErrorsField />
          </AutoForm>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default EditStuff;
