import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const dimensions = {
  minHeight: "700px",
  // height: "100vh",
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div
      className="transition-all duration-200 bg-tonic-dark "
      style={dimensions}
    >
      {children}
    </div>
  );
};
