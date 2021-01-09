import React, { useState } from "react";
import toBase64 from "../modules/toBase64";
import Polls from "../modules/polls";
import { Link } from "react-router-dom";
import cards4 from "../images/cards4.jpg";
import {
  Form,
  Container,
  Message,
  Button,
  Grid,
  Image,
  Card,
} from "semantic-ui-react";

const CreatePollsForm = () => {
  const [message, setMessage] = useState("");
  const [pollId, setPollId] = useState();
  const [image, setImage] = useState();
  const [errormessage, setErrormessage] = useState("");
  const [value, setValue] = useState();

  const selectImage = (e) => {
    setImage(e.target.files[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let category = value;
    let { title, description, tasks, encodedImage } = e.target;
    if (image) {
      encodedImage = await toBase64(image);
    }
    const response = await Polls.create(
      title,
      description,
      tasks,
      encodedImage,
      category
    );
    if (response.message) {
      debugger
      setMessage(response.message);
      setPollId(response.id);
      setErrormessage("");
    } else {
      setErrormessage(response);
    }
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
                <>
                  <Message
                    data-cy="save-poll-message"
                    color="black"
                    id="message"
                  >
                    {message} ! <br />
                    Your poll can be viewed at:
                    <br />
                  </Message>
                  <Message
                    data-cy="save-poll-message"
                    color="black"
                    as={Link}
                    to={`/polls/${pollId}`}
                    id="message-link"
                  >
                    https://epidemicplanningpoker.netlify.app/polls/{pollId}
                    <br />
                  </Message>
                </>
              )}
              {errormessage && (
                <Message data-cy="error-message" color="red" id="message">
                  {errormessage}
                </Message>
              )}
            </Grid.Column>
            <Grid.Column width={5}>
              <Image src={cards4} size="big" id="cards4" />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>

      <Container className="margin-container">
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
          <Form.Input
            onChange={selectImage}
            fluid
            label="Attach image of Lo-fi (optional)"
            data-cy="image-upload"
            type="file"
          />

          <Form.Group inline>
            <label>Category</label>
            <Form.Checkbox
              data-cy="api"
              label="api"
              value="a"
              checked={value === "api"}
              onChange={() => setValue("api")}
            />
            <Form.Checkbox
              data-cy="client"
              label="client"
              value="c"
              checked={value === "client"}
              onChange={() => setValue("client")}
            />
          </Form.Group>

          <Form.Button
            data-cy="save-poll"
            basic
            color="red"
            floated="right"
            id="button"
          >
            Save Feature
          </Form.Button>
        </Form>
        {image && (
          <Card>
            <Image src={URL.createObjectURL(image)} alt="preview" />
          </Card>
        )}
      </Container>
    </>
  );
};

export default CreatePollsForm;
