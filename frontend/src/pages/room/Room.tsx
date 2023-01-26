import React from "react";
import "./room.css";
import Vote from "../../widgets/Vote/Vote";
import VotesAnalytics from "../../widgets/VotesAnalytics/VotesAnalytics";

function Room() {
  return (
    <div className="Room">
      <div className={"main"}>
        <div className={"left"}>
          <div className={"vote-wrapper"}>
            <Vote />
          </div>
        </div>
        <div className={"right"}>
          <div className={"votesAnalytics-wrapper"}>
            <VotesAnalytics />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Room;
