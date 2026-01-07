import React from "react";
import { Spinner } from "./ui/spinner";

const Loading = () => {
  return (
    <div className="flex items-center justify-center">
      <Spinner />
    </div>
  );
};

export default Loading;
