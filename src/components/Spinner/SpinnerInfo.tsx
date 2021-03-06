import React from "react";
import { infoWrapperDimensions } from "./Spinner.styles";

interface InfoPannelProps {
  isSpinning: boolean;
  currentName: string;
  whoHasGoneArray: string[];
  gameOver: boolean;
  resetWheel: () => void;
  isGameActive: boolean;
}

const borderStyle = {
  borderBottom: "1px solid white",
  height: "30px",
};

export const SpinnerInfo = ({
  isSpinning,
  isGameActive,
  currentName,
  resetWheel,
  whoHasGoneArray,
  gameOver,
}: InfoPannelProps) => {
  return (
    <div
      className="text-5xl flex-1 text-white font-extrabold "
      style={infoWrapperDimensions}
    >
      <div className="">
        <div
          className="text-base flex justify-between font-light text-white mb-1 pl-1"
          style={borderStyle}
        >
          <div>Who Has Gone</div>
          <div>
            <button
              className="bg-tonic-base hover:bg-tonic-baseDark  text-white   cursor-pointer text-sm px-3 py-1 "
              onClick={resetWheel}
            >
              Reset
            </button>
          </div>
        </div>
        <div>
          {whoHasGoneArray.length !== 0 &&
            whoHasGoneArray.map((person: any, i: number) => (
              <div key={i} className="text-base font-light px-1 py-0.5">
                {person.Name}
              </div>
            ))}
          {!isSpinning && isGameActive && (
            <div className="text-base font-normal flex items-center justify-between bg-tonic-base w-full px-1 py-0.5">
              <div>{currentName}</div>
              <div className="text-sm font-light">Up now</div>
            </div>
          )}
        </div>
        {gameOver && <div className="text-3xl mt-3 ">Enjoy your weekend!</div>}
      </div>
    </div>
  );
};
