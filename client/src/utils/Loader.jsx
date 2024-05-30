import React from "react";
import BeatLoader from "react-spinners/BeatLoader";
import CircleLoader from "react-spinners/CircleLoader";
import Spinner from 'react-bootstrap/Spinner';


export const Loader = () => {
  return (
    <div>
      <BeatLoader color={"white"} size={10} margin={4} />
    </div>
  );
};
export const Cliploader = () => {
  return (
    <div>
      <CircleLoader color={"black"} size={100} margin={4} />
    </div>
  );
};
export const SpinnerLoader = () => {
  return (
    <div>
      <Spinner animation="grow" margin={4} />
    </div>
  );
};

// export default Loader;