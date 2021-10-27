import React from "react";

interface CopyLink {}

export const CopyLink = ({}: CopyLink) => {
  return (
    <div>
      <div className="text-xl mb-2 w-full border-b-2 border-gray-500">
        Share Link
      </div>
      <div className="grid grid-cols-2 gap-4 ">Copy Link</div>
    </div>
  );
};
