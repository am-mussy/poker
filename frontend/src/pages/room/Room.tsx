import React, { useEffect } from "react";
import "./room.css";
import Vote from "../../widgets/Vote/Vote";
import VotesAnalytics from "../../widgets/VotesAnalytics/VotesAnalytics";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/hooks";

function Room() {
  const navigate = useNavigate();
  const userData = useAppSelector((state) => state.userReducer);

  useEffect(() => {
    if (!userData.roomId) {
      navigate("/");
    } else {
      window.localStorage.setItem("user", JSON.stringify(userData));
    }
  }, []);

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
