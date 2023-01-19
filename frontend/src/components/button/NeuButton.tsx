import React from "react";
import "./neuButton.css";

type NeuButtonProps = {
  name: string | number;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  className: string;
};

const NeuButton = ({ name, onClick, className }: NeuButtonProps) => {
  return (
    <button className={`btn ${className}`} onClick={onClick}>
      {name}
    </button>
  );
};

export default NeuButton;
