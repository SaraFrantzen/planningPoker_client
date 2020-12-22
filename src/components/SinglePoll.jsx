import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Polls from "../modules/polls";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Card, Message, Button } from "semantic-ui-react";

const SinglePoll = () => {
  const [poll, setPoll] = useState({});
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const authenticated = useSelector((state) => state.authenticate);

  useEffect(() => {
    const getSinglePoll = async () => {
      const response = await Polls.show(id);
      if (response.id) {
        setPoll(response);
      } else {
        setMessage(response);
      }
    };
    getSinglePoll();
  }, [id]);

  return (
    <>
      {message ? (
        <Container>
          <Message data-cy="error-message" color="red">
            {message}
          </Message>
        </Container>
      ) : (
        <Container>
          <Card id="singlePoll-card">
            <Card.Content>
              <Card.Header data-cy="title">{poll.title}</Card.Header>

              <Card.Content id="description">Description</Card.Content>
              <Card.Content data-cy="description">
                {poll.description}{" "}
              </Card.Content>

              <Card.Content id="tasks">Tasks </Card.Content>
              <Card.Content data-cy="tasks">{poll.tasks}</Card.Content>

              <Card.Content id="points">Poll status</Card.Content>
              <Card.Content data-cy="points">{poll.points}</Card.Content>
              {authenticated ? (
                <Button as={Link} to="/" id="button">
                  Join this poll
                </Button>
              ) : (
                <Button as={Link} to="/login" id="button">
                  Join this poll
                </Button>
              )}
            </Card.Content>
          </Card>
        </Container>
      )}
    </>
  );
};

export default SinglePoll;
