import React from "react";
import { HiArrowCircleRight, HiArrowCircleLeft } from "react-icons/hi";

export const SpinnerTarget = () => {
  return (
    <>
      <div className="absolute -translate-y-1/2  transform top-1/2 -left-11  z-50 text-6xl text-white ">
        <HiArrowCircleRight />
      </div>
      <div
        className="absolute -translate-y-1/2 -translate-x-1/2 transform top-1/2 left-1/2 bg-tonic-base "
        style={{ height: "40px", width: "250px" }}
      ></div>
      <div className="absolute -translate-y-1/2  transform top-1/2 -right-11  z-50 text-6xl  text-white ">
        <HiArrowCircleLeft />
      </div>
    </>
  );
};
