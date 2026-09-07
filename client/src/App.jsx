import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ErrorBoundary from "./components/ErrorBoundary";
import ProtectedRoute from "./components/ProtectedRoute";
import PageLoader from "./utils/PageLoader";

const SignIn = lazy(() => import("./auth/SignIn"));
const SignUp = lazy(() => import("./auth/SignUp"));
const ResetPassword = lazy(() => import("./auth/ResetPassword"));
const ResetPasswordLink = lazy(() => import("./auth/ResetPasswordLink"));
const Home = lazy(() => import("./pages/Home.jsx"));
const Community = lazy(() => import("./pages/Community.jsx"));
const SingleUserProfile = lazy(() => import("./pages/SingleUserProfile.jsx"));
const Notifications = lazy(() => import("./pages/Notifications.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));

function App() {
  return (
    <ErrorBoundary>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/resetpasswordlink/:resetToken" element={<ResetPasswordLink />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/community" element={<Community />} />
            <Route path="/singleuserprofile/:userId" element={<SingleUserProfile />} />
            <Route path="/notifications" element={<Notifications />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Toaster />
    </ErrorBoundary>
  );
}

export default App;
