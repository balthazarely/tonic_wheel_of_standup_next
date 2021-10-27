import React from "react";

const shadowDimensions = {
  width: "250px",
  height: "200px",
};

export const SpinnerShadow = () => {
  return (
    <div>
      <div
        className="bg-gradient-to-b from-tonic-dark absolute bottom-1/2 z-40  "
        style={shadowDimensions}
      ></div>
      <div
        className="bg-gradient-to-t from-tonic-dark  absolute top-1/2 z-40 opacity-70 "
        style={shadowDimensions}
      ></div>
    </div>
  );
};
