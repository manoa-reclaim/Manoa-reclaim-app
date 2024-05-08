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
  const [marker, setMarker] = useState(center);
  const [image, setImage] = useState(''); // For storing the base64 image data

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
      setImage(doc.image);
      if (doc.location && doc.location.latitude && doc.location.longitude) {
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

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const imageData = reader.result;
      setImage(imageData); // Set the image data for submission and preview
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (data) => {
    const { name, email, description, month, day, year } = data;
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
              <Form.Group controlId="image" className="mb-0">
                <Form.Label>Insert Image (JPG only):</Form.Label>
                <Form.Control type="file" accept="image/jpeg" onChange={handleImageChange} />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group controlId="location">
                <Form.Label>Choose where the item was found (Approximate location is okay):</Form.Label>
                <LoadScript googleMapsApiKey="AIzaSyCOZT1jHy1kPTxmuBnc28qSGPIuVkECwgg" loadingElement={<div>Loading...</div>}>
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
  ) : <LoadingSpinner />;
};

export default EditStuff;
