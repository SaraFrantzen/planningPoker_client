import React, { useState } from "react";
import { Header, Segment, Menu, Grid, GridColumn, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import UserSession from "../modules/auth";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

const MainHeader = () => {
  const dispatch = useDispatch();
  const authenticated = useSelector((state) => state.authenticate);
  const currentUser = useSelector((state) => state.currentUser);
  const history = useHistory();
const [message, setMessage] = useState("")
  const signOutHandler = async () => {
   
    const response = await UserSession.logout(dispatch, history);
    debugger
    setMessage(response) 
    history.replace({ pathname: "/" });
  };
  return (
    <>
      <Segment inverted>
        <Header inverted size="huge" id="header">
          <Grid>
            <Grid.Row>
              <GridColumn width={10}>
                <Menu.Item as={Link} to="/" id="planningPoker">
                  Planning Poker
                </Menu.Item>
              </GridColumn>
              <GridColumn width={6}>
                
                {authenticated ? (
                  <>
                  <p id="login-txt">You're logged in with: {currentUser.email}</p>
                  <Menu.Item onClick={() => signOutHandler()} id="logout">Sign Out</Menu.Item>
                    </>
                ) : (
                  <Menu.Item as={Link} to="/login" data-cy="login" id="login">
                    Login
                  </Menu.Item>
                )}
              
              </GridColumn>
            </Grid.Row>
          </Grid>
        </Header>
      </Segment>
    </>
  );
};

export default MainHeader;
