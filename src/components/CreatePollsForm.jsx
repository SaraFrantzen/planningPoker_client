import React, { useState } from "react";
import {
  Form,
  Container,
  Message,
  Button,
  Grid,
  Image,
} from "semantic-ui-react";
import Polls from "../modules/polls";
import { Link } from "react-router-dom";
import cards4 from "../images/cards4.jpg";

const CreatePollsForm = () => {
  const [message, setMessage] = useState("");
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
        <Grid>
          <Grid.Row>
            <Grid.Column width={3}>
              <Button basic color="black" as={Link} to="/" id="back-button">
                Go back
              </Button>
            </Grid.Column>
            <Grid.Column width={8}>
              {message && (
                <Message data-cy="save-poll-message" color="black" id="message">
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
              )}
            </Grid.Column>
            <Grid.Column width={5}>
              <Image src={cards4} size="big" id="cards4" />
            </Grid.Column>
          </Grid.Row>
        </Grid>
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
            basic
            color="red"
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
