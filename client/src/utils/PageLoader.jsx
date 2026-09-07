import { SpinnerLoader } from "./Loader";

const PageLoader = () => (
  <div className="d-flex justify-content-center align-items-center vh-100" role="status" aria-label="Loading page">
    <SpinnerLoader />
  </div>
);

export default PageLoader;
