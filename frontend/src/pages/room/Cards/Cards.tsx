import React from "react";
import Card from "./card/Card";
import "./cards.css";
import { useAppSelector } from "../../../hooks/hooks";
const fibonacciNumber = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144];

function Cards() {
  const { scrum } = useAppSelector((state) => state.userReducer);
  return (
    <div className={"cards-root"}>
      {fibonacciNumber.map((number) => {
        return (
          <Card
            key={`${number}_key`}
            fibNumber={number}
            selected={number === 0 ? false : number === scrum}
          />
        );
      })}
    </div>
  );
}

export default Cards;
