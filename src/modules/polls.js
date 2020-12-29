import axios from "axios";

const Polls = {
  async index() {
    let result = await axios.get("/polls");
    return result.data.polls;
  },

  async show(pollId) {
    try {
      let result = await axios.get(`/polls/${pollId}`);
      return result.data.poll;
    } catch (error) {
      return error.response.data.error;
    }
  },

  async create(title, description, tasks) {
    let headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
    try {
      let result = await axios.post(
        "/polls",
        {
          poll: {
            title: title.value,
            description: description.value,
            tasks: tasks.value,
          },
        },
        {
          headers: {
            ...headers,
            "Content-type": "application/json",
            Accept: "application/json",
          },
        }
      );
      document.getElementById("create-poll").reset();
      return result.data;
    } catch (error) {
      return error.response.data.message;
    }
  },

  async join(id, userId) {
    let headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
    try {
      let response = await axios.put(
        `/polls/${id}`,
        {
          team: userId,
        },
        {
          headers: headers,
        }
      );
      return response.data;
    } catch (error) {
      return error.response.data.error;
    }
  },

  async vote(id, points) {
    let headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
    let email = headers.uid;
    try {
      let response = await axios.put(
        `/polls/${id}`,
        {
          points: points,
          votes: { email, points },
        },
        {
          headers: headers,
        }
      );
      return response.data;
    } catch (error) {
      return error.response.statusText;
    }
  },
};

export default Polls;
