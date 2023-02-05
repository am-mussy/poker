import React from "react";
import NeuButton from "../../shared/button/NeuButton";
import { useAppDispatch } from "../../hooks/hooks";
import { userSlice } from "../../store/reducers/UserSlice";
import { useNavigate } from "react-router-dom";

const ExitFromRoom = () => {
  const dispatch = useAppDispatch();
  const { removeUser } = userSlice.actions;
  const navigate = useNavigate();
  const exit = () => {
    window.localStorage.setItem("user", "");
    dispatch(removeUser());
    navigate("/");
  };
  return (
    <div>
      <NeuButton name={"Exit Room"} onClick={exit} className={""} />
    </div>
  );
};

export default ExitFromRoom;
