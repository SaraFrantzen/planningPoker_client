import React, { useState } from "react";
import { Button, List } from "semantic-ui-react";

const ViewTeam = ({ joined, team }) => {
  const [listTeam, setListTeam] = useState();
  const ViewTeamHandler = async () => {
    let list = team.map((team) => <li>{team}</li>);
    setListTeam(list);
  };
  return (
    <>
      {joined && (
        <>
          <>
            <Button
              basic
              onClick={() => ViewTeamHandler()}
              data-cy="view-participants"
              id="button"
              color="black"
            >
              View team
            </Button>
            <List>
              <List.Item>
                <List.Content data-cy="team">{listTeam}</List.Content>
              </List.Item>
            </List>
          </>
        </>
      )}
    </>
  );
};

export default ViewTeam;
