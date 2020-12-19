import React from "react";
import { Header, Segment } from "semantic-ui-react";

const MainHeader = () => {
  return (
    <>
      <Segment inverted>
        <Header inverted size="huge" id="header">
          Planning Poker
        </Header>
      </Segment>
    </>
  );
};

export default MainHeader;
