import React, { ReactNode } from "react";
import "./card.css";

type CardStyle = {
  width?: number;
  height?: number;
  children?: ReactNode;
  className: string;
};
const Card: React.FunctionComponent<CardStyle> = ({
  width,
  height,
  children,
  className,
}: CardStyle) => {
  return (
    <div
      className={`card ${className}`}
      style={{ width: width, height: height }}
    >
      <div>{children}</div>
    </div>
  );
};

export default Card;
