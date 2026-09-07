import { useEffect, useRef } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

const ProtectedRoute = () => {
  const location = useLocation();
  const token = localStorage.getItem("clientToken");
  const hasWarned = useRef(false);

  useEffect(() => {
    if (!token && !hasWarned.current) {
      hasWarned.current = true;
      toast.error("Please sign in to continue.");
    }
  }, [token]);

  if (!token) {
    return <Navigate to="/signin" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
