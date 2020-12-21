import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Polls from "../modules/polls";
import { Container, Card, Message, } from "semantic-ui-react";

const SinglePoll = () => {
  const [poll, setPoll] = useState({});
  const { id } = useParams();
  const [message, setMessage] = useState("");

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
          <Card>
            <Card.Content>
              <Card.Header data-cy="title">{poll.title}</Card.Header>

              <Card.Content id="description">Description</Card.Content>
              <Card.Content data-cy="description">
                {poll.description}{" "}
              </Card.Content>

              <Card.Content id="tasks">Tasks </Card.Content>
              <Card.Content data-cy="tasks">{poll.tasks}</Card.Content>

              <Card.Content id="points">
                Poll status 
              </Card.Content>
							<Card.Content data-cy="points">
								{poll.points}
							</Card.Content>
            </Card.Content>
          </Card>
        </Container>
      )}
    </>
  );
};

export default SinglePoll;
