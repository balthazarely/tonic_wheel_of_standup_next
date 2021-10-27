import React from "react";
import BeatLoader from "react-spinners/BeatLoader";

interface NextButtonProps {
  nextButtonClick?: () => void;
  isSpinning: boolean;
  isGameActive: boolean;
  gameOver: boolean;
}

export const SpinnerBtn = ({
  nextButtonClick,
  isSpinning,
  isGameActive,
  gameOver,
}: NextButtonProps) => {
  return (
    <div
      onClick={nextButtonClick}
      className=" bg-tonic-base hover:bg-tonic-baseDark  text-white   cursor-pointer text-sm h-12 flex items-center justify-center   w-full "
    >
      {isSpinning && isGameActive ? (
        <div className=" h-12 flex items-center justify-center ">
          <BeatLoader color="white" loading={true} size={7} />
        </div>
      ) : (
        <div className="  h-12 flex items-center ">
          {!isGameActive && !gameOver && "START SPINNING!"}
          {isGameActive && !gameOver && "WHO'S UP NEXT?"}
          {isGameActive && gameOver && "THANKS FOR SPINNING"}
        </div>
      )}
    </div>
  );
};
