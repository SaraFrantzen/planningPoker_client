import axios from "axios";

const Comments = {
  async create(id, comment) {
    let headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
    let user_name = headers.uid;
    try {
      let result = await axios.post(
        "/comments",
        {
          poll_id: id,
          comment: {
            user_name: user_name,
            comment: comment.value,
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
      document.getElementById("form-comment").reset();
      return result.data;
    } catch (error) {
      return error.response.data.message;
    }
  },
};

export default Comments;
