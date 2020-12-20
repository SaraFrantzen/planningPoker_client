import JtockAuth from "j-tockauth";

let apiUrl;
if (process.env.NODE_ENV === "production") {
  apiUrl = "https://sl-planning-poker-api.herokuapp.com/api";
} else {
  apiUrl = "http://localhost:3000/api/";
}

const auth = new JtockAuth({
  host: apiUrl,

});

const login = async (event, dispatch, history) => {
  event.preventDefault();
  try {
    const email = event.target.email.value;
    const password = event.target.password.value;
    const response = await auth.signIn(email, password);
    dispatch({
      type: "AUTHENTICATE",
      payload: {
        authenticated: response.success,
        currentUser: response.data,
      },
    });

  /*   history.replace({ pathname: "/" }); */
  } catch (error) {
    return error.response.data.errors[0];
  }
};

export { login };
