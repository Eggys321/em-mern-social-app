import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import logoImg from "../assets/logo.svg";

const NotFound = () => (
  <>
    <Seo title="Page not found" description="The page you're looking for doesn't exist." noIndex />
    <main className="d-flex flex-column align-items-center justify-content-center text-center vh-100 px-3">
      <img src={logoImg} alt="EM" height={40} className="mb-4" />
      <h1 className="display-5 fw-bold mb-2">404</h1>
      <p className="text-muted-em mb-4">
        We couldn&apos;t find the page you were looking for.
      </p>
      <Link to="/" className="btn btn-primary rounded-pill px-4">
        Back to home
      </Link>
    </main>
  </>
);

export default NotFound;
