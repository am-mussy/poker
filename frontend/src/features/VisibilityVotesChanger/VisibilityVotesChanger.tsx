import React from "react";
import NeuButton from "../../shared/button/NeuButton";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { roomSlice } from "../../store/reducers/RoomSlice";
import "./visibilityVotesChanger.css";

const VisibilityVotesChanger = () => {
  const isHidden = useAppSelector(
    (state) => state.roomReducer.scramPointIsHidden
  );
  const dispatch = useAppDispatch();
  const { changeScramPointVisibility } = roomSlice.actions;
  const changeVisibility = () =>
    dispatch(changeScramPointVisibility(!isHidden));
  return (
    <div>
      <NeuButton
        className={"show-btn"}
        onClick={changeVisibility}
        name={`${isHidden ? "Показать" : "Скрыть"}`}
      />
    </div>
  );
};

export default VisibilityVotesChanger;
