import React, { useEffect } from "react";
import "./room.css";
import { useNavigate } from "react-router-dom";
import UserList from "./userList/UserList";
import Cards from "./Cards/Cards";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { roomSlice } from "../../store/reducers/RoomSlice";
import NeuButton from "../../components/button/NeuButton";

function Room() {
  const navigate = useNavigate();
  const userData = useAppSelector((state) => state.userReducer);
  const userList = useAppSelector((state) => state.roomReducer.users);
  const isHidden = useAppSelector(
    (state) => state.roomReducer.scramPointIsHidden
  );
  const dispatch = useAppDispatch();
  const { changeScramPointVisibility } = roomSlice.actions;

  useEffect(() => {
    if (!userData.roomId) {
      navigate("/");
    }
  }, [userList]);

  const changeVisibility = () =>
    dispatch(changeScramPointVisibility(!isHidden));
  return (
    <div className="Room">
      <div className={"roomId"}>ROOM ID:{userData.roomId}</div>
      <Cards />
      <NeuButton
        className={"show-btn"}
        onClick={changeVisibility}
        name={`${isHidden ? "Показать" : "Скрыть"}`}
      />
      <UserList users={userList} />
    </div>
  );
}

export default Room;
