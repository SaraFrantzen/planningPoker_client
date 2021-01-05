import React from "react";
import {
    Form,
  } from "semantic-ui-react";
const CommentForm = () => {
  return (
    <>
      <Form data-cy="form-comment" /* onSubmit={onSubmit} */>
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
    </>
  );
};

export default CommentForm;
