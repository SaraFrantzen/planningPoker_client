import React, { useEffect, useState } from "react";
import Polls from "../modules/polls";
import PollsCard from "./PollsCard";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import cards2 from "../images/cards2.jpg";
import ess2 from "../images/ess2.png";
import { Container, Grid, Button, Image } from "semantic-ui-react";

const PollsIndex = () => {
  const [polls, setPolls] = useState([]);
  const authenticated = useSelector((state) => state.authenticate);

  useEffect(() => {
    const getPollsIndex = async () => {
      const fetchPolls = await Polls.index();
      setPolls(fetchPolls);
    };
    getPollsIndex();
  }, []);

  return (
    <>
      <Image src={ess2} size="small" floated="left" id="ess2" bordered />
      <Container>
        {authenticated ? (
          <Button
            basic
            color="red"
            as={Link}
            to="/create"
            data-cy="createPoll"
            id="create-button"
          >
            Create new poll
          </Button>
        ) : (
          <Button
            basic
            color="red"
            as={Link}
            to="/login"
            data-cy="createPoll"
            id="create-button"
          >
            Create new poll
          </Button>
        )}
     
      </Container>

      <Image src={cards2} size="medium" floated="right" id="image2" />
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
