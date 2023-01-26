import React, { useEffect } from "react";
import "./vote.css";
import Cards from "../../pages/room/Cards/Cards";
import VisibilityVotesChanger from "../../features/VisibilityVotesChanger/VisibilityVotesChanger";
import ClearVotesValue from "../../features/ClearVotesValue/ClearVotesValue";
import UserList from "../../pages/room/userList/UserList";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/hooks";

const Vote = () => {
  const navigate = useNavigate();
  const userData = useAppSelector((state) => state.userReducer);
  const userList = useAppSelector((state) => state.roomReducer.users);

  useEffect(() => {
    if (!userData.roomId) {
      navigate("/");
    }
  }, [userList]);

  return (
    <div className={"vote"}>
      <div className={"roomId"}>ROOM ID:{userData.roomId}</div>
      <Cards />
      <VisibilityVotesChanger />
      <ClearVotesValue />
      <UserList users={userList} />
    </div>
  );
};

export default Vote;
