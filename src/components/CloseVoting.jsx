import React, { useState } from "react";
import { Button, Message } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import Polls from "../modules/polls";

const CloseVoting = ({ setState, setVotes }) => {
  const [confirm, setConfirm] = useState(false);
  const { id } = useParams();
  const [message, setMessage] = useState("");
	
  const closeVoteHandler = async () => {
    let response = await Polls.close(id);
    if (response.message) {
      setMessage(response.message);
      setState(response.state);
      setVotes(response.votes)
    } else {
      setMessage(response);
    }
  };

  return (
    <>
      {!confirm && !message && (
        <Button
          onClick={() => setConfirm(true)}
          id="button"
          basic
          color="red"
          data-cy="close-poll"
        >
          Close Poll
        </Button>
      )}
      {confirm && !message && (
        <>
          <Message color="red">
            Are you sure you want to end the vote?
            <br />
            This can not be undone
          </Message>
          <Button
            onClick={() => setConfirm(false)}
            id="button"
            basic
            color="black"
          >
            Cancel
          </Button>{" "}
          <Button
            onClick={() => closeVoteHandler()}
            id="button"
            basic
            color="red"
            data-cy="confirm"
          >
            End vote
          </Button>
        </>
      )}
      {message && (
        <>
          <Message data-cy="message">{message}</Message>
        </>
      )}
    </>
  );
};

export default CloseVoting;
