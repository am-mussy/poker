import React from "react";
import "./medianValue.css";
import { useAppSelector } from "../../hooks/hooks";
type MedianValueProps = {
  usersVotes: number[];
};

const fibonacciNumber = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144];

function median(values: number[]) {
  values.sort(function (a, b) {
    return a - b;
  });

  const half = Math.floor(values.length / 2);

  if (values.length % 2) return values[half];

  return (values[half - 1] + values[half]) / 2.0;
}

const MedianValue = ({ usersVotes }: MedianValueProps) => {
  let result;
  if (!usersVotes.length) {
    result = 0;
  } else {
    const medianValue = usersVotes && Math.ceil(median(usersVotes));

    const abs = Math.abs;
    const closest = (array: number[], value: number) =>
      array.reduce((p, c) => (abs(c - value) < abs(p - value) ? c : p));

    result = closest(fibonacciNumber, medianValue);
  }

  const isHidden = useAppSelector(
    (state) => state.roomReducer.scramPointIsHidden
  );
  const scoreStyle = isHidden ? "score-blur" : "";

  return (
    <div className={"medianValue"}>
      <span>Медиана: </span>
      <span className={scoreStyle}>{result}</span>
    </div>
  );
};

export default MedianValue;
