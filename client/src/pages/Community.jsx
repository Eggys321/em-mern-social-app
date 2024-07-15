import React, { useEffect, useState } from "react";
import Navbar from "../layouts/Navbar";
import Bio from "../components/Bio";
import { Link } from "react-router-dom";
import NavSection from "../components/NavSection";
import toast from "react-hot-toast";
import { SpinnerLoader } from "../utils/Loader";

const Community = () => {
  const [data, setData] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("clientToken");

  const getUsers = async () => {
    try {
      setIsLoading(true);

      const request = await fetch(
        "https://em-mern-social-app.onrender.com/api/v1/users/all"
      );
      const response = await request.json();
      // console.log(response.users);
      setData(response.users);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  const getCurrentUser = async () => {
    // Fetch the current logged-in user
    try {
      const request = await fetch(
        "https://em-mern-social-app.onrender.com/api/v1/users",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const response = await request.json();
      // console.log(response);
      if (response.success) {
        setCurrentUser(response.user);
      } else {
        console.error(response.message);
      }
    } catch (error) {
      console.error("Failed to fetch current user:", error);
    }
  };
  // follow ftn
  const handleFollow = async (userId) => {
    if (!currentUser) return;

    try {
      const response = await fetch(
        `https://em-mern-social-app.onrender.com/api/v1/users/follow/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ userId: currentUser._id }),
        }
      );

      const result = await response.json();
      console.log(result);
      if (result.success) {
        setData((prevData) =>
          prevData.map((user) =>
            user._id === userId
              ? { ...user, followers: [...user.followers, currentUser._id] }
              : user
          )
        );
        toast.success(result.message);
      } else {
        console.error(result.message);
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Failed to follow user:", error);
    }
  };
  // unfollow ftn

  const handleUnfollow = async (userId) => {
    if (!currentUser) return;

    try {
      const response = await fetch(
        `https://em-mern-social-app.onrender.com/api/v1/users/unfollow/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ userId: currentUser._id }),
        }
      );

      const result = await response.json();
      if (result.success) {
        setData((prevData) =>
          prevData.map((user) =>
            user._id === userId
              ? {
                  ...user,
                  followers: user.followers.filter(
                    (id) => id !== currentUser._id
                  ),
                }
              : user
          )
        );
        toast.success(result.message);
      } else {
        console.error(result.message);
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Failed to unfollow user:", error);
    }
  };

  // if (!currentUser) {
  //   return <div>Loading...</div>;
  // }

  useEffect(() => {
    getUsers();
    getCurrentUser();
    if (token) {
      getCurrentUser();
    }
    document.title = "community | page";
  }, [token]);
  return (
    <>
      <Navbar />

      <main className="container">
        <div className=" row  gap-2 pt-3">
          <section style={{height:"45rem"}} className="col-md-4 d-none d-md-block p-2 rounded-2 border profile-section ">
            <Bio />
          </section>
          {/* all users */}
          <div className="col-md ">
            <div>
              {isLoading ? (
                <div className="d-flex justify-content-center align-items-center vh-100 ">
                  {" "}
                  <SpinnerLoader />{" "}
                </div>
              ) : (
                <>
                  {data?.map((datum) => {
                    const { profilePhoto, followers, userName, _id } = datum;
                    const isFollowing = followers.includes(currentUser?._id);

                    return (
                      <div
                        key={_id}
                        className="d-flex justify-content-between border mb-3 align-items-center p-4"
                      >
                        <div className="d-flex align-items-center gap-2">
                          <img
                          loading="lazy"
                            src={profilePhoto}
                            alt=""
                            className="profile-img"
                            style={{
                              borderRadius: "100%",
                              height: "4rem",
                              width: "5rem",
                            }}
                          />
                          <div className="d-flex flex-column ">
                            <Link
                              className="text-decoration-none"
                              to={`/singleuserprofile/${_id}`}
                            >
                              <span> {userName} </span>
                            </Link>
                            <span className="">
                              {followers?.length} follower(s)
                            </span>
                          </div>
                        </div>
                       {_id !== currentUser?._id && (

                        <div>
                          {isFollowing ? (
                            <button
                              className="btn rounded-5 border"
                              onClick={() => handleUnfollow(_id)}
                            >
                              Following
                            </button>
                          ) : (
                            <button
                              className="btn rounded-5 border"
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
            {/* <div>
              {data && data.length >= 1 ? (
                <>
                 
                </>
              ) : (
                <>
                  <h2>No users yet</h2>
                </>
              )}
            </div> */}
          </div>
          {/* below for 1 */}
          {/* <div className="col-lg ">
            <div className="d-flex justify-content-center align-items-center ">
            {isLoading && <SpinnerLoader/>}

            </div>
            <div>
              {data && data.length >= 1 ? (
                <>
                  {data?.map((datum) => {
                    const { profilePhoto, followers, userName, _id } = datum;
                    const isFollowing = followers.includes(currentUser?._id);

                    return (
                      <div
                        key={_id}
                        className="d-flex justify-content-between border mb-3 align-items-center p-4"
                      >
                        <div className="d-flex align-items-center gap-2">
                          <img
                            src={profilePhoto}
                            alt=""
                            className="profile-img"
                            style={{
                              borderRadius: "5rem",
                              height: "4rem",
                              width: "5rem",
                            }}
                          />
                          <div className="d-flex flex-column ">
                            <Link className="text-decoration-none" to={`/singleuserprofile/${_id}`}>
                            
                            <span > {userName}  </span>
                            </Link>
                            <span className="">
                              {followers?.length} follower
                            </span>
                          </div>
                        </div>
                        <div>
                        {isFollowing ? (
                            <button className="btn rounded-5 border" onClick={() => handleUnfollow(_id)}>
                              Following
                            </button>
                          ) : (
                            <button className="btn rounded-5 border" onClick={() => handleFollow(_id)}>
                              Follow +
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </>
              ) : (
                <>
                  <h2>No users yet</h2>
                </>
              )}
            </div>
          </div> */}
        </div>
      </main>
      <NavSection />
    </>
  );
};

export default Community;
