import React, { useState } from "react";
import { Form, Container } from "semantic-ui-react";

const CreatePollsForm = () => {
  return (
    <Container>
      <Form data-cy="form-poll" id="form-poll">
        <Form.Input fluid label="Title" placeholder="Title" data-cy="title" />

        <Form.TextArea
          fluid
          label="Description"
          placeholder="Short description of the feature, preferably a user story"
          data-cy="description"
        />

        <Form.TextArea
          label="Tasks"
          placeholder="Briefly list what tasks the feature contains"
          data-cy="tasks"
        />

        <Form.Button data-cy="save-poll" color="blue" floated="right">
          Save Poll
        </Form.Button>
      </Form>

      {/*  {message && (
        <Message data-cy="save-article-message" color="purple">
          {message}
        </Message>
      )} */}
    </Container>
  );
};

export default CreatePollsForm;
