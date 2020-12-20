import axios from "axios";

const Polls = {
  async index() {
    let result = await axios.get("/polls");
    return result.data.polls;
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
      return result.data.message;
    } catch (error) {
      return error.response.data.message;
    }
  },
};

export default Polls;
