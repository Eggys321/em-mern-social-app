import BeatLoader from "react-spinners/BeatLoader";
import CircleLoader from "react-spinners/CircleLoader";
import ClipLoader from "react-spinners/ClipLoader";

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
      <ClipLoader color={"#1565D8"} size={35} />
    </div>
  );
};
