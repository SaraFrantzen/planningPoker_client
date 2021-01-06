import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import Polls from "../modules/polls";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Vote = ({
  joined,
  setVoteToggle,
  voteToggle,
  setStatus,
  setVoteMessage,
  setUserVoted,
  setMessage,
  setStatus0,
  setStatus1,
  setStatus2,
  setStatus3,
  status0,
  status1,
  status2,
  status3,
}) => {
  const [selectedPoints, setSelectedPoints] = useState();
  const [votes, setVotes] = useState({});
  const { id } = useParams();
  const authenticated = useSelector((state) => state.authenticate);
  const currentUser = useSelector((state) => state.currentUser);

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
    </>
  );
};

export default Vote;
