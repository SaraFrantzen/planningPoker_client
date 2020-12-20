import React, { useState } from "react";
import { Form, Container, Message } from "semantic-ui-react";
import Polls from "../modules/polls";

const CreatePollsForm = () => {
  const [message, setMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    let { title, description, tasks } = e.target;
    const response = await Polls.create(title, description, tasks);
    setMessage(response);
  };

  return (
    <>
      <Container>
        {message && (
          <Message data-cy="save-poll-message" color="purple">
            {message}
          </Message>
        )}
      </Container>
      <Container>
        <Form data-cy="form-poll" id="create-poll" onSubmit={onSubmit}>
          <Form.Input
            fluid
            label="Title"
            placeholder="Title"
            data-cy="title"
            name="title"
          />
          <Form.TextArea
            fluid
            label="Description"
            placeholder="Short description of the feature, preferably a user story"
            data-cy="description"
            name="description"
          />
          <Form.TextArea
            label="Tasks"
            placeholder="Briefly list what tasks the feature contains"
            data-cy="tasks"
            name="tasks"
          />
          <Form.Button data-cy="save-poll" color="blue" floated="right">
            Save Poll
          </Form.Button>
        </Form>
      </Container>
    </>
  );
};

export default CreatePollsForm;
