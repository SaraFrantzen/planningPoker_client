import React from "react";
import { Button, Form, Container } from "semantic-ui-react";

const LoginForm = () => {
  return (
    <>
      <Container>
        <Form data-cy="login-form">
          <Form.Input
            icon="user"
            iconPosition="left"
            label="Email:"
            placeholder="email"
            name="email"
            type="email"
            data-cy="email"
          />

          <Form.Input
            icon="lock"
            iconPosition="left"
            placeholder="password"
            label="Password:"
            type="password"
            name="password"
            data-cy="password"
          />
          <Button data-cy="submit" content="Submit" primary />
        </Form>
      </Container>
    </>
  );
};

export default LoginForm;
