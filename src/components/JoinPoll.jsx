import React from "react";
import { useSelector } from "react-redux";
import Polls from "../modules/polls";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Container, Button } from "semantic-ui-react";

const JoinPoll = ({ joined, setJoined, setMessage, setTeam }) => {
  const authenticated = useSelector((state) => state.authenticate);
  const currentUser = useSelector((state) => state.currentUser);
  const { id } = useParams();

  const joinHandler = async () => {
    let userId = currentUser.name;
    let response = await Polls.join(id, userId);
    if (response.message) {
      setTeam(response.team);
      setJoined(true);
    } else {
      setMessage(response);
    }
  };
  return (
    <>
      <>
        {!authenticated && (
          <Container>
            <Button basic as={Link} to="/login" id="join-button" color="red">
              Join this poll
            </Button>
          </Container>
        )}
      </>
      {authenticated && !joined && (
        <Container>
          <Button
            basic
            color="red"
            onClick={() => joinHandler()}
            data-cy="join-poll"
            id="join-button"
          >
            Join this poll
          </Button>
        </Container>
      )}
    </>
  );
};

export default JoinPoll;
