import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import PollsIndex from "./components/PollsIndex";
import MainHeader from "./components/MainHeader";
import LoginForm from "./components/LoginForm";
import CreatePollsForm from "./components/CreatePollsForm";
import { useSelector } from "react-redux";
import SinglePoll from './components/SinglePoll';


const App = () => {
  const authenticated = useSelector((state) => state.authenticate);
  return (
    <>
      <MainHeader />
      <Switch>
        <Route exact path="/" component={PollsIndex} />
        <Route exact path="/category/:category" component={PollsIndex} />
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/polls/:id" component={SinglePoll} />
 
        {authenticated ? (
          <Route exact path="/create" component={CreatePollsForm} />
        ) : (
          <Redirect to="/login" />
        )} 
       
      </Switch>
    </>
  );
};

export default App;
