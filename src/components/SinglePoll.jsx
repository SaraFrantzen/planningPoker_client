import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Polls from "../modules/polls";
import { Container, Card } from "semantic-ui-react";

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
        <p data-cy="error-message">{message}</p>
      ) : (
        <Container>
          <Card>
            <Card.Content>
              <Card.Header data-cy="title">{poll.title}</Card.Header>
              <Card.Description data-cy="description">
                {poll.description}
              </Card.Description>
              <Card.Description data-cy="tasks">{poll.tasks}</Card.Description>
              <Card.Description data-cy="points">
                {poll.points}
              </Card.Description>
            </Card.Content>
          </Card>
        </Container>
      )}
    </>
  );
};

export default SinglePoll;
