import React from "react";
import { useAppSelector } from "../../hooks/hooks";
import MedianValue from "../../features/MedianValue/MedianValue";
import AverageValue from "../../features/AverageValue/AverageValue";
import "./VotesAnalytics.css";

const VotesAnalytics = () => {
  const users = useAppSelector((state) => state.roomReducer.users);

  const votes: number[] = [];

  for (let i = 0; i < users.length; i++) {
    const scrum = users[i].scrum;
    if (scrum) votes.push(scrum);
  }

  return (
    <div className={"votesAnalytics"}>
      <MedianValue usersVotes={votes} />
      <AverageValue usersVotes={votes} />
    </div>
  );
};

export default VotesAnalytics;
