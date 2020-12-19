import axios from "axios";

const Polls = {
  async index() {
    let result = await axios.get("/polls");
    return result.data.polls;
  },
};

export default Polls;
