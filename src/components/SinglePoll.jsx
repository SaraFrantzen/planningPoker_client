import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Polls from "../modules/polls";
import { useSelector } from "react-redux";
import cards3 from "../images/cards3.jpg";
import CommentForm from "./CommentForm";
import JoinPoll from "./JoinPoll";
import ViewTeam from "./ViewTeam";
import Vote from "./Vote";
import HeadingSinglePoll from "./HeadingSinglePoll";
import VotingStatus from "./VotingStatus";
import CloseVoting from "./CloseVoting";
import ViewVotesResult from "./ViewVotesResult";
import ClosePoll from "./ClosePoll";
import votingStatusCalculator from "../modules/votingStatusCalculator";
import {
  Container,
  Card,
  Message,
  Grid,
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
  const [voteToggle, setVoteToggle] = useState(true);
  const [userVoted, setUserVoted] = useState();
  const [status0, setStatus0] = useState(0);
  const [status1, setStatus1] = useState(0);
  const [status2, setStatus2] = useState(0);
  const [status3, setStatus3] = useState(0);
  const [state, setState] = useState("");
  const [votes, setVotes] = useState({});
  const [result, setResult] = useState();
  const [votedPointsArray, setVotedPointsArray] = useState([]);

  useEffect(() => {
    const getSinglePoll = async () => {
      const response = await Polls.show(id);
      if (response.id) {
        setPoll(response);
        setState(response.state);
        setTeam(response.team);
        setResult(response.result);
        if (response.votes != null) {
          setVotes(response.votes);
          setVotedPointsArray(Object.values(response.votes));
          if (currentUser.name in response.votes) {
            setUserVoted(response.votes[currentUser.name]);
            setVoteToggle(false);
          }
        }
      } else {
        setMessage(response);
      }
    };
    getSinglePoll();
  }, [id, currentUser.name]);

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
    let statusCounter = votedPointsArray;
    votingStatusCalculator(
      setStatus0,
      setStatus1,
      setStatus2,
      setStatus3,
      statusCounter
    );
  }, [votedPointsArray]);

  return (
    <>
      <HeadingSinglePoll
        userVoted={userVoted}
        joined={joined}
        authenticated={authenticated}
        state={state}
      />
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
                    {poll.description}
                  </Card.Content>

                  <Card.Content id="tasks">Tasks </Card.Content>
                  <Card.Content data-cy="tasks">{poll.tasks}</Card.Content>
                  {result && (
                    <>
                      <Divider />
                      <Card.Content id="description">Points</Card.Content>
                      {result}
                    </>
                  )}
                </Card.Content>
              </Card>
            </Grid.Column>

            <Grid.Column width={6}>
              <Card fluid id="singlePoll-card" color="red">
                <Card.Content>
                  {votedPointsArray !== [] && (
                    <Card.Content id="poll-status">Poll status</Card.Content>
                  )}
                </Card.Content>
                {state !== "closed" && (
                  <>
                    <Card.Content data-cy="points">
                      <VotingStatus
                        status0={status0}
                        status1={status1}
                        status2={status2}
                        status3={status3}
                      />
                    </Card.Content>
                  </>
                )}

                <Card.Content>
                  {authenticated && state === "ongoing" ? (
                    <Vote
                      voteToggle={voteToggle}
                      joined={joined}
                      setVotedPointsArray={setVotedPointsArray}
                      setVoteMessage={setVoteMessage}
                      setUserVoted={setUserVoted}
                      setVoteToggle={setVoteToggle}
                      setMessage={setMessage}
                    />
                  ) : (
                    <>
                      {state === "pending" && authenticated && (
                        <Message color="black" data-cy="voting-closed-message">
                          voting is closed
                        </Message>
                      )}
                      {state === "pending" && !authenticated && (
                        <Message color="black" data-cy="voting-closed-message">
                          voting is closed, sign in to assign points
                        </Message>
                      )}
                      {state === "closed" && (
                        <Message color="black" data-cy="poll-closed-message">
                          Poll is completed
                        </Message>
                      )}
                      {authenticated && (
                        <ClosePoll
                          setState={setState}
                          setResult={setResult}
                          state={state}
                        />
                      )}
                    </>
                  )}
                  {state === "ongoing" && (
                    <JoinPoll
                      joined={joined}
                      setJoined={setJoined}
                      setMessage={setMessage}
                      setTeam={setTeam}
                    />
                  )}

                  <Divider />
                  {authenticated && joined && state === "ongoing" && (
                    <>
                      <CloseVoting setState={setState} setVotes={setVotes} />
                      <Divider />
                    </>
                  )}

                  {state === "pending" ? (
                    <ViewVotesResult votes={votes} />
                  ) : (
                    <ViewTeam joined={joined} team={team} />
                  )}
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>

      {state !== "ongoing" && (
        <Container className="margin-container">
          <Divider id="comments-divider" />
          <CommentForm />
        </Container>
      )}
    </>
  );
};

export default SinglePoll;
