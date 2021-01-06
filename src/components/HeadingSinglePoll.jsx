import React from "react";
import { Container, Divider } from "semantic-ui-react";

const HeadingSinglePoll = ({ userVoted, joined, authenticated }) => {
  return (
    <>
      {authenticated && !joined && (
        <>
          <Container id="header">
            <h1>You need to join the poll to be able to vote</h1>
            <Divider />
          </Container>
        </>
      )}
      {!authenticated && (
        <>
          <Container id="header">
            <h1>You need to login to be able to vote</h1>
            <Divider />
          </Container>
        </>
      )}
      {joined && !userVoted && (
        <Container id="header" data-cy="join-poll-message" color="black">
          <h1>You are joined to this poll</h1>
          <Divider />
        </Container>
      )}
      {joined && userVoted && (
        <Container id="header" data-cy="user-vote-message" color="black">
          <h1>You voted: {userVoted} in this poll</h1>
          <Divider />
        </Container>
      )}
    </>
  );
};

export default HeadingSinglePoll;
