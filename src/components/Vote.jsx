import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import Polls from "../modules/polls";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Vote = ({
  joined,
  setVoteToggle,
  voteToggle,
  setVotedPointsArray,
  setVoteMessage,
  setUserVoted,
  setMessage,
}) => {
  const [selectedPoints, setSelectedPoints] = useState();
  const { id } = useParams();
  const authenticated = useSelector((state) => state.authenticate);
  const currentUser = useSelector((state) => state.currentUser);

  const handlePointsChange = (value) => {
    setSelectedPoints(value);
  };

  const voteHandler = async () => {
    let points = selectedPoints;
    const response = await Polls.vote(id, points);
    if (response.message === "successfully voted") {
      setVoteMessage("")
      setVoteToggle(false);
      setUserVoted(response.votes[currentUser.name]);
      setMessage("");
      setVotedPointsArray(Object.values(response.votes));
    } else if (response.message === "successfully un-voted") {
      setVoteMessage("Your previous vote is now removed");
      setMessage("");
      setVotedPointsArray(Object.values(response.votes));
      setUserVoted();
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
