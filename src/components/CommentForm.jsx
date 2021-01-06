import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Comments from "../modules/comments";
import { useSelector } from "react-redux";
import { Form, Message } from "semantic-ui-react";

const CommentForm = () => {
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const [errormessage, setErrormessage] = useState("");

  const authenticated = useSelector((state) => state.authenticate);
  const onSubmit = async (e) => {
    e.preventDefault();
    let { comment } = e.target;
    const response = await Comments.create(id, comment);
    if (response.message) {
      setMessage(response.message);
      setErrormessage("");
    } else {
      setErrormessage(response);
    }
  };

  return (
    <>
      <p id="poll-status">Comments</p>
      {message && (
        <Message data-cy="save-comment-message" color="black" id="message">
          {message} !
        </Message>
      )}
      {errormessage && (
        <Message data-cy="save-comment-message" color="red" id="message">
          {errormessage}
        </Message>
      )}
      {authenticated ? (
        <Form data-cy="form-comment" id="form-comment" onSubmit={onSubmit}>
          <Form.TextArea
            fluid
            placeholder="Write your comment here "
            data-cy="comment"
            name="comment"
          />
          <Form.Button
            data-cy="save-comment"
            basic
            color="red"
            floated="right"
            id="button"
          >
            Post Comment
          </Form.Button>
        </Form>
      ) : (
        <Message
          data-cy="authenticate-message"
          color="black"
          id="authenticate-message"
        >
          You need to login to be able to post comments
        </Message>
      )}
    </>
  );
};

export default CommentForm;
