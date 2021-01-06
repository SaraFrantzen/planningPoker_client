import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Polls from "../modules/polls";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import cards3 from "../images/cards3.jpg";
import CommentForm from "./CommentForm";
import CommentsIndex from './CommentsIndex';
import {
  Container,
  Card,
  Message,
  Button,
  List,
  Form,
  Grid,
  Statistic,
  Image,
  Divider,
} from "semantic-ui-react";

const SinglePoll = () => {
  const [poll, setPoll] = useState({});
  const { id } = useParams();
  const [message, setMessage] = useState("");

  const authenticated = useSelector((state) => state.authenticate);
  const currentUser = useSelector((state) => state.currentUser);

  const [joined, setJoined] = useState(false);
  const [team, setTeam] = useState([]);
  const [listTeam, setListTeam] = useState();
  const [selectedPoints, setSelectedPoints] = useState();
  const [voteMessage, setVoteMessage] = useState("");
  const [status, setStatus] = useState([]);
  const [votes, setVotes] = useState({});
  const [voteToggle, setVoteToggle] = useState(true);
  const [userVoted, setUserVoted] = useState();
  const [status0, setStatus0] = useState(0);
  const [status1, setStatus1] = useState(0);
  const [status2, setStatus2] = useState(0);
  const [status3, setStatus3] = useState(0);

  useEffect(() => {
    const getSinglePoll = async () => {
      const response = await Polls.show(id);
      if (response.id) {
        setPoll(response);
        setStatus(response.points);
        if (response.votes != null) {
          if (currentUser.email in response.votes) {
            setUserVoted(response.votes[currentUser.email]);
            setVoteToggle(false);
          }
        }
      } else {
        setMessage(response);
      }
    };
    getSinglePoll();
  }, [id, currentUser.email]);

  useEffect(() => {
    const teamChecker = async () => {
      try {
        if (poll.team.includes(currentUser.name)) {
          setJoined(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    teamChecker();
  }, [currentUser, poll]);

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

  const ViewTeamHandler = async () => {
    let list = team.map((team) => <li>{team}</li>);
    setListTeam(list);
  };

  const handlePointsChange = (value) => {
    setSelectedPoints(value);
  };

  const voteHandler = async () => {
    let points = selectedPoints;
    const response = await Polls.vote(id, points, votes);
    if (response.message === "successfully voted") {
      setVoteMessage(
        `You ${response.message} ${
          response.votes[currentUser.email]
        } in this poll`
      );
      setStatus(response.points);
      setVotes(response.votes);
      setVoteToggle(false);
      setUserVoted(response.votes[currentUser.email]);

      setMessage("");
    } else if (response.message === "successfully un-voted") {
      setVoteMessage("Your previous vote is now removed");
      setMessage("");
      setStatus(response.points);
      setUserVoted();
      setStatus0(status0 - 1);
      setStatus1(status1 - 1);
      setStatus2(status2 - 1);
      setStatus3(status3 - 1);
      let statusCounter = response.points;
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
      setVotes(response.votes);
      setVoteToggle(true);
    } else {
      setMessage(response);
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

      {voteMessage && (
        <Container>
          <Message data-cy="vote-message" id="message" color="black">
            {voteMessage}
          </Message>
        </Container>
      )}
      {message && (
        <Container data-cy="error-message">
          <Message color="red" id="message">
            {message}
          </Message>
        </Container>
      )}
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column width={5}>
              <>
                {poll.image ? (
                  <>
                    <Card id="singlePoll-card" fluid color="red">
                      <Card.Content id="poll-status">Lo-Fi</Card.Content>
                      <Image data-cy="image" src={poll.image} bordered />
                    </Card>
                  </>
                ) : (
                  <Image
                    src={cards3}
                    size="medium"
                    floated="right"
                    id="cards3"
                    data-cy="poker-logo"
                  />
                )}
              </>
            </Grid.Column>

            <Grid.Column width={5}>
              <Card id="singlePoll-card" color="red">
                <Card.Content id="poll-status">Feature</Card.Content>
                <Card.Content>
                  <Card.Header data-cy="title">{poll.title}</Card.Header>
                  <Divider />
                  <Card.Content id="description">Description</Card.Content>
                  <Card.Content data-cy="description">
                    {poll.description}{" "}
                  </Card.Content>

                  <Card.Content id="tasks">Tasks </Card.Content>
                  <Card.Content data-cy="tasks">{poll.tasks}</Card.Content>
                </Card.Content>
              </Card>
            </Grid.Column>

            <Grid.Column width={6}>
              <Card fluid id="singlePoll-card" color="red">
                <Card.Content>
                  {status !== [] && (
                    <Card.Content id="poll-status">Poll status</Card.Content>
                  )}
                </Card.Content>
                <Card.Content data-cy="points">
                  <Statistic.Group size="mini">
                    <Statistic color="red" id="statistics">
                      <Statistic.Value>points</Statistic.Value>
                      <Statistic.Label>No of votes</Statistic.Label>
                    </Statistic>
                    <Statistic color="red">
                      <Statistic.Value>0</Statistic.Value>
                      {status0 > 0 && (
                        <Statistic.Label data-cy="points-0">
                          {status0}
                        </Statistic.Label>
                      )}
                    </Statistic>
                    <Statistic color="red">
                      <Statistic.Value>1</Statistic.Value>
                      {status1 > 0 && (
                        <Statistic.Label data-cy="points-1">
                          {status1}
                        </Statistic.Label>
                      )}
                    </Statistic>
                    <Statistic color="red">
                      <Statistic.Value>2</Statistic.Value>
                      {status2 > 0 && (
                        <Statistic.Label data-cy="points-2">
                          {status2}
                        </Statistic.Label>
                      )}
                    </Statistic>
                    <Statistic color="red">
                      <Statistic.Value>3</Statistic.Value>
                      {status3 > 0 && (
                        <Statistic.Label data-cy="points-3">
                          {status3}
                        </Statistic.Label>
                      )}
                    </Statistic>
                  </Statistic.Group>

                  <Divider />

                  {authenticated && joined && voteToggle && (
                    <>
                      <Form.Select
                        id="vote-select"
                        options={options}
                        onChange={(e, value) => {
                          handlePointsChange(value.value);
                        }}
                        data-cy="vote-select"
                      />
                      <Button
                        basic
                        data-cy="vote"
                        id="vote-button"
                        color="red"
                        onClick={() => voteHandler()}
                      >
                        Vote
                      </Button>
                    </>
                  )}
                  {authenticated && joined && !voteToggle && (
                    <Button
                      basic
                      data-cy="re-vote"
                      id="button"
                      color="red"
                      onClick={() => voteHandler()}
                    >
                      Re-vote
                    </Button>
                  )}
                  <>
                    {!authenticated && (
                      <Container>
                        <Button
                          basic
                          as={Link}
                          to="/login"
                          id="join-button"
                          color="red"
                        >
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
                  <Divider />
                  {joined && (
                    <>
                      <>
                        <Button
                          basic
                          onClick={() => ViewTeamHandler()}
                          data-cy="view-participants"
                          id="button"
                          color="black"
                        >
                          View participants
                        </Button>
                        <List>
                          <List.Item>
                            <List.Content data-cy="team">
                              {listTeam}
                            </List.Content>
                          </List.Item>
                        </List>
                      </>
                    </>
                  )}
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
     
      <Container>
       <Divider id="comments-divider"/>
        <CommentForm />
     
      </Container>
    </>
  );
};

export default SinglePoll;
