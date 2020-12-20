import React from "react";
import { Switch, Route } from "react-router-dom";
import PollsIndex from "./components/PollsIndex";
import MainHeader from "./components/MainHeader";
import LoginForm from "./components/LoginForm";

const App = () => {
  return (
    <>
      <MainHeader />
      <Switch>
        <Route exact path="/" component={PollsIndex} />
        <Route exact path="/login" component={LoginForm} />
      </Switch>
    </>
  );
};

export default App;
