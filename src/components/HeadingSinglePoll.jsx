import React from "react";
import { Container, Divider } from "semantic-ui-react";

const HeadingSinglePoll = ({ userVoted, joined, authenticated, state }) => {
  return (
    <>
      {authenticated && !joined && state === "ongoing" && (
        <>
          <Container id="heading">
            <h1>You need to join the poll to be able to vote</h1>
            <Divider />
          </Container>
        </>
      )}
      {!authenticated && state === "ongoing"  && (
        <>
          <Container id="heading">
            <h1>You need to login to be able to vote</h1>
            <Divider />
          </Container>
        </>
      )}
      {joined && !userVoted && state === "ongoing" && (
        <Container id="heading" data-cy="join-poll-message" color="black">
          <h1>You are joined to this poll</h1>
          <Divider />
        </Container>
      )}
      
      {joined && userVoted &&  state === "ongoing" &&(
        <Container id="heading" data-cy="user-vote-message" color="black">
          <h1>You voted: {userVoted} in this poll</h1>
          <Divider />
        </Container>
      )}


        {state === "pending" && (
        <Container id="heading" data-cy="pending-header" color="black">
          <h1>Poll is open for discussion. Points are pending </h1>
          <Divider />
        </Container>
      )}
       {state === "closed" && (
        <Container id="heading" data-cy="poll-closed-message" color="black">
          <h1>This poll is closed</h1>
          <Divider />
        </Container>
      )}
    </>
  );
};

export default HeadingSinglePoll;
