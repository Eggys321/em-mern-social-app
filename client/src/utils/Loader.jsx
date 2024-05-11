import React from "react";
import BeatLoader from "react-spinners/BeatLoader";

const Loader = () => {
  return (
    <div>
      <BeatLoader color={"white"} size={10} margin={4} />
    </div>
  );
};

export default Loader;