import React, { FC } from "react";
import "./card.css";
import { useAppDispatch } from "../../../../hooks/hooks";
import { userSlice } from "../../../../store/reducers/UserSlice";
import NeuButton from "../../../../shared/button/NeuButton";

interface CardProps {
  fibNumber: number;
  selected: boolean;
}

const Card: FC<CardProps> = ({ fibNumber, selected }) => {
  const { setScramPoint } = userSlice.actions;
  const dispatch = useAppDispatch();

  const handleChange = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const scramVoter: number = parseInt(event.currentTarget.innerText);
    dispatch(setScramPoint(scramVoter));
  };

  return (
    <div
      className={selected ? `selected scrumVote-wrapper` : `scrumVote-wrapper`}
    >
      <NeuButton
        name={fibNumber}
        onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          return handleChange(event);
        }}
        className={"vote-btn"}
      />
    </div>
  );
};

export default Card;
