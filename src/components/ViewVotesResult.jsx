import React, { useState } from "react";
import { Button, List, Grid } from "semantic-ui-react";

const ViewVotesResult = ({ votes }) => {

  const names = Object.keys(votes);
  const points = Object.values(votes);

  const [listOfNames, setListOfNames] = useState();
  const [listOfPoints, setListOfPoints] = useState();
  const ViewVotesHandler = async () => {
    let listNames = names.map((name) => <li>{name}: </li>);
    let listPoints = points.map((point) => <li>{point}</li>);
    setListOfNames(listNames);
    setListOfPoints(listPoints);
  };
  return (
    <>
      <>
        <Button
          basic
          onClick={() => ViewVotesHandler()}
          data-cy="view-participants"
          id="button"
          color="black"
        >
          View votes
        </Button>
        <Grid>
          <Grid.Row>
            <Grid.Column width={8}>
              <List>
                <List.Item>
                  <List.Content data-cy="team">{listOfNames}</List.Content>
                </List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={2}>
              <List>
                <List.Item>
                  <List.Content data-cy="team">{listOfPoints}</List.Content>
                </List.Item>
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </>
    </>
  );
};

export default ViewVotesResult;
