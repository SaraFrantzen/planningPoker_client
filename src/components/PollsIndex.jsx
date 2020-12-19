import React, { useEffect, useState } from "react";
import Polls from "../modules/polls";
import PollsCard from "./PollsCard";
import { Container, Grid } from "semantic-ui-react";

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
      <Container className="polls-container">
        <Grid>
          <Grid.Row columns={4}>
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
