import React from "react";
import { Header, Segment, Menu, Grid, GridColumn } from "semantic-ui-react";
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

  const signOutHandler = async () => {
    const response = await UserSession.logout(dispatch, history);

    history.replace({ pathname: "/" });
    return response;
  };
  return (
    <>
      <Segment inverted>
        <Header id="header" size="huge">
          <Grid>
            <Grid.Row>
              <Grid.Column width={11}>
                <Menu.Item
                  as={Link}
                  to="/"
                  id="planningPoker"
                  data-cy="home"
                  floated="left"
                >
                  Planning Poker
                </Menu.Item>
              </Grid.Column>
              <Grid.Column width={5}>
               {authenticated && (
                 <Menu.Item floated="right">
                  <p id="login-txt">
                    You're logged in with: {currentUser.email}
                  </p>
                </Menu.Item>
               )} 
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Header>

        <Header.Subheader id="subheader">
          <Grid>
            <Grid.Row>
              <Grid.Column width={10} id="sort-features">
                Sort features by category
                <Menu.Item
                  as={Link}
                  to="/category/api"
                  data-cy="api"
                  id="category"
                >
                  api
                </Menu.Item>{" "}
                ||
                <Menu.Item
                  as={Link}
                  to="/category/client"
                  data-cy="client"
                  id="categoryClient"
                >
                  client
                </Menu.Item>
              </Grid.Column>
              <GridColumn width={2} floated="right">
                {authenticated ? (
                  <>
                    <Menu.Item onClick={() => signOutHandler()} id="login">
                      Sign Out
                    </Menu.Item>
                  </>
                ) : (
                  <Menu.Item as={Link} to="/login" data-cy="login" id="login">
                    Login
                  </Menu.Item>
                )}
              </GridColumn>
            </Grid.Row>
          </Grid>
        </Header.Subheader>
      </Segment>
    </>
  );
};

export default MainHeader;
