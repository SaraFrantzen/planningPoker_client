import React from "react";
import { Card } from "semantic-ui-react";

const CommentsCard = ({ comment }) => {
  return (
    <>
      <Card data-cy={"comment-" + comment.id} id="commentCard" color="red">
        <Card.Content>
          <Card.Header data-cy="user">{comment.user_name}</Card.Header>
        </Card.Content>
        <Card.Content>
          <Card.Description data-cy="body">{comment.comment}</Card.Description>
        </Card.Content>
      </Card>
    </>
  );
};

export default CommentsCard;
