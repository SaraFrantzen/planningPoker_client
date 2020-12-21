import React, { useState } from "react";
import { Form, Container, Message } from "semantic-ui-react";
import Polls from "../modules/polls";
import { useSelector } from "react-redux";

const CreatePollsForm = () => {
  const [message, setMessage] = useState("");
  const currentUser = useSelector((state) => state.currentUser);
  const [pollId, setPollId] = useState();

  const onSubmit = async (e) => {
    e.preventDefault();
    let { title, description, tasks } = e.target;
    const response = await Polls.create(title, description, tasks);
    setMessage(response.message);
    setPollId(response.id);
  };

  return (
    <>
      <Container>
        {message ? (
          <Message data-cy="save-poll-message" color="purple" id="message">
            {message} !
            <br />
            Your poll can be viewed at:
            <br />
            <a
              href={`https://epidemicplanningpoker.netlify.app/polls/${pollId}`}
              id="link"
            >
              https://epidemicplanningpoker.netlify.app/polls/{pollId}
            </a>
            <br />
          </Message>
        ) : (
          <Message data-cy="save-poll-message" color="grey" id="message">
            You're logged in with: {currentUser.email}
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
          <Form.Button
            data-cy="save-poll"
            color="blue"
            floated="right"
            id="button"
          >
            Save Poll
          </Form.Button>
        </Form>
      </Container>
    </>
  );
};

export default CreatePollsForm;
