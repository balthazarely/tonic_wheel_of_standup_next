import React from "react";

interface InfoPannelProps {
  isSpinning: boolean;
  gameActive: boolean;
  currentName: string;
  nameArray: string[];
}

export const InfoPannel = ({
  isSpinning,
  gameActive,
  currentName,
  nameArray,
}: InfoPannelProps) => {
  return (
    <div className=" flex-1 text-white  ">
      <div className="mt-10">
        <div className="current__name">{currentName}</div>
        <div className="text-lg text-white">
          is game active:{" "}
          <span className="text-yellow-400">
            {gameActive ? "True" : "False"}
          </span>
        </div>
        <div className="text-lg text-white">
          is spinning:{" "}
          <span className="text-yellow-400">
            {isSpinning ? "True" : "False"}
          </span>
        </div>

        <div className="text-lg text-white">
          remaining people:{" "}
          <span className="text-yellow-400">{nameArray.length}</span>
        </div>
      </div>
    </div>
  );
};
