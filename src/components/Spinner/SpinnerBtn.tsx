import React from "react";
import BeatLoader from "react-spinners/BeatLoader";

interface NextButtonProps {
  nextButtonClick?: () => void;
  isSpinning: boolean;
  isGameActive: boolean;
  gameOver: boolean;
  pusherSubscribed: boolean;
}

export const SpinnerBtn = ({
  nextButtonClick,
  isSpinning,
  isGameActive,
  gameOver,
  pusherSubscribed,
}: NextButtonProps) => {
  return (
    <div
      onClick={nextButtonClick}
      className={` bg-tonic-base hover:bg-tonic-baseDark  text-white   text-sm h-12 flex items-center justify-center w-full cursor-pointer`}
    >
      {isSpinning && isGameActive ? (
        <div className=" h-12 flex items-center justify-center ">
          <BeatLoader color="white" loading={true} size={7} />
        </div>
      ) : (
        <div className="  h-12 flex items-center noselect ">
          {!pusherSubscribed && (
            <BeatLoader color="white" loading={true} size={7} />
          )}
          {!isGameActive && !gameOver && pusherSubscribed && "START SPINNING!"}
          {isGameActive && !gameOver && pusherSubscribed && "WHO'S UP NEXT?"}
          {isGameActive &&
            gameOver &&
            pusherSubscribed &&
            "THANKS FOR SPINNING"}
        </div>
      )}
    </div>
  );
};
