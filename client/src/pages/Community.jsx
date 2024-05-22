import React, { useEffect, useState } from "react";
import Navbar from "../layouts/Navbar";
import Bio from "../components/Bio";
import { Link } from "react-router-dom";
import NavSection from "../components/NavSection";

const Community = () => {
  const [data, setData] = useState([]);
  const getUsers = async () => {
    const request = await fetch("https://em-mern-social-app.onrender.com/api/v1/users/all");
    const response = await request.json();
    console.log(response.users);
    setData(response.users);
  };
  useEffect(() => {
    getUsers();
    document.title = "community | page";

  }, []);
  return (
    <>
      <Navbar />

      <main className="container">
        <div className=" row  gap-2 pt-3">
          <section className="vh-100 col-lg-4 d-none d-lg-block p-2 rounded-2 border profile-section ">
            <Bio />
          </section>
          {/* all users */}
          <div className="col-lg">
            {/* <h2>community for all users</h2> */}
            <div>
              {data && data.length >= 1 ? (
                <>
                  {data?.map((datum) => {
                    const { profilePhoto, followers, userName, _id } = datum;
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
                          <button className="btn rounded-5 border">
                            follow +
                          </button>
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
          </div>
        </div>
      </main>
      <NavSection/>
    </>
  );
};

export default Community;
