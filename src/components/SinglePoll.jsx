import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Polls from "../modules/polls";
import { useSelector } from "react-redux";
import cards3 from "../images/cards3.jpg";
import CommentForm from "./CommentForm";
import JoinPoll from "./JoinPoll";
import ViewTeam from "./ViewTeam";
import Vote from "./Vote";
import {
  Container,
  Card,
  Message,
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

  const [voteMessage, setVoteMessage] = useState("");
  const [status, setStatus] = useState([]);

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

                  <Vote
                    voteToggle={voteToggle}
                    joined={joined}
                    setStatus={setStatus}
                    setVoteMessage={setVoteMessage}
                    setUserVoted={setUserVoted}
                    setVoteToggle={setVoteToggle}
                    setMessage={setMessage}
                    setStatus0={setStatus0}
                    setStatus1={setStatus1}
                    setStatus2={setStatus2}
                    setStatus3={setStatus3}
                    status0={status0}
                    status1={status1}
                    status2={status2}
                    status3={status3}
                  />
                  <JoinPoll
                    joined={joined}
                    setJoined={setJoined}
                    setMessage={setMessage}
                    setTeam={setTeam}
                  />
                  <Divider />

                  <ViewTeam joined={joined} team={team} />
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>

      <Container>
        <Divider id="comments-divider" />
        <CommentForm />
      </Container>
    </>
  );
};

export default SinglePoll;
