import React, { useState } from "react";
import { Button, Message } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import Polls from "../modules/polls";

const CloseVoting = ({ setState, setVotes }) => {
  const [confirm, setConfirm] = useState(false);
  const { id } = useParams();
  const [votingIsOpen, setvotingIsOpen] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const closeVoteHandler = async () => {
    let response = await Polls.close(id);
    if (response.message) {
      setState(response.state);
      setVotes(response.votes);
      setvotingIsOpen(false);
    } else {
      setErrorMessage(response);
    }
  };

  return (
    <>
      {!confirm && votingIsOpen && (
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
      {confirm && votingIsOpen && (
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
          {errorMessage && (
            <Message data-cy="error-message" color="red">
              {errorMessage}
            </Message>
          )}
        </>
      )}
    </>
  );
};

export default CloseVoting;
