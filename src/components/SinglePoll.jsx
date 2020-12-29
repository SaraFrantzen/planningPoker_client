import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Polls from "../modules/polls";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Container,
  Card,
  Message,
  Button,
  List,
  Form,
} from "semantic-ui-react";

const SinglePoll = () => {
  const [poll, setPoll] = useState({});
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const authenticated = useSelector((state) => state.authenticate);
  const currentUser = useSelector((state) => state.currentUser);
  const [joined, setJoined] = useState(false);
  const [viewTeam, setViewTeam] = useState(false);
  const [listTeam, setListTeam] = useState();
  const [selectedPoints, setSelectedPoints] = useState();
  const [voteMessage, setVoteMessage] = useState("");
  const [status, setStatus] = useState([]);
  const [votes, setVotes] = useState({});

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

  useEffect(() => {
    const teamChecker = async () => {
      try {
        if (poll.team.includes(currentUser.email)) {
          setJoined(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    teamChecker();
  }, [currentUser, poll]);

  const joinHandler = async () => {
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

  const handlePointsChange = (value) => {
    setSelectedPoints(value);
  };

  const voteHandler = async () => {
    let points = selectedPoints;
    const response = await Polls.vote(id, points, votes);
    if (response.message === "successfully voted") {
      setVoteMessage(
        `You ${response.message} ${response.votes.points} in this poll`
      );
      setStatus(response.points);
    } else {
      setMessage(`Ooops. ${response}, You need to sign in to be able to vote`);
    }
  };

  const options = [
    { key: "0", text: "0", value: 0 },
    { key: "1", text: "1", value: 1 },
    { key: "2", text: "2", value: 2 },
    { key: "3", text: "3", value: 3 },
  ];

  return (
    <>
    {authenticated && !joined && (
      <>
      <Container>
        <h1>You need to join the poll to be able to vote</h1>
      </Container>
      </>
    )}
      {voteMessage && (
        <Message data-cy="vote-message" color="green">
          {voteMessage}
        </Message>
      )}
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

              {status && (
                <>
                  <Card.Content id="points">Poll status</Card.Content>
                  <Card.Content data-cy="points">{status}</Card.Content>
                </>
              )}
              {authenticated && !joined && (
                <Button
                  onClick={() => joinHandler()}
                  data-cy="join-poll"
                  id="button"
                >
                  Join this poll
                </Button>
              )}
              {authenticated && joined && (
                <>
                  <Form.Select
                    fluid
                    label="points"
                    options={options}
                    onChange={(e, value) => {
                      handlePointsChange(value.value);
                    }}
                    data-cy="points"
                  />
                  <Button
                    data-cy="vote"
                    id="button"
                    onClick={() => voteHandler()}
                  >
                    Vote
                  </Button>
                </>
              )}
              {!authenticated && (
                <Button basic as={Link} to="/login" id="button" color="green">
                  Join this poll
                </Button>
              )}
            </Card.Content>
            <Card.Content>
              <Button
                basic
                onClick={() => ViewTeamHandler()}
                data-cy="view-participants"
                id="button"
                color="purple"
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
