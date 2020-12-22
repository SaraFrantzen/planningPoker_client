import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Polls from "../modules/polls";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Card, Message, Button, List } from "semantic-ui-react";

const SinglePoll = () => {
  const [poll, setPoll] = useState({});
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const authenticated = useSelector((state) => state.authenticate);
  const currentUser = useSelector((state) => state.currentUser);
  const [joined, setJoined] = useState(false);
  const [viewTeam, setViewTeam] = useState(false);
  const [listTeam, setListTeam] = useState();

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

  const joinHandler = async () => {
    debugger;
    let userId = currentUser.email;
    let response = await Polls.join(id, userId);
    if (response.message) {
      setJoined(true);
    } else {
      setMessage(response);
    }
  };

  const ViewTeamHandler = async () => {
    let list = poll.team.map((team) => <li>{team}</li>);
    setListTeam(list);
    setViewTeam(true);
  };

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
              {joined && (
                <Message data-cy="join-poll-message">
                  You are joined to this poll
                </Message>
              )}
              <Card.Header data-cy="title">{poll.title}</Card.Header>

              <Card.Content id="description">Description</Card.Content>
              <Card.Content data-cy="description">
                {poll.description}{" "}
              </Card.Content>

              <Card.Content id="tasks">Tasks </Card.Content>
              <Card.Content data-cy="tasks">{poll.tasks}</Card.Content>

              <Card.Content id="points">Poll status</Card.Content>
              <Card.Content data-cy="points">{poll.points}</Card.Content>
              {authenticated && !joined && (
                <Button
                  onClick={() => joinHandler()}
                  data-cy="join-poll"
                  id="button"
                >
                  Join this poll
                </Button>
              )}
              {!authenticated && (
                <Button as={Link} to="/login" id="button">
                  Join this poll
                </Button>
              )}

              <Button
                onClick={() => ViewTeamHandler()}
                data-cy="view-participants"
                id="button"
              >
                View participants
              </Button>
              {viewTeam && (
                <Card.Content>
                  <List>
                    <List.Item>
                      <List.Content data-cy="team">{listTeam}</List.Content>
                    </List.Item>
                  </List>
                </Card.Content>
              )}
            </Card.Content>
          </Card>
        </Container>
      )}
    </>
  );
};

export default SinglePoll;
