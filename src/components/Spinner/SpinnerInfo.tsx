import React from "react";
import { SpinnerBtn } from "./SpinnerBtn";

interface InfoPannelProps {
  isSpinning: boolean;
  // gameActive: boolean;
  currentName: string;
  whoHasGoneArray: string[];
  // nameArray: string[];
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
  // gameActive,
  isGameActive,
  currentName,
  resetWheel,
  whoHasGoneArray,
  // nameArray,
  gameOver,
}: InfoPannelProps) => {
  return (
    <div className="text-5xl flex-1 text-white font-extrabold  md:-mt-12 mt-12 ">
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

        <div className="">
          {/* {whoHasGoneArray.map((name) => (
            <div
              key={name}
              className={`text-base font-light py-0.5 px-2 flex items-center justify-between  ${
                currentName === name && !gameOver
                  ? "bg-tonic-base "
                  : "text-white"
              }`}
            >
              <div>{name}</div>
              <div>{currentName === name && !gameOver ? "Up now" : ""}</div>
            </div>
          ))} */}
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
