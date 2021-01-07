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

const UserSession = {
  async login(event, dispatch, history) {
    event.preventDefault();
    try {
      const email = event.target.email.value;
      const password = event.target.password.value;
      const response = await auth.signIn(email, password);
      dispatch({
        type: "AUTHENTICATE",
        payload: {
          currentUser: { email: response.data.email, name: response.data.name },
          authenticate: true,
        },
      });
    } catch (error) {
      return error.response.data.errors[0];
    }
  },

  async logout(dispatch) {
    const response = await auth.signOut();
    dispatch({
      type: "AUTHENTICATE",
      payload: {
        currentUser: {},
        authenticate: false,
      },
    });
    return response;
  },
};

export default UserSession;
