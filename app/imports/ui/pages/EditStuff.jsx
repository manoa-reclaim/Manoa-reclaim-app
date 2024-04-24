import React from 'react';
import swal from 'sweetalert';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useParams } from 'react-router';
import SimpleSchema from 'simpl-schema';
import { Stuffs } from '../../api/stuff/Stuff';
import LoadingSpinner from '../components/LoadingSpinner';

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

/* Renders the EditStuff page for editing a single document. */
const EditStuff = () => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { _id } = useParams();
  // console.log('EditStuff', _id);
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { doc, ready } = useTracker(() => {
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Stuffs.adminPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the document
    const document = Stuffs.collection.findOne(_id);
    return {
      doc: document,
      ready: rdy,
    };
  }, [_id]);
  // console.log('EditStuff', doc, ready);
  // On successful submit, insert the data.
  const handleSubmit = (data) => {
    const { name, email, description, image, month, day, year, location } = data;
    const date = `${month} ${day}, ${year}`;
    Stuffs.collection.update(
      _id,
      { $set: { name, email, description, image, date, location } },
      (error) => (error ?
        swal('Error', error.message, 'error') :
        swal('Success', 'Thank you for your submission, our team will process the information you provided to see if we have your lost item', 'success')
      ),
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

  return ready ? (
    <Container id="edit-lost-items-page" className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Edit Lost Item</h2></Col>
          <AutoForm schema={bridge} onSubmit={data => handleSubmit(data)} model={doc}>
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
