import NeuButton from "../../shared/button/NeuButton";
import React from "react";
import { roomSlice } from "../../store/reducers/RoomSlice";
import { useAppDispatch } from "../../hooks/hooks";
import { userSlice } from "../../store/reducers/UserSlice";

const ClearVotesValue = () => {
  const dispatch = useAppDispatch();
  const { clearVotesValueAction } = roomSlice.actions;
  const { setScramPoint } = userSlice.actions;
  const clearVotesValue = () => {
    dispatch(clearVotesValueAction());
    dispatch(setScramPoint(0));
  };

  return (
    <div>
      <NeuButton
        className={"show-btn"}
        onClick={clearVotesValue}
        name={`Очистить`}
      />
    </div>
  );
};

export default ClearVotesValue;
