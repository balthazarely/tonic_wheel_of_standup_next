import React from "react";
import { spinnerDimensions } from "./Spinner.styles";
import { SpinnerBox } from "./SpinnerBox";
import { SpinnerShadow } from "./SpinnerShadow";
import { SpinnerTarget } from "./SpinnerTarget";
import BeatLoader from "react-spinners/BeatLoader";

interface SpinnerProps {
  staticNameArray: any[];
  currentName: string;
  whoHasGoneArray: any[];
}

export const Spinner = ({
  staticNameArray,
  currentName,
  whoHasGoneArray,
}: SpinnerProps) => {
  return (
    <div className="relative">
      <SpinnerTarget />
      <SpinnerShadow />
      <div style={spinnerDimensions} className=" z-40 ">
        {staticNameArray.map((name, i) => (
          <SpinnerBox
            key={i}
            name={name}
            currentName={currentName}
            whoHasGoneArray={whoHasGoneArray}
          />
        ))}
      </div>
    </div>
  );
};
