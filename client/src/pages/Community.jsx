import { useEffect, useState } from "react";
import Navbar from "../layouts/Navbar";
import Bio from "../components/Bio";
import { Link } from "react-router-dom";
import NavSection from "../components/NavSection";
import toast from "react-hot-toast";
import { SpinnerLoader } from "../utils/Loader";
import Seo from "../components/Seo";
import EmptyState from "../components/EmptyState";
import { get, post } from "../api/client";

const Community = () => {
  const [data, setData] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getUsers = async () => {
    try {
      setIsLoading(true);
      const response = await get("/users/all", { auth: false });
      setData(response.users || []);
    } catch (error) {
      console.error("Failed to load users:", error.message);
      toast.error("Couldn't load the community list.");
    } finally {
      setIsLoading(false);
    }
  };

  const getCurrentUser = async () => {
    try {
      const response = await get("/users");
      if (response.success) {
        setCurrentUser(response.user);
      } else {
        console.error(response.message);
      }
    } catch (error) {
      console.error("Failed to fetch current user:", error.message);
    }
  };

  const handleFollow = async (userId) => {
    if (!currentUser) return;
    try {
      const result = await post(`/users/follow/${userId}`, { userId: currentUser._id });
      if (result.success) {
        setData((prevData) =>
          prevData.map((user) =>
            user._id === userId ? { ...user, followers: [...user.followers, currentUser._id] } : user
          )
        );
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Failed to follow user:", error.message);
      toast.error(error.message);
    }
  };

  const handleUnfollow = async (userId) => {
    if (!currentUser) return;
    try {
      const result = await post(`/users/unfollow/${userId}`, { userId: currentUser._id });
      if (result.success) {
        setData((prevData) =>
          prevData.map((user) =>
            user._id === userId
              ? { ...user, followers: user.followers.filter((id) => id !== currentUser._id) }
              : user
          )
        );
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Failed to unfollow user:", error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getUsers();
    getCurrentUser();
  }, []);

  return (
    <>
      <Seo title="Community" description="Discover and follow people on EM." noIndex />
      <Navbar />

      <main id="main-content" className="container">
        <div className="row gap-2 pt-3">
          <section className="col-md-4 d-none d-md-block p-2 rounded-2 border profile-section">
            <Bio />
          </section>

          <div className="col-md">
            <div>
              {isLoading ? (
                <div className="d-flex justify-content-center align-items-center vh-100" role="status" aria-label="Loading community">
                  <SpinnerLoader />
                </div>
              ) : (
                <>
                  {data.length === 0 && (
                    <EmptyState icon="🧑‍🤝‍🧑" title="No users to show yet">
                      Once people join EM, you&apos;ll find them here.
                    </EmptyState>
                  )}
                  {data?.map((datum) => {
                    const { profilePhoto, followers, userName, _id } = datum;
                    const isFollowing = followers.includes(currentUser?._id);

                    return (
                      <div
                        key={_id}
                        className="d-flex justify-content-between card-surface shadow-sm mb-3 align-items-center p-3 p-md-4 gap-2"
                      >
                        <div className="d-flex align-items-center gap-2" style={{ minWidth: 0 }}>
                          <img
                            loading="lazy"
                            src={profilePhoto}
                            alt={`${userName}'s profile photo`}
                            className="avatar avatar-md flex-shrink-0"
                          />
                          <div className="d-flex flex-column" style={{ minWidth: 0 }}>
                            <Link className="text-decoration-none text-truncate" to={`/singleuserprofile/${_id}`}>
                              <span>{userName}</span>
                            </Link>
                            <span className="text-muted-em">{followers?.length} follower(s)</span>
                          </div>
                        </div>
                        {_id !== currentUser?._id && (
                          <div className="flex-shrink-0">
                            {isFollowing ? (
                              <button
                                type="button"
                                className="btn btn-outline-primary btn-sm rounded-pill px-3"
                                onClick={() => handleUnfollow(_id)}
                              >
                                Following
                              </button>
                            ) : (
                              <button
                                type="button"
                                className="btn btn-primary btn-sm rounded-pill px-3"
                                onClick={() => handleFollow(_id)}
                              >
                                Follow +
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      <NavSection />
    </>
  );
};

export default Community;
