import React from "react";
import "./averageValue.css";
import { useAppSelector } from "../../hooks/hooks";
type AverageValueProps = {
  usersVotes: number[];
};

const fibonacciNumber = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144];

const AverageValue = ({ usersVotes }: AverageValueProps) => {
  let result;

  if (!usersVotes.length) {
    result = 0;
  } else {
    const average = Math.ceil(
      usersVotes.reduce((a, b) => a + b, 0) / usersVotes.length
    );

    const abs = Math.abs;
    const closest = (array: number[], value: number) =>
      array.reduce((p, c) => (abs(c - value) < abs(p - value) ? c : p));

    result = closest(fibonacciNumber, average);
  }

  const isHidden = useAppSelector(
    (state) => state.roomReducer.scramPointIsHidden
  );
  const scoreStyle = isHidden ? "score-blur" : "";

  return (
    <div className={"averageValue"}>
      <span>Среднее: </span>
      <span className={scoreStyle}>{result}</span>
    </div>
  );
};

export default AverageValue;
