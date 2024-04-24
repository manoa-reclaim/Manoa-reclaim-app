import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, SubmitField, TextField, SelectField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Stuffs } from '../../api/stuff/Stuff';

const SearchLostItem = () => {
  const [loading, setLoading] = useState(false);

  const currentYear = new Date().getFullYear();

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
      defaultValue: 'January',
    },
    day: {
      type: String,
      allowedValues: Array.from({ length: 31 }, (_, i) => (i + 1).toString()),
      defaultValue: '1',
    },
    year: {
      type: String,
      allowedValues: Array.from({ length: 11 }, (_, i) => (i + 2020).toString()),
      defaultValue: currentYear.toString(),
    },
    location: {
      type: String,
      allowedValues: ['POST', 'Lower Campus', 'Hamilton Library', 'Shidler', 'Campus Center', 'other'],
      defaultValue: 'other',
    },
  });

  const bridge = new SimpleSchema2Bridge(formSchema);

  const handleSubmit = (data, formRef) => {
    setLoading(true);
    const { name, email, description, image, month, day, year, location } = data;
    const date = `${month} ${day}, ${year}`;
    const owner = Meteor.user().username;
    Stuffs.collection.insert(
      { name, email, description, image, date, location, owner },
      (error) => {
        setLoading(false);
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Thank you for your submission, our team will process the information you provided to see if we have your lost item', 'success')
            .then(() => {
              formRef.reset();
            });
        }
      },
    );
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const imageData = reader.result;
      bridge.onChange('image', imageData);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <Container id="register-lost-items-page" className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Search Lost Item</h2></Col>
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
            <Form.Group controlId="location">
              <SelectField name="location" />
            </Form.Group>
            <Row className="mb-3">
              <Form.Group controlId="image" className="mb-0">
                <Form.Label>Insert Image (JPG only):</Form.Label>
                <Form.Control type="file" accept="image/jpeg" onChange={handleImageChange} />
              </Form.Group>
            </Row>
            <Row>
              <Col>
                <SubmitField value="Search" disabled={loading} />
              </Col>
            </Row>
            <ErrorsField />
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default SearchLostItem;
