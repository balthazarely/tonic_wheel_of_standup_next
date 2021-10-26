import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const dimensions = {
  minHeight: "700px",
  height: "100vh",
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div
      className=" bg-tonic-dark transition-all duration-200"
      style={dimensions}
    >
      {children}
    </div>
  );
};
