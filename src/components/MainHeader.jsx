import React from "react";
import { Header, Segment, Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const MainHeader = () => {
  const authenticated = useSelector((state) => state.authenticate);
  const currentUser = useSelector((state) => state.currentUser);
  return (
    <>
      <Segment inverted>
        <Header inverted size="huge" id="header">
          <Menu.Item as={Link} to="/" id="planningPoker">
            Planning Poker
          </Menu.Item>

          {authenticated ? (
            <p>You're logged in with: {currentUser.email}</p>
          ) : (
            <Menu.Item as={Link} to="/login" data-cy="login">
              Login
            </Menu.Item>
          )}
        </Header>
      </Segment>
    </>
  );
};

export default MainHeader;
