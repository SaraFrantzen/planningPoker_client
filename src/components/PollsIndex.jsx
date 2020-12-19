import React, { useEffect, useState } from "react";
import Polls from "../modules/polls";

const PollsIndex = () => {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    const getPollsIndex = async () => {
      const fetchPolls = await Polls.index();
      setPolls(fetchPolls.polls);
    };
    getPollsIndex();
  }, []);

  return (
    <>
      
    </>
  );
};

export default PollsIndex;
