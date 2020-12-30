import React from "react";
import { Card } from "semantic-ui-react";
import { Link } from "react-router-dom";

const PollsCard = ({ poll }) => {
  return (
    <>
      <Card
        as={Link}
        to={`/polls/${poll.id}`}
        data-cy={"poll-" + poll.id}
        id="pollCard"
        color="red"
      >
        <Card.Content>
          <Card.Header data-cy="title">{poll.title}</Card.Header>
        </Card.Content>
        <Card.Content>
          <Card.Description data-cy="description">
            {poll.description}
          </Card.Description>
        </Card.Content>
      </Card>
    </>
  );
};

export default PollsCard;
