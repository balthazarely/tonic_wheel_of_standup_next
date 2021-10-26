import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export const PageWrapper = ({ children }: LayoutProps) => {
  return (
    <div className="container mx-auto max-w-4xl  px-8 text-white mt-12">
      {children}
    </div>
  );
};
