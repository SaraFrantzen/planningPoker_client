import React from "react";
import { Header, Segment, Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

const MainHeader = () => {
  return (
    <>
      <Segment inverted>
        <Header inverted size="huge" id="header">
          <Menu.Item as={Link} to="/" id="planningPoker">
            Planning Poker
          </Menu.Item>
        </Header>
      </Segment>
    </>
  );
};

export default MainHeader;
