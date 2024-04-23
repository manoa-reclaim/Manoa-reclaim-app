import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Stuffs } from '../../api/stuff/Stuff';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  name: String,
  date: String,
  email: String,
  description: {
    type: String,
    optional: true,
    defaultValue: '',
  },
  location: {
    type: String,
    allowedValues: ['POST', 'Lower Campus', 'Hamilton Library', 'Shidler', 'Campus Center', 'other'],
    defaultValue: 'other',
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the RegisterLostItems page for adding a document. */
const RegisterLostItems = () => {

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { name, date, email, description, location } = data;
    const owner = Meteor.user().username;
    Stuffs.collection.insert(
      { name, date, email, description, location, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      },
    );
  };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;
  return (
    <Container id="register-lost-items-page" className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Register Lost Item</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <TextField name="name" />
                <TextField name="date" />
                <TextField name="email" />
                <TextField name="description" />
                <SelectField name="location" />
                <SubmitField value="Submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterLostItems;