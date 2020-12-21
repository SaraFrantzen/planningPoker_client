import React, { useEffect, useState } from "react";
import Polls from "../modules/polls";
import PollsCard from "./PollsCard";
import { Container, Grid, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

const PollsIndex = () => {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    const getPollsIndex = async () => {
      const fetchPolls = await Polls.index();
      setPolls(fetchPolls);
    };
    getPollsIndex();
  }, []);

  return (
    <>
      <Container>
        <Button color="blue" as={Link} to="/login" data-cy="createPoll">
          Create new poll
        </Button>
      </Container>
      <Container className="polls-container">
        <Grid>
          <Grid.Row columns={3}>
            {polls.map((poll) => {
              return (
                <>
                  <PollsCard poll={poll} />
                </>
              );
            })}
          </Grid.Row>
        </Grid>
      </Container>
    </>
  );
};

export default PollsIndex;
