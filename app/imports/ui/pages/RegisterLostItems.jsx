import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Stuffs } from '../../api/stuff/Stuff';

const containerStyle = {
  width: '100%', // Full width of the form
  height: '400px',
};

const center = {
  lat: 21.2969,
  lng: -157.8171,
};

const getHawaiiDate = () => {
  const date = new Date();
  const utc = date.getTime() + (date.getTimezoneOffset() * 60000);
  return new Date(utc + (3600000 * -10));
};

const RegisterLostItem = () => {
  const hawaiiDate = getHawaiiDate();
  const [marker, setMarker] = useState(null);

  const handleMapClick = (event) => {
    setMarker({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  };

  const currentYear = hawaiiDate.getFullYear();
  const currentMonth = hawaiiDate.toLocaleString('default', { month: 'long' });
  const currentDay = hawaiiDate.getDate().toString();

  const formSchema = new SimpleSchema({
    name: String,
    email: String,
    description: String,
    image: {
      type: String,
      optional: true,
      defaultValue: '',
    },
    month: {
      type: String,
      allowedValues: [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December',
      ],
      defaultValue: currentMonth,
    },
    day: {
      type: String,
      allowedValues: Array.from({ length: 31 }, (_, i) => (i + 1).toString()),
      defaultValue: currentDay,
    },
    year: {
      type: String,
      allowedValues: Array.from({ length: 11 }, (_, i) => (i + 2020).toString()),
      defaultValue: currentYear.toString(),
    },
    location: {
      type: Number,
      optional: true,
    },
  });

  const bridge = new SimpleSchema2Bridge(formSchema);

  const handleSubmit = (data, formRef) => {
    const { name, email, description, image, month, day, year } = data;
    const date = `${month} ${day}, ${year}`;
    const locationData = marker ? { latitude: marker.lat, longitude: marker.lng } : {};
    const owner = Meteor.user().username;

    Stuffs.collection.insert({
      name, email, description, image, date,
      location: locationData,
      owner,
    }, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Item added successfully', 'success');
        formRef.reset();
      }
    });
  };
  return (
    <Container id="register-lost-items-page" className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Register Lost Item</h2></Col>
          <AutoForm schema={bridge} onSubmit={handleSubmit}>
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
            <Row>
              <Form.Group controlId="location">
                <Form.Label>Choose where the item was found (Approximate location is okay):</Form.Label>
                <LoadScript googleMapsApiKey="AIzaSyCOZT1jHy1kPTxmuBnc28qSGPIuVkECwgg">
                  <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={16}
                    onClick={handleMapClick}
                  >
                    {marker && <Marker position={marker} />}
                  </GoogleMap>
                </LoadScript>
              </Form.Group>
            </Row>
            <Row>
              <Col xs={6}>
                <Form.Group>
                  <Form.Label>Latitude:</Form.Label>
                  <Form.Control type="text" readOnly value={marker ? marker.lat.toFixed(6) : ''} />
                </Form.Group>
              </Col>
              <Col xs={6}>
                <Form.Group>
                  <Form.Label>Longitude:</Form.Label>
                  <Form.Control type="text" readOnly value={marker ? marker.lng.toFixed(6) : ''} />
                </Form.Group>
              </Col>
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
  );
};

export default RegisterLostItem;
