import React from "react";
import { Switch, Route } from "react-router-dom";
import PollsIndex from "./components/PollsIndex";
import MainHeader from "./components/MainHeader";
import LoginForm from "./components/LoginForm";
import CreatePollsForm from './components/CreatePollsForm';

const App = () => {
  return (
    <>
      <MainHeader />
      <Switch>
        <Route exact path="/" component={PollsIndex} />
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/create" component={CreatePollsForm} />
      </Switch>
    </>
  );
};

export default App;
