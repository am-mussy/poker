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
  const medianValue = usersVotes && Math.ceil(median(usersVotes));
  let result = 0;
  for (let i = 0; i < fibonacciNumber.length; i++) {
    if (
      medianValue >= fibonacciNumber[i] &&
      medianValue <= fibonacciNumber[i]
    ) {
      result = fibonacciNumber[i];
    }
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
