import React, { useEffect, useState } from "react";
import Comments from "../modules/comments";
import { useParams } from "react-router-dom";
import CommentsCard from "./CommentsCard";
import { Container } from "semantic-ui-react";

const CommentsIndex = () => {
  const { id } = useParams();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const getCommentsIndex = async () => {
      const fetchComments = await Comments.index(id);
      setComments(fetchComments);
    };
    getCommentsIndex();
  }, [id]);

  return (
    <>
      <Container className="comments-container">
        {comments.map((comment) => {
          return (
            <>
              <CommentsCard comment={comment} />
            </>
          );
        })}
      </Container>
    </>
  );
};

export default CommentsIndex;
