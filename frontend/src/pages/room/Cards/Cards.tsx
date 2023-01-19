import React from "react";
import Card from "./card/Card";
import "./cards.css";
const fibonacciNumber = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144];

function Cards() {
  return (
    <div className={"cards-root"}>
      {fibonacciNumber.map((number) => (
        <Card key={`${number}_key`} fibNumber={number} />
      ))}
    </div>
  );
}

export default Cards;
