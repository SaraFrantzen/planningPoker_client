import axios from "axios";

const Polls = {
  async index(category) {
    try {
      let result;
      if (category) {
        result = await axios.get(`/polls/?category=${category}`);
      } else {
        result = await axios.get("/polls");
      }
      return result.data;
    } catch (error) {
      
      return error.response.data.error;
    }
  },

  async show(pollId) {
    try {
      let result = await axios.get(`/polls/${pollId}`);
      return result.data.poll;
    } catch (error) {
      return error.response.data.error;
    }
  },

  async create(title, description, tasks, image) {
    let headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
    try {
      let result = await axios.post(
        "/polls",
        {
          poll: {
            title: title.value,
            description: description.value,
            tasks: tasks.value,
            image: image,
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
      return error.response.data.error_message;
    }
  },

  async close(id) {
    let headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
    try {
      let response = await axios.put(
        `/polls/${id}`,
        {
          state: "pending",
        },
        {
          headers: headers,
        }
      );
      return response.data;
    } catch (error) {
      return error.response.data.error_message;
    }
  },

  async assign(id, result) {
    let headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
    try {
      let response = await axios.put(
        `/polls/${id}`,
        {
          result: result,
        },
        {
          headers: headers,
        }
      );
      return response.data;
    } catch (error) {
      return error.response.data.error_message;
    }
  },
};

export default Polls;
