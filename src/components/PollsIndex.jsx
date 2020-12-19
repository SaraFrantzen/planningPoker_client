import React, { useEffect, useState } from "react";

const PollsIndex = () => {
    const [polls, setPolls] = useState([])

		useEffect(() => {
			const getPollsIndex = async () => {
				const response = await Polls.Index() 
			}
			getPollsIndex()
		}, [])



    return (
        <>
            <PollsCard />
        </>
    )
}

export default PollsIndex
