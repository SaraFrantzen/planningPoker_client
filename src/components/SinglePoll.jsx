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
  Grid,
  Statistic,
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

  const [status0, setStatus0] = useState();
  const [status1, setStatus1] = useState();
  const [status2, setStatus2] = useState();
  const [status3, setStatus3] = useState();

  useEffect(() => {
    const getSinglePoll = async () => {
      const response = await Polls.show(id);
      if (response.id) {
        setPoll(response);
        setStatus(response.points);
      } else {
        setMessage(response);
      }
    };
    getSinglePoll();
  }, [id]);

  useEffect(() => {
    let statusCounter = status;
    let zero = 0;
    let one = 0;
    let two = 0;
    let three = 0;
    for (let i = 0; i < statusCounter.length; i++) {
      if (statusCounter[i] === 0) {
        zero++;
        setStatus0(zero);
      } else if (statusCounter[i] === 1) {
        one++;
        setStatus1(one);
      } else if (statusCounter[i] === 2) {
        two++;
        setStatus2(two);
      } else if (statusCounter[i] === 3) {
        three++;
        setStatus3(three);
      }
    }
  }, [status]);

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
      setVotes(response.votes);
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
        <Container>
          <Message data-cy="vote-message" id="message" color="green">
            {voteMessage}
          </Message>
        </Container>
      )}
      {message ? (
        <Container data-cy="error-message">
          <Message color="red">{message}</Message>
        </Container>
      ) : (
        <Container>
          <Grid>
            <Grid.Row>
              <Grid.Column width={5} id="column-1">
                <Card id="singlePoll-card">
                  <Card.Content id="poll-status">Feature</Card.Content>
                  <Card.Content>
                    <Card.Header data-cy="title">{poll.title}</Card.Header>

                    <Card.Content id="description">Description</Card.Content>
                    <Card.Content data-cy="description">
                      {poll.description}{" "}
                    </Card.Content>

                    <Card.Content id="tasks">Tasks </Card.Content>
                    <Card.Content data-cy="tasks">{poll.tasks}</Card.Content>
                  </Card.Content>
                </Card>
              </Grid.Column>

              <Grid.Column width={5}>
                <Card fluid id="column-2">
                  <Card.Content>
                    {status !== [] && (
                      <Card.Content id="poll-status">Poll status</Card.Content>
                    )}
                    {joined && (
                      <Message data-cy="join-poll-message">
                        You are joined to this poll
                      </Message>
                    )}
                  </Card.Content>
                  <Card.Content data-cy="points">
                    <Statistic.Group size="mini">
                      <Statistic color="red">
                        <Statistic.Value>points</Statistic.Value>
                        <Statistic.Label>No of votes</Statistic.Label>
                      </Statistic>
                      <Statistic color="red">
                        <Statistic.Value>0</Statistic.Value>
                        <Statistic.Label data-cy="points-0">
                          {status0}
                        </Statistic.Label>
                      </Statistic>
                      <Statistic color="red">
                        <Statistic.Value>1</Statistic.Value>
                        <Statistic.Label data-cy="points-1">
                          {status1}
                        </Statistic.Label>
                      </Statistic>
                      <Statistic color="red">
                        <Statistic.Value>2</Statistic.Value>
                        <Statistic.Label data-cy="points-2">
                          {status2}
                        </Statistic.Label>
                      </Statistic>
                      <Statistic color="red">
                        <Statistic.Value>3</Statistic.Value>
                        <Statistic.Label data-cy="points-3">
                          {status3}
                        </Statistic.Label>
                      </Statistic>
                    </Statistic.Group>
                  </Card.Content>

                  <>
                    {authenticated && joined && (
                      <Card.Content>
                        <Form.Select
                          id="vote-select"
                          options={options}
                          onChange={(e, value) => {
                            handlePointsChange(value.value);
                          }}
                          data-cy="points"
                        />
                        <Button
                          basic
                          data-cy="vote"
                          id="button"
                          color="red"
                          onClick={() => voteHandler()}
                        >
                          Vote
                        </Button>
                      </Card.Content>
                    )}
                  </>
                  <>
                    {!authenticated && (
                      <Card.Content>
                        <Button
                          basic
                          as={Link}
                          to="/login"
                          id="button"
                          color="red"
                        >
                          Join this poll
                        </Button>
                      </Card.Content>
                    )}
                  </>
                  {authenticated && !joined && (
                    <Card.Content>
                      <Button
                        basic
                        color="red"
                        onClick={() => joinHandler()}
                        data-cy="join-poll"
                        id="button"
                      >
                        Join this poll
                      </Button>
                    </Card.Content>
                  )}
                  {joined && (
                    <Card.Content>
                      <>
                        <Button
                          basic
                          onClick={() => ViewTeamHandler()}
                          data-cy="view-participants"
                          id="button"
                          color="purple"
                        >
                          View participants
                        </Button>

                        <Card.Content>
                          <List>
                            <List.Item>
                              <List.Content data-cy="team">
                                {listTeam}
                              </List.Content>
                            </List.Item>
                          </List>
                        </Card.Content>
                      </>
                    </Card.Content>
                  )}
                </Card>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      )}
    </>
  );
};

export default SinglePoll;
